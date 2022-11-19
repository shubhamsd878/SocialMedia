// import { Container } from "react-bootstrap";
// import nav_logo from "./etrack_night2.png";
import { useState } from "react";
import {Link} from 'react-router-dom'
import nav_logo from "../Logo.png";
import './Navbar_Home_Page.css'
import Nav_search from "./Nav_search";
function Navbar_Home_Page(props) {

// ******************************* css for search ************************




// ***********************************************************************

// const [postForm, setPostForm] = useState({})
  const [file_post, setFile_post] = useState()

  const formData = new FormData();

  const handler_post = (e) => {
    // setPostForm({ ...postForm, [e.target.name]: e.target.file})
    setFile_post(e.target.files[0])
    // console.log('file: ', JSON.stringify(postForm))
    console.log('file: ', e.target.files[0])
  }

  const post = async (e) => {
    e.preventDefault()

    formData.append('file', file_post)
    console.log('formData: ' + JSON.stringify(formData))
    await fetch('http://localhost:3001/posts/add', {
      method: 'POST',
      headers: {
        'authtoken': localStorage.getItem('authtoken')
      },
      body: formData
    })
      .then((response) => { return response.json() })
      .then((response) => {
        console.log(response);
        if(response.message==false)
        {
          alert("Please select file to upload")
        }
        else{
          alert("Post successfully posted.")
        }

       })
  }
  return (
    // <Container>
    <div>

      <header>
      
        <div
          className="nav_home"
          
        >
          <Link
            to="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <img
              src={nav_logo}
              // width="20%"
              className='nav_logo'
            ></img>

          </Link>


          {/* ******************** search users *************************/}
          <Nav_search />


          {/* ******************************************************* */}
          <nav
            className="d-inline-flex "
            // style={{ marginTop: "2rem", marginRight:'4.2rem'}}
            // style={{ marginTop: "2rem", marginRight: '8.2rem' }}
          >
            <Link
              className="me-5 py-2 text-decoration-none top-nav-link"
              to="/"
              style={{ cursor: 'pointer' }}
            >
              <img className='nav_icon' src={require('../../Nav_icons/home.png')} />
            </Link>
            <a
              className="me-5 py-2 text-decoration-none top-nav-link"
              // to='/'
              onClick={ () =>alert('Sorry! still working on it.')}
              style={{cursor: 'pointer' }}
            >
              <img className='nav_icon' src={require('../../Nav_icons/chatting.png')} />
            </a>

            <a
              className="me-5 py-2 text-decoration-none top-nav-link"
              // to={props.link}
              style={{ cursor: 'pointer' }}
              // firing modal
              data-bs-toggle="modal" data-bs-target="#staticBackdrop"
            >
              <img className='nav_icon' src={require('../../Nav_icons/add_post.png')} />
            </a>

            <button onClick={() => {
              localStorage.removeItem('authtoken')
              window.location.reload()
            }}>Logout</button>

            <Link to={`/userProfile/${localStorage.getItem('uid')}`}> userProfile</Link>

          </nav>
        </div>
      </header>






      {/* ********** File upload modal ************* */}

      {/* Modal */}


      {/* Modal for file upload*/}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"

        // custom
        style={{ color: 'black' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Upload File
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            {/* Main of Modal */}
            <div className="modal-body">
              <input type='file' onChange={handler_post}></input>
            </div>


            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={post}>
                Upload File
              </button>
            </div>
          </div>
        </div>
      </div>



      {/* ************************************************** */}

    </div>

  );

}
export default Navbar_Home_Page;