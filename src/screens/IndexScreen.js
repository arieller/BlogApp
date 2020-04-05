import React, { useContext, useEffect } from "react"; //import useContext
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity
} from "react-native";
import { Context } from "../context/BlogContext"; //import the context object created
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, addBlogPost, removeBlogPost, getBlogPosts } = useContext(
    Context
  ); //use the context object in a nested child

  useEffect(() => {
    //when component is mounted , do this: (one time)
    getBlogPosts();

    const listener = navigation.addListener("didFocus", () => {
      // this is an option from navigation, everytime useful for making additional API calls when a user revisits a particular screen in a Tab Navigator, or to track user events as they tap around our app.
      getBlogPosts();
    });

    return () => {
      //soon is our component is not visible, remove listener (listeners persist and can cause a memory leak)
      listener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {state.length === 0 ? <Text>No blog posts</Text> : null}

      <FlatList
        data={state}
        style={{ font: 30 }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Show", {
                  id: item.id
                })
              }
            >
              <View style={styles.blogPost}>
                <Text style={{ fontSize: 18 }}>{item.title}</Text>
                <Feather
                  name="trash"
                  size={30}
                  onPress={() => removeBlogPost(item.id)}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  //navigationOptions is checked before rendering, you can customize each screen with this.
  return {
    title: "Index",
    headerRight: () => (
      //configuring an icon with an onPress navigation feature
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} style={{ marginRight: 20 }} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  blogPost: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#c0c0c0"
  }
});

export default IndexScreen;
