import React, { useEffect } from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import ReactLoading from "react-loading";
import { getOneCategory } from '../../redux/categories/categories.actions'

const SimilarQuizes = ({ catg, categoryId, getOneCategory }) => {

    useEffect(() => {
        getOneCategory(categoryId);
    }, [getOneCategory, categoryId]);

    if (!catg.isLoading) {

        return (

            catg.oneCategory && catg.oneCategory.quizes.length > 0 ?
                <>
                    {
                        <Row className="similar-quizes mx-3">
                            <h4 className="text-center col-12 mb-4 font-weight-bolder">
                                Similar quizes you may also like to take</h4>

                            {
                                catg.oneCategory && catg.oneCategory.quizes.sort(() => 0.5 - Math.random()).map(quiz => (

                                    <Col sm="4" key={quiz._id} className="mt-2">
                                        <Card body>
                                            <CardTitle tag="h5">{quiz.title} ({quiz.questions.length})</CardTitle>
                                            <CardText>{quiz.description}</CardText>
                                            <Button color="info">
                                                <Link to={`/view-quiz/${quiz._id}`} className="text-white">
                                                    Attempt
                                                </Link>
                                            </Button>
                                        </Card>
                                    </Col>

                                )).slice(0, 3)}

                        </Row>
                    }
                </> : null
        )

    }
    else {
        return (<><ReactLoading type="bubbles" color="#33FFFC" className="mx-auto" /> :</>)
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    catg: state.categoriesReducer
});

export default connect(mapStateToProps, { getOneCategory })(SimilarQuizes)