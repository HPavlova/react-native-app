import {
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  
  export default function LoginScreen() {
    console.log(Platform.OS);
    
    const image = require("../assets/images/luxfon.com-17592.jpg");

    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>EMAIL</Text>
              <TextInput style={styles.input} textAlign={"center"} />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.inputTitle}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                secureTextEntry={true}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTitle}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
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
    },
    btn: {
      height: 40,
      backgroundColor: "pink",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: Platform.OS ==='ios' ? 'pink' : 'transparent',
      marginTop: 40,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 40,
    },
    btnTitle: {
      color: "#fff",
      fontSize: 18,
    },
  });
  