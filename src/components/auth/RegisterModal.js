import React, { Component } from 'react';
import LoginModal from './LoginModal'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { register } from '../../redux/auth/auth.actions';
import { clearErrors } from '../../redux/error/error.actions'
class RegisterModal extends Component {

    //properties of the modal
    state = {
        // initialy doesn't show
        modalReg: false,
        name: '',
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {

            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If Authenticated, close modalReg
        if (this.state.modalReg) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    //showing and hiding modalReg
    toggle = () => {

        // Clear errors
        this.props.clearErrors();
        this.setState({
            modalReg: !this.state.modalReg
        });
    };

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmitHandler = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password
        };

        // Attempt to register
        this.props.register(newUser)
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} className="text-warning">Register</NavLink>

                <Modal
                    // Set it to the state of modalReg true or false
                    isOpen={this.state.modalReg}
                    toggle={this.toggle}>

                    <ModalHeader toggle={this.toggle} className="bg-primary text-white">Register</ModalHeader>
                    <ModalBody>

                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>) : null}

                        <Form onSubmit={this.onSubmitHandler}>

                            <FormGroup>

                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="Name ..." className="mb-3" onChange={this.onChangeHandler} />

                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email ..." className="mb-3" onChange={this.onChangeHandler} />

                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password ..." className="mb-3" onChange={this.onChangeHandler} />

                                <Button color="dark" style={{ marginTop: '2rem' }} block>Register</Button>

                            </FormGroup>

                        </Form>

                        <div className="d-flex">
                           <p className="p-2">Having account?</p><LoginModal />
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
}

// Map  state props
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.errorReducer
});

export default connect(
    mapStateToProps,
    { register, clearErrors })(RegisterModal);
