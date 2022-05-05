import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import useRoute from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const loadApplication = async () => {
  await Font.loadAsync({
    "DMMono-Regular": require("./assets/fonts/DM_Mono/DMMono-Regular.ttf"),
  });
};

export default function App() {
  const [isReady, setisReady] = useState(false);
  const [user, setUser] = useState(null);
  
  onAuthStateChanged(auth, (user) => setUser(user));
  const routing = useRoute(user);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setisReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
