
import profileReducer, { addPost, deletePost } from './profile-reducer';
import { render, screen } from '@testing-library/react';
import React from 'react'

let state = {
    posts: [
        { id: 1, message: 'Hello JavaScript!', likesCount: 36 },
        { id: 2, message: 'I am read to hacking!', likesCount: 73 },
        { id: 3, message: 'Lets start', likesCount: 94 }
    ]
}

test('length of posts should be incremented', () => {
    let action = addPost("altrof test")
    
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
  });

test('message of the post should be correct', () => {
    let action = addPost("altrof test")
    
    let newState = profileReducer(state, action)

    expect(newState.posts[3].message).toBe("altrof test")
});

test('after deleting length of messages should be decrement', () => {
    let action = deletePost(2)
    
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
});
  