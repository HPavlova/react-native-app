import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";

import { authSignOutUser } from "../../redux/auth/authOperations";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="signOut" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
