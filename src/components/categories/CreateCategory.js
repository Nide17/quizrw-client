import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import Reports from '../webmaster/Reports'

import { connect } from 'react-redux';
import { createCategory } from '../../redux/categories/categories.actions';

const CreateCategory = ({ auth, createCategory }) => {

    const [categoryState, setCategoryState] = useState({
        name: '',
        description: ''
    })

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    //properties of the modal
    const [modal, setModal] = useState(false)

    //showing and hiding modal
    const toggle = () => setModal(!modal);

    const onChangeHandler = e => {
        // Remove errors
        setErrorsState([]);

        // Add data
        setCategoryState({ ...categoryState, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();

        const { name, description } = categoryState;

        // VALIDATE
        if (name.length < 4 || description.length < 4) {
            setErrorsState(['Insufficient info!']);
            return
        }
        else if (name.length > 50) {
            setErrorsState(['Title is too long!']);
            return
        }
        else if (description.length > 100) {
            setErrorsState(['Description is too long!']);
            return
        }

        // Create new Category object
        const newCategory = {
            title: name,
            description,
            creation_date: Date.now,
            created_by: auth.isLoading === false ? auth.user._id : null
        };

        // Attempt to create
        createCategory(newCategory);

        // Reset the form
        setCategoryState({
            name: '',
            description: ''
        })

        // close the modal
        toggle();
    }

    return (
        auth.isAuthenticated ?

            auth.user.role !== 'Visitor' ?

                <div>
                    <NavLink onClick={toggle} className="text-success p-0"><b>+</b> Create Category</NavLink>

                    <Modal
                        // Set it to the state of modal true or false
                        isOpen={modal}
                        toggle={toggle}
                    >

                        <ModalHeader toggle={toggle} className="bg-primary text-white">
                            Create Category
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

                                    <Input type="text" name="name" id="name" placeholder="Category name ..." className="mb-3" onChange={onChangeHandler} />

                                    <Label for="description">
                                        <strong>Description</strong>
                                    </Label>

                                    <Input type="text" name="description" id="description" placeholder="Category description ..." className="mb-3" onChange={onChangeHandler} />

                                    <Button color="success" style={{ marginTop: '2rem' }} block >Create</Button>

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

CreateCategory.propTypes = {
    auth: PropTypes.object,
}

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(
    mapStateToProps,
    { createCategory })(CreateCategory);