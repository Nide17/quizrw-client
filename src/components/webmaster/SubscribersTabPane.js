import React, { useEffect } from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { setSubscribers, deleteSubscriber } from '../../redux/subscribers/subscribers.actions'
import ReactLoading from "react-loading";

import trash from '../../images/trash.svg';

const SubscribersTabPane = ({ subscribedUsers, setSubscribers, deleteSubscriber }) => {

    // Lifecycle methods
    useEffect(() => {
        setSubscribers();
    }, [setSubscribers]);

    return (

        <TabPane tabId="3">
            {
                subscribedUsers.isLoading ?
                    <ReactLoading type="spinningBubbles" color="#33FFFC" /> :
                    <Row>
                        {subscribedUsers && subscribedUsers.subscribedUsers.map(subscribedUser => (
                            <Col sm="3" key={subscribedUser.email} className="mt-3">

                                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>

                                    <CardTitle tag="div" className="d-flex justify-content-between">
                                        <p className="mb-0">{subscribedUser.name.split(' ').slice(0, 2).join(' ')}</p>
                                        <Button size="sm" color="link" className="mt-0 p-0 d-none" onClick={() => deleteSubscriber(subscribedUser._id)}>
                                            <img src={trash} alt="" width="16" height="16" />
                                        </Button>
                                    </CardTitle>

                                    <CardText>
                                        <small>Email: {subscribedUser.email}</small>
                                    </CardText>
                                    <Button>
                                        <small><i>On {subscribedUser.subscription_date.split('T').slice(0, 2).join(' at ')}</i></small>
                                    </Button>
                                </Card>

                            </Col>
                        ))}
                    </Row>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    subscribedUsers: state.subscribersReducer
})

export default connect(mapStateToProps, { setSubscribers, deleteSubscriber })(SubscribersTabPane)