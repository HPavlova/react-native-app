import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import  Main from "./components/Main";

const loadApplication = async () => {
  await Font.loadAsync({
    "DMMono-Regular": require("./assets/fonts/DM_Mono/DMMono-Regular.ttf"),
  });
};

export default function App() {
  const [isReady, setisReady] = useState(false);

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
      <Main />
    </Provider>
  );
}
