import React, { useState, useEffect, useId } from 'react'
import {Link} from 'react-router-dom'

const Nav_search_row = (props) => {

  const {_id, name, email} = props
  const backend = process.env.REACT_APP_BACKEND

  const isThisUser = _id == localStorage.getItem('uid') ? true : false


  const [isFriend, setIsFriend] = useState(false)

    // ---------------------------------isFriend-------------------------------
    useEffect(() => {
      async function fetc() {
          let response = await fetch(`${backend}/follow`, {
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
      let response = await fetch(`${backend}/userDetails/profilePic`, {
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
const [follow_pressed, setFollow_pressed] = useState(false)
    //   const follow_btn_id = useId()
      async function follow() {
        if (!localStorage.getItem('authtoken')) {
            alert("To follow, first signIn!")
            // return;
        }

        else {
            // const e = document.getElementById(follow_btn_id)
            // e.setAttribute("disabled", true)
            if( follow_pressed === false ){
                console.log('follow pressed')
                setFollow_pressed(true)

                const authtoken = localStorage.getItem('authtoken')

                let response = await fetch(`${backend}/follow`, {
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
            setFollow_pressed(false)

        }
            // e.setAttribute("disabled", false)
        }


        // fetc()
    }


    // const unfollow_btn_id = useId()
    const unfollow = () => {
        if (!localStorage.getItem('authtoken')) {
            alert("To follow, first signIn!")
            return
        }

        

        async function fetc() {
            let response = await fetch(`${backend}/follow`, {
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
            // e.setAttribute("disabled", false)
        }

        if(follow_pressed === false){
            setFollow_pressed(true)
            fetc()
            setFollow_pressed(false)
        }
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
                        <Link to={`/userProfile/${_id}`} className='search_user_name'>
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