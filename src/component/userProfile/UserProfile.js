// check if user exist
import React, { useState, useEffect } from 'react'
import './user-profile.scss'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import avatar from '../../assets/img_avatar.png'

import GridPost from './gridPost/GridPost'
import Post_Item from './cardPost/Post_Item'


const UserProfile = (props) => {

    const propsParams = useParams()

    const profileEditable = propsParams.id === localStorage.getItem('uid') ? true : false
    const uid = propsParams.id

    const [isFriend, setIsFriend] = useState(false)

    const [userPosts, setUserPosts] = useState()

    // ---------------------------------isFriend-------------------------------
    useEffect(() => {
        async function fetc() {
            let response = await fetch('http://localhost:3001/follow', {
                headers: {
                    authtoken: localStorage.getItem('authtoken'),
                    targetuid: uid
                }
            })

            response = await response.json()

            if (response.isFollowing == true) {
                setIsFriend(true)
            }
        }

        fetc()
    }, [])


    // ==================================Cover Methods====================================

    // ---------------------Cover update---------------------------
    const [coverChangeFile, setCoverChangeFile] = useState()
    const handleCoverChange = async (e) => {
        setCoverChangeFile(e.target.files[0])
        // console.log('setCoverChangeFile: ' + coverChangeFile)
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
        // console.log('response cover Change: ', response)
    }
    // ---------------------------------------------------

    // ----------------Cover Fetch ---------------

    const [coverImg, setCoverImg] = useState()
    // fetching cover
    useEffect(() => {

        async function fetc() {

            let response = await fetch('http://localhost:3001/userDetails/coverPic', {
                method: 'GET',
                headers: { uid: uid }
            })

            response = await response.json()

            // console.log('response coverImage:  ', response)

            setCoverImg(response.response.coverPic)
        }

        fetc()
    }, [])


    // ======================================================================




    // ==================================Profile Methods====================================


    // ---------------------Update ProfileImg---------------------------
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
        // console.log('response cover Change: ', response)
    }
    // ---------------------------------------------------


    // -----------------------Update Description---------------------
    const [descriptionChange, setDescriptionChange] = useState()
    const handleDescriptionChange = async (e) => {
        setDescriptionChange(e.target.value)
        // console.log('descriptionChange: ' + descriptionChange)
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
        // console.log('response cover Change: ', response)
    }
    // ---------------------------------------------------



    // -----------------------Fetching profile Pic-----------------

    const [fetchProfileImg, setFetchProfileImg] = useState()
    // fetching cover
    // const uid = localStorage.getItem('uid')
    useEffect(() => {

        async function fetc() {

            let response = await fetch('http://localhost:3001/userDetails/profilePic', {
                method: 'GET',
                headers: { uid: uid }
            })

            response = await response.json()

            // console.log('response FetchProfileImg:  ', response)

            setFetchProfileImg(response.response[0].profilePic)
            // var coverImg = response.response.coverPic
            // console.log(srcS)
            // document.getElementById('coverImg').src = `data:image;base64,${srcS}`

        }

        fetc()
    }, [])




    // -----------------------Fetching description -----------------

    const [fetchDescription, setFetchDescription] = useState()
    useEffect(() => {

        async function fetc() {

            let response = await fetch('http://localhost:3001/userDetails/description', {
                method: 'GET',
                headers: { uid: uid }
            })

            response = await response.json()

            // console.log('response fetchDescription:  ', response)

            setFetchDescription(response.response.description)

        }

        fetc()
    }, [])




    // ------------------------------- fetching name ------------------------------
    const [userName, setUserName] = useState()
    useEffect(() => {

        async function fetc() {

            let response = await fetch('http://localhost:3001/userDetails/name', {
                method: 'GET',
                headers: { uid: uid }
            })

            response = await response.json()
            // console.log('response userName: ', response)

            setUserName(response.result.name)
        }

        fetc()
    }, [])







    // ------------------------------- follow friend ------------------------------
    async function follow() {
        if (!localStorage.getItem('authtoken')) {
            alert("To follow, first signIn!")
            // return;
        }

        else {

            const authtoken = localStorage.getItem('authtoken')

            let response = await fetch('http://localhost:3001/follow', {
                method: 'POST',
                headers: {
                    authtoken: authtoken,
                    targetuid: uid
                },
                body: JSON.stringify({ targetUid: uid })
            })

            response = await response.json()

            console.log('follow successfull: ', response)

            if (response.status == 200) {
                setIsFriend(true)
            }
        }


        // fetc()
    }



    const unfollow = () => {
        if (!localStorage.getItem('authtoken')) {
            alert("To follow, first signIn!")
            return
        }

        console.log(JSON.stringify({ targetUid: uid }))

        async function fetc() {
            let response = await fetch('http://localhost:3001/follow', {
                method: 'DELETE',
                headers: {
                    authtoken: localStorage.getItem('authtoken'),
                    targetUid: uid
                },
                // body: JSON.stringify({ targetUid: uid })
            })

            response = await response.json()

            // console.log('unfollow(): ', response)
            if (response.status == 200) {
                setIsFriend(false)
            }
        }


        fetc()
    }




    // --------------------------------------- fetch post of current user ----------------------------
    useEffect(() => {
        async function fetc() {
            let response = await fetch('http://localhost:3001/posts/fetchcurrent', {
                headers: { uid: uid }
            })

            response = await response.json()
            setUserPosts(response.result)
            // console.log('response fetch posts: ', response)
        }

        fetc()
    }, [])


    setTimeout(() => {

        // remove cover    
        if(!coverImg){

            const d = document.getElementById('coverSkeleton')
            d.classList.remove('skeleton-image')
            d.classList.add('bg-cover-default')
            // d.innerHTML = `<img src=${avatar} className='profileImage' />`
        }    

        if(!fetchProfileImg){
            const e = document.getElementById('profileSkeleton')
            e.classList.remove('skeleton-image')
            e.classList.add('bg-grey')
        }


        // ---------------------------
        // if(!fetchProfileImg)
        // setFetchProfileImg(avatar)

        // if(!coverImg)
        // setCoverImg(avatar)


        if (!fetchDescription)
            setFetchDescription('Available')

        console.log('fetchDescription: ', fetchDescription)


    }, 6000);


    return (
        <div className='userProfile'>
            <div className="profileBackground">

                <div >

                    {/* // ---------------------Cover--------------------------- */}

                    {/* if fetchCoverImage then show, else default */}
                    {coverImg ?
                        <img className='skeleton-image' src={`data:image;base64,${coverImg}`} alt='' />
                        : <div id='coverSkeleton' className='skeleton-image' style={{ borderRadius: '0rem 0rem 1rem 1rem' }} />
                    }
                    {/* <img  className='skeleton-image' src={`data:image;base64,${coverImg}`} alt='' /> */}


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
            </div>

            <span className="profileImgg">

            {fetchProfileImg ?
                <img title='' className='profileImage' style={{ zIndex: '2' }} src={`data:image;base64,${fetchProfileImg}`} alt='' />
                :
                <div id='profileSkeleton' className='profileImage skeleton-image' ></div>
            }

            {profileEditable &&
                <span id='span_update' className="material-symbols-outlined"
                // firing modal
                data-bs-toggle="modal" data-bs-target="#staticBackdropForProfile"
                >
                    border_color
                </span>
            }
            </span>



            <div className="profileDetails">

                {userName ?
                    <h3 className='profileName'> <b> {userName}</b> </h3>
                    : <h3 className='profileName skeleton-text' style={{ width: '20%', height: '1.700rem', marginTop: '0.435rem' }}></h3>
                }
                <h6 className="x-followers">100 Followers **</h6>

                {!profileEditable &&

                    <div className="profileFunctions">
                        {/*----------------- Follow, ( Message, Follow) ------------------------ */}
                        <button className='message' onClick={() => alert("Not completed yet!")}>Message</button>

                        {!isFriend ?
                            <button className='follow' onClick={follow}>Follow</button>
                            :
                            <button className='unfollow' onClick={unfollow}>Following</button>
                        }
                    </div>
                }

                {/*-------------- To be in Glass Morphism -----------------*/}
                <div className="profileDescription">


                    {fetchDescription ?
                        <b><i>
                            <p >
                                {fetchDescription}
                            </p>
                        </i></b>
                        :
                        // for skeleton-text
                        <div>
                            <div className='skeleton-text'></div>
                            <div className='skeleton-text'></div>
                            <div className='skeleton-text'></div>
                        </div>
                    }


                    {profileEditable &&

                        <span className="material-symbols-outlined"
                            // firing modal
                            data-bs-toggle="modal" data-bs-target="#staticBackdropForDescription"
                        >
                            border_color
                        </span>
                    }

                </div>




                {/* </div> */}
            </div>


            {/*-------------------------- Post options -> card, grid, saved  ++ posts -----------------------  */}
            <div className="postOptions">
                {/* gridView, cardView, savedPosts */}
                {/* Note: the class link is common in the below link for css */}
                <Link to={`/userprofile/${propsParams.id}`} className="gridView link"> Grid View</Link>
                <Link to={`/userprofile/${propsParams.id}/cardView`} className="cardView link">Card View</Link>
                <Link to='' className="savedPost link">Saved Post</Link>

            </div>

            <Routes>
                <Route index element={(
                    <div>
                        {!userPosts &&
                            <div className='posts'>

                                <div className='grid-item-skeleton skeleton-image'>

                                </div>
                                <div className='grid-item-skeleton skeleton-image'>

                                </div>
                                <div className='grid-item-skeleton skeleton-image'>

                                </div>
                            </div>
                        }


                        <div className="posts" >
                            {/* ------------------------ */}
                            {userPosts && userPosts.map(element =>
                                <GridPost key={element._id} _id={element._id} src={element.file} className='' />
                            )}
                        </div>
                    </div>
                )} />

                <Route path='cardView' element={(
                    <div className='cardView'>
                        {userPosts && userPosts.map(element =>
                            <Post_Item key={element._id} uid={element.uid} src={element.file} className='' />
                        )}
                    </div>
                )} />
            </Routes>









            {/* ********************************************************* */}



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

            {/* // --------------------- Profile--------------------------- */}
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




            {/* ************************ Modal for Description upload ***************************** */}

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
                            <textarea rows={'4'} defaultValue={fetchDescription} onChange={handleDescriptionChange} style={{ width: '100%' }} />
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


        </div>
    )
}
export default UserProfile