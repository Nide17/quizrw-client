import React, { useEffect, useState } from 'react'
import { Row, Col, Toast, ToastBody, ToastHeader, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import SearchInput from '../SearchInput'
import { connect } from 'react-redux'
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { setQuizes } from '../../redux/quizes/quizes.actions'

const AllCategories = ({ categories, quizes, setQuizes }) => {

    const [searchKeyC, setSearchKeyC] = useState('')
    const [searchKeyQ, setSearchKeyQ] = useState('')

    // Lifecycle methods
    useEffect(() => {
        setQuizes();
    }, [setQuizes]);

    return (
        <TabPane tabId="100">
            {categories.isLoading ?

                <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <ReactLoading type="spinningBubbles" color="#33FFFC" />
                </div> :

                <>
                    <Row className="mt-3">
                        {!quizes.isLoading ?
                            <Col sm="6">
                                <SearchInput setSearchKey={setSearchKeyQ} placeholder=" Search quizes here ...  " />
                            </Col> : null}

                        <Col sm="6">
                            <SearchInput setSearchKey={setSearchKeyC} placeholder=" Search categories here ...  " />
                        </Col>
                    </Row>

                    {/* Search quizes */}
                    <Row>
                        <ListGroup>
                            {quizes && quizes.allQuizes
                                .filter(quiz => {

                                    if (searchKeyQ === "") {
                                        return null
                                    } else if (quiz.title.toLowerCase().includes(searchKeyQ.toLowerCase())) {
                                        return quiz
                                    }
                                    return null
                                })
                                .map(quiz => (
                                    <ListGroupItem key={quiz._id} tag="a" href={`/view-quiz/${quiz._id}`}>
                                        {quiz.title}
                                    </ListGroupItem>
                                ))}
                        </ListGroup>
                    </Row>

                    {/* Search categories*/}
                    <Row className="px-lg-5 pb-lg-5">

                        {categories && categories.allcategories.filter(quiz => {

                            if (searchKeyC === "") {
                                return quiz
                            } else if (quiz.title.toLowerCase().includes(searchKeyC.toLowerCase())) {
                                return quiz
                            }
                            return null
                        }).map(category => (
                            <Col sm="6" key={category._id} className="mt-3 categories-toast" id={category.title.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-') + category._id}>

                                <Toast>
                                    <ToastHeader className="text-success overflow-auto">
                                        <strong>
                                            <a href={`/all-categories/#${category.title.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-') + category._id}`} className="text-success">
                                                {category.title}
                                            </a>
                                        </strong>
                                    </ToastHeader>

                                    <ToastBody>
                                        <p className="font-weight-bold mb-0">
                                            This category contains <span className="text-danger">{category.quizes.length}</span> quizzes</p>
                                        <small className="text-center text-info">
                                            <i>{category.description}</i>
                                        </small>

                                        <br />
                                        <br />
                                        {category.quizes && category.quizes.length > 0 ? <p className="font-weight-bold">Quizzes ({category.quizes.length})</p> : null}

                                        {category && category.quizes.map((quiz, index) =>
                                            <ul key={quiz._id} className="pl-1">
                                                <li style={{ listStyle: "none" }}>
                                                    {index + 1}.&nbsp;

                                                    <Link to={`/view-quiz/${quiz._id}`}>
                                                        {quiz.title}
                                                    </Link>
                                                    <strong className="text-danger">&nbsp;
                                                        ({quiz.questions.length} questions)</strong>
                                                </li>
                                            </ul>
                                        )}
                                    </ToastBody>
                                </Toast>

                            </Col>
                        ))}
                    </Row></>}
        </TabPane>
    )
}

const mapStateToProps = state => ({
    quizes: state.quizesReducer,
})

export default connect(mapStateToProps, { setQuizes })(AllCategories)