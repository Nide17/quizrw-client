import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import ReactLoading from "react-loading";
import { deleteCourse } from '../../redux/courses/courses.actions';
import LoginModal from '../auth/LoginModal'
import DeleteIcon from '../../images/remove.svg';
import AddChapter from './AddChapter'
import EditCourseModal from './EditCourseModal'

import { connect } from 'react-redux';

const CoursesHolder = ({ auth, courses, deleteCourse }) => {

    return (

        auth.isAuthenticated ?

                courses.isByCatLoading ?

                    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                        <ReactLoading type="spinningBubbles" color="#33FFFC" />
                    </div> :

                    courses && courses.coursesByCategory.map(course => (
                        <Card key={course._id} className="mb-3" body outline color="warning">
                            <CardTitle tag="h5">{course.title}</CardTitle>
                            <CardText>{course.description}</CardText>

                            <div className="d-flex justify-content-between">
                                <Button className="view-course">
                                    <a href={`/view-course/${course._id}`} className="text-white">View Notes</a>
                                </Button>

                                {auth.user.role !== 'Visitor' ?
                                    <span>
                                <Button outline color="warning">
                                    <strong><AddChapter course={course} /></strong>
                                </Button>

                                        <Button size="sm" color="link" className="mx-2">
                                            <EditCourseModal idToUpdate={course._id} editTitle={course.title} editDesc={course.description} />
                                        </Button>

                                        <Button size="sm" color="link" className="mr-2" onClick={() => deleteCourse(course._id)}>
                                            <img src={DeleteIcon} alt="" width="16" height="16" />
                                        </Button>
                                    </span>
                                    : null}
                            </div>
                            
                        </Card>)) :

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
};


// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { deleteCourse})(CoursesHolder);