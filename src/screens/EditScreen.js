import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen = ({ navigation }) => {
  const { state, editBlogPost } = useContext(Context);

  const id = navigation.getParam("id");

  const existingBlogPost = state.find(post => post.id === id);

  const { title, description } = existingBlogPost;

  const [editedBlogPost, setNewPost] = useState({
    title,
    description,
    id
  });

  return (
    <BlogPostForm
      postTitle={title}
      postDescription={description}
      postId={id}
      title_title="Edit title:"
      title_description="Edit description"
      navigatePop={() => navigation.navigate("Index")}
      onSubmitAction={editBlogPost}
    />
  );
};

EditScreen.navigationOptions = () => {
  return {
    title: "Edit blog post"
  };
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#f0eeee",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
    padding: 10
  },
  inputStyleDescription: {
    backgroundColor: "#f0eeee",
    height: 100,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
    padding: 10
  },
  LargeTitle: {
    fontSize: 30,
    padding: 10,
    paddingBottom: 0,
    marginTop: 5
  }
});

export default EditScreen;
