import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const Nav_search_row = (props) => {

  const {_id, name, email} = props

  // const [userImg, setUserImg] = useState()
  const [fetchProfileImg, setFetchProfileImg] = useState()

  useEffect( ()=> {
    async function fetc(){
      // let result = fetch('')
      let response = await fetch('http://localhost:3001/userDetails/profilePic', {
        method: 'GET',
        headers: { uid: _id }
    })

    response = await response.json()

    console.log('response search FetchProfileImg:  ', response)

    setFetchProfileImg(response.response[0].profilePic)

    }

    fetc()
  }, [])

  
  return (
    <div className='my-1'>
            
                <div className='post_item_header mx-3'>
                    {/* <img src={avatar} alt="Avatar" className="userImage" /> */}
                    {fetchProfileImg ?
                      <img src={`data:image;base64,${fetchProfileImg}`} alt="img" className="userImage" />
                      :
                      <img src={require('./img_avatar.png')} alt="img" className="userImage" />


                    }

                    {/* <h6 className='mx-2'> user_name </h6> */}
                    <div className="mx-1 search_userDetails">
                        <Link to={`userProfile/${_id}`} className='search_user_name'>
                          <h6 className=''> {name} </h6>
                          <p><i>{email}</i></p>
                        </Link>

                        {/* <i><p>{email}</p></i> */}
                    </div>
                    <button className='search-follow-btn' >Follow</button>
                    
                </div>

            </div>
  )
}

export default Nav_search_row