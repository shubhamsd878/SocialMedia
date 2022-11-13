import React from 'react'
import './Post_Item.css'
// import avatar from './img_avatar.png'
import profileImg from '../temp_userprofile/profile.jpg'


const Post_Item = (props) => {
    return (
        <div className='card'>


            {/* <div id='mainContainer' className="card color" >
                           </div> */}

            <div className='post_item_header my-2 mx-3'>
                <img src={profileImg} alt="Avatar" className="userImage" />

                {/* <h6 className='mx-2'> user_name </h6> */}
                <div className="mx-2">
                    <h6 className=''> user_name </h6>
                    <p className='location' >location</p>
                </div>

            </div>

            {/* <img src={avatar} id='img' alt="Avatar" className='imgSrc' /> */}
            {/* user post file */}
            {/* <img src={`data:image/png;base64,${props.file}`} id='img' alt="Avatar" className='imgSrc' /> */}
            <img src={`data:image;base64,${props.src}`} id='img' alt="Avatar" className='imgSrc' />

            <div className="post_item_header my-2">
                <img className='mx-2 like' src={require('../../Home/icons/_like_icon.ico')} alt="Avatar" />
                <img className='mx-2 comment' src={require('../../Home/icons/_comment_icon.png')} alt="Avatar" />
                <img className='mx-2 share' src={require('../../Home/icons/_share_icon.png')} alt="Avatar" />
            </div>
            <div className="container">
                <p>100 likes</p>
                {/* <h4><b>John Doe</b></h4> */}
                <p id='desc'>Description of the user..</p>
                <p>Comments....</p>
            </div>

        </div>
    )
}

export default Post_Item





// <div className='post_item_header my-2 mx-3'>
// <img src={avatar} alt="Avatar" className="userImage" />

// {/* <h6 className='mx-2'> user_name </h6> */}
// <div className="mx-2">
//     <h6 className=''> user_name </h6>
//     <p className='location' >location</p>
// </div>

// </div>
// <img src={avatar} id='img' alt="Avatar" className='imgSrc' />
// <div className="post_item_header my-2">
// <img className='mx-2 like' src={require('./icons/_like_icon.ico')} alt="Avatar" />
// <img className='mx-2 comment' src={require('./icons/_comment_icon.png')} alt="Avatar" />
// <img className='mx-2 share' src={require('./icons/_share_icon.png')} alt="Avatar" />
// </div>
// <div className="container">
// <p>100 likes</p>
// {/* <h4><b>John Doe</b></h4> */}
// <p id='desc'>Description of the user..</p>
// <p>Comments....</p>
// </div>
