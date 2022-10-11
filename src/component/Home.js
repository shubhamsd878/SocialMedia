import React from 'react'
import './Home.css'
import Navbar from './Home/Navbar_Home_Page'
import Post_Item from './Home/Post_Item'
const Home = () => {
  return (
    // <div className="home">
    <div>
        {/* <Navbar /> */}
        <div className='column'>
            <div className='post_column'>
                <Post_Item />
            </div>
        </div>
        <div className="column" >
            <div className='sticky-column' > hello world</div>
        </div>
    </div>
  )
}

export default Home