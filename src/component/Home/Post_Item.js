import React from 'react'
import './Post_Item.css'
import avatar from './img_avatar.png'

const Post_Item = () => {
    return (
        <div>

            
            <div className="card" style={{color:'black' }}>
                <div className='post_item_header my-2 mx-3'>
                    <img src={avatar} alt="Avatar" style={{ height: "3.7rem", borderRadius: '30%'}} />
                    
                    {/* <h6 className='mx-2'> user_name </h6> */}
                    <div className="mx-2">
                        <h6 className=''> user_name </h6>
                        <p  style={{margin: '-10px 0px'}}>location</p>
                    </div>

                </div>
                <img src={avatar} alt="Avatar" style={{width:"100%"}} />
                <div className="post_item_header my-2">
                    <img className='mx-2' src={require('./icons/_like_icon.ico')} alt="Avatar" style={{height:'2.1rem'}} />
                    <img className='mx-2' src={require('./icons/_comment_icon.png')} alt="Avatar" style={{height:'2.3rem'}} />
                    <img className='mx-2' src={require('./icons/_share_icon.png')} alt="Avatar" style={{height:'2.1rem'}} />
                </div>
                    <div className="container">
                        <p>100 likes</p>
                        {/* <h4><b>John Doe</b></h4> */}
                        <p>Description of the user..</p>
                        <p>Comments....</p>
                    </div>
            </div>
                       

        </div>
    )
}

export default Post_Item