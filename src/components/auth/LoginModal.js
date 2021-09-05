import React, { Component } from 'react';
import RegisterModal from './RegisterModal'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { login } from '../../redux/auth/auth.actions';
import { clearErrors } from '../../redux/error/error.actions'

class LoginModal extends Component {

    //properties of the modal
    state = {
        // initialy doesn't show
        modalLogin: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {

            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If Authenticated, Close modalLogin
        if (this.state.modalLogin) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    //showing and hiding modalLogin
    toggle = () => {

        // Clear errors
        this.props.clearErrors();
        this.setState({
            modalLogin: !this.state.modalLogin
        });
    };

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmitHandler = e => {
        e.preventDefault();

        const { email, password } = this.state;

        // Create user object
        const user = {
            email,
            password
        };

        // Attempt to login
        this.props.login(user);
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} className={this.props.textColor || 'text-warning'}>
                    {this.props.review || 'Login'}
                    </NavLink>

                <Modal
                    // Set it to the state of modal true or false
                    isOpen={this.state.modalLogin}
                    toggle={this.toggle}>

                    <ModalHeader toggle={this.toggle} className="bg-primary text-white">Login</ModalHeader>
                    <ModalBody>

                        {this.state.msg ? (
                            <Alert color='danger'>{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmitHandler}>

                            <FormGroup>

                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email ..." className="mb-3" onChange={this.onChangeHandler} />

                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password ..." className="mb-3" onChange={this.onChangeHandler} />

                                <Button color="warning" style={{ marginTop: '2rem' }} block >Login</Button>

                            </FormGroup>

                        </Form>

                        <a href="forgot-password">
                        <p className="p-2">Forgot password?</p>
                        </a>
                        <div className="d-flex">
                           <p className="p-2">No account yet?</p><RegisterModal />
                        </div>

                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
}

// Map  state props
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    error: state.errorReducer
});

export default connect(
    mapStateToProps,
    { login, clearErrors })(LoginModal);
