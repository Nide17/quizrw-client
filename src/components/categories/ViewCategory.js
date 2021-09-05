import React from 'react';
import { Link } from "react-router-dom";
import { UncontrolledCollapse, Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';

const ViewCategory = ({ categories }) => {

    return (
        categories && categories.allcategories.slice(0, 10).map(category =>

            category.quizes.length > 1 ?

                <React.Fragment key={category._id}>
                    <Button outline id={category.title.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-')} block className="px-1 mt-2 text-capitalize mob-cat-btn d-flex align-items-center">
                        {category.title}
                        <i className={`fa fa-angle-down ml-auto`}></i>
                    </Button>

                    <UncontrolledCollapse toggler={`#${category.title.split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-')}`} className="w-100">
                        <ListGroup>
                            {category.quizes.map(quiz =>
                                <ListGroupItem key={quiz._id} className="d-flex justify-content-between px-1">
                                    <Link to={`/view-quiz/${quiz._id}`} className="m-0 text-capitalize mob-quiz">
                                        {quiz.title}
                                    </Link>
                                    <Badge color="info" className="ml-lg-2">{quiz.questions.length > 30 ? '30' : quiz.questions.length}</Badge>
                                </ListGroupItem>
                            )}

                        </ListGroup>
                    </UncontrolledCollapse>
                </React.Fragment> : null
        )
    );
}

export default ViewCategory;