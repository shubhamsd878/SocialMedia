import React from 'react'
import './user-profile.scss'
import { Routes, Route, Link } from 'react-router-dom'

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

// import 'sass'
const UserProfile = () => {

    return (
        <div className='userProfile'>
            <div className="profileBackground">
                <img src={coverImg}></img>
                {/* <img ></img> */}
            </div>

            <div className="profileDetails">
                {/* profileImage, Name, x-Followers, profileDescription */}
                {/* <img className='profileImage'></img> */}
                <img src={profileImg} className='profileImage'></img>
                <h3 className='profileName'>Shubham Dahiya</h3>
                <h6 className="x-followers">100 Followers</h6>

                <div className="profileFunctions">
                    {/* Follow, ( Message, Follow) */}
                    <button className='message'>Message</button>
                    <button className='follow'>Follow</button>
                </div>

                <p className="profileDescription"> Lorem ipsum dolor sit elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, veritatis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, atque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quas? So, perspiciatis labore saepe.</p>
            </div>


            <div className="postOptions">
                {/* gridView, cardView, savedPosts */}
                {/* Note: the class link is common in the below link for css */}
                <Link to='/userprofile' className="gridView link"> Grid View</Link>
                <Link to='/userprofile/cardView' className="cardView link">Card View</Link>
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

        </div>
    )
}
export default UserProfile