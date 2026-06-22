import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

type IoniconsName = keyof typeof Ionicons.glyphMap;

interface TabConfig {
  name: string;
  title: string;
  icon: IoniconsName;
  iconFocused: IoniconsName;
}

const TABS: TabConfig[] = [
  { name: "index", title: "Home", icon: "home-outline", iconFocused: "home" },
  { name: "explore", title: "Explore", icon: "compass-outline", iconFocused: "compass" },
  { name: "community", title: "Community", icon: "people-outline", iconFocused: "people" },
  { name: "profile", title: "Profile", icon: "person-outline", iconFocused: "person" },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1B1918",
          borderTopWidth: 0,
          elevation: 0,
          // No fixed height — let expo-router + safe-area handle it naturally
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#D6FF3F",
        tabBarInactiveTintColor: "#6A6A6A",
        tabBarLabelStyle: {
          fontFamily: "Inter_600SemiBold",
          fontSize: 10,
          marginTop: 2,
        },
      }}
    >
      {TABS.map(({ name, title, icon, iconFocused }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? iconFocused : icon}
                size={22}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
