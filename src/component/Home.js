
import React from 'react'
import Helmet from 'react-helmet'

import './Home.css'
import Post_Item from './Home/Post_Item'
import { useState, useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
// for top loading bar
import { useLoadingContext } from "react-router-loading";

const Home = () => {
  // for top loading bar
  const loadingContext = useLoadingContext(); // and is called just before return

  let response
  const [postLoading, setPostLoading] = useState(true)
  const [postData, setPostdata] = useState([])

  // --- for infinity scroll ---
  const limit = 2
  const [skip, setSkip] = useState(0)
  const [totalResults, setTotalResults] = useState(1)
  // let totalResults = 0



  useEffect(() => {
    console.log('---- postData Update -----')
    console.log('new postData: ', postData)

  }, [postLoading])



  const fetchdata = async () => {

    // setPostLoading(true)
    // console.log('loading start')

    setSkip( skip + limit)
    // console.log('skip: ' + skip)

    response =  await fetch('http://localhost:3001/posts/fetch', {
      headers:{
        authtoken: localStorage.getItem('authtoken'),
        skip,
        limit
      },
      method: 'GET'
      
    })
    response = await response.json()

    console.log('home fetchResponse: ', response)

    if(response.status == 200){
      setTotalResults(response.totalResult)

      setPostdata(postData.concat(response.result))

    }
    console.log('loading end')

    // setPostLoading(false)
  }


  useEffect(() => {
    
    fetchdata()
  }, [] )

  // topbar
  loadingContext.done();

  return (
    <div>
      <div className='column'>
        <div className='post_column'>


        <InfiniteScroll
          dataLength={postData.length}
          next={fetchdata}
          hasMore= {totalResults > postData.length}
          loader={<h4 style={{marginBottom:'10vh'}}>Loading...</h4>}
          endMessage={
            <h6 style={{ textAlign: "center", marginBottom:'10vh', marignTop:'3vh' }}>
              <b>Yay! You have all catched up.  </b>
            </h6>

          }
          // for blur to be visble of post-card on right
          style={{overflow:'visible'}}
        >

          { postData.map( (element)=> {
            return (
              <div key={element._id}>
                <Post_Item pid={element._id} file={ element.file } email={element.uid.email} name={element.uid.name} uid={element.uid._id}/>
              </div>
            )
          })}

        </InfiniteScroll>


        </div>
        <button onClick={fetchdata}>fetch more</button>
      </div>
      
      <div className="column" >
        <div className='sticky-column' > hello world</div>
      </div>

    </div>
  )
}



const liker= ()=>{
  console.log('button clicked..');
}
const like= document.getElementById('liker');
console.log(like);
// like.addEventListener('click',liker)
{/* <ScriptTag type='text/javascript' src='domManipulation.js'/>  */}




export default Home