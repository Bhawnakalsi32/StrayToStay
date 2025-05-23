import {Link} from "react-router-dom";
function Footer() {
    return (
        <>
        <div className="contact_anipat anipat_bg_1">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="contact_text text-center">
            <div className="section_title text-center">
              <h3>Why go with Stray To Stay?</h3>
              <p>
                Because we know that even the best technology is only as good as
                the people behind it. 24/7 tech support.
              </p>
            </div>
            <div className="contact_btn d-flex align-items-center justify-content-center">
              {/* <a href="contact.html" className="boxed-btn4"> */}
                <Link to={"/contact"}  className="boxed-btn4">Contact Us</Link>
              <p>
                Or <a href="#"> +91 7888884312</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

        <footer className="footer">
            <div className="footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-md-6 col-lg-3">
                            <div className="footer_widget">
                                <h3 className="footer_title">Contact Us</h3>
                                <ul className="address_line">
                                    <li>+91 9876543210</li>
                                    <li>
                                        <a href="#">bhawna123@gmail.Com</a>
                                    </li>
                                    <li>Jalandhar</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3  col-md-6 col-lg-3">
                            <div className="footer_widget">
                                <h3 className="footer_title">Our Servces</h3>
                                <ul className="links">
                                    <li>
                                        <a href="#">Pet Insurance</a>
                                    </li>
                                    <li>
                                        <a href="#">Pet surgeries </a>
                                    </li>
                                    <li>
                                        <a href="#">Pet Adoption</a>
                                    </li>
                                    <li>
                                        <a href="#">Dog Insurance</a>
                                    </li>
                                    <li>
                                        <a href="#">Dog Insurance</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3  col-md-6 col-lg-3">
                            <div className="footer_widget">
                                <h3 className="footer_title">Quick Link</h3>
                                <ul className="links">
                                    <li>
                                        <a href="#">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#">Terms of Service</a>
                                    </li>
                                    <li>
                                        <a href="#">Login info</a>
                                    </li>
                                    <li>
                                        <a href="#">Knowledge Base</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 col-lg-3 ">
                            <div className="footer_widget">
                                
                                <div className="footer_logo">
                                    <a href="#">
                                        <img 
                                        src="/assets/img/footer_logo.jpeg" 
                                        alt="Logo" 
                                        style={{ width: "80px", height: "auto" }} 
                                        />
                                        <h3 className="footer_title">Stray To Stay</h3>
                                    </a>
                                    
                                    </div>
                                <p className="address_text">
                                   jalandhar, India
                                </p>
                                <div className="socail_links">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="ti-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="ti-pinterest" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-google-plus" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-linkedin" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copy-right_text">
                <div className="container">
                    <div className="bordered_1px" />
                    <div className="row">
                        <div className="col-xl-12">
                            <p className="copy_right text-center"></p>
                            <p align="center">
                                Copyright © All rights reserved |
                            </p>
                            <p />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>

    )
}
export default Footer;
