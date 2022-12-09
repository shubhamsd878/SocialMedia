// import { Container } from "react-bootstrap";
// import logo from "./logo_night2.png";
import logo from "./Logo.png";
import './Navbar_Landing_Page.css'
function Navbar_Landing_Page(props) {
  const About = () => {
    alert("SwagZinn website is a fully-flashed application. It is a way to interact with family and friends. It provides the power to connect & share information to everyone on the earth, or with a large group of people/community" + 
    "simultaneously. It also enables users to send messages to their friends over" + 
    "the internet.")
  }
  const contactUs = () => {
    alert('SwagZinn is a Social Media clone which was created for Semester Project by students of DCRUST using MERN Stack \n \n Thanks to: \n Vipul        - 20012041048   (2020-23) \n Shubham - 20014041042   (2020-23)')
  }

  return (

    <header>
      <div className='landing_nav pb-3 mb-4'>
        <img
          src={logo}
          width="20%"
          className="logo"
        ></img>

        <br></br>
        <div className='' style={{ marginTop: "1rem", marginRight: '5vw' }}>

          <a
            className="right_nav_link text-decoration-none top-nav-link"
            href="#"
            onClick={About}
            style={{ marginTop: "1rem" }}
          >
            About SwagZinn
          </a>
          <a
            className="right_nav_link text-decoration-none top-nav-link"
            href='#'
            onClick={contactUs}
            style={{ marginTop: "1rem", cursor: 'pointer' }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>

  );
}
export default Navbar_Landing_Page;