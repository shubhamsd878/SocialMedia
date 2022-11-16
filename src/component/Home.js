
import React from 'react'
import './Home.css'
import Post_Item from './Home/Post_Item'
import { useState, useEffect } from 'react'

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

      // console.log('response: ', response)

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


          { !postLoading || !postData && (
            <h1> loading posts....</h1>
          )}
          
          { !postLoading && postData && postData.map( (element)=> {
            return (
              <div key={element._id}>
                <Post_Item pid={element._id} file={ element.file } email={element.uid.email} name={element.uid.name} uid={element.uid._id}/>
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