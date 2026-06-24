import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView, { type WebViewMessageEvent } from "react-native-webview";
import { type AuthUser, useAuth } from "../contexts/AuthContext";
import { api, setSessionToken } from "../services/api";
import type { MeResponse } from "../types/api";

const LOGIN_URL = "https://nextwork.ai";

// Injected after each page load — posts document.cookie to React Native
const COOKIE_INJECTOR = `
  (function() {
    try {
      window.ReactNativeWebView.postMessage(document.cookie);
    } catch(e) {}
  })();
  true;
`;

function cookieValue(cookieStr: string, name: string): string {
  const match = cookieStr.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function buildUser(me: MeResponse | null): AuthUser {
  const name =
    me?.name ??
    [me?.firstName, me?.lastName].filter(Boolean).join(" ") ??
    "";
  const initials =
    name
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";
  return {
    name,
    initials,
    avatarUrl: me?.avatarUrl ?? me?.avatar ?? "",
    bio: me?.bio ?? "",
    email: me?.email ?? "",
    joinedLabel: "",
  };
}

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [webLoading, setWebLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const processedRef = useRef(false);

  async function handleCookieMessage(event: WebViewMessageEvent) {
    if (processedRef.current) return;

    const cookies = event.nativeEvent.data;
    const token = cookieValue(cookies, "auth-session");

    if (!token) return;

    processedRef.current = true;
    setProcessing(true);

    try {
      setSessionToken(token);

      let me: MeResponse | null = null;
      try {
        me = await api.getMe();
      } catch {
        // /api/v1/me may not exist — proceed with fallback user
      }

      await login(token, buildUser(me));
      router.back();
    } catch {
      processedRef.current = false;
      setProcessing(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F5F3" }} edges={["top"]}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#E6E6E6",
          backgroundColor: "#FFFFFF",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Close login"
        >
          <Ionicons name="close" size={24} color="#1B1918" />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 16,
            fontFamily: "Inter_600SemiBold",
            color: "#1B1918",
          }}
        >
          Sign in to NextWork
        </Text>
        {/* Balance the close icon */}
        <View style={{ width: 24 }} />
      </View>

      {/* Loading overlay while processing the session */}
      {processing && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(247,245,243,0.92)",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" color="#1B1918" />
          <Text
            style={{
              marginTop: 16,
              fontSize: 15,
              fontFamily: "Inter_600SemiBold",
              color: "#1B1918",
            }}
          >
            Signing you in…
          </Text>
        </View>
      )}

      {/* WebView loading spinner */}
      {webLoading && !processing && (
        <View
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            alignItems: "center",
            zIndex: 5,
          }}
        >
          <ActivityIndicator size="large" color="#1B1918" />
        </View>
      )}

      <WebView
        source={{ uri: LOGIN_URL }}
        style={{ flex: 1 }}
        onLoadStart={() => setWebLoading(true)}
        onLoadEnd={() => {
          setWebLoading(false);
        }}
        injectedJavaScript={COOKIE_INJECTOR}
        onMessage={handleCookieMessage}
        javaScriptEnabled
        domStorageEnabled
        thirdPartyCookiesEnabled
        sharedCookiesEnabled
      />
    </SafeAreaView>
  );
}
