import React, { useState, useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import ReactLoading from "react-loading";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import EditQuiz from './EditQuiz';
import SearchInput from '../SearchInput'
import { setQuestions, setQuestionsLoading } from '../../redux/questions/questions.actions'
import { setQuizes, deleteQuiz, updateQuiz } from '../../redux/quizes/quizes.actions'

import trash from '../../images/trash.svg';
import AddIcon from '../../images/plus.svg';

const QuizesTabPane = ({ currentUser, quizes, questionsData, setQuizes, setQuestions, deleteQuiz, categories }) => {

    const [searchKey, setSearchKey] = useState('')
    const [searchKeyQ, setSearchKeyQ] = useState('')

    // const [limit] = useState(8);
    // const [skip, setSkip] = useState(0);

    // const nextPage = () => {
    //     setSkip(skip + limit)
    // }

    // const previousPage = () => {
    //     setSkip(skip - limit)
    // }

    // Lifecycle methods
    useEffect(() => {
        // setQuizes(limit, skip);
        setQuizes();
        setQuestions();
        // }, [setQuestions, setQuizes, limit, skip]);
    }, [setQuestions, setQuizes]);

    return (

        <TabPane tabId="2">

            {quizes.isLoading ? <ReactLoading type="spinningBubbles" color="#33FFFC" /> :
                <>
                    <Row className="mt-3">
                        <Col sm="6">
                            <SearchInput setSearchKey={setSearchKey} placeholder=" Search quizes here ...  " />
                        </Col>
                        <Col sm="6">
                            <SearchInput setSearchKey={setSearchKeyQ} placeholder=" Search questions here ...  " />
                        </Col>
                    </Row>

                    {/* Search questions */}
                    <Row>
                        <ListGroup>
                            {questionsData && questionsData
                                .filter(question => {

                                    if (searchKeyQ === "") {
                                        return null
                                    } else if (question.questionText.toLowerCase().includes(searchKeyQ.toLowerCase())) {
                                        return question
                                    }
                                    return null
                                })
                                .map(question => (
                                    <ListGroupItem key={question._id} tag="a" href={`/view-question/${question._id}`}>
                                        {question.questionText}
                                    </ListGroupItem>
                                ))}

                        </ListGroup>
                    </Row>

                    {/* Search quizes */}
                    <Row>
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

                                currentUser.role === 'Admin' || currentUser._id === quiz.created_by._id ?

                                    <Col sm="3" key={quiz._id} className="mt-3 quiz-toast">

                                        <Toast>
                                            <ToastHeader className="text-success">
                                                <Link to={`/quiz-ranking/${quiz._id}`}>
                                                    <strong>{quiz.title}</strong>
                                                    <small>&nbsp;(Ranking)</small>
                                                </Link>

                                                <div className="actions text-secondary d-flex">

                                                    <img src={trash} alt="" width="16" height="16" className="mr-3 mt-1" onClick={() => deleteQuiz(quiz._id)} />

                                                    <EditQuiz quizToEdit={quiz} categories={categories} />

                                                    <Link to={`/questions-create/${quiz._id}`} className="text-secondary">
                                                        <img src={AddIcon} alt="" width="12" height="12" className="" /> <small>Questions</small>
                                                    </Link>

                                                </div>

                                            </ToastHeader>

                                            <ToastBody>
                                                {quiz.description}
                                                <br />
                                                <small className="mb-2 text-success font-weight-bold">
                                                    🧑 By {quiz.created_by && quiz.created_by.name}
                                                </small>
                                                <br />
                                                <br />

                                                {quiz.questions && quiz.questions.length > 0 ?

                                                    <>
                                                        <p className="font-weight-bold">Questions ({quiz.questions.length})</p>

                                                        {quiz && quiz.questions.map((question, index) =>
                                                            <ul key={question._id} className="pl-1">
                                                                <li style={{ listStyle: "none" }}>
                                                                    {index + 1}.&nbsp;

                                                                    <Link to={`/view-question/${question._id}`}>
                                                                        {question.questionText}
                                                                    </Link>
                                                                    <strong className="text-danger">&nbsp;
                                                                        ({question.answerOptions.length} answers)</strong>
                                                                </li>
                                                            </ul>
                                                        )}</> :
                                                    <p className="font-weight-bold text-danger">No questions</p>}

                                            </ToastBody>

                                        </Toast>

                                    </Col> : null
                            ))}

                        {/* <div className="w-100 d-flex justify-content-around mx-auto mt-5 overflow-auto pb-2">
                            <Button color="info" onClick={previousPage} className={skip < 1 ? `invisible` : `visible`}>
                                Previous Page
                            </Button>
                            <Button color="info" onClick={nextPage} className={quizes.allQuizes.length < limit ? `invisible` : `visible`}>
                                Next Page
                            </Button>
                        </div> */}
                    </Row>
                </>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    quizes: state.quizesReducer,
    questionsData: state.questionsReducer.questionsData
})

export default connect(mapStateToProps, { setQuizes, setQuestions, setQuestionsLoading, updateQuiz, deleteQuiz })(QuizesTabPane)