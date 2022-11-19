// don't know why body was not sending in fetch api
import React, { useState, useEffect, useId } from 'react'
import {Link} from 'react-router-dom'
import './Post_Item.scss'
import avatar from './img_avatar.png'
import Comment_row from './Post_Item/Comment_row'

const Post_Item = (props) => {
    const { pid, file, name, location, uid, description } = props
    const authtoken = localStorage.getItem('authtoken')

    //------------------- fetching profile  ----------------
    const [fetchTargetProfileImg, setFetchTargetProfileImg] = useState()

    useEffect(() => {
        async function fetc() {
            // let result = fetch(''
            let response = await fetch('http://localhost:3001/userDetails/profilePic', {
                method: 'GET',
                headers: { uid: uid }
            })

            response = await response.json()
            // console.log('response search FetchTargetProfileImg:  ', response)

            setFetchTargetProfileImg(response.response[0].profilePic)

        }

        fetc()
    }, [])


    // ----------------fetch current User-Profile Pic-----------------------
    const [currUserProfilePic, setCurrUserProfilePic ] = useState()

    useEffect(() => {
        async function fetc() {
            // let result = fetch(''
            let response = await fetch('http://localhost:3001/userDetails/profilePic', {
                method: 'GET',
                headers: { uid: localStorage.getItem('uid') }
            })

            response = await response.json()
            // console.log('response search currUserProfileImg:  ', response)

            setCurrUserProfilePic(response.response[0].profilePic)

        }

        fetc()
    }, [])



    //   ---------------fetching likes & checking if liked-------------------
    const [totalLikes, setTotalLikes] = useState('...')
    const [isLiked, setIsLiked] = useState(false)



    useEffect(() => {
        async function fetc() {

            let response = await fetch('http://localhost:3001/likes', {
                method: 'GET',
                headers: { pid }
            })

            response = await response.json()
            // console.log('response search FetchTargetProfileImg:  ', response)

            setTotalLikes(response.totalLikes)

            if (response.users.includes(localStorage.getItem('uid'))) {
                setIsLiked(true)
            }
            
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
        setIsLiked(true)
        // console.log('like response: ', response)
    }


    //   -------------------unlike the post----------------------
    const unlikePost = async () => {
        setTotalLikes(s => s - 1)
        let response = await fetch('http://localhost:3001/likes', {
            method: 'DELETE',
            headers: { authtoken, pid }
        })

        response = await response.json()
        setIsLiked(false)
        // console.log('unlike response: ', response)
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
    
    const commentHandle = async (e) => {

        setYourComment(e.target.value)
    }

    const sendComment = async () => {
        if(!yourComment) return alert('please write something in comment box to submit')

      await fetch('http://localhost:3001/comments', {
            method: 'POST',
            headers: {authtoken: localStorage.getItem('authtoken'), pid, comment: yourComment},
            body: {"comment":yourComment}
        }).then((response)=>{
            return response.json();
        }).then(async(data)=>{
            console.log(data);
            await fetchComments()   
        })

      
    }







    // --------------------- Comment fetch of current Post --------------------------

    const [postComments, setPostComments] = useState()
    const fetchComments = async() => {

        let response = await fetch('http://localhost:3001/comments', {
            headers: {pid}
        })

        response = await response.json()
        setPostComments(response.response)

    }




// ======================================================================================================
    return (
        <div className='card'>


            {/* <div id='mainContainer' className="card color" >
                           </div> */}

            <div className='post_item_header my-2 mx-3'>
                {fetchTargetProfileImg ?
                    <img src={`data:image;base64,${fetchTargetProfileImg}`} alt="img" className="userImage" />
                    :
                    <img src={avatar} alt="img" className="userImage" />
                }
                

                <Link to={`/userProfile/${uid}`} className="mx-2 headerLink">
                    <h6 className=''> {name} </h6>
                    <p className='location muted' ><i>{location}</i></p>
                </Link>
                {/* <div to={`/userProfile/${uid}`} className="mx-2">
                    <h6 className=''> {name} </h6>
                    <p className='location muted' ><i>{location}</i></p>
                </div> */}

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
                <p id='desc'>{description}</p>

                {/* flex for user to comment */}
                <div className='UserCommentRow'>
                    {currUserProfilePic ?
                        <img src={`data:image;base64,${currUserProfilePic}`} alt="img" className="userImage" />
                        :
                        <img src={avatar} alt="img" className="userImage" />
                    }

                    <input className='commentBox' type='text' name='comment' onFocus={async ()=>{ await toggleComments(); await fetchComments();}} onChange={commentHandle} placeholder='Enter your comment here....' />

                    <button type='submit' className='commentSubmit' onClick={sendComment} >Post</button>

                </div>

                <p className='showCommentsButton' onClick={ async () => { await toggleComments(); await fetchComments()}}>Comments....</p>

                 <div id={`${uniqueId}`} className='comments-none comments '>

                    {/* if no comments then show 'be the first to comment ' */}

                    {postComments && postComments.length > 0 ? postComments.map(element => 
                            <Comment_row key={element._id} uid={element.uid._id} name={element.uid.name} comment={element.comment} date={element.date} />
                        )
                    : <h6 style={{textAlign:'center'}}> Be the First to Comment</h6>
                    }
                </div>

            </div>

        </div>
    )
}

export default Post_Item 