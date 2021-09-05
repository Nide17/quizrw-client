import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getCourseCategories } from '../../redux/courseCategories/courseCategories.actions';
import { getCoursesByCategory } from '../../redux/courses/courses.actions';
import ReactLoading from "react-loading";
import LoginModal from '../auth/LoginModal'
import AddCourseCategory from './AddCourseCategory'
import AddCourse from './AddCourse'
import CoursesHolder from './CoursesHolder'
import CategoriesHome from './CategoriesHome'
import { Row, Col, Breadcrumb, BreadcrumbItem, Button, Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap';

const Index = ({ auth, getCourseCategories, courseCategories, courses, getCoursesByCategory }) => {

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const [activeTab, setActiveTab] = useState('');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    // Lifecycle methods
    useEffect(() => {
        getCourseCategories();
    }, [getCourseCategories]);


    return (

        !auth.isAuthenticated ?

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
            </div> :

            <div className="course-notes">

                <Row className="mt-lg-5">
                    <Col>
                        <Breadcrumb tag="nav" listTag="div">
                            <BreadcrumbItem tag="h5" className="text-success font-weight-bold" style={{ textShadow: "1px 1px .8px #a57d04" }}>
                                Welcome to Quiz Blog Course Resources Portal
                            </BreadcrumbItem>

                            {auth.user.role === 'Admin' ?
                                <Button size="sm" outline color="info" className="ml-auto">
                                    <strong><AddCourseCategory /></strong>
                                </Button> : null}
                        </Breadcrumb>
                    </Col>
                </Row>

                {courseCategories.isLoading ?

                    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                        <ReactLoading type="spinningBubbles" color="#33FFFC" />
                    </div> :

                    <Row className="pt-lg-5 courses-content">


                        {/* NAVBAR FOR MOBILE */}
                        <Navbar color="faded" light className="d-sm-none w-100 py-0">

                            <NavbarBrand className={`mr-auto nav-link header py-lg-2 px-0 ${activeTab === 'header' ? 'active' : ''}`} id={`v-pills-header-tab`} data-toggle="pill" href={`#v-pills-header`} role="tab" aria-controls={`v-pills-header`} aria-selected="true" onClick={() => {
                                toggle('header')
                            }}>
                                <i className="fa fa-home" aria-hidden="true"> </i>&nbsp;&nbsp;Categories
                            </NavbarBrand>

                            <button aria-label="Toggle navigation" type="button" className="mr-2 navbar-toggler" onClick={toggleNavbar} >
                                <span>
                                    <i className="fa fa-bars"></i>
                                </span>
                            </button>

                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar>

                                    {
                                        courseCategories && courseCategories.allCourseCategories.length < 1 ?

                                            <>
                                                {/* When no categories reload */}
                                                {window.location.reload()}
                                            </> :
                                            courseCategories && courseCategories.allCourseCategories.map(cCategory => (

                                                <NavItem key={cCategory._id}>
                                                    <NavLink className={`nav-link item ${activeTab === cCategory.title ? 'active' : ''}`} id={`v-pills-${cCategory.title}-tab`} data-toggle="pill" href={`#v-pills-${cCategory.title}`} role="tab" aria-controls={`v-pills-${cCategory.title}`} aria-selected="true" onClick={() => {
                                                        toggle(cCategory.title)
                                                        // request for courses in this category
                                                        getCoursesByCategory(cCategory._id)
                                                    }}>
                                                        {cCategory.title}
                                                    </NavLink>
                                                </NavItem>

                                            ))}
                                </Nav>
                            </Collapse>
                        </Navbar>


                        {/* NAVBAR FOR BIG DEVICES */}
                        <div className="col-12 col-sm-4 courses-categories px-1 d-none d-sm-block">
                            <div className="nav flex-sm-column justify-content-around nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                                <a className={`nav-link header py-lg-3 ${activeTab === 'header' ? 'active' : ''}`} id={`v-pills-header-tab`} data-toggle="pill" href={`#v-pills-header`} role="tab" aria-controls={`v-pills-header`} aria-selected="true" onClick={() => {
                                    toggle('header')
                                }}>
                                    <i className="fa fa-home" aria-hidden="true"> </i>&nbsp;&nbsp;Categories
                                </a>

                                {courseCategories && courseCategories.allCourseCategories.map(cCategory => (

                                    <a key={cCategory._id} className={`nav-link item ${activeTab === cCategory.title ? 'active' : ''}`} id={`v-pills-${cCategory.title}-tab`} data-toggle="pill" href={`#v-pills-${cCategory.title}`} role="tab" aria-controls={`v-pills-${cCategory.title}`} aria-selected="true" onClick={() => {
                                        toggle(cCategory.title)
                                        // request for courses in this category
                                        getCoursesByCategory(cCategory._id)
                                    }}>
                                        {cCategory.title}
                                    </a>

                                ))}
                            </div>
                        </div>


                        {/* COURSES OF SELECTED CATEGORY */}
                        <div className="col-12 col-sm-8 px-1 mb-3 selected-category">

                            <div className="tab-content" id="v-pills-tabContent">


                                {/* WHEN NOTHING SELECTED OR CATEGORIES TITLE SELECTED*/}
                                {!activeTab || activeTab === 'header' ?

                                    <div className={`tab-pane fade show active`} id={`v-pills-header`} role="tabpanel" aria-labelledby={`v-pills-header-tab`}>
                                        <CategoriesHome auth={auth} />


                                        {/* DUPLICATED CATEGORIES NAVBAR FOR MOBILE USERS */}
                                        <div className="d-block d-sm-none">
                                            {courseCategories && courseCategories.allCourseCategories.map(cCategory => (

                                                <ListGroup key={cCategory._id} className="mb-1">
                                                    <ListGroupItem className="justify-content-between">
                                                        <NavLink className={`nav-link item ${activeTab === cCategory.title ? 'active' : ''}`} id={`v-pills-${cCategory.title}-tab`} data-toggle="pill" href={`#v-pills-${cCategory.title}`} role="tab" aria-controls={`v-pills-${cCategory.title}`} aria-selected="true" onClick={() => {
                                                            toggle(cCategory.title)
                                                            // request for courses in this category
                                                            getCoursesByCategory(cCategory._id)
                                                        }}>
                                                            {cCategory.title}
                                                        </NavLink>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            ))}
                                        </div>
                                    </div> :

                                    <>
                                        {/* WHEN CATEGORY SELECTED*/}
                                        <Row className="text-center d-block py-lg-3">
                                            <h4 className="d-block font-weight-bold" style={{ color: "#157A6E " }}>
                                                Available Courses
                                            </h4>
                                        </Row>

                                        {courseCategories && courseCategories.allCourseCategories.map(cCategory => (
                                            <div key={cCategory._id} className={`tab-pane fade ${activeTab === cCategory.title ? 'show active' : ''}`} id={`v-pills-${cCategory.title}`} role="tabpanel" aria-labelledby={`v-pills-${cCategory.title}-tab`}>

                                                {auth.user.role !== 'Visitor' ?
                                                    <Button size="sm" outline color="info" className="d-block ml-auto mr-lg-3 my-2">
                                                        <strong><AddCourse categoryId={cCategory._id} /></strong>
                                                    </Button> : null}

                                                <CoursesHolder courses={courses} />

                                                {cCategory._id === '60f2b2f7bdbf4c47f0fd9430' ?
                                                    <div className="d-flex" id="video-professsor-messer">
                                                        <iframe className="mx-auto" width="414" height="240" src="https://www.youtube-nocookie.com/embed/videoseries?list=PL_YW0h4ytNBtBBaPFgMzCNmnzlFalu-SA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                    </div> : null}
                                            </div>
                                        ))}
                                    </>}

                            </div>
                        </div>

                    </Row>}

            </div>
    )
}
// Map  state props
const mapStateToProps = state => ({
    auth: state.authReducer,
    courseCategories: state.courseCategoriesReducer,
    courses: state.coursesReducer
});

export default connect(mapStateToProps, { getCourseCategories, getCoursesByCategory })(Index);