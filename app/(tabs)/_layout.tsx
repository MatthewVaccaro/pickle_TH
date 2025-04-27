import { Tabs } from "expo-router";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useUserStore } from "@/store/user";

export default function TabLayout() {
  const user = useUserStore((state) => state.user);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.green.main,
        tabBarInactiveTintColor: Colors.black.light,
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"home"}
              size={24}
              color={focused ? Colors.green.main : Colors.black.light}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"person-circle"}
              size={24}
              color={focused ? Colors.green.main : Colors.black.light}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          href: user ? "/orders" : null,
          title: "Orders",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"basket"}
              size={24}
              color={focused ? Colors.green.main : Colors.black.light}
            />
          ),
        }}
      />
    </Tabs>
  );
}
