import React, { useState, useEffect } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane, Button } from 'reactstrap';
import { connect } from 'react-redux'
import ReactLoading from "react-loading";
import EditUser from './EditUser';

import { getUsers, deleteUser } from '../../redux/auth/auth.actions'
import trash from '../../images/trash.svg';

const UsersTabPane = ({ users, getUsers, deleteUser }) => {

    const [pageNo, setPageNo] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    // Lifecycle methods
    useEffect(() => {
        getUsers(pageNo);
        setNumberOfPages(users.totalPages);
    }, [getUsers, pageNo, users.totalPages]);

    const previousPage = () => {
        setPageNo(Math.max(0, pageNo - 1));
    };

    const nextPage = () => {
        setPageNo(Math.min(numberOfPages - 1, pageNo + 1));
    };

    return (

        <TabPane tabId="4">
            {
                users.isLoading ?
                    <ReactLoading type="spinningBubbles" color="#33FFFC" /> :

                    <>
                        <p className="text-right my-2">
                            Page <strong>{pageNo}</strong> of <strong>{numberOfPages}</strong>
                        </p>
                        <Row>
                            {users && users.users.map(user => (
                                <Col sm="3" key={user._id} className="mt-3 users-toast">

                                    <Toast>
                                        <ToastHeader className="text-success overflow-auto">
                                            <strong>{user.email}</strong>
                                            <div className="actions text-secondary d-flex">
                                                <img src={trash} alt="" width="16" height="16" className="mx-4 mt-1" onClick={() => deleteUser(user._id)} />
                                                <EditUser uId={user._id} uName={user.name} uRole={user.role} uEmail={user.email} />
                                            </div>
                                        </ToastHeader>

                                        <ToastBody>
                                            <p className="font-weight-bold">{user.name}</p>
                                            <p>{user.role}</p>
                                            <small className="text-center text-info">
                                                <i>Registered on {user.register_date.split('T').slice(0, 2).join(' at ')}</i>
                                            </small>
                                        </ToastBody>
                                    </Toast>

                                </Col>
                            ))}

                            <div className="w-100 d-flex justify-content-around mx-auto mt-5 scores-pagination overflow-auto pb-2">
                                <Button color="info" onClick={previousPage} className={pageNo < 2 ? `invisible` : `visible`}>
                                    Previous
                                </Button>

                                {pages.map((pageIndex) => (
                                    <Button outline color="success" key={pageIndex + 1} onClick={() => setPageNo(pageIndex + 1)} style={pageNo === pageIndex + 1 ? { backgroundColor: "#0f0", color: "#fff" } : null}>
                                        {pageIndex + 1}
                                    </Button>
                                ))}

                                <Button color="info" onClick={nextPage} className={pageNo === numberOfPages ? `invisible` : `visible`}>
                                    Next
                                </Button>
                            </div>
                        </Row>
                    </>
            }

        </TabPane>
    )
}

const mapStateToProps = state => ({
    users: state.authReducer
})

export default connect(mapStateToProps, { getUsers, deleteUser })(UsersTabPane)