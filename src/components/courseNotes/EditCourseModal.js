import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import Reports from '../webmaster/Reports'

import { connect } from 'react-redux';
import { updateCourse } from '../../redux/courses/courses.actions';
import EditIcon from '../../images/edit.svg';

const EditCourseModal = ({ idToUpdate, editTitle, editDesc, auth, updateCourse }) => {

    const [courseState, setCourseState] = useState({
        idToUpdate,
        name: editTitle,
        description: editDesc,
    })

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    //properties of the modal
    const [modal, setModal] = useState(false)

    //showing and hiding modal
    const toggle = () => setModal(!modal);

    const onChangeHandler = e => {
        setCourseState({ ...courseState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { idToUpdate, name, description } = courseState;

        // VALIDATE
        if (name.length < 4 || description.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (name.length > 80) {
            setErrorsState(['Title is too long!']);
            return
        }
        else if (description.length > 200) {
            setErrorsState(['Description is too long!']);
            return
        }

        // Create new Course object
        const updatedCourse = {
            idToUpdate,
            title: name,
            description
        };

        // Attempt to update
        updateCourse(updatedCourse);

        // close the modal
        if (modal) {
            toggle();
        }
    }
    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <div>
                    <NavLink onClick={toggle} className="text-dark p-0">
                        <img src={EditIcon} alt="" width="16" height="16" />
                    </NavLink>

                    <Modal
                        // Set it to the state of modal true or false
                        isOpen={modal}
                        toggle={toggle}
                    >

                        <ModalHeader toggle={toggle} className="bg-primary text-white">Edit Course</ModalHeader>

                        <ModalBody>

                            {errorsState.length > 0 ?
                                errorsState.map(err =>
                                    <Alert color="danger" key={Math.floor(Math.random() * 1000)}>
                                        {err}
                                    </Alert>) :
                                null
                            }

                            <Form onSubmit={onSubmitHandler}>

                                <FormGroup>

                                    <Label for="name">
                                        <strong>Title</strong>
                                    </Label>

                                    <Input type="text" name="name" id="name" placeholder="Course title ..." className="mb-3" onChange={onChangeHandler} value={courseState.name} />

                                    <Label for="description">
                                        <strong>Description</strong>
                                    </Label>

                                    <Input type="text" name="description" id="description" placeholder="Course description ..." className="mb-3" onChange={onChangeHandler} value={courseState.description} />

                                    <Button color="success" style={{ marginTop: '2rem' }} block>
                                        Update
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

EditCourseModal.propTypes = {
    auth: PropTypes.object
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { updateCourse })(EditCourseModal);
