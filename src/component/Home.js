
import React from 'react'
import './Home.css'
import Post_Item from './Home/Post_Item'
import { useState, useEffect } from 'react'
// import Navbar from './Home/Navbar_Home_Page'
// import avatar from './Home/img_avatar.png'
// var reverse = require("buffer-reverse")
// const likeicon = require('./Home/icons/_like_icon.ico')
// const commenticon = require('./Home/icons/_comment_icon.png')
// const shareicon = require('./Home/icons/_share_icon.png')


const Home = () => {


  let response
  const [postLoading, setPostLoading] = useState(true)
  const [postData, setPostdata] = useState()

  useEffect(() => {
    console.log('---- postData Update -----')
    console.log(postData)

  }, [postLoading])


  useEffect(() => {
    const fetchdata = async () => {

      setPostLoading(true)

      response =  await fetch('http://localhost:3001/posts/fetch', {
        headers:{
          authtoken: localStorage.getItem('authtoken')
        },
        method: 'GET'
      })
      response = await response.json()

      console.log('response: ', response)

      if(response.status == 200){
        setPostdata( response.result )
      }
      setPostLoading(false)
    }

    fetchdata()
  }, [] )


  return (
    <div>
      <div className='column'>
        <div className='post_column'>
          {/* <Post_Item /> */}


          {postLoading && (
            <h1> loading posts....</h1>
          )}
          
          { !postLoading && postData.map( (element)=> {
            return (
              <div key={element.id}>
                <Post_Item file={ element.file } name={element.uid.name} uid={element.uid}/>
              </div>
            )
          })}

        </div>
      </div>
      <div className="column" >
        <div className='sticky-column' > hello world</div>
      </div>

    </div>
  )
}

export default Home