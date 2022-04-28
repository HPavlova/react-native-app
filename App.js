import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import useRoute from './router';

const loadApplication = async () => {
  await Font.loadAsync({
    "DMMono-Regular": require("./assets/fonts/DM_Mono/DMMono-Regular.ttf"),
  });
};

export default function App() {
  const [isReady, setisReady] = useState(false);
  const routing = useRoute({});

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setisReady(true)}
        onError={console.warn}
      />
    );
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
