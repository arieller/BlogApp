import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import uid from "uid";

const BlogPostForm = ({
  title_title = "Title:",
  title_description = "Description:",
  postTitle = "",
  postDescription = "",
  postId = "",
  navigatePop,
  onSubmitAction
}) => {
  const [err, setErr] = useState(0);

  const [newPost, setNewPost] = useState({
    title: postTitle ? postTitle : "",
    description: postDescription ? postDescription : "",
    id: postId ? postId : uid()
  });

  return (
    <View>
      <Text style={styles.LargeTitle}>{title_title}</Text>

      <TextInput
        value={newPost.title}
        onChangeText={newTitle => setNewPost({ ...newPost, title: newTitle })}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Title"
        style={styles.inputStyle}
      />

      <Text style={styles.LargeTitle}>{title_description}</Text>

      <TextInput
        value={newPost.description}
        onChangeText={newDescription =>
          setNewPost({ ...newPost, description: newDescription })
        }
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Description"
        style={styles.inputStyleDescription}
      />

      <Button
        title="Submit"
        onPress={() => {
          if (newPost.title === "" || newPost.description === "") {
            setErr(1);
            return;
          }
          console.log(newPost);
          onSubmitAction(newPost, navigatePop);
        }}
      />
      {err === 1 ? <Text>Please fill in the details</Text> : null}
    </View>
  );
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

export default BlogPostForm;
