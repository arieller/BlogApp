import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons"; //here for the Edit icon

const ShowScreen = ({ navigation }) => {
  const id = navigation.getParam("id");

  const { state } = useContext(Context);

  const blogPost = state.find(post => post.id === id);

  const { title, description } = blogPost;

  return (
    <View>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Blog post",
    headerRight: () => (
      //configuring an icon with an onPress navigation feature
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <Feather name="edit-2" size={30} style={{ marginRight: 20 }} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  blogPost: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default ShowScreen;
