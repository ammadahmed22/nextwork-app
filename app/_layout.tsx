import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";
import { AuthProvider } from "../contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    FKGroteskNeue_Medium: require("../assets/FKGroteskNeue-Medium.ttf"),
    SuisseNeue_Medium: require("../assets/SuisseNeue-Medium-WebS.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="login"
          options={{ animation: "slide_from_bottom", presentation: "modal" }}
        />
        <Stack.Screen
          name="project/[id]"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="category/[name]"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </AuthProvider>
  );
}
