import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text } from "react-native";
import { getFirestore, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
const dbFirestore = getFirestore(db);

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    await onSnapshot(collection(dbFirestore, "posts"), (data) =>
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
            <View style={styles.commentContainer}>
              <Text>{item.comment}</Text>
            </View>
            <View>
              <Button
                title="go to map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title="go to Comments"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              />
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  commentContainer: { margin: 10 },
});
