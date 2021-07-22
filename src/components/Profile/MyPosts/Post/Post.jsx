import classes from "./Post.module.css"

const Post = (props) => {
  return (
        <div className={classes.post}>
          <img src="https://hackr.io/blog/media/javascript.png" />
          {props.post}
          <div>
            <span>Likes: {props.likesCount}</span>
            
          </div>
          
        </div>
  )
}

export default Post;