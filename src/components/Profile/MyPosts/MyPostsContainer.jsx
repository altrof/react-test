import React from 'react'
import { connect } from 'react-redux';
import { addPost } from "../../../redux/profile-reducer.js"
import MyPosts from "./MyPosts"


let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostBody: state.profilePage.newPostBody
  }
}

// "Создание велосипеда" CALLBACK
// Если передать 
/* let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostBody) => {
      dispatch(addPost(newPostBody))
    }
  }
} */

const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)

export default MyPostsContainer;