import React, { useState } from 'react'
import './user-profile.scss'
import { Routes, Route, Link, useParams } from 'react-router-dom'

import GridPost from './gridPost/GridPost'
import coverImg from './temp_userprofile/coverImg.JPG'
import profileImg from './temp_userprofile/profile.jpg'

import postImg1 from './temp_userprofile/post1.jpg'
import postImg2 from './temp_userprofile/post2.jpg'
import postImg3 from './temp_userprofile/post3.JPG'
import postImg4 from './temp_userprofile/post4.jpg'
import postImg5 from './temp_userprofile/post5.jpg'
import postImg6 from './temp_userprofile/post6.jpg'
import Post_Item from './cardPost/Post_Item'
import { useEffect } from 'react'

// import 'sass'
const UserProfile = (props) => {

    // const [profileEditable, setProfileEditable] = useState(false)

    const propsParams = useParams()
    console.warn('propsParams: ' + JSON.stringify(propsParams))

    const profileEditable = propsParams.id == localStorage.getItem('uid') ? true : false


    // ---------------------Cover---------------------------
    const [coverChangeFile, setCoverChangeFile] = useState()
    const handleCoverChange = async (e) => {
        setCoverChangeFile(e.target.files[0])
        console.log('setCoverChangeFile: ' + coverChangeFile)
    }

    const coverChangeForm = new FormData()

    const handleCoverSubmit = async () => {

        coverChangeForm.append('coverPic', coverChangeFile)
        let response = await fetch('http://localhost:3001/userdetails/coverPic', {
            method: 'PUT',
            headers: {
                'authtoken': localStorage.getItem('authtoken')
            },
            body: coverChangeForm
        })
        response = await response.json()
        console.log('response cover Change: ', response)
    }
    // ---------------------------------------------------


    // ---------------------ProfileImg---------------------------
    const [profileChangeFile, setProfileChangeFile] = useState()
    const handleProfileChange = async (e) => {
        setProfileChangeFile(e.target.files[0])
        console.log('setProfileChangeFile: ' + profileChangeFile)
    }

    const profileChangeForm = new FormData()

    const handleProfileSubmit = async () => {

        profileChangeForm.append('profilePic', profileChangeFile)
        let response = await fetch('http://localhost:3001/userdetails/profilepic', {
            method: 'PUT',
            headers: {
                'authtoken': localStorage.getItem('authtoken')
            },
            body: profileChangeForm
        })
        response = await response.json()
        console.log('response cover Change: ', response)
    }
    // ---------------------------------------------------


    // -----------------------Description---------------------
    const [descriptionChange, setDescriptionChange] = useState()
    const handleDescriptionChange = async (e) => {
        setDescriptionChange(e.target.value)
        console.log('descriptionChange: ' + descriptionChange)
    }

    const DescriptionChangeForm = new FormData()

    const handleDescriptionSubmit = async () => {

        DescriptionChangeForm.append('description', descriptionChange)
        let response = await fetch('http://localhost:3001/userdetails/description', {
            method: 'PUT',
            headers: {
                'authtoken': localStorage.getItem('authtoken')
            },
            body: DescriptionChangeForm
        })
        response = await response.json()
        console.log('response cover Change: ', response)
    }
    // ---------------------------------------------------


    return (
        <div className='userProfile'>
            <div className="profileBackground">

                {/* // ---------------------Cover--------------------------- */}
                <img title='cover image' src={coverImg} alt='coverImage'>
                </img>
                {
                    profileEditable && (

                        <span className="material-symbols-outlined"
                            //  firing model  
                            data-bs-toggle="modal" data-bs-target="#staticBackdropForCover">
                            border_color
                        </span>
                    )
                }
                {/* --------------------------------------------- */}

            </div>

            <div className="profileDetails">
                {/* profileImage, Name, x-Followers, profileDescription */}
                {/* <img className='profileImage'></img> */}
                <img src={profileImg} className='profileImage' alt='userPrfile' />

                {profileEditable &&
                    <span id='span_update' className="material-symbols-outlined"
                        // firing modal
                        data-bs-toggle="modal" data-bs-target="#staticBackdropForProfile"
                    >
                        border_color
                    </span>
                }

                <h3 className='profileName'> <b>Shubham Dahiya </b> {propsParams.id}</h3>
                {/* <h3 className='profileName'>Shubham Dahiya </h3> */}
                <h6 className="x-followers">100 Followers</h6>

                {!profileEditable &&

                    <div className="profileFunctions">
                        {/* Follow, ( Message, Follow) */}
                        <button className='message'>Message</button>
                        <button className='follow'>Follow</button>
                    </div>
                }

                {/* To be in Glass Morphism */}
                <div className="profileDescription">

                    <b>
                        <p ><u> <i>To be in Glassmorphism</i></u> Lorem ipsum dolor sit elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, veritatis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, atque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quas? So, perspiciatis labore saepe.
                            {profileEditable &&

                                <span className="material-symbols-outlined"
                                    // firing modal
                                    data-bs-toggle="modal" data-bs-target="#staticBackdropForDescription"
                                >
                                    border_color
                                </span>
                            }
                        </p>
                    </b>
                </div>

            </div>


            <div className="postOptions">
                {/* gridView, cardView, savedPosts */}
                {/* Note: the class link is common in the below link for css */}
                <Link to={`/userprofile/${propsParams.id}`} className="gridView link"> Grid View</Link>
                <Link to={`/userprofile/${propsParams.id}/cardView`} className="cardView link">Card View</Link>
                <Link to='' className="savedPost link">Saved Post</Link>

            </div>

            <Routes>
                <Route index element={(

                    <div className="posts">
                        <GridPost src={postImg1} className='' />
                        <GridPost src={postImg2} className='' />
                        <GridPost src={postImg3} className='' />
                        <GridPost src={postImg4} className='' />
                        <GridPost src={postImg5} className='' />
                        <GridPost src={postImg6} className='' />
                    </div>
                )} />

                <Route path='cardView' element={
                    <div className='cardView'>

                        <Post_Item src={postImg1} className='' />
                        <Post_Item src={postImg2} className='' />
                        <Post_Item src={postImg3} className='' />
                        <Post_Item src={postImg4} className='' />
                        <Post_Item src={postImg5} className='' />
                        <Post_Item src={postImg6} className='' />
                    </div>
                } />
            </Routes>





            {/* *********************** Modal for cover upload **************** */}
            <div
                className="modal fade"
                id="staticBackdropForCover"
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
                                Update Profile Cover
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
                            <input type='file' onChange={handleCoverChange}></input>
                        </div>


                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleCoverSubmit}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* ********************************************************* */}


            {/* ************************ Modal for profile upload ***************************** */}
            
                {/* // ---------------------Cover--------------------------- */}
            <div
                className="modal fade"
                id="staticBackdropForProfile"
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
                                Update Profile Image
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
                            <input type='file' onChange={handleProfileChange}></input>
                        </div>


                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleProfileSubmit}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* ********************************************************* */}


            {/* ************************ Modal for profile upload ***************************** */}
            
            <div
                className="modal fade"
                id="staticBackdropForDescription"
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
                                Update Profile Description
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
                            {/* <input type={'textarea'}  onChange={''}></input> */}
                            <textarea rows={'4'} onChange={handleDescriptionChange} style={{width:'100%'}}/>
                        </div>


                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleDescriptionSubmit}>
                                Update Description
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* ********************************************************* */}



            {/* ********************************************************* */}



        </div>
    )
}
export default UserProfile