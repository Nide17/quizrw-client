import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import Reports from '../webmaster/Reports'
import { connect } from 'react-redux';
import { updateQuestion } from '../../redux/questions/questions.actions';
import { setQuizes } from '../../redux/quizes/quizes.actions'

const ChangeQuizModal = ({ auth, updateQuestion, setQuizes, allQuizes, questionID, quizID, questionCatID }) => {

    const oldQuizID = quizID

    const [newQuestionState, setNewQuestionState] = useState({
        qtId: questionID,
        quizID
    })

    //properties of the modal
    const [modal, setModal] = useState(false)

    //showing and hiding modal
    const toggle = () => setModal(!modal);

    // Lifecycle methods
    useEffect(() => {
        setQuizes();
    }, [setQuizes]);

    const onChangeHandler = e => {
        setNewQuestionState({ ...newQuestionState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { qtId, quizID } = newQuestionState;

        // Create new User object
        const updatedQuestion = {
            qtId,
            quiz: quizID,
            oldQuizID
        };

        // Attempt to update
        updateQuestion(updatedQuestion);

        // close the modal
        if (modal) {
            toggle();
        }

        // Return back to webmaster page
        window.location.href = '/webmaster'
    }

    return (

        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <div>
                    <Button onClick={toggle} color="info" size="sm" className="mr-3 p-1 w-100">
                        Change Quiz
                    </Button>

                    <Modal
                        // Set it to the state of modal true or false
                        isOpen={modal}
                        toggle={toggle}
                    >

                        <ModalHeader toggle={toggle} className="bg-primary text-white">Change Quiz</ModalHeader>

                        <ModalBody>

                            <Form onSubmit={onSubmitHandler}>

                                <FormGroup>

                                    <Label for="title">
                                        <strong>Quiz Title</strong>
                                    </Label>

                                    <Input type="select" name="quizID" id="role" placeholder="Quiz title..." className="mb-3" onChange={onChangeHandler} value={newQuestionState.quizID}>

                                        {allQuizes && allQuizes.map(quiz =>

                                            (quiz.category._id === questionCatID) ?

                                                <option key={quiz._id} value={quiz._id}>{quiz.title}</option> :
                                                null
                                        )}

                                    </Input>

                                    <Button color="success" style={{ marginTop: '2rem' }} block>
                                        Save
                                    </Button>

                                </FormGroup>

                            </Form>
                        </ModalBody>
                    </Modal>
                </div> :

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
    );
}

// Map the question to state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    categories: state.categoriesReducer,
    allQuizes: state.quizesReducer.allQuizes
});

export default connect(mapStateToProps, { updateQuestion, setQuizes })(ChangeQuizModal);