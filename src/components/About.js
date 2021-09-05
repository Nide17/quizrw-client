import React from 'react'
import { Jumbotron, Col, Row, Card, CardTitle, CardText, CardImg, Button } from 'reactstrap';
import ResponsiveAd from './adsenses/ResponsiveAd';
import SquareAd from './adsenses/SquareAd';
import bruce from '../images/Bruceimg.png'
import parmenide from '../images/Parmenideimg.png'
import instagram from '../../src/images/instagram.svg';
import linkedin from '../../src/images/linkedin.svg';
import facebook from '../../src/images/facebook.svg';
import whatsapp from '../../src/images/whatsapp.svg';

const About = () => {
    return (
        <div>
            <Jumbotron className="m-md-5 py-0 text-center">
                <h1 className="display-3 font-weight-bold">Quiz-Blog</h1>
                <p className="lead">
                    Quiz Blog is a web application that provides a multi-category space for people to quiz from. It gives people good time to fix what they studied and even prepare for exams.
                </p>

                <hr className="my-2" />
                <p>Reach us on <strong>
                <a href="mailto:quizblog.rw@gmail.com?subject=Contact%20Quiz%20Blog">quizblog.rw@gmail.com</a>
                 </strong> for further details.</p>
            </Jumbotron>

            <Row className="about mx-md-5 my-md-5">
                <Col sm="12">
                    <h5 className="text-center mb-md-5 mt-0 pt-0 font-weight-bolder">About the authors</h5>
                </Col>
                <Col sm="6">
                    <CardImg top width="90%" src={bruce} alt="Card image" />
                    <Card body>
                        <CardTitle tag="h5">Ndatimana Patrice Bruce</CardTitle>
                        <CardText><strong>Owner and Idea Innovator</strong></CardText>
                        <p>
                            <strong>
                                <img src={whatsapp} alt="0780579067" width="20" height="20" />&nbsp;&nbsp;0780579067
                        </strong>
                        </p>

                        <div className="d-flex">
                            <Button size="sm" color="link" className="ml-0 pl-0 mr-2">
                                <a href="https://www.linkedin.com/in/ndatimana-patrice-bruce-20b363195">
                                    <img src={linkedin} alt="ndatimana-patrice-bruce" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.instagram.com/dr.active4">
                                    <img src={instagram} alt="dr.active4" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.facebook.com/ndatimana.bruce">
                                    <img src={facebook} alt="ndatimana.bruce" width="20" height="20" />
                                </a>
                            </Button>
                        </div>

                    </Card>
                    {/* Google responsive 1 ad */}
                    <ResponsiveAd />
                </Col>

                <Col sm="6">
                    <CardImg top width="90%" src={parmenide} alt="Card image" />
                    <Card body>
                        <CardTitle tag="h4">Niyomwungeri Parmenide Ishimwe</CardTitle>
                        <CardText><strong>Application Developer</strong></CardText>

                        <p>
                            <strong>
                                <img src={whatsapp} alt="0788551997" width="20" height="20" />&nbsp;&nbsp;0788551997
                        </strong>
                        </p>

                        <div className="d-flex">
                            <Button size="sm" color="link" className="ml-0 pl-0 mr-2">
                                <a href="https://www.linkedin.com/in/niyomwungeri-parmenide-ishimwe-1a5394123/">
                                    <img src={linkedin} alt="niyomwungeri-parmenide-ishimwe-1a5394123" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.instagram.com/ishimwe_parmenide/">
                                    <img src={instagram} alt="ishimwe_parmenide" width="20" height="20" />
                                </a>
                            </Button>

                            <Button size="sm" color="link" className="mx-2">
                                <a href="https://www.facebook.com/nide.drogba.7/">
                                    <img src={facebook} alt="nide.drogba.7" width="20" height="20" />
                                </a>
                            </Button>
                        </div>
                        
                    </Card>
                    {/* Google square ad */}
                    <SquareAd />
                </Col>
            </Row>
        </div>
    )
}

export default About
