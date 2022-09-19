import React from 'react'
import './Home.css'
import Navbar from './Home/Navbar'
import Post_Item from './Home/Post_Item'
const Home = () => {
  return (
    <div>
        <Navbar />
        <div className='column'>
            <div className='post_column'>
                <Post_Item />
            </div>
        </div>
        <div className="column" >
            <div style={{position:'sticky', left: '0px', top:'0px'}}> hello world</div>
        </div>
    </div>
  )
}

export default Home