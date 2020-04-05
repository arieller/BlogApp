import React, { useReducer } from "react";
import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  //reducer gets current state and a dispatched action
  switch (action.type) {
    case "GET_BLOGPOSTS":
      return action.payload;
    case "REMOVE_BLOGPOST":
      return state.filter(post => post.id != action.id);
    case "EDIT_BLOGPOST":
      return state.map(post => {
        return post.id === action.newPost.id ? action.newPost : post;
      });
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get("./blogposts");

    dispatch({ type: "GET_BLOGPOSTS", payload: response.data });
  };
};

const removeBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: "REMOVE_BLOGPOST", id });
  };
};

const createBlogPost = dispatch => {
  return async (newPost, navigatePop) => {
    await jsonServer.post("/blogposts", newPost);

    if (navigatePop) {
      navigatePop();
    }
  };
};

const editBlogPost = dispatch => {
  return async (newPost, navigatePop) => {
    await jsonServer.put(`/blogposts/${newPost.id}`, {
      title: newPost.title,
      description: newPost.description
    });

    // dispatch({ type: "EDIT_BLOGPOST", newPost });

    if (navigatePop) {
      navigatePop();
    }
  };
};

export const { Context, Provider } = createDataContext(
  //the whole point of this component is to use the barebone of createDataContext for a specific context for the blog posts
  blogReducer, //the reducer created in this file for the blog posts
  { removeBlogPost, createBlogPost, editBlogPost, getBlogPosts }, //the actions, can be accessed by importing the context object in children
  []
); //this function exports context object to be used in children components and the provider wrapper, all according the the props passed
