import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Button, FlatList, Image } from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const dbFirestore = getFirestore(db);

import { authSignOutUser } from "../../redux/auth/authOperations";

export default function ProfileScreen() {
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const q = query(
      collection(dbFirestore, "posts"),
      where("userId", "==", userId)
    );

    await onSnapshot(q, (data) =>
      setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
    );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <Button style={styles.btn} title="signOut" onPress={signOut} />
      <View>
      <FlatList
        data={userPosts}
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
          </View>
        )}
      ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: { marginTop: 50 },
});
