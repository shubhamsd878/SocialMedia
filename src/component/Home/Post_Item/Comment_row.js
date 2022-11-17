import React, { useState, useEffect } from 'react'
import avatar from '../img_avatar.png'


const Comment_row = (props) => {
    const {uid,name, comment, date} = props


    // -------- fetching profile of commentor --------
    const [cmtProfileImg, setCmtProfileImg] = useState()
    useEffect(() => {
        async function fetc() {
            // let result = fetch(''
            let response = await fetch('http://localhost:3001/userDetails/profilePic', {
                method: 'GET',
                headers: { uid }
            })

            response = await response.json()

            setCmtProfileImg(response.response[0].profilePic)

        }

        fetc()
    }, [])


    return (
        <div>

            {/* <img src={avatar} alt="img" className="userImage" /> */}
            {cmtProfileImg ?
                            <img src={`data:image;base64,${cmtProfileImg}`} alt="" className="userImage" />
                            :
                            <img src={avatar} alt="img" className="userImage" />
                        }

            <div >
                <h6><b>{name}</b></h6>
                <p>
                    {comment}
                </p>
                <p className='commentDate'>{date}</p>
                {/* <p className='commentDate'>20 Jan 2020 at 20:20</p> */}
                <hr></hr>
            </div>






            {/* <img src={avatar} alt="img" className="userImage" />
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
            </div> */}
        </div>
    )
}

export default Comment_row