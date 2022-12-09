import React, { useEffect, useState } from 'react'
import Post_Item from '../../Home/Post_Item'
import InfiniteScroll from "react-infinite-scroll-component";


const SavedPosts = () => {
    const backend = process.env.REACT_APP_BACKEND

    const messageCSS = {
        textAlign: "center",
        marginBottom: '10vh',
        marignTop: '3vh',
        minWidth: '10em'
    }


    const authtoken = localStorage.getItem('authtoken')
    const limit = 2
    const [skip, setSkip] = useState(0)
    const [totalPosts, setTotalPosts] = useState(1)


    const [savedPosts, setSavedPosts] = useState([])

    async function fetchPosts() {
        setSkip(skip + limit)

        let response = await fetch(`${backend}/saved`, {
            headers: { authtoken, skip, limit }
        })

        response = await response.json();
        console.log(JSON.stringify(response))

        setTotalPosts(response.totalPosts)
        setSavedPosts(prevPosts => prevPosts.concat(response.posts))
    }

    useEffect(() => {
        fetchPosts()
    }, [])


    return (
        <div>
            <div className='cardView'>
                <InfiniteScroll
                    dataLength={savedPosts.length}
                    next={fetchPosts}
                    hasMore={totalPosts > savedPosts.length}
                    loader={<h4 style={{ marginBottom: '10vh' }}>Loading...</h4>}
                    endMessage={
                        <h6 style={messageCSS}>
                            <b>Yay! You have all catched up.  </b>
                        </h6>
                    }
                >

                    {savedPosts.length > 0 && savedPosts.map(element =>
                        <Post_Item pid={element.pid._id} file={element.pid.file} email={element.pid.uid.email} name={element.pid.uid.name} uid={element.pid.uid._id} />
                    )}

                </InfiniteScroll>
            </div>
        </div>
    )
}

export default SavedPosts