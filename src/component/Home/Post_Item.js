import React,{useState, useEffect} from 'react'
import './Post_Item.css'
import avatar from './img_avatar.png'

const Post_Item = (props) => {
    const {file, name,email, uid} = props

//------------------- fetching profile  
  const [fetchProfileImg, setFetchProfileImg] = useState()

  useEffect( ()=> {
    async function fetc(){
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
                {/* <img src={avatar} alt="Avatar" className="userImage" /> */}
                {/* <img src={avatar} alt="Avatar" className="userImage" /> */}

                {/* <h6 className='mx-2'> user_name </h6> */}
                <div className="mx-2">
                    <h6 className=''> {name} </h6>
                    <p className='location muted' ><i>{email}</i></p>
                </div>

            </div>

            {/* <img src={avatar} id='img' alt="Avatar" className='imgSrc' /> */}
            {/* user post file */}
            <img src={`data:image/png;base64,${file}`} id='img' alt="Avatar" className='imgSrc' />

            <div className="post_item_header my-2">
                <img className='mx-2 like' src={require('./icons/_like_icon.ico')} alt="Avatar" />
                <img className='mx-2 comment' src={require('./icons/_comment_icon.png')} alt="Avatar" />
                <img className='mx-2 share' src={require('./icons/_share_icon.png')} alt="Avatar" />
            </div>
            <div className="container">
                <p>100 likes</p>
                {/* <h4><b>John Doe</b></h4> */}
                <p id='desc'>Description of the user..</p>
                <p>Comments....</p>
            </div>

        </div>
    )
}

export default Post_Item





// <div className='post_item_header my-2 mx-3'>
// <img src={avatar} alt="Avatar" className="userImage" />

// {/* <h6 className='mx-2'> user_name </h6> */}
// <div className="mx-2">
//     <h6 className=''> user_name </h6>
//     <p className='location' >location</p>
// </div>

// </div>
// <img src={avatar} id='img' alt="Avatar" className='imgSrc' />
// <div className="post_item_header my-2">
// <img className='mx-2 like' src={require('./icons/_like_icon.ico')} alt="Avatar" />
// <img className='mx-2 comment' src={require('./icons/_comment_icon.png')} alt="Avatar" />
// <img className='mx-2 share' src={require('./icons/_share_icon.png')} alt="Avatar" />
// </div>
// <div className="container">
// <p>100 likes</p>
// {/* <h4><b>John Doe</b></h4> */}
// <p id='desc'>Description of the user..</p>
// <p>Comments....</p>
// </div>
