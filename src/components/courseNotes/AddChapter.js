import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import AddIcon from '../../images/plus.svg';
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import Reports from '../webmaster/Reports'
import { connect } from 'react-redux';
import { createChapter } from '../../redux/chapters/chapters.actions';

const AddChapter = ({ auth, createChapter, course }) => {

    const [chapterState, setChapterState] = useState({
        title: '',
        description: ''
    })

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    //properties of the modal
    const [modal, setModal] = useState(false)

    //showing and hiding modal
    const toggle = () => setModal(!modal);

    const onChangeHandler = e => {
        setChapterState({ ...chapterState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { title, description } = chapterState;

        // VALIDATE
        if (title.length < 4 || description.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (title.length > 80) {
            setErrorsState(['Title is too long!']);
            return
        }
        else if (description.length > 200) {
            setErrorsState(['Description is too long!']);
            return
        }

        // Create new chapter object
        const newChapter = {
            title,
            description,
            course: course._id,
            courseCategory: course.courseCategory,
            created_by: auth.isLoading === false ? auth.user._id : null
        };

        // Attempt to create
        createChapter(newChapter);

        // close the modal
        if (modal) {
            toggle();
        }
    }

    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <div>
                    <NavLink onClick={toggle} className="text-success p-0">
                        <img src={AddIcon} alt="" width="10" height="10" className="mb-1" />
                        &nbsp;Chapter
                    </NavLink>

                    <Modal
                        // Set it to the state of modal true or false
                        isOpen={modal}
                        toggle={toggle}>

                        <ModalHeader toggle={toggle} className="bg-primary text-white">
                            Add New Chapter
                        </ModalHeader>

                        <ModalBody>

                            {errorsState.length > 0 ?
                                errorsState.map(err =>
                                    <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                        {err}
                                    </Alert>) :
                                null}

                            <Form onSubmit={onSubmitHandler}>

                                <FormGroup>
                                    <Label for="name">
                                        <strong>Title</strong>
                                    </Label>

                                    <Input type="text" name="title" id="title" placeholder="Chapter title ..." className="mb-3" onChange={onChangeHandler} />

                                    <Label for="description">
                                        <strong>Description</strong>
                                    </Label>

                                    <Input type="text" name="description" id="description" placeholder="Chapter description ..." className="mb-3" onChange={onChangeHandler} />

                                    <Button color="success" style={{ marginTop: '2rem' }} block >Add</Button>
                                </FormGroup>

                            </Form>
                        </ModalBody>
                    </Modal>
                </div> :

                <Reports userId={auth.user._id} /> :

            // If not authenticated or loading
            <>
                {
                    auth.isLoading ?
                        <ReactLoading type="spinningBubbles" color="#33FFFC" /> :
                        <LoginModal />
                }
            </>
    );
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { createChapter })(AddChapter);