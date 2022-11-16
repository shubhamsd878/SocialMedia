import React, { useState, useEffect, useId } from 'react'
import './Post_Item.scss'
import avatar from './img_avatar.png'

const Post_Item = (props) => {
    const { pid, file, name, email, uid } = props
    const authtoken = localStorage.getItem('authtoken')

    //------------------- fetching profile  ----------------
    const [fetchProfileImg, setFetchProfileImg] = useState()

    useEffect(() => {
        async function fetc() {
            // let result = fetch(''
            let response = await fetch('http://localhost:3001/userDetails/profilePic', {
                method: 'GET',
                headers: { uid: uid }
            })

            response = await response.json()
            console.log('response search FetchProfileImg:  ', response)

            setFetchProfileImg(response.response[0].profilePic)

        }

        fetc()
    }, [])


    //   ---------------fetching likes & checking if liked-------------------
    const [totalLikes, setTotalLikes] = useState('...')
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        async function fetc() {
            // let result = fetch(''
            let response = await fetch('http://localhost:3001/likes', {
                method: 'GET',
                headers: { pid }
            })

            response = await response.json()
            console.log('response search FetchProfileImg:  ', response)

            setTotalLikes(response.totalLikes)

            if (response.users.includes(localStorage.getItem('uid'))) {
                setIsLiked(true)
            }
            // console.log('fetchLike: ', fetchLike)
            // setFetchLike(response)

        }

        fetc()
    }, [])


    //   -------------------liking the post----------------------
    const likePost = async () => {
        setTotalLikes(s => s + 1)
        let response = await fetch('http://localhost:3001/likes', {
            method: 'POST',
            headers: { authtoken, pid }
        })

        response = await response.json()
        console.log('like response: ', response)
    }


    //   -------------------unlike the post----------------------
    const unlikePost = async () => {
        setTotalLikes(s => s - 1)
        let response = await fetch('http://localhost:3001/likes', {
            method: 'DELETE',
            headers: { authtoken, pid }
        })

        response = await response.json()
        console.log('unlike response: ', response)
    }


    // ------------------- toggle comments -----------------------
    const uniqueId = useId()
    const toggleComments = () => {
        console.log('toggleComments function')
        document.getElementById(`${uniqueId}`).classList.toggle('comments-none')
        // document.getElementById('comments').classList.toggle('comments')
    }


    // --------------------- Comment Send --------------------------

    const [yourComment, setYourComment] = useState()
    
    const commentHandle = (e) => {
        setYourComment(e.target.value)
    }

    const sendComment = async () => {
        console.log(yourComment)

        let response = await fetch('http://localhost:3001/comments', {
            method: 'POST',
            headers: {authtoken: localStorage.getItem('authtoken'), pid, comment: yourComment},
            body: {"comment":yourComment}
            // body: JSON.stringify({comment:yourComment})
        })

        response =await response.json()
    }







    // --------------------- Comment fetch of current Post --------------------------

    const [postComments, setPostComments] = useState()
    const fetchComments = async() => {
        let response = await fetch('http://localhost:3001/comments', {
            headers: {pid}
        })

        response = await response.json()
        setPostComments(response.response)
        console.log('fetchComments: ', response)

    }










    return (
        <div className='card'>


            {/* <div id='mainContainer' className="card color" >
                           </div> */}

            <div className='post_item_header my-2 mx-3'>
                {fetchProfileImg ?
                    <img src={`data:image;base64,${fetchProfileImg}`} alt="img" className="userImage" />
                    :
                    <img src={avatar} alt="img" className="userImage" />
                }
                

                <div className="mx-2">
                    <h6 className=''> {name} </h6>
                    <p className='location muted' ><i>{email}</i></p>
                </div>

            </div>

            <img src={`data:image/png;base64,${file}`} id='img' alt="Avatar" className='imgSrc' />

            <div className="post_item_header my-2">
                {isLiked ?
                    <img className='mx-2 like' onClick={unlikePost} src={require('../../icons/_liked_icon.png')} alt="Avatar" />
                    : <img className='mx-2 like' onClick={likePost} src={require('../../icons/_like_icon.png')} alt="Avatar" />
                }
                <img className='mx-2 comment' src={require('../../icons/_comment_icon.png')} alt="Avatar" />
                <img className='mx-2 share' src={require('../../icons/_share_icon.png')} alt="Avatar" />
            </div>
            <div className="container">
                <p>{totalLikes} likes</p>
                <p id='desc'>Description of the user..</p>
                <div className='UserCommentRow'>
                    {fetchProfileImg ?
                        <img src={`data:image;base64,${fetchProfileImg}`} alt="img" className="userImage" />
                        :
                        <img src={avatar} alt="img" className="userImage" />
                    }

                    <input className='commentBox' type='text' name='comment' onChange={commentHandle} placeholder='Enter your comment here....' />

                    <button type='submit' className='commentSubmit' onClick={sendComment} >Comment</button>

                </div>
                <p className='showCommentsButton' onClick={ async () => { await toggleComments(); await fetchComments()}}>Comments....</p>

                 <div id={`${uniqueId}`} className='comments-none comments '>

                    <div>
                        {fetchProfileImg ?
                            <img src={`data:image;base64,${fetchProfileImg}`} alt="img" className="userImage" />
                            :
                            <img src={avatar} alt="img" className="userImage" />
                        }

                        <div>
                            <h6><b>Shubham Dahiya</b></h6>
                            <p>
                                some comment Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laboriosam harum, minima commodi adipisci aperiam unde quam quisquam labore odit?
                            </p>
                            <p className='commentDate'>20 Jan 2020 at 20:20</p>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Post_Item 