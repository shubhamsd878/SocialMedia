// check if user exist
import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
// for top loading bar
import { useLoadingContext } from "react-router-loading";
// for image compression
import * as imageConversion from 'image-conversion';

import './user-profile.scss'
import avatar from '../../assets/img_avatar.png'

import GridPost from './gridPost/GridPost'
import Post_Item from '../Home/Post_Item'
import SavedPosts from './savedPosts/SavedPosts'


const UserProfile = (props) => {

    const backend = process.env.REACT_APP_BACKEND
    // for top loading bar
    const loadingContext = useLoadingContext(); // and is called just before return

    // image conversion to kb constants
    

    // --- for infinity scroll ---
    const limit = 3
    const [skip, setSkip] = useState(0)
    const [totalResults, setTotalResults] = useState(3)


    const propsParams = useParams()

    const profileEditable = propsParams.id === localStorage.getItem('uid') ? true : false
    const uid = propsParams.id

    const [isFriend, setIsFriend] = useState(false)

    const [userPosts, setUserPosts] = useState([])

    // ---------------------------------isFriend-------------------------------
    useEffect(() => {
        async function fetc() {
            let response = await fetch(`${backend}/follow`, {
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


    // --------------------------- totalFollowers -------------------------
    const [totalFollowers, setTotalFollowers] = useState(0)
    useEffect(()=> {
        async function fetc() {
            let response = await fetch(`${backend}/follow/totalFollowers`, {
                headers: {
                    uid
                }
            })

            response = await response.json()

            if(response.message === true)
            setTotalFollowers(response.totalFollowers)
            
        }

        fetc()

    }, [])


    // ==================================Cover Methods====================================

    // ---------------------Cover update---------------------------
    const [coverChangeFile, setCoverChangeFile] = useState()
    const handleCoverChange = async (e) => {
        let file = e.target.files[0]
        
        imageConversion.compressAccurately(file,600).then(res=>{
          // converting blob to file
          res = new File([res], "file_name");
          
          setCoverChangeFile(res)
        })

    }

    const coverChangeForm = new FormData()

    const handleCoverSubmit = async () => {

        coverChangeForm.append('coverPic', coverChangeFile)
        let response = await fetch(`${backend}/userdetails/coverPic`, {
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

            let response = await fetch(`${backend}/userDetails/coverPic`, {
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
        let file = e.target.files[0]
        
        imageConversion.compressAccurately(file,250).then(res=>{
          // converting blob to file
          res = new File([res], "file_name");

          setProfileChangeFile(res)
        })
    }

    const profileChangeForm = new FormData()

    const handleProfileSubmit = async () => {

        profileChangeForm.append('profilePic', profileChangeFile)
        let response = await fetch(`${backend}/userdetails/profilepic`, {
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
        let response = await fetch(`${backend}/userdetails/description`, {
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

    useEffect(() => {

        async function fetc() {

            let response = await fetch(`${backend}/userDetails/profilePic`, {
                method: 'GET',
                headers: { uid: uid }
            })

            response = await response.json()

            setFetchProfileImg(response.response[0].profilePic)

        }

        fetc()
    }, [])




    // -----------------------Fetching description -----------------

    const [fetchDescription, setFetchDescription] = useState()
    useEffect(() => {

        async function fetc() {

            let response = await fetch(`${backend}/userDetails/description`, {
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

            let response = await fetch(`${backend}/userDetails/name`, {
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

            let response = await fetch(`${backend}:3001/follow`, {
                method: 'POST',
                headers: {
                    authtoken: authtoken,
                    targetuid: uid
                },
                body: JSON.stringify({ targetUid: uid })
            })

            response = await response.json()

            // console.log('follow successfull: ', response)

            if (response.status == 200) {
                setIsFriend(true)
                setTotalFollowers(prevCount => prevCount + 1)
            }
        }


        // fetc()
    }



    const unfollow = () => {
        if (!localStorage.getItem('authtoken')) {
            alert("To follow, first signIn!")
            return
        }

        // console.log(JSON.stringify({ targetUid: uid }))

        async function fetc() {
            let response = await fetch(`${backend}/follow`, {
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
                setTotalFollowers(prevCount => prevCount - 1)

            }
        }


        fetc()
    }




    // --------------------------------------- fetch post of current user ----------------------------
    async function fetchPosts() {

        setSkip(skip + limit)
        // console.log('skip and limit: ', skip, " ", limit)

        let response = await fetch(`${backend}/posts/fetchcurrent`, {
            headers: {
                uid: uid,
                skip,
                limit
            }
        })

        response = await response.json()
        
        setTotalResults(response.totalResult)
        // setUserPosts( response.result)
        setUserPosts( userPosts.concat(response.result))

    }


    useEffect(() => {

        fetchPosts()
    }, [])


    setTimeout(() => {

        // remove cover    
        if (!coverImg) {

            const d = document.getElementById('coverSkeleton')
            d.classList.remove('skeleton-image')
            d.classList.add('bg-cover-default')
            // d.innerHTML = `<img src=${avatar} className='profileImage' />`
        }

        if (!fetchProfileImg) {
            const e = document.getElementById('profileSkeleton')
            e.classList.remove('skeleton-image')
            e.classList.add('bg-grey')
        }


        if (!fetchDescription)
            setFetchDescription('Available')

    }, 6000);


    // topbar
    loadingContext.done();

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
                <h6 className="x-followers">{totalFollowers} Followers</h6>

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

                {/*-------------- Profile Description -----------------*/}
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
                <Link to={`/userprofile/${propsParams.id}`} className="link"> Grid View</Link>
                <Link to={`/userprofile/${propsParams.id}/cardView`} className="link">Card View</Link>
                {/* Note: if current user profile then show saved posts else not */}
                {profileEditable &&
                    <Link to={`/userprofile/${propsParams.id}/savedPosts`} className="savedPost link">Saved Post</Link>
                }

            </div>

            <Routes>
                <Route index element={(
                    <div>
                        {userPosts.length == 0 &&
                            <div className='posts'>

                                <div className='grid-item-skeleton skeleton-image'>

                                </div>
                                <div className='grid-item-skeleton skeleton-image'>

                                </div>
                                <div className='grid-item-skeleton skeleton-image'>

                                </div>
                            </div>
                        }


                            { userPosts.length != 0 && 
                            
                            // {/* ------------- Infinity Scroll Component ----------- */}
                            <InfiniteScroll
                            dataLength={userPosts.length}
                            next={fetchPosts}
                            hasMore= {totalResults > userPosts.length}
                            loader={<h4 style={{marginBottom:'10vh'}}>Loading...</h4>}
                            endMessage={
                                <h6 style={{ textAlign: "center", marginBottom:'10vh', marignTop:'3vh' }}>
                                <b>Yay! You have all catched up.  </b>
                                </h6>
                            }
                            >

                            <div className="posts" >


                            {userPosts && userPosts.map(element =>
                                <GridPost key={element._id} _id={element._id} src={element.file} className='' />
                                )}
                        </div>
                                </InfiniteScroll>
                            }
                                
                    </div>
                )} />

                <Route path='cardView' element={(
                    // ------------- Infinity Scroll Component ----------- 
                    <InfiniteScroll
                    dataLength={userPosts.length}
                    next={fetchPosts}
                    hasMore= {totalResults > userPosts.length}
                    loader={<h4 style={{marginBottom:'10vh'}}>Loading...</h4>}
                    endMessage={
                        <h6 style={{ textAlign: "center", marginBottom:'10vh', marignTop:'3vh' }}>
                        <b>Yay! You have all catched up.  </b>
                        </h6>
                    }
                    >
                        <div className='cardView'>
                            {userPosts && userPosts.map(element =>
                                <Post_Item pid={element._id} file={element.file} email={element.uid.email} name={element.uid.name} uid={element.uid._id} />
                            )}
                        </div>
                    </InfiniteScroll>
                )} loading />

                {/* ----------------- route for savedPosts */}
                <Route path='savedPosts' element={(
                    <SavedPosts />
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