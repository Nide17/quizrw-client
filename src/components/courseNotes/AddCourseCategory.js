import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import AddIcon from '../../images/plus.svg';

import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import Reports from '../webmaster/Reports'
import { connect } from 'react-redux';
import { createCourseCategory } from '../../redux/courseCategories/courseCategories.actions';

const AddCourseCategory = ({ auth, createCourseCategory }) => {

    const [cCatState, setCCatState] = useState({
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
        setCCatState({ ...cCatState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { title, description } = cCatState;

        // VALIDATE
        if (title.length < 4 || description.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (title.length > 70) {
            setErrorsState(['Title is too long!']);
            return
        }
        else if (description.length > 120) {
            setErrorsState(['Description is too long!']);
            return
        }

        // Create new course category object
        const newCcategory = {
            title,
            description,
            created_by: auth.isLoading === false ? auth.user._id : null
        };

        // Attempt to create
        createCourseCategory(newCcategory);

        // close the modal
        if (modal) {
            toggle();
        }
        // Reload the page after CC addition
        // window.location.reload();
    }

    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Admin' ?

                <Reports userId={auth.user._id} /> :

                <div>
                    <NavLink onClick={toggle} className="text-success p-0">
                        <img src={AddIcon} alt="" width="10" height="10" className="mb-1" />
                        &nbsp;Course Category
                    </NavLink>

                    <Modal
                        // Set it to the state of modal true or false
                        isOpen={modal}
                        toggle={toggle}
                    >

                        <ModalHeader toggle={toggle} className="bg-primary text-white">
                            Add New Course Category
                        </ModalHeader>

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

                                    <Input type="text" name="title" id="title" placeholder="Course category title ..." className="mb-3" onChange={onChangeHandler} />

                                    <Label for="description">
                                        <strong>Description</strong>
                                    </Label>

                                    <Input type="text" name="description" id="description" placeholder="Course category description ..." className="mb-3" onChange={onChangeHandler} />

                                    <Button color="success" style={{ marginTop: '2rem' }} block >Add</Button>

                                </FormGroup>

                            </Form>
                        </ModalBody>
                    </Modal>
                </div> :

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

export default connect(mapStateToProps, { createCourseCategory })(AddCourseCategory);