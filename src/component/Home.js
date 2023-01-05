
import React from 'react'

import './Home.css'
import Post_Item from './Home/Post_Item'
import { useState, useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from './Loading'
// for top loading bar
import { useLoadingContext } from "react-router-loading";

const Home = () => {

  const backend = process.env.REACT_APP_BACKEND

  // for top loading bar
  const loadingContext = useLoadingContext(); // and is called just before return

  let response
  const [postLoading, setPostLoading] = useState(true)
  const [postData, setPostdata] = useState([])

  // --- for infinity scroll ---
  const limit = 2
  const [skip, setSkip] = useState(0)
  const [totalResults, setTotalResults] = useState(1)
  const [isNoFriends, setIsNoFriends] = useState(false)
  // let totalResults = 0



  useEffect(() => {
    console.log('---- postData Update -----')
    console.log('new postData: ', postData)

  }, [postLoading])



  const fetchdata = async () => {

    setSkip(skip + limit)

    response = await fetch(`${backend}/posts/fetch`, {
      headers: {
        authtoken: localStorage.getItem('authtoken'),
        skip,
        limit
      },
      method: 'GET'

    })

    response = await response.json()

    console.log('home fetchResponse: ', response)

    if (response.status == 200) {
      setTotalResults(response.totalResult)

      setPostdata(postData.concat(response.result))
    }

    if (response.status == 201) {
      console.log('noooo friends')
      // no friends of user
      setIsNoFriends(true)
    }

    console.log('loading end')

    // setPostLoading(false)
  }


  useEffect(() => {

    fetchdata()
  }, [])

  // topbar
  loadingContext.done();

  return (
    <div>
      <div className='column'>
        <div className='post_column'>

          {isNoFriends &&
            <h6 style={{ textAlign: "center", marginBottom: '10vh', marignTop: '3vh' }}>
              <b>You are not following anyone.  </b>
            </h6>
          }

          {!isNoFriends &&
            <InfiniteScroll
              dataLength={postData.length}
              next={fetchdata}
              hasMore={totalResults > postData.length}
              // loader={<h4 style={{marginBottom:'10vh'}}>Loading...</h4>}
              loader={
                <div className={postData.length == 0 ? 'loader' : ''} >
                  <Loading />
                </div>
              }
              endMessage={
                <h6 style={{ textAlign: "center", marginBottom: '15vh', marignTop: '3vh' }}>
                  <b>Yay! You have all catched up.  </b>
                </h6>
              }
              // for blur to be visble of post-card on right
              style={{ overflow: 'visible' }}
            >

              {postData.map((element) => {
                return (
                  <div key={element._id}>
                    <Post_Item pid={element._id} file={element.file} description={element.desc} location={element.location} name={element.uid.name} uid={element.uid._id} />
                  </div>
                )
              })}

            </InfiniteScroll>
          }



        </div>
      </div>


      {/* ------------------- for right side content -------------- */}
      {/* <div className="column" >
        <div className='sticky-column' > hello world</div>
      </div> */}

    </div>
  )
}



export default Home