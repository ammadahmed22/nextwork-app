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

const LOGIN_URL = "https://nextwork.ai";

// Injected after every page load.
// Posts JSON with cookies + any profile data visible in the DOM.
// Falls back to posting plain cookie string if JSON fails.
const COOKIE_INJECTOR = `
(function() {
  try {
    var cookies = document.cookie;

    // Look for profile picture — matches /uploads/ or profile_picture pattern
    var imgs = Array.from(document.querySelectorAll('img'));
    var profileImg = imgs.find(function(img) {
      return img.src && (
        img.src.indexOf('profile_picture') !== -1 ||
        img.src.indexOf('/uploads/') !== -1
      );
    });

    // Look for user display name in common nav/header patterns
    var nameEl = document.querySelector(
      '[class*="userName"], [class*="user-name"], [class*="displayName"], [data-user-name], [class*="NavUser"], [class*="nav-user"]'
    );

    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'auth_data',
      cookies: cookies,
      avatarUrl: profileImg ? profileImg.src : '',
      name: nameEl ? (nameEl.textContent || '').trim() : '',
    }));
  } catch(e) {
    try { window.ReactNativeWebView.postMessage(document.cookie); } catch(_) {}
  }
})();
true;
`;

function cookieValue(cookieStr: string, name: string): string {
  const match = cookieStr.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : "";
}

async function buildUserFromSources(
  domData: { name: string; avatarUrl: string }
): Promise<AuthUser> {
  let name = domData.name;
  let avatarUrl = domData.avatarUrl;
  let bio = "";
  let joinedLabel = "";

  // Try /api/v1/me — may or may not exist on nextwork.ai
  try {
    const me = await api.getMe();
    if (me) {
      name =
        name ||
        me.name ||
        [me.firstName, me.lastName].filter(Boolean).join(" ") ||
        "";
      avatarUrl = avatarUrl || me.avatarUrl || me.avatar || "";
      bio = me.bio || "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const createdAt = (me as any).createdAt as string | undefined;
      if (createdAt) {
        joinedLabel = `Joined ${new Date(createdAt).getFullYear()}`;
      }
    }
  } catch {
    // endpoint may not exist — continue with other sources
  }

  // Portfolio endpoint is confirmed working — use description as bio fallback
  try {
    const portfolio = await api.getPortfolio();
    bio = bio || portfolio.description || "";
  } catch {
    // no session or no portfolio — skip
  }

  const initials =
    name
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return { name, initials, avatarUrl, bio, email: "", joinedLabel };
}

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [webLoading, setWebLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const processedRef = useRef(false);

  async function handleMessage(event: WebViewMessageEvent) {
    if (processedRef.current) return;

    const raw = event.nativeEvent.data;
    let cookieStr = raw;
    let domName = "";
    let domAvatarUrl = "";

    // Try to parse enhanced JSON payload
    try {
      const parsed = JSON.parse(raw) as {
        type?: string;
        cookies?: string;
        avatarUrl?: string;
        name?: string;
      };
      if (parsed.type === "auth_data") {
        cookieStr = parsed.cookies ?? "";
        domName = parsed.name ?? "";
        domAvatarUrl = parsed.avatarUrl ?? "";
      }
    } catch {
      // plain cookie string fallback — cookieStr already set
    }

    const token = cookieValue(cookieStr, "auth-session");
    if (!token) return;

    processedRef.current = true;
    setProcessing(true);

    try {
      setSessionToken(token);
      const user = await buildUserFromSources({ name: domName, avatarUrl: domAvatarUrl });
      await login(token, user);
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
        <View style={{ width: 24 }} />
      </View>

      {/* Processing overlay */}
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
        onLoadEnd={() => setWebLoading(false)}
        injectedJavaScript={COOKIE_INJECTOR}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        thirdPartyCookiesEnabled
        sharedCookiesEnabled
      />
    </SafeAreaView>
  );
}
