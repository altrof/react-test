import classes from "./Post.module.css"


const Post = (props) => {
  return (
        <div className={classes.post}>
          
          <img src={props.profile.photos.small}  />
          {props.post}
          <div>
            <span>Likes: {props.likesCount}</span>
            
          </div>
          
        </div>
  )
}

export default Post;