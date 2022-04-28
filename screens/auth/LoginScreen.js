import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Button,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  console.log(Platform.OS);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );
  const image = require("../../assets/images/luxfon.com-17592.jpg");

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      console.log(width);
      setdimensions(width);
    };
    // const subscription = Dimensions.addEventListener("change", onChange);
    Dimensions.addEventListener("change", onChange);
    return () => {
      // subscription?.remove();
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setisShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 100,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello again</Text>
                <Text style={styles.headerTitle}>Welcome back</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>EMAIL</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setisShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setisShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <View>
                <TouchableOpacity style={styles.btn} onPress={keyboardHide}>
                  <Text style={styles.btnTitle}>SIGN IN</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Registration");
                }}
                style={{ marginTop: 20, alignItems: "center" }}
              >
                <Text style={{ color: `#fff` }}>
                  New to aplication?{"  "}
                  <Text style={{ fontSize: 20, color: `#ffc0cb` }}>
                    Sign Up
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginHorizontal: 40,
  },
  input: {
    height: 40,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 6,
  },
  inputTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "DMMono-Regular",
  },
  btn: {
    height: 40,
    backgroundColor: "pink",
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 40,
    ...Platform.select({
      ios: {
        borderColor: "pink",
      },
      android: {
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: "#fff",
    fontSize: 18,
  },
  header: {
    alignItems: "center",
    marginBottom: 150,
  },
  headerTitle: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "DMMono-Regular",
  },
});
