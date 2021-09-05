import React, { useEffect } from 'react'
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import Reports from '../webmaster/Reports'
import { Link, useParams } from 'react-router-dom'
import { Row, Table, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { setScores } from '../../redux/scores/scores.actions'
import { setQuizes } from '../../redux/quizes/quizes.actions'

const QuizRanking = ({ auth, quizes, scores, setQuizes, setScores }) => {

    useEffect(() => {
        setScores();
        setQuizes();
    }, [setQuizes, setScores]);

    const { quizId } = useParams()
    let i = 1;

    return (

        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?
                <>
                    {quizes && quizes.allQuizes.map(quiz => (
                        (quiz._id === quizId) ?
                            <div key={quiz._id} className="mt-5 mx-5 single-category">
                                <Row className="mb-0 mb-lg-3 mx-0">
                                    <Breadcrumb>
                                        <BreadcrumbItem>
                                            <Link to="/webmaster">{quiz.category.title}</Link>
                                        </BreadcrumbItem>
                                        <BreadcrumbItem active>{quiz.title}&nbsp;(Ranking)</BreadcrumbItem>
                                    </Breadcrumb>
                                </Row>
                            </div> : null
                    ))}

                    <Row className="mx-2 mx-lg-5">

                        <Table hover responsive>

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Quiz Name</th>
                                    <th>Marks</th>
                                    <th>Out of</th>
                                </tr>
                            </thead>

                            <tbody>
                                {scores && scores.allScores.sort((a, b) => b.marks - a.marks).map(score => (

                                    score && score.quiz && quizId === score.quiz._id ?
                                        <tr key={score._id}>
                                            <th scope="row">{i++}</th>
                                            <td>{score.taken_by ? score.taken_by.name : 'No name'}</td>
                                            <td>{score.taken_by ? score.taken_by.email : 'No mail'}</td>
                                            <td>{score.quiz.title}</td>
                                            <td>{score.marks}</td>
                                            <td>{score.out_of}</td>
                                        </tr> : null))}
                            </tbody>
                        </Table>

                    </Row>
                </> :
                <Reports userId={auth.user._id} /> :

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    auth.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading User ...</p>
                        </> :
                        <LoginModal />
                }
            </div>
    )
}

QuizRanking.propTypes = {
    auth: PropTypes.object,
    error: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    error: state.errorReducer,
    scores: state.scoresReducer,
    quizes: state.quizesReducer
});

export default connect(mapStateToProps, { setQuizes, setScores })(QuizRanking)