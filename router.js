import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/main/PostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";
import CreateScreen from "./screens/main/CreateScreen";
// import Home from "./screens/Home";

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegisterScreen}
        />
        {/* <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Start screen" }}
          /> */}
      </Stack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="postage-stamp"
              size={size}
              color={color}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
               options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
                ),
              }}
        name="Profile"
        component={ProfileScreen}
      ></MainTab.Screen>
      <MainTab.Screen
               options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => (
                    <AntDesign name="pluscircleo" size={size} color={color} />
                ),
              }}
        name="Create"
        component={CreateScreen}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
}
