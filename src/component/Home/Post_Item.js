// don't know why body was not sending in fetch api
import React, { useState, useEffect, useId } from 'react'
import { Link } from 'react-router-dom'
import './Post_Item.scss'
import avatar from './img_avatar.png'
import Comment_row from './Post_Item/Comment_row'
import $ from 'jquery'

const Post_Item = (props) => {
    const { pid, file, name, location, uid, description } = props
    const backend = process.env.REACT_APP_BACKEND

    const authtoken = localStorage.getItem('authtoken')

    //------------------- fetching profile  ----------------
    const [fetchTargetProfileImg, setFetchTargetProfileImg] = useState()

    useEffect(() => {
        async function fetc() {
            // let result = fetch(''
            let response = await fetch(`${backend}/userDetails/profilePic`, {
                method: 'GET',
                headers: { uid: uid }
            })

            response = await response.json()
            // console.log('response search FetchTargetProfileImg:  ', response)
            if (response.response[0])
                setFetchTargetProfileImg(response.response[0].profilePic)

        }

        fetc()
    }, [])


    // ----------------fetch current User-Profile Pic-----------------------
    const [currUserProfilePic, setCurrUserProfilePic] = useState()

    useEffect(() => {
        async function fetc() {
            // let result = fetch(''
            let response = await fetch(`${backend}/userDetails/profilePic`, {
                method: 'GET',
                headers: { uid: localStorage.getItem('uid') }
            })

            response = await response.json()
            // console.log('response search currUserProfileImg:  ', response)
            if (response.response[0])
                setCurrUserProfilePic(response.response[0].profilePic)

        }

        fetc()
    }, [])



    //   ---------------fetching likes & checking if liked-------------------
    const [totalLikes, setTotalLikes] = useState('...')
    const [isLiked, setIsLiked] = useState(false)



    useEffect(() => {
        async function fetc() {

            let response = await fetch(`${backend}/likes`, {
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
        setIsLiked(true)
        let response = await fetch(`${backend}/likes`, {
            method: 'POST',
            headers: { authtoken, pid }
        })

        if (response.status !== 200)
            setIsLiked(false)
        // console.log('like response: ', response)
    }


    //   -------------------unlike the post----------------------
    const unlikePost = async () => {
        setTotalLikes(s => s - 1)
        setIsLiked(false)
        let response = await fetch(`${backend}/likes`, {
            method: 'DELETE',
            headers: { authtoken, pid }
        })

        if (response.status !== 200)
            setIsLiked(true)
        console.log('unlike response: ', response)
    }


    // -----------------------check isSaved Post--------------------------
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        async function fetc() {
            let response = await fetch(`${backend}/saved/isSaved`, {
                headers: { authtoken, pid }
            })
            response = await response.json()

            if (response.result)
                setIsSaved(response.result)
        }

        fetc()
    }, [])


    // ------------------ saving Post -----------------------------

    const savePost = async () => {
        let response = await fetch(`${backend}/saved`, {
            method: 'POST',
            headers: { authtoken, pid }
        })

        response = await response.json()

        console.log('saving post response: ', JSON.stringify(response))
        if (response.result == true)
            setIsSaved(true)
    }

    // ------------------ saving Post -----------------------------

    const unSavePost = async () => {
        let response = await fetch(`${backend}/saved`, {
            method: 'DELETE',
            headers: { authtoken, pid }
        })

        response = await response.json()

        if (response.result == true)
            setIsSaved(false)
    }







    // ------------------- toggle comments -----------------------
    const uniqueId = useId()
    const toggleComments = () => {
        document.getElementById(`${uniqueId}`).classList.toggle('comments-none')
    }

    const showComments = () => {
        document.getElementById(`${uniqueId}`).classList.remove('comments-none')
    }

    // --------------------- Comment Send --------------------------

    const [yourComment, setYourComment] = useState()

    const commentHandle = async (e) => {

        setYourComment(e.target.value)
    }

    const sendComment = async () => {
        if (!yourComment) return alert('please write something in comment box to submit')

        let response = await fetch(`${backend}/comments`, {
            method: 'POST',
            headers: { authtoken: localStorage.getItem('authtoken'), pid, comment: yourComment },
            body: { "comment": yourComment }
        }).then((response) => {
            return response.json();
        }).then(async (data) => {
            console.log(data);
            await fetchComments()
        })


    }







    // --------------------- Comment fetch of current Post --------------------------

    const [postComments, setPostComments] = useState()
    const fetchComments = async () => {

        let response = await fetch(`${backend}/comments`, {
            headers: { pid }
        })

        response = await response.json()
        setPostComments(response.response)

    }

    // --------------------- delete dropdown --------------------
    const [isDeleted, setIsDeleted] = useState(false)

    const deleteDropdownId = useId()
    const dropdownDelete = () => {
        const e = document.getElementById(deleteDropdownId)
        e.classList.toggle('show')
    }

    const deletePost = async () => {
        console.log('to delete pid:' + pid)
        let response = await fetch(`${backend}/posts`, {
            method: 'DELETE',
            headers: {
                authtoken: localStorage.getItem('authtoken'),
                pid: pid
            }
        })

        if (response.status === 200) {
            console.log('delete successful')
            setIsDeleted(true)
        }
        response = await response.json()
        console.log('delete post response: ')
        console.log(response)


    }



    // ======================================================================================================
    return (
        <div>
            {isDeleted ? <h6> The post has been removed </h6> :
                <div className='card'>

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

                        {localStorage.getItem('uid') === uid &&
                            <a style={{ marginLeft: 'auto', cursor: 'pointer' }}
                                data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-html="true" id="example"
                            >
                                <span class="material-symbols-outlined" onClick={dropdownDelete}>
                                    more_vert
                                </span>
                                <div id={deleteDropdownId} className='delete-post-dropdown' >
                                    <button onClick={deletePost} className='delete-btn'>Delete</button>
                                </div>
                            </a>
                        }



                    </div>

                    <img src={`data:image/png;base64,${file}`} onDoubleClick={isLiked == false ? likePost : unlikePost} id='img' alt="Avatar" className='imgSrc' />

                    <div className="post_item_header my-2">
                        {isLiked ?
                            <img className='mx-2 like' onClick={unlikePost} src={require('../../icons/_liked_icon.png')} alt="Avatar" />
                            : <img className='mx-2 like' onClick={likePost} src={require('../../icons/_like_icon.png')} alt="Avatar" />
                        }
                        <img className='mx-2 comment' src={require('../../icons/_comment_icon.png')} alt="comment" onClick={async () => { await toggleComments(); await fetchComments() }} />
                        <img className='mx-2 share' src={require('../../icons/_share_icon.png')} alt="share" />

                        {isSaved ?
                            <img className='save share' onClick={unSavePost} src={require('../../icons/saved.png')} alt="save" />
                            :
                            <img className='save share' onClick={savePost} src={require('../../icons/save.png')} alt="save" />
                        }
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

                            <input className='commentBox' type='text' name='comment' onFocus={async () => { showComments(); await fetchComments(); }} onChange={commentHandle} placeholder='Enter your comment here....' />

                            <button type='submit' className='commentSubmit' onClick={sendComment} >Post</button>

                        </div>

                        <p className='showCommentsButton' onClick={async () => { await toggleComments(); await fetchComments() }}>Comments....</p>

                        <div id={`${uniqueId}`} className='comments-none comments '>

                            {/* if no comments then show 'be the first to comment ' */}

                            {postComments && postComments.length > 0 ? postComments.map(element =>
                                <Comment_row key={element._id} uid={element.uid._id} name={element.uid.name} comment={element.comment} date={element.date} />
                            )
                                : <h6 style={{ textAlign: 'center' }}> Be the First to Comment</h6>
                            }
                        </div>

                    </div>

                </div>
            }
        </div>
    )
}

export default Post_Item 