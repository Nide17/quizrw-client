import React from 'react'
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

const PostItem = ({ quiz }) => {

    const { _id, title, description, creation_date, category, created_by, questions } = quiz

    let date = new Date(creation_date);

    return (
        <Card body className="bg-secondary py-3 px-0">

            <CardTitle tag="h4" className="mb-0 text-primary text-capitalize">
                <Link to={`/view-quiz/${_id}`}>{title && title}
                    &nbsp;<span className="text-danger">({questions && questions.length})</span>
                </Link>
            </CardTitle>

            <div className="small-text d-flex justify">
                <p className="mr-2 mr-md-5 my-1 text-dark">{date.toDateString()}</p>
                <p className="mr-2 mr-md-5 my-1 text-dark">-{category && category.title}
                    <small>&nbsp;({created_by && created_by.name})</small>
                </p>
            </div>

            <CardText className="mt-1 details text-secondary text-capitalize">{description && description}</CardText>
        </Card>
    )
}
const mapStateToProps = state => ({
    users: state.authReducer.users
})

export default connect(mapStateToProps, { })(PostItem)