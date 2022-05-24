import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
const dbFirestore = getFirestore(db);

export default function CommentsScreen({ route }) {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickname } = useSelector((state) => state.auth);
  const postsRef = doc(dbFirestore, "posts", postId);
  const commentsRef = doc(collection(postsRef, "comments"));

  useEffect(() => {
    getAllComments();
  }, []);

  const createPost = async () => {
    await setDoc(commentsRef, {
      comment,
      nickname,
    });
  };

  const getAllComments = async () => {
    await onSnapshot(collection(postsRef, "comments"), (data) =>
      setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({item}) => (
            <View style={styles.commentContainer}>
              <Text>{item.nickname}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} />
      </View>
      <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
        <Text style={styles.sendlabel}>add post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
  },
  commentContainer:{
    borderWidth: 1,
    borderColor: "#20b2aa",
    padding: 10,
    marginHorizontal:10,
    marginBottom: 10,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  sendlabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
  inputContainer: { marginHorizontal: 10, marginBottom: 20 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#20b2aa",
  },
});
