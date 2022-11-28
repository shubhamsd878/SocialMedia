// import { Container } from "react-bootstrap";
// import nav_logo from "./etrack_night2.png";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import nav_logo from "../Logo.png";
import './Navbar_Home_Page.scss'
import Nav_search from "./Nav_search";
import avatar from '../../assets/img_avatar.png'

function Navbar_Home_Page(props) {

  // ***********************************************************************

  const [file_post, setFile_post] = useState()

  const formData = new FormData();

  const handler_post = (e) => {
    setFile_post(e.target.files[0])
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
      .then((response) => { console.log(response) })
  }


  const signOut = (e) => {
    e.preventDefault()
    localStorage.removeItem('authtoken')
    localStorage.removeItem('uid')
    console.log('-=--=-=-=')
    window.location.assign('/')
  }


  // ---------------------  DOM function for clickable dropdown -----------------------
  const profileDropDown = () => {
    const d = document.getElementById('dropdown-content')
    d.classList.toggle('show')
  }


  // -----------------------Fetching profile Pic-----------------

  const [fetchProfileImg, setFetchProfileImg] = useState()

  useEffect(() => {
    async function fetc() {
      let response = await fetch('http://localhost:3001/userDetails/profilePic', {
        method: 'GET',
        headers: { uid: localStorage.getItem('uid') }
      })
      response = await response.json()

      setFetchProfileImg(response.response[0].profilePic)
    }

    fetc()
  }, [])


  // ===================================================
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
            style={{ alignItems: 'center' }}
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
              onClick={() => alert('Sorry! still working on it.')}
              style={{ cursor: 'pointer' }}
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



            {/* -------------- userProfile dropdown --------------*/}
            <div className="dropdown">
              {fetchProfileImg ?
                <img title='' className='default-user-imagee' onClick={profileDropDown} src={`data:image;base64,${fetchProfileImg}`} alt='' />
                :
                <img className="default-user-imagee" onClick={profileDropDown} src={avatar} alt='sss' />
              }
              {/* <button className="default-user-image" >HII</button> */}
              <div id='dropdown-content' className="dropdown-content">
                <Link to={`/userProfile/${localStorage.getItem('uid')}`}  style={{display:'flex', columnGap:'10px'}}>
                  <span class="material-symbols-outlined ">account_circle</span>Profile
                </Link>

                <a href="" onClick={signOut} style={{display:'flex', columnGap:'10px'}}>
                  <span class="material-symbols-outlined">
                    logout
                  </span>Sign Out
                </a>
              </div>
            </div>



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