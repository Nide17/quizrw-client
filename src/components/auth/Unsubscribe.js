import React, { useState } from 'react'
import { Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom'
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'

import { connect } from 'react-redux';
import { deleteSubscriber } from '../../redux/subscribers/subscribers.actions';

const Unsubscribe = ({ auth, deleteSubscriber }) => {

    const [unsubscribed, setUnsubscribed] = useState(false);

    const onUnsubscribe = e => {
        e.preventDefault();

        // Attempt unsubscribe
        deleteSubscriber(auth.user.email);
        setUnsubscribed(true)
    }

    return (

        auth.isAuthenticated ?

            <Container className="forgot-password mt-4">
                <Row className="mt-5 d-block text-center">

                    {unsubscribed ?
                        <h6 className="font-weight-bold my-5 py-5 text-success">
                            You have unsubscribed from Quiz Blog! you will no longer receive updates.
                        </h6> :

                        <h6 className="font-weight-bold my-5 py-5 text-dark">
                            Are sure, you want to unsubscribe? click here to &nbsp;
                            <Link to="#/" onClick={onUnsubscribe}>unsubscribe</Link>
                        </h6>
                    }

                </Row>
            </Container> :

            // If not authenticated
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

// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { deleteSubscriber })(Unsubscribe);