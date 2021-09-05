import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Container, Col, Row, Button, Badge } from 'reactstrap';
import { Link, useParams, useHistory } from 'react-router-dom'
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import { connect } from 'react-redux'
import { getOneScore } from '../../redux/scores/scores.actions'
// import SimilarQuizes from './SimilarQuizes';
import ResponsiveAd from '../adsenses/ResponsiveAd';
import SquareAd from '../adsenses/SquareAd';

const ReviewQuiz = ({ auth, sC, getOneScore }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [lastAnswer, setLastAnswer] = useState(false);

    // Access route parameters
    const { reviewId } = useParams()

    // Lifecycle methods
    useEffect(() => {
        getOneScore(reviewId);
    }, [getOneScore, reviewId]);

    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }

    const handleNextAnswer = () => {
        const nextQuestion = currentQuestion + 1;
        nextQuestion < sC.oneScore.review.questions.length ?
            setCurrentQuestion(nextQuestion) :
            setLastAnswer(true)
    };

    const handlePrevAnswer = () => {
        const prevQuestion = currentQuestion - 1;
        prevQuestion >= 0 ?
            setCurrentQuestion(prevQuestion) :
            alert('No previous available!')
    };

    return (

        <Container>

            {auth.isAuthenticated ?

                !sC.isLoading ?

                    <>
                        <Row><Col sm="6"><ResponsiveAd /></Col></Row>
                        {
                            sC.oneScore ?

                                sC.oneScore.review.questions.length > 0 ?

                                    <>

                                        <Row className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80" key={Math.floor(Math.random() * 1000)}>

                                            {lastAnswer ?

                                                auth.isAuthenticated ?

                                                    <div className='score-section text-center'>

                                                        <h5 className="text-center font-weight-bold">Reviewing finished!</h5>

                                                        <Link to={`/view-quiz/${sC.oneScore.quiz._id}`}>
                                                            <button type="button" className="btn btn-outline-success mt-3">
                                                                Retake
                                                            </button>
                                                        </Link>

                                                        &nbsp;&nbsp;
                                                        <button type="button" className="btn btn-outline-info mt-3" onClick={goBack}>
                                                            Back
                                                        </button>

                                                    </div> :

                                                    <div className='score-section text-center'>
                                                        <h5>Only members are allowed!</h5>
                                                    </div> :

                                                <div className="question-view">
                                                    <Row>
                                                        <Col>
                                                            <div className="d-flex justify-content-around">
                                                                <h6 className="text-warning">Reviewing ...</h6>
                                                                <Button outline color="success" size="sm">
                                                                    <a href="/webmaster">Your past scores</a>
                                                                </Button>
                                                            </div>

                                                            <div className='question-section my-2 mx-auto w-75'>
                                                                <h4 className='question-count text-uppercase text-center text-secondary font-weight-bold'>
                                                                    <span>Question <b style={{ color: "#B4654A" }}>{currentQuestion + 1}</b></span>/{sC.oneScore.review.questions.length}
                                                                </h4>
                                                                <h5 className='q-txt mt-4 font-weight-bold text-center'>{sC.oneScore.review.questions[currentQuestion].questionText && sC.oneScore.review.questions[currentQuestion].questionText}</h5>

                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col>
                                                            <div className='answer d-flex flex-column mx-auto mt-2 w-25'>
                                                                {sC.oneScore.review.questions && sC.oneScore.review.questions[currentQuestion].answerOptions.map((answerOption, index) => (

                                                                    <>
                                                                        <button
                                                                            key={index}
                                                                            className={`answer-option my-3 p-2 btn btn-outline-${answerOption.isCorrect ? 'success font-weight-bolder' :
                                                                                !answerOption.isCorrect && answerOption.choosen ? 'danger font-weight-bolder' : 'secondary'} rounded`}>
                                                                            {answerOption.answerText}
                                                                        </button>

                                                                        {answerOption.explanations ?
                                                                            <small className="text-dark border mb-1 pl-1">
                                                                                👉 {answerOption.explanations}
                                                                            </small> :
                                                                            null}

                                                                    </>

                                                                ))}
                                                            </div>

                                                            <div className="prevNext d-flex justify-content-between align-items-center mt-5">
                                                                <Button color="info" className="ml-0 ml-md-5 p-1 px-md-2" onClick={handlePrevAnswer}>Previous</Button>

                                                                {sC.oneScore.review.questions && sC.oneScore.review.questions[currentQuestion].answerOptions.map((answerOption, index) => (

                                                                    answerOption.isCorrect && answerOption.choosen ?
                                                                        <ul key={index} className="d-md-flex list-inline mb-0 mt-2">
                                                                            <li>
                                                                                <Badge href="#" color="success">Your answer is correct</Badge>
                                                                            </li>
                                                                        </ul> :

                                                                        !answerOption.isCorrect && answerOption.choosen ?
                                                                            <ul key={index} className="d-md-flex list-inline mb-0 mt</ul>-2">
                                                                                <li className="ml-md-3">
                                                                                    <Badge href="#" color="danger">Your incorrect answer</Badge>
                                                                                </li>
                                                                                <li className="ml-md-3">
                                                                                    <Badge href="#" color="success">Correct answer</Badge>
                                                                                </li>
                                                                            </ul> : null

                                                                ))}

                                                                <Button color="info" className="mr-0 mr-md-5 p-1 px-md-2" onClick={handleNextAnswer}>
                                                                    {lastAnswer ? 'End' : 'Next'}</Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>}

                                        </Row>
                                        {/* <SimilarQuizes categoryId={sC.oneScore.quiz && sC.oneScore.quiz.category} /> */}
                                    </> :

                                    <Row className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80 text-center">
                                        <h1 className="text-danger font-weight-bolder">404</h1>
                                        <h4>Quiz's questions unavailable!</h4>
                                        <Button color="info" style={{ width: "120px" }} className="mx-auto mt-4"><a href="/webmaster" className="text-white">Back</a></Button>
                                    </Row> :

                                <Row className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80 text-center">
                                    <h1 className="text-danger font-weight-bolder">404</h1>
                                    <h4>The page you're looking for is not found!</h4>
                                    <Button color="info" style={{ width: "120px" }} className="mx-auto mt-4"><a href="/webmaster" className="text-white">Back</a></Button>
                                </Row>}

                        <Row><Col sm="6"><SquareAd /></Col></Row></> :

                    <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                        <ReactLoading type="cylon" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                    </div> :

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
            }
        </Container>)
}

ReviewQuiz.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    sC: state.scoresReducer
})

export default connect(mapStateToProps, { getOneScore })(ReviewQuiz)