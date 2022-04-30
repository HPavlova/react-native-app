import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CommentsScreen from "../nested/CommentsScreen";
import DefaultScreenPosts from "../nested/DefaultScreenPosts";
import MapScreen from "../nested/MapScreen";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
