import React, { useEffect } from 'react';
import { Row, Col, Toast, ToastBody, ToastHeader, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem } from 'reactstrap';
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import Reports from '../webmaster/Reports'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { setQuizes } from '../../redux/quizes/quizes.actions'

const SingleQuiz = ({ auth, allQuizes, setQuizes }) => {

    // Lifecycle methods
    useEffect(() => {
        setQuizes();
    }, [setQuizes]);

    // Access route parameters
    const { quizId } = useParams()

    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <>
                    {allQuizes && allQuizes.map(quiz => (

                        quiz._id === quizId ?

                            <div className="mt-5 mx-3 mx-lg-5 single-category">

                                <Row className="mb-0 mb-lg-3 mx-0">
                                    <Breadcrumb>
                                        <BreadcrumbItem><Link to="/webmaster">{quiz.category.title}</Link></BreadcrumbItem>
                                        <BreadcrumbItem active>{quiz.title}</BreadcrumbItem>
                                    </Breadcrumb>
                                </Row>

                                <Row className="m-4 d-flex justify-content-between align-items-center text-primary">
                                    {quiz && quiz.questions.map(question => (

                                        <Col sm="4" className="mt-2" key={question._id}>

                                            <Toast className="text-center">

                                                <ToastHeader className="d-flex justify-content-between">
                                                    {question.questionText}
                                                </ToastHeader>

                                                <ToastBody>
                                                    <ListGroup>
                                                        {question.answerOptions.map(answer =>
                                                            <ListGroupItem color={answer.isCorrect ? 'success' : ''}>{answer.answerText}</ListGroupItem>)}
                                                    </ListGroup>
                                                    <small>Created on {question.creation_date.split('T').slice(0, 1)}</small>
                                                </ToastBody>

                                            </Toast>

                                        </Col>))}
                                </Row>
                            </div> : null))}
                </> :
                <Reports userId={auth.user._id} /> :

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal />
                }
            </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    allQuizes: state.quizesReducer.allQuizes
});

export default connect(mapStateToProps, { setQuizes })(SingleQuiz);