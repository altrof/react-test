import { ProfileType } from "../../../types/types";
import classes from "./Post.module.css"

type PropsType = {
  post: string
  profile: ProfileType
  likesCount: number
}

const Post = (props: PropsType) => {
  return (
        <div className={classes.post}>
          
          <img alt={props.profile.photos.small || ""}  />
          {props.post}
          <div>
            <span>Likes: {props.likesCount}</span>
            
          </div>
          
        </div>
  )
}

export default Post;