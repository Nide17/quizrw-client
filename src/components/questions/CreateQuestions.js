import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { Button, Row, Col, Form, FormGroup, Label, Input, CustomInput, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import Reports from '../webmaster/Reports'
import { connect } from 'react-redux';
import { addQuestion, setQuestions } from '../../redux/questions/questions.actions';
import { setQuizes, notifying } from '../../redux/quizes/quizes.actions'
import { clearErrors } from '../../redux/error/error.actions'

const CreateQuestions = ({ auth, allQuizes, addQuestion, setQuizes, notifying, setQuestions, clearErrors, errors }) => {

    const [questionText, setQuestionText] = useState({
        questionText: '',
    })

    const [durationState, setDurationState] = useState({
        duration: 24
    })

    const [answerOptions, setAnswerOptions] = useState([
        { id: uuidv4(), answerText: '', explanations: '', isCorrect: false },
    ]);

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    // Lifecycle methods
    useEffect(() => {
        setQuizes();
        setQuestions();
    }, [setQuizes, setQuestions]);

    const onQuestionChangeHandler = e => {
        setErrorsState([])
        clearErrors();

        const { name, value } = e.target
        setQuestionText(state => ({ ...state, [name]: value }))
    }

    const onDurationChangeHandler = e => {
        setErrorsState([])
        clearErrors();

        const { name, value } = e.target
        setDurationState(durationState => ({ ...durationState, [name]: value }))
    }

    const handleAnswerChangeInput = (id, event) => {
        setErrorsState([])
        clearErrors();

        const newAnswerOptions = answerOptions.map(i => {
            if (id === i.id) {
                event.target.type === "checkbox" ?
                    i[event.target.name] = event.target.checked :
                    i[event.target.name] = event.target.value
            }
            return i;
        })

        setAnswerOptions(newAnswerOptions);
    }

    // Access route parameters
    const { quizId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();

        const trueAnswer = answerOptions.find(ansop => ansop.isCorrect === true ? ansop : null)

        // VALIDATE
        if (questionText.questionText.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (questionText.questionText.length > 700) {
            setErrorsState(['Question is too long!']);
            return
        }

        else if (answerOptions.length <= 1) {
            setErrorsState(['Answers are not sufficient!']);
            return
        }

        else if (!trueAnswer) {
            setErrorsState(['Please provide a true answer!']);
            return
        }

        else if (errors.id === "ADD_QUESTION_FAIL") {
            setErrorsState([errors.msg]);
            return
        }

        const qnQuiz = allQuizes && allQuizes.find(quiz =>
            quiz._id === quizId ? quiz : null)

        const newQuestion = {
            questionText: questionText.questionText,
            answerOptions,
            category: qnQuiz.category._id,
            creation_date: Date.now,
            quiz: quizId,
            created_by: auth.isLoading === false ? auth.user._id : null,
            duration: durationState.duration
        }
        addQuestion(newQuestion);

        // Reset form fields
        setQuestionText({ questionText: '' })
        setDurationState({ duration: 24 })
        setAnswerOptions([{ id: uuidv4(), answerText: '', explanations: '', isCorrect: false }])
    };

    const handleAddFields = () => {
        setAnswerOptions([...answerOptions, { id: uuidv4(), answerText: '', explanations: '', isCorrect: false }])
    }

    const handleRemoveFields = id => {
        const values = [...answerOptions];
        values.splice(values.findIndex(value => value.id === id), 1);
        setAnswerOptions(values);
    }

    const SendNotification = (quizId, title, category, created_by) => {

        const newQuizInfo = {
            quizId,
            title,
            category,
            created_by
        }

        notifying(newQuizInfo)
    }

    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <Form className="my-3 mt-lg-5 mx-3 mx-lg-5 create-question" onSubmit={handleSubmit}>

                    {
                        allQuizes && allQuizes.map(quiz =>
                            quiz._id === quizId ?
                                (<Row key={quiz._id} className="mb-0 mb-lg-3 mx-0">
                                    <Breadcrumb key={quiz._id}>
                                        <BreadcrumbItem><Link to="/webmaster">{quiz.category.title}</Link></BreadcrumbItem>
                                        <BreadcrumbItem><Link to={`/category/${quiz.category._id}`}>{quiz.title}</Link></BreadcrumbItem>
                                        <BreadcrumbItem active>Create Question</BreadcrumbItem>
                                    </Breadcrumb>

                                    <Button
                                        size="sm"
                                        color="danger"
                                        style={{ marginLeft: "auto", height: "fit-content", border: "3px solid black" }}
                                        onClick={() => SendNotification(quiz._id, quiz.title, quiz.category.title, quiz.created_by.name)}>
                                        Finish
                                    </Button>
                                </Row>) : ''
                        )
                    }

                    {/* Error frontend*/}
                    {errorsState.length > 0 ?
                        errorsState.map(err =>
                            <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                {err}
                            </Alert>) :
                        null
                    }

                    {/* Error backend */}
                    {errors.id === "ADD_QUESTION_FAIL" ?
                        <Alert color='danger'>
                            <small>{errors.msg}</small>
                        </Alert> :
                        null
                    }

                    <FormGroup row className="mx-0">
                        <Label sm={2}>Question</Label>
                        <Col sm={10}>
                            <Input type="text" name="questionText" value={questionText.questionText || ""} placeholder="Question here ..." onChange={onQuestionChangeHandler} required />
                        </Col>
                    </FormGroup>

                    <FormGroup row className="mx-0">
                        <Label sm={2}>Question Duration</Label>
                        <Col sm={3}>
                            <Input type="number" name="duration" value={durationState.duration || 0} placeholder="Time in seconds ..." onChange={onDurationChangeHandler} required />
                        </Col>
                    </FormGroup>

                    {answerOptions.map(answerOption => (

                        <div key={answerOption.id}>

                            <FormGroup row className="mx-0">
                                <Label sm={2}>Answer</Label>

                                <Col sm={10} xl={7}>
                                    <Input type="text" name="answerText" value={answerOption.answerText}
                                        onChange={event => handleAnswerChangeInput(answerOption.id, event)} id="exampleanswer" placeholder="Answer here ..." required />
                                </Col>

                                <Col sm={6} xl={2} className="my-3 my-sm-2 d-sm-flex justify-content-around">
                                    <CustomInput type="checkbox" name="isCorrect" value={answerOption.isCorrect}
                                        onChange={event => handleAnswerChangeInput(answerOption.id, event)} id={answerOption.id} label="Is Correct?" required />
                                </Col>

                                <Col sm={6} xl={1} className="my-3 my-sm-2">
                                    <Button className="px-2 py-1" disabled={answerOptions.length === 1} color="danger" onClick={() => handleRemoveFields(answerOption.id)}> - </Button>{' '}
                                    <Button className="px-2 py-1" color="danger" onClick={handleAddFields}> + </Button>{' '}
                                </Col>

                                <Label sm={2}>Rationale</Label>

                                <Col sm={10} xl={7}>
                                    <Input type="textarea" name="explanations" placeholder="Rationales or explanations ..." minLength="5" maxLength="1000" onChange={event => handleAnswerChangeInput(answerOption.id, event)} value={answerOption.explanations} />
                                </Col>

                            </FormGroup>

                        </div>

                    ))}

                    <FormGroup check row className="mx-0 pl-3">
                        <Col sm={{ size: 10, offset: 2 }} className="pl-0">
                            <Button className="btn btn-info btn-sm" type="submit" onClick={handleSubmit}>Add New</Button>
                        </Col>
                    </FormGroup>

                </Form> :
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

// Map the question to state props
const mapStateToProps = state => ({
    errors: state.errorReducer,
    question: state.questionsReducer,
    auth: state.authReducer,
    allQuizes: state.quizesReducer.allQuizes
});

export default connect(
    mapStateToProps,
    { addQuestion, setQuizes, notifying, setQuestions, clearErrors })(CreateQuestions);