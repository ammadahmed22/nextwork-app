import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { PORTFOLIO_SEED } from "../../data/portfolio-seed";
import { projects } from "../../data/projects";

const NEXTWORK_BASE = "https://learn.nextwork.org/projects";

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ProjectWebView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // First try explore catalog (numeric ids)
  const catalogProject = projects.find((p) => p.id === id);

  // Then try portfolio seed (real slugs)
  const portfolioDoc = !catalogProject
    ? PORTFOLIO_SEED.find((d) => d.project.id === id)
    : null;

  const title =
    catalogProject?.title ??
    portfolioDoc?.title ??
    slugToTitle(id ?? "");

  const url =
    catalogProject?.url ?? `${NEXTWORK_BASE}/${id}`;

  if (!catalogProject && !portfolioDoc && !id) {
    return (
      <SafeAreaView className="flex-1 bg-nw-bg items-center justify-center">
        <Text className="text-nw-gray font-inter">Project not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-nw-bg" edges={["top"]}>
      {/* Header */}
      <View
        className="flex-row items-center px-4 h-14"
        style={{ backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#E6E6E6" }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center rounded-xl mr-3"
          style={{ backgroundColor: "#F7F5F3" }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={20} color="#1B1918" />
        </TouchableOpacity>

        <View className="flex-1 mr-2">
          <Text
            className="text-sm font-inter-semi"
            style={{ color: "#1B1918" }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text className="text-xs font-inter" style={{ color: "#6A6A6A" }} numberOfLines={1}>
            learn.nextwork.org
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL(url)}
          className="w-9 h-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#F7F5F3" }}
          accessibilityRole="button"
          accessibilityLabel="Open in browser"
        >
          <Ionicons name="open-outline" size={18} color="#6A6A6A" />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      {!loaded && (
        <View className="h-0.5 bg-nw-surface">
          <View
            className="h-full bg-nw-orange"
            style={{ width: `${Math.max(progress * 100, 8)}%` }}
          />
        </View>
      )}

      {/* Loading overlay */}
      {!loaded && (
        <View
          className="absolute inset-0 items-center justify-center"
          style={{ top: 56, zIndex: 10 }}
        >
          <ActivityIndicator size="large" color="#F97316" />
          <Text className="text-nw-gray text-sm font-inter mt-3">
            Loading project…
          </Text>
        </View>
      )}

      <WebView
        source={{ uri: url }}
        className="flex-1"
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        onLoad={() => setLoaded(true)}
        startInLoadingState={false}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
      />
    </SafeAreaView>
  );
}
