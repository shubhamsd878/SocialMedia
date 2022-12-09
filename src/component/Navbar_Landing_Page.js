// import { Container } from "react-bootstrap";
// import etrack from "./etrack_night2.png";
import etrack from "./Logo.png";
function Navbar_Landing_Page(props) {
  return (
    // <Container>
    <header>
      {/* <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom"> */}
      <div
        className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 "
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0, 0.1) )",
        }}
      >
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <img
            src={etrack}
            width="20%"
            style={{
              paddingLeft: "3rem",
              marginTop: "1%",
              width: "24%",
              marginLeft:'4.3rem',
              marginBottom: "-2.5%",
            }}
          ></img>
          {/* <span className="fs-4">eTRACK {props.name}</span> */}
        </a>
        <nav
          className="d-inline-flex mt-4 mt-md-0 ms-md-auto"
          style={{ marginTop: "2rem", marginRight:'4.2rem'}}
        >
          <a
            className="me-5 py-2 text-decoration-none top-nav-link"
            href="#"
            style={{ marginTop: "1rem" }}
          >
            About SwagZinn
          </a>
          <a
            className="me-5 py-2 text-decoration-none top-nav-link"
            href={props.link}
            style={{ marginTop: "1rem"}}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>

    // </Container>
  );
}
export default Navbar_Landing_Page;