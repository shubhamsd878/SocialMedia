
import React from 'react'
import './Home.css'
import Navbar from './Home/Navbar_Home_Page'
import Post_Item from './Home/Post_Item'
import { useState, useEffect } from 'react'
import avatar from './Home/img_avatar.png'
var reverse = require("buffer-reverse")
const likeicon =require( './Home/icons/_like_icon.ico')
const commenticon =require( './Home/icons/_comment_icon.png')
const shareicon =require( './Home/icons/_share_icon.png')


const Home = () => {

const [ imgSrc , setSrc]= useState('imageSRc');
  
    useEffect( ()=>{

         fetch('http://localhost:3001/posts/fetch').then( (data)=>{ return data.json() })
         .then( ( data)=>{
          if(data.data.length>0)
          {

            let mainContainer = document.getElementById('mainContainer');
            for(var i=0;i<data.data.length;i++)
            {

              console.log(data.data);

            let  postItemHeaderUpper= document.createElement('div');
            postItemHeaderUpper.classList.add('post_item_header', "my-2","mx-3");
            let upperImage= document.createElement('img');
            upperImage.classList.add("userImage")
            upperImage.setAttribute('src',`data:image/png;base64,${data.data[i].file}`)
            postItemHeaderUpper.appendChild(upperImage)
            let nameLocation = document.createElement("div")
            nameLocation.classList.add("mx-2")
            let name = document.createElement('h6');
            name.innerText=`${data.data[i].uid}`
            let location = document.createElement("p")
            location.classList.add("location")
            location.innerText=`${data.data[i].location ?"workng":""}`
            nameLocation.appendChild(name)
            nameLocation.appendChild(location)
            postItemHeaderUpper.appendChild(nameLocation)
            console.log(nameLocation);
            console.log(postItemHeaderUpper);


            
            

            let img = document.createElement('img');
            img.classList.add('imgSrc');
            img.setAttribute('src',`data:image/png;base64,${data.data[i].file}`)

            let postItemHeaderMiddle= document.createElement('div');
            postItemHeaderMiddle.classList.add('post_item_header',"my-2")

            let like = document.createElement("img")
            like.classList.add('mx-2')
            like.classList.add('like')
            like.setAttribute('src',likeicon)
            let comment = document.createElement("img")
            comment.classList.add('mx-2')
            comment.classList.add('comment')
            comment.setAttribute('src',commenticon)

            let share = document.createElement("img")
            share.classList.add('mx-2')
            share.classList.add('share')
            share.setAttribute('src',shareicon)

            postItemHeaderMiddle.appendChild(like)
            postItemHeaderMiddle.appendChild(comment)
            postItemHeaderMiddle.appendChild(share)

            
            

            let postItemHeaderLower = document.createElement("div");
            postItemHeaderLower.classList.add("container")
            // console.log(postItemHeaderLower);

            let postLikes = document.createElement("p")
            let desc = document.createElement("p")
            let comments = document.createElement("p")

            postLikes.innerText=`${ data.data[i].likes ? "data.data[i].likes" :"" }`
            desc.innerText= `${ data.data[i].desc ? data.data[i].desc :"" }`
            comments.innerText=`${ data.data[i].comments ? data.data[i].comments :"" }`
            postItemHeaderLower.appendChild(postLikes)
            postItemHeaderLower.appendChild(desc)
            postItemHeaderLower.appendChild(comments)

            

            
              mainContainer.appendChild(postItemHeaderUpper)
            mainContainer.appendChild(img)
            mainContainer.appendChild(postItemHeaderMiddle)
            mainContainer.appendChild(postItemHeaderLower)


          //  document.getElementById("img").setAttribute('src',`data:image/png;base64,${data.data[i].file}`);
          //  document.getElementById('desc').innerText=data.data[i].desc;
            }

          }
         
      })
      .catch( (err)=>{
        console.log(err);
      })



    })
   
  return (
    <div>
        <div className='column'>
            <div className='post_column'>
                <Post_Item />
            </div>
        </div>
        <div className="column" >
            <div className='sticky-column' > hello world</div>
        </div>
       
    </div>
  )
}

export default Home