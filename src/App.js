import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Header from './components/Header';
import Contact from './components/Contact';
import About from './components/About';
import CountDown from './components/quizes/CountDown';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Unsubscribe from './components/auth/Unsubscribe';
import Privacy from './components/others/Privacy';
import Disclaimer from './components/others/Disclaimer';
import Placeholder from './components/others/Placeholder';

// REDUX
import { connect } from 'react-redux'
import store from './redux/store'
import { setCategories } from './redux/categories/categories.actions'
import Footer from './components/footer/Footer';
import CreateQuestions from './components/questions/CreateQuestions';

import { loadUser } from './redux/auth/auth.actions'
import SingleCategory from './components/categories/SingleCategory';
import AllCategories from './components/categories/AllCategories';
import QuizQuestions from './components/quizes/QuizQuestions';
import GetReady from './components/quizes/GetReady';
import SingleQuestion from './components/questions/SingleQuestion';
import EditQuestion from './components/questions/EditQuestion';
import ReviewQuiz from './components/quizes/ReviewQuiz';
import QuizRanking from './components/quizes/QuizRanking';
import ReportsAdmin from './components/webmaster/ReportsAdmin';
import Index from './components/courseNotes/Index';
import ViewCourse from './components/courseNotes/ViewCourse';

const Webmaster = lazy(() => import('./components/webmaster/Webmaster'));
const Posts = lazy(() => import('./components/posts/Posts'));
const AllPosts = lazy(() => import('./components/posts/AllPosts'));

const App = ({ categories, setCategories }) => {

    useEffect(() => {
        store.dispatch(loadUser())
        setCategories()
    }, [setCategories]);

    return (
        <Router>
            <Header />

            <Switch>
                <Route exact path="/">
                    <Suspense fallback={<div className="p-5 m-5 d-flex justify-content-center align-items-center">
                        <Spinner style={{ width: '10rem', height: '10rem' }} />
                    </div>}>
                        <Posts categories={categories} />
                    </Suspense>
                </Route>

                <Route exact path="/allposts">
                    <Suspense fallback={<div className="p-5 m-5 d-flex justify-content-center align-items-center">
                        <Spinner style={{ width: '10rem', height: '10rem' }} />
                    </div>}>
                        <AllPosts />
                    </Suspense>
                </Route>

                <Route path="/about" component={About} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/disclaimer" component={Disclaimer} />
                <Route exact path="/unsubscribe" component={Unsubscribe} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <Route exact path="/countdown" component={CountDown} />
                <Route exact path="/category/:categoryId" render={() => <SingleCategory categories={categories} />} />

                <Route exact path="/view-quiz/:quizId" component={GetReady} />
                <Route exact path="/attempt-quiz/:readyQuizId" render={() => <QuizQuestions />} />

                <Route exact path="/view-question/:questionId" component={SingleQuestion} />
                <Route exact path="/edit-question/:questionId" render={() => <EditQuestion categories={categories} />} />

                <Route exact path="/review-quiz/:reviewId" component={ReviewQuiz} />
                <Route exact path="/reports-admin" component={ReportsAdmin} />
                <Route exact path="/quiz-ranking/:quizId" component={QuizRanking} />
                <Route exact path="/questions-create/:quizId" render={() => <CreateQuestions categories={categories} />} />

                <Route path="/contact" component={Contact} />
                <Route path="/all-categories" render={() => <AllCategories categories={categories} />} />
                <Route path="/course-notes" component={Index} />
                <Route path="/view-course/:courseId" component={ViewCourse} />

                <Route path="/ads.txt">
                    google.com, pub-8918850949540829, DIRECT, f08c47fec0942fa0
                </Route>

                <Route exact path="/webmaster">
                    <Suspense fallback={<div className="p-5 m-5 d-flex justify-content-center align-items-center">
                        <Spinner style={{ width: '10rem', height: '10rem' }} />
                    </div>}>
                        <Webmaster categories={categories} />
                    </Suspense>
                </Route>
                <Route path="*">
                    <Placeholder />
                </Route>

            </Switch>
            <Footer />
        </Router>
    )
}

const mapStateToProps = state => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps, { setCategories })(App);