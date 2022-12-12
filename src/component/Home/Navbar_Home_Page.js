// import { Container } from "react-bootstrap";
// import nav_logo from "./etrack_night2.png";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import nav_logo from "../Logo.png";
import './Navbar_Home_Page.scss'
import Nav_search from "./Nav_search";
import avatar from '../../assets/img_avatar.png'
import * as imageConversion from 'image-conversion';


function Navbar_Home_Page(props) {

  const backend = process.env.REACT_APP_BACKEND
  // ***********************************************************************

  const [file_post, setFile_post] = useState()

  const formData = new FormData();

  const handler_post = (e) => {

    let file = e.target.files[0]
    imageConversion.compressAccurately(file, 1500).then(res => {
      // converting blob to file
      res = new File([res], "file_name");
      setFile_post(res)
    })
  }


  // const post = async (e) => {
  //   e.preventDefault()

  //   formData.append('file', file_post)
  //   console.log('formData: ' + JSON.stringify(formData))
  //   await fetch('http://localhost:3001/posts/add', {
  //     method: 'POST',
  //     headers: {
  //       'authtoken': localStorage.getItem('authtoken')
  //     },
  //     body: formData
  //   })
  //     .then((response) => { return response.json() })
  //     .then((response) => { console.log(response) })
  // }

  const post = async (e) => {
    e.preventDefault()


    formData.append('file', file_post)
    formData.append("location", document.getElementById("location").value)
    formData.append("description", document.getElementById("desc").value)
    console.log(formData);
    console.log('formData: ' + JSON.stringify(formData))
    await fetch(`${backend}/posts/add`, {
      method: 'POST',
      headers: {
        // 'Content-type':'application/json',
        'authtoken': localStorage.getItem('authtoken')
      },
      body:
        formData

    })
      .then((response) => { return response.json() })
      .then((response) => {
        console.log(response);
        if (response.message == false) {
          alert("Please select file to upload")
        }
        else {
          alert("Post successfully posted.")
          window.location.reload()

        }

      })
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
  const profileDropDown2 = () => {
    const d = document.getElementById('dropdown-content2')
    d.classList.toggle('show')
  }


  // -----------------------Fetching profile Pic-----------------

  const [fetchProfileImg, setFetchProfileImg] = useState()

  useEffect(() => {
    async function fetc() {
      let response = await fetch(`${backend}/userDetails/profilePic`, {
        method: 'GET',
        headers: { uid: localStorage.getItem('uid') }
      })
      response = await response.json()

      if (response.response[0])
        setFetchProfileImg(response.response[0].profilePic)
    }

    fetc()
  }, [])


  // ---- update Passwrod ----
  const changePassword = async (e) => {
    e.preventDefault()

    let newPassword = prompt("Please enter new Password:", "");
    if (newPassword == null || newPassword == "") {
      alert('Failed to Set New passwort')
    } else {

      let response = await fetch(`${backend}/authentication/updatePassword`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authtoken: localStorage.getItem('authtoken')
        },
        body: JSON.stringify({ newPassword })
      })

      response = await response.json()
      console.log(response)

      if (response.message === false) {
        alert('Failed to set new password')
      }
      else {
        alert('Success! Updated Password Successfully')
        // signOut(e)  // --> not working
        {

          localStorage.removeItem('authtoken')
          localStorage.removeItem('uid')
          console.log('-=--=-=-=')
          window.location.assign('/')
        }
      }

    }
  }


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


          {/* -------------- userProfile dropdown for responsiveness --------------*/}
          <div className="dropdown resp-1">
            {fetchProfileImg ?
              <img title='' className='default-user-imagee' onClick={profileDropDown} src={`data:image;base64,${fetchProfileImg}`} alt='' />
              :
              <img className="default-user-imagee" onClick={profileDropDown} src={avatar} alt='sss' />
            }
            {/* <button className="default-user-image" >HII</button> */}
            <div id='dropdown-content' className="dropdown-content">
              <Link to={`/userProfile/${localStorage.getItem('uid')}`} style={{ display: 'flex', columnGap: '10px' }}>
                <span class="material-symbols-outlined ">account_circle</span>Profile
              </Link>

              <a href="" onClick={changePassword} style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                <span class="material-symbols-outlined">
                  password
                </span>Change Password
              </a>

              <a href="" onClick={signOut} style={{ display: 'flex', columnGap: '10px' }}>
                <span class="material-symbols-outlined">
                  logout
                </span>Sign Out
              </a>
            </div>
          </div>


          {/* ******************** search users *************************/}
          <Nav_search />


          {/* ******************************************************* */}
          <nav
            className="d-inline-flex resp-2"
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



            {/* -------------- userProfile dropdown2 --------------*/}
            <div className="dropdown resp-2">
              {fetchProfileImg ?
                <img title='' className='default-user-imagee' onClick={profileDropDown2} src={`data:image;base64,${fetchProfileImg}`} alt='' />
                :
                <img className="default-user-imagee" onClick={profileDropDown2} src={avatar} alt='sss' />
              }
              {/* <button className="default-user-image" >HII</button> */}
              <div id='dropdown-content2' className="dropdown-content">
                <Link to={`/userProfile/${localStorage.getItem('uid')}`} style={{ display: 'flex', columnGap: '10px' }}>
                  <span class="material-symbols-outlined ">account_circle</span>Profile
                </Link>

                <a href="" onClick={changePassword} style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                  <span class="material-symbols-outlined">
                    password
                  </span>Change Password
                </a>

                <a href="" onClick={signOut} style={{ display: 'flex', columnGap: '10px' }}>
                  <span class="material-symbols-outlined">
                    logout
                  </span>Sign Out
                </a>
              </div>
            </div>


          </nav>
        </div>
      </header>



      {/* *********** bottom navBar for responsiveness************ */}
      <nav
        className="resp-1 resp-1-bottom-nav"
        style={{  }}
      >
        <Link
          className="me-4 py-2 text-decoration-none top-nav-link"
          to="/"
          style={{ cursor: 'pointer' }}
        >
          <img className='nav_icon' src={require('../../Nav_icons/home.png')} />
        </Link>
        <a
          className="me-4 py-2 text-decoration-none top-nav-link"
          // to='/'
          onClick={() => alert('Sorry! still working on it.')}
          style={{ cursor: 'pointer' }}
        >
          <img className='nav_icon' src={require('../../Nav_icons/chatting.png')} />
        </a>

        <a
          className="py-2 text-decoration-none top-nav-link"
          // to={props.link}
          style={{ cursor: 'pointer' }}
          // firing modal
          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
        >
          <img className='nav_icon' src={require('../../Nav_icons/add_post.png')} />
        </a>

      </nav>

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
            <div className="modal-body flex1">
              <input type='file' className="form-control" onChange={handler_post}></input>
              <input type='text' id="location" className=' form-control my-2  ' placeholder='Location'></input>
              <textarea rows={10} className='form-control my-2' id="desc" placeholder="Write something for post  "></textarea>
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