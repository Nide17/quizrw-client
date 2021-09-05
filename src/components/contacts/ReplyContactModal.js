import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'

import { connect } from 'react-redux';
import { replyContact } from '../../redux/contacts/contacts.actions';
import { clearErrors } from '../../redux/error/error.actions'

class ReplyContactModal extends Component {

    //properties of the modal
    state = {
        // initialy doesn't show
        modalReply: false,
        email: 'quizblog.rw@gmail.com',
        message: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        if (this.props.error !== prevProps.error) {

            // Check for register error
            if (this.props.error.id === 'REPLY_CONTACT_FAIL') {
                this.setState({ msg: this.props.error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    //showing and hiding modalReply
    toggle = () => {

        // Clear errors
        this.props.clearErrors();
        this.setState({
            modalReply: !this.state.modalReply
        });
    };

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmitHandler = e => {
        e.preventDefault();

        const { email, message } = this.state;

        // Create reply object
        const reply = {
            reply_name: this.props.auth.user.name,
            email,
            to_contact: this.props.to,
            to_contact_name: this.props.to_name,
            contact_question: this.props.contact_question,
            message
        };

        // Attempt to reply
        this.props.replyContact(this.props.contactID, reply);
        // close the modal
        this.toggle();
    }

    render() {
        return (

            this.props.auth.isAuthenticated ?

                <div>
                    <span onClick={this.toggle}>Reply</span>
                    <Modal
                        // Set it to the state of modal true or false
                        isOpen={this.state.modalReply}
                        toggle={this.toggle}>

                        <ModalHeader toggle={this.toggle} className="bg-primary text-white">Reply</ModalHeader>
                        <ModalBody>

                            {this.state.msg ? (
                                <Alert color='danger'>{this.state.msg}</Alert>) : null}
                            <Form onSubmit={this.onSubmitHandler}>

                                <FormGroup>

                                    <Label for="email">To</Label>
                                    <Input type="email" name="email" placeholder="To ..." className="mb-3" onChange={this.onChangeHandler} value={this.props.to} />

                                    <Label for="email">From</Label>
                                    <Input type="email" name="email" placeholder="From ..." className="mb-3" onChange={this.onChangeHandler} value={this.state.email} />

                                    <FormGroup row>
                                        <Col>
                                            <Input type="textarea" name="message" placeholder="Message" minLength="10" maxLength="1000" onChange={this.onChangeHandler} value={this.state.message} required />
                                        </Col>
                                    </FormGroup>

                                    <Button color="warning" style={{ marginTop: '2rem' }} block>Reply</Button>

                                </FormGroup>

                            </Form>

                        </ModalBody>
                    </Modal>
                </div> :

                // If not authenticated or loading
                <div className="vh-100 d-flex justify-content-center align-items-center text-danger">
                    {
                        this.props.auth.isLoading ?
                            <>
                                <ReactLoading type="spinningBubbles" color="#33FFFC" />&nbsp;&nbsp;&nbsp;&nbsp; <br />
                                <p className="d-block">Loading user ...</p>
                            </> :
                            <LoginModal />
                    }
                </div>
        );
    }
}

ReplyContactModal.propTypes = {
    error: PropTypes.object,
    replyContact: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
}

// Map  state props
const mapStateToProps = state => ({
    error: state.errorReducer,
    auth: state.authReducer,
});

export default connect(
    mapStateToProps,
    { replyContact, clearErrors })(ReplyContactModal);
