import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = ({ navigation }) => {
  const { createBlogPost } = useContext(Context);

  return (
    <BlogPostForm
      title_title="Enter title:"
      title_description="Enter description"
      navigate={navigation.navigate}
      onSubmitAction={createBlogPost}
      navigatePop={() => navigation.pop()}
      navgiateTo="Index"
    />
  );
};

CreateScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Create blog post"
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

export default CreateScreen;
