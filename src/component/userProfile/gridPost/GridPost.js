import './GridPost.scss'
// import postImg from '../temp_userprofile/post.jpg'

const GridPost = (props) => {
  return (
    <div className='grid-item'>
        <img src={props.src} className='post'></img>
    </div>
  )
}

export default GridPost