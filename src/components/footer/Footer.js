import React from 'react'
import { useLocation } from "react-router-dom";
import './footer.css'
import logo from '../../images/quizLogo.svg'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'

const Footer = () => {
    let location = useLocation();

    if (!(location.pathname === '/questions')) {

        return (
            <footer className="mainfooter" role="contentinfo">
                <div className="footer-middle">
                    <div className="container">

                        <div className="row">

                            <div className="col-md-3 mb-2">
                                <h4 className="mb-3 mb-md-2">Contact</h4>
                                <div className="logo mb-3 mb-md-3">
                                    <a href="/"><img src={logo} alt="logo" /></a>
                                </div>

                                <ul className="social-network social-circle">
                                    <li><a href="https://www.facebook.com/ndatimana.bruce" className="icoFacebook" title="Facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a></li>
                                    <li><a href="https://www.linkedin.com/in/ndatimana-patrice-bruce-20b363195/" className="icoLinkedin" title="Linkedin">
                                        <i className="fa fa-linkedin"></i>
                                    </a></li>
                                    <li><a href="https://www.instagram.com/dr.active4/" className="icoInstagram" title="Instagram">
                                        <i className="fa fa-instagram"></i>
                                    </a></li>
                                </ul>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-pad">
                                    <h4>About</h4>
                                    <ul className="list-unstyled ml-2">
                                        <li><a href="/about">Ourselves</a></li>
                                        <li><a href="/contact">Reach us</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-pad">
                                    <h4>Terms of use</h4>
                                    <ul className="list-unstyled ml-2">
                                        <li><a href="/disclaimer">Disclaimer</a></li>
                                        <li><a href="/privacy">Privacy policy</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-pad">
                                    <h4>Services</h4>
                                    <ul className="list-unstyled ml-2">
                                        <li><a href="/allposts">All quizzes</a></li>
                                        <li><a href="/course-notes">Notes</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-12 copy">
                                <p className="text-center">&copy; Copyright 2021 - Quiz Blog.  All rights reserved.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        )
    }
    else return null;
}

export default Footer