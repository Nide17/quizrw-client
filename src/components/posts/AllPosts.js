import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Container, Col, Row, Spinner, Button } from 'reactstrap';
import ReactLoading from "react-loading";

import { connect } from 'react-redux'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { subscribeToNewsLetter } from '../../redux/subscribers/subscribers.actions'
import ResponsiveAd from '../adsenses/ResponsiveAd';
import SquareAd from '../adsenses/SquareAd';
const PostItem = lazy(() => import('./PostItem'));

const Posts = ({ setQuizes, quizes }) => {

    const mystyle = {
        color: "#B4654A",
        textAlign: "center",
        animationDuration: "2s",
        animationName: "slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    };

    const [limit] = useState(20);
    const [skip, setSkip] = useState(0);

    const nextPage = () => {
        setSkip(skip + limit)
    }

    const previousPage = () => {
        setSkip(skip - limit)
    }

    // Lifecycle methods
    useEffect(() => {
        setQuizes(limit, skip);
    }, [setQuizes, limit, skip]);

    return (
        <Container className="posts main mt-4">

            <blockquote className="blockquote text-center mt-4">
                <h1 className="mb-0 lead text-uppercase font-weight-bold">Knowing matter, so does quizzing!</h1>
                <small className="text-muted ml-2">Welcome, test your knowledge as you wish!</small>
            </blockquote>

            <Row className="mt-4 mx-0">
                <div style={mystyle} className="soon">
                    <h4>Ready? Let's link you to your exam success! 🍾🎉</h4>
                </div>
            </Row>

            <Row className="mt-lg-5">
                <Col sm="2" className="mt-md-2">
                    {/* Google responsive 1 ad */}
                    <ResponsiveAd />
                </Col>

                <Col sm="8" className="mt-md-2">
                    <Suspense
                        fallback={
                            <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                <Spinner style={{ width: '5rem', height: '5rem' }} />
                            </div>
                        }>
                        <h3 className="mb-3 text-center lead font-weight-bold">All Quizes</h3>

                        {quizes.isLoading ?
                            <div className="p-5 m-5 d-flex justify-content-center align-items-center">
                                <ReactLoading type="spokes" color="#33FFFC" />
                            </div> :

                            quizes && quizes.allQuizes.map(quiz => (
                                <PostItem key={quiz._id} quiz={quiz} />
                            ))}

                        <div className="w-100 d-flex justify-content-around mx-auto my-3 overflow-auto pb-2">
                            <Button color="info" onClick={previousPage} className={skip < 1 ? `invisible` : `visible`}>
                                Previous
                            </Button>
                            <Button color="info" onClick={nextPage} className={quizes.allQuizes.length < limit ? `invisible` : `visible`}>
                                Next
                            </Button>
                        </div>
                    </Suspense>
                </Col>

                <Col sm="2" className="mt-md-2">
                    {/* Google square ad */}
                    <SquareAd />
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    quizes: state.quizesReducer,
})

export default connect(mapStateToProps, { subscribeToNewsLetter, setQuizes })(Posts)