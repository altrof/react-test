import classes from "./MyPosts.module.css"
import Post from "./Post/Post"
import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
import Preloarder from '../../common/Preloarder/Preloarder';
import { PostType } from "../../types/types";

const maxLength10 = maxLengthCreator(10)

type PropsType = {
  posts: PostType
}
type StateType = {
  
}

const MyPosts: PropsType = React.memo(props => {
  let postsElements = props.posts.map(post => <Post profile={props.profile} post={post.message} likesCount={post.likesCount} />)

  
  let onAddNewPost = (values) => {
    props.addPost(values.newPostBody);
  }

  if (!props.profile) {
    return false
  } 
  return (
    <div className={classes.postBlock}> 
      <h3>My posts</h3>
      <AddPostFormRedux onSubmit={onAddNewPost} />
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
})

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <div>
      <div><Field component={Textarea} placeholder="Write your post here.." name={"newPostBody"} validate={[required, maxLength10]} /></div>
      <div><button>Add post</button></div>
    </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({form: 'post'})(AddNewPostForm)

export default MyPosts;