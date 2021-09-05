import React, { useEffect } from 'react'
import { Row, Col, Card, Button, CardTitle, CardText, TabPane } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { getContacts, deleteContact } from '../../redux/contacts/contacts.actions'
import ReactLoading from "react-loading";
import DeleteIcon from '../../images/remove.svg';
import ReplyContactModal from './ReplyContactModal'

const ContactsTabPane = ({ currentUser, contacts, getContacts, deleteContact }) => {

    // Lifecycle methods
    useEffect(() => {
        getContacts();
    }, [getContacts]);

    return (
        <TabPane tabId="5">

            {contacts.isLoading ?
                <ReactLoading type="spinningBubbles" color="#33FFFC" /> :

                <Row>
                    {contacts && contacts.contacts.map(contact => (

                        <Col sm="6" className="mt-2 contact-card" key={contact._id}>

                            <Card body>

                                <CardTitle className="d-flex justify-content-between">
                                    <Link to='#' className="text-success">
                                        {contact.contact_name}
                                        &nbsp;<small>({contact.email})</small> said:
                                    </Link>
                                    {
                                        currentUser.role === 'Admin' ?

                                            <div className="action-btns">
                                                <Button color="success" size="sm" className="mr-1 mr-md-1">
                                                    <ReplyContactModal to={contact.email} to_name={contact.contact_name} contact_question={contact.message} contactID={contact._id} />
                                                </Button>
                                                <Button size="sm" color="link" className="mr-2" onClick={() => deleteContact(contact._id)}>
                                                    <img src={DeleteIcon} alt="" width="16" height="16" />
                                                </Button>
                                            </div>
                                            : null
                                    }
                                </CardTitle>

                                <CardText>{contact.message}</CardText>
                                <small className="text-info">
                                    <i>Sent on {contact.contact_date.split('T').slice(0, 2).join(' at ')}</i>
                                </small>
                                <br />
                                {contact.replies && contact.replies.length > 0 ? <p className="font-weight-bold">Replies ({contact.replies.length})</p> : null}

                                {contact && contact.replies.map((reply) =>
                                    <ul key={reply._id} className="pl-1">

                                        <li style={{ listStyle: "none" }} className="text-info">
                                            <strong>{reply.reply_name}</strong>&nbsp;
                                            <small>({reply.email})</small> said:

                                            <br />
                                            <div className="text-dark">
                                            <i className="d-block">
                                                {reply.message}
                                            </i>
                                            <small>{reply.reply_date.split('T').slice(0, 2).join(' at ')}</small>
                                            </div>
                                        </li>
                                    </ul>
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    contacts: state.contactsReducer
})

export default connect(mapStateToProps, { getContacts, deleteContact })(ContactsTabPane)