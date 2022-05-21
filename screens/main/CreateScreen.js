import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage();

export default function CreateScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    if (!camera) {
      return;
    }
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };

  const sendPhoto = () => {
    uploadPhotoToServer();
    navigation.navigate("DefaultScreen", { photo });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();
    const data = await ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(data, file);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
        <Text style={styles.sendlabel}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    // flex: 1,
    height: "70%",
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snapContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 50,
    // marginTop: 200,
    marginBottom: 20,
  },
  snap: {
    color: "#fff",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderWidth: 1,
    borderColor: "#fff",
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
  },
  sendlabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
});
