import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import { Row, Col, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getTakerScores } from '../../redux/scores/scores.actions'

const Reports = ({ userId, auth, sCT, getTakerScores }) => {

    useEffect(() => {
        getTakerScores(userId);
    }, [getTakerScores, userId]);

    return (

        auth.isAuthenticated ?

            sCT.isLoading ?

                <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                    <ReactLoading type="cylon" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                </div> :

                <>
                    <Row className="text-center m-3 mb-1 m-lg-5 d-flex justify-content-center past-scores">
                        <h3 className="mb-0 font-weight-bolder">Your past scores</h3>
                    </Row>

                    <Row className="mx-0 mb-4">
                        {sCT && sCT.takerScores.map(score => (

                            <Col sm="3" key={score._id} className="px-2 mt-2 report-toast">
                                <Toast>
                                    <ToastHeader className="text-success">
                                        <strong>{score.quiz && score.quiz.title}</strong>&nbsp;
                                        <small className="d-flex align-items-center">
                                            ({score.category && score.category.title})
                                        </small>
                                    </ToastHeader>

                                    <ToastBody>

                                        {score.quiz && score.quiz.questions.length > 0 ?
                                            <Link to={`/review-quiz/${score.id}`} className="font-weight-bold text-info">
                                                Review answers
                                            </Link> :
                                            <p className="text-danger">Review unavailable!</p>}

                                        <p className="mt-1">Score:&nbsp;
                                            <strong className="text-warning">
                                                {score.marks}/{score.out_of}
                                            </strong>
                                        </p>
                                        <small className="text-center">
                                            On {score.test_date.split('T').slice(0, 2).join(' at ')}
                                        </small>
                                    </ToastBody>
                                </Toast>

                            </Col>
                        ))}
                    </Row> </> :

            // If not authenticated or loading
            <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                {
                    sCT.isLoading ?
                        <>
                            <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                            <p className="d-block">Loading user ...</p>
                        </> :
                        <LoginModal />
                }
            </div>
    )
}

Reports.propTypes = {
    auth: PropTypes.object,
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    sCT: state.scoresReducer
});

export default connect(mapStateToProps, { getTakerScores })(Reports)