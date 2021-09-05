import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Container, Col, Row, Form, FormGroup, Input, Button, Alert, Spinner } from 'reactstrap';
import ReactLoading from "react-loading";
import SearchInput from '../SearchInput'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setQuizes } from '../../redux/quizes/quizes.actions'
import { subscribeToNewsLetter } from '../../redux/subscribers/subscribers.actions'
import { clearErrors } from '../../redux/error/error.actions'
import subscribe from '../../images/undraw_subscribe.svg';

import CarouselQuiz from './CarouselQuiz'
import PostItem from './PostItem'
import ResponsiveAd from '../adsenses/ResponsiveAd';
import SquareAd from '../adsenses/SquareAd';
const ViewCategory = lazy(() => import('../categories/ViewCategory'));

const Posts = ({ subscribeToNewsLetter, clearErrors, error, setQuizes, quizes, categories }) => {

    const [subscriberState, setsubscriberState] = useState({
        name: '',
        email: ''
    })

    const [searchKey, setSearchKey] = useState('')
    const [limit] = useState(20);

    // Lifecycle methods
    useEffect(() => {
        setQuizes(limit);
    }, [setQuizes, limit]);

    const onChangeHandler = e => {
        clearErrors();
        const { name, value } = e.target
        setsubscriberState(subscriberState => ({ ...subscriberState, [name]: value }))
    };

    const onSubscribe = e => {
        e.preventDefault();

        const { name, email } = subscriberState;

        // Create user object
        const subscribedUser = {
            name,
            email
        };

        // Attempt to subscribe
        subscribeToNewsLetter(subscribedUser);

        // Reset fields
        setsubscriberState({
            name: '',
            email: ''
        })
    }

    const mystyle = {
        color: "#B4654A",
        textAlign: "center",
        animationDuration: "2s",
        animationName: "slidein",
        animationIterationCount: "infinite",
        animationDirection: "alternate"
    };

    return (
        <Container className="posts main px-0 mt-4">

            <blockquote className="blockquote text-center mt-4">
                <h1 className="mb-0 lead text-uppercase font-weight-bold">Knowing matter, so does quizzing!</h1>
                <small className="text-muted ml-2">Welcome, test your knowledge as you wish!</small>
            </blockquote>

            <Row className="mt-5 mx-0">
                <CarouselQuiz />
            </Row>

            <Row className="mt-4 mx-0">
                <div style={mystyle} className="soon">
                    <h4>Ready? Let's link you to your exam success! 🍾🎉</h4>
                </div>
            </Row>

            <Row className="mt-3 d-flex d-lg-none mobile-categories">
                <Suspense
                    fallback=
                    {
                        <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                            <Spinner style={{ width: '5rem', height: '5rem' }} />{' '}
                        </div>
                    }>
                    <ViewCategory categories={categories} />
                </Suspense>
            </Row>


            <Row className="mt-5 mx-0">

                <Col sm="8" className="px-1 px-lg-4 mt-md-2">
                    <h3 className="mb-3 text-danger text-center lead font-weight-bold">Newest Quizes</h3>

                    {quizes.isLoading ?
                        <div className="p-5 m-5 d-flex justify-content-center align-items-center">
                            <ReactLoading type="spokes" color="#33FFFC" />
                        </div> :
                        <>

                            {/* Search */}
                            <SearchInput setSearchKey={setSearchKey} placeholder=" Search quizes here ...  " />

                            {quizes && quizes.allQuizes
                                .filter(quiz => {

                                    if (searchKey === "") {
                                        return quiz
                                    } else if (quiz.title.toLowerCase().includes(searchKey.toLowerCase())) {
                                        return quiz
                                    }
                                    return null
                                })
                                .map(quiz => (
                                    quiz.questions.length > 5 ?
                                        <PostItem key={quiz._id} quiz={quiz} /> : null
                                ))}

                            {quizes.allQuizes.length > 0 ?

                                <div className="my-4 d-flex justify-content-center">
                                    <Link to="/allposts">
                                        <Button outline color="info">View all quizes ...</Button>
                                    </Link>
                                </div> :
                                null}
                        </>
                    }
                </Col>

                <Col sm="4">

                    {/* Google responsive 1 ad */}
                    <ResponsiveAd />

                    <Row className="mb-5 d-none d-lg-flex">
                        <Suspense
                            fallback=
                            {
                                <div className="p-1 m-1 d-flex justify-content-center align-items-center">
                                    <Spinner style={{ width: '5rem', height: '5rem' }} />{' '}
                                </div>
                            }>
                            <ViewCategory categories={categories} />
                        </Suspense>
                    </Row>

                    <Row className="mb-5">

                        <Form onSubmit={onSubscribe} className="subscribe-form">

                            <FormGroup>
                                {error.id === "SUBSCRIBE_FAIL" ?
                                    <Alert color='danger'>
                                        <small>{error.msg.msg}</small>
                                    </Alert> :
                                    null
                                }

                                <img src={subscribe} alt={subscribe} />

                                <h6 className="mt-5">
                                    <b>Subscribe for updates</b>
                                </h6>

                                <Input type="text" name="name" value={subscriberState.name} bsSize="sm" placeholder="Your name" className="mt-4" onChange={onChangeHandler} minLength="4" maxLength="30" required />

                                <Input type="email" name="email" value={subscriberState.email} bsSize="sm" placeholder="Your Email" className="mt-4" onChange={onChangeHandler} required />

                                <Button color="info" size="sm" className="mt-4">Subscribe</Button>
                            </FormGroup>
                        </Form>

                    </Row>
                    {/* Google square ad */}
                    <SquareAd />
                </Col>

            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    error: state.errorReducer,
    subscribedUsers: state.subscribersReducer.subscribedUsers,
    quizes: state.quizesReducer,
})

export default connect(mapStateToProps, { subscribeToNewsLetter, clearErrors, setQuizes })(Posts)