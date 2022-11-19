import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const Nav_search_row = (props) => {

  const {_id, name, email} = props

  const isThisUser = _id == localStorage.getItem('uid') ? true : false


  const [isFriend, setIsFriend] = useState(false)

    // ---------------------------------isFriend-------------------------------
    useEffect(() => {
      async function fetc() {
          let response = await fetch('http://localhost:3001/follow', {
              headers: {
                  authtoken: localStorage.getItem('authtoken'),
                  targetuid: _id
              }
          })

          response = await response.json()

          if (response.isFollowing == true) {
              setIsFriend(true)
          }
      }

      fetc()
  }, [])

//   --------------------- fetch image ------------------------

  const [fetchProfileImg, setFetchProfileImg] = useState()

  useEffect( ()=> {
    async function fetc(){
      // let result = fetch('')
      let response = await fetch('http://localhost:3001/userDetails/profilePic', {
        method: 'GET',
        headers: { uid: _id }
    })

    response = await response.json()
    // console.log('response search FetchProfileImg:  ', response)

    setFetchProfileImg(response.response[0].profilePic)
    }

    fetc()
  }, [])



      // ------------------------------- follow friend ------------------------------
      async function follow() {
        if (!localStorage.getItem('authtoken')) {
            alert("To follow, first signIn!")
            // return;
        }

        else {

            const authtoken = localStorage.getItem('authtoken')

            let response = await fetch('http://localhost:3001/follow', {
                method: 'POST',
                headers: {
                    authtoken: authtoken,
                    targetuid: _id
                },
                // body: JSON.stringify({ targetUid: uid })
            })

            response = await response.json()

            console.log('follow successfull: ', response)

            if (response.status == 200) {
                setIsFriend(true)
            }
        }


        // fetc()
    }



    const unfollow = () => {
        if (!localStorage.getItem('authtoken')) {
            alert("To follow, first signIn!")
            return
        }

        console.log(JSON.stringify({ targetUid: _id }))

        async function fetc() {
            let response = await fetch('http://localhost:3001/follow', {
                method: 'DELETE',
                headers: {
                    authtoken: localStorage.getItem('authtoken'),
                    targetUid: _id
                },
                // body: JSON.stringify({ targetUid: uid })
            })

            response = await response.json()

            console.log('unfollow(): ', response)
            if (response.status == 200) {
                setIsFriend(false)
            }
        }


        fetc()
    }


  
  return (
    <div className='search-row'>
            
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
                          <h6 className='searchName'> {name} </h6>
                          <p className='searchEmail'><i>{email}</i></p>
                        </Link>

                        {/* <i><p>{email}</p></i> */}
                    </div>
                    
                    {!isThisUser && (!isFriend ?
                                <button className='follow search-follow-btn' onClick={follow}>Follow</button>
                                :
                                <button className='unfollow search-unfollow-btn' onClick={unfollow}>Following</button>
                                )
                            }
                    
                </div>

            </div>
  )
}

export default Nav_search_row