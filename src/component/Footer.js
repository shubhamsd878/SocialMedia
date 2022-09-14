function Footer() {
  return (
    <>
      <div className="footer">
        <footer
          // className="  d-flex flex-wrap justify-content-between align-items-center py-0 my-2 border-top footer"
          className=" "
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "fixed",
            bottom: "0px",
            width: "100%",
          }}
        >
          <p
            className="col-md-4 mb-0 footer-text-muted"
            style={{ color: "#e1e1e1", marginLeft:'4.2rem' }}
          >
            © 2021 eTRACK DOCUMENT, Inc
          </p>
          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          >
            <svg className="bi me-2" width={40} height={32}>
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <ul className="nav col-md-4 justify-content-end" style={{flexWrap:'nowrap '}}>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link px-2 footer-text-muted top-nav-link"
                style={{ color: "#e1e1e1" }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link px-2 footer-text-muted top-nav-link"
                style={{ color: "#e1e1e1" }}
              >
                modisarkar.com
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link px-2 footer-text-muted top-nav-link"
                style={{ color: "#e1e1e1" }}
              >
                aadharcard.com
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link px-2 footer-text-muted top-nav-link"
                style={{ color: "#e1e1e1" }}
              >
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link px-2 footer-text-muted top-nav-link"
                style={{ color: "#e1e1e1",  marginRight:'8rem' }}
                
              >
                About
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
export default Footer;
