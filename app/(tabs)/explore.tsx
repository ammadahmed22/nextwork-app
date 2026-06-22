import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryGrid from "../../components/CategoryGrid";
import { useCategories } from "../../hooks/useCategories";
import type { CategoryGroup } from "../../types/api";

type TabKey = "all" | "roadmaps" | "specialty" | "tools";

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "roadmaps", label: "Roadmaps" },
  { key: "specialty", label: "Specialty" },
  { key: "tools", label: "Tools" },
];

export default function ExploreScreen() {
  const { allGroups, roadmapGroups, specialtyGroups, toolGroups, loading, error, refresh } =
    useCategories();
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const groupsByTab: Record<TabKey, CategoryGroup[]> = {
    all: allGroups,
    roadmaps: roadmapGroups,
    specialty: specialtyGroups,
    tools: toolGroups,
  };
  const groups = groupsByTab[activeTab];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F5F3" }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8 }}>
        <Text
          style={{
            color: "#1B1918",
            fontSize: 28,
            fontFamily: "Inter_700Bold",
          }}
        >
          Explore Projects
        </Text>
      </View>

      {/* Type pills — outer View owns the vertical padding so the ScrollView
          never constrains the pill height */}
      <View style={{ paddingVertical: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 24 }}
        >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: isActive ? "#1B1918" : "#FFFFFF",
                borderWidth: 1,
                borderColor: isActive ? "#1B1918" : "#E6E6E6",
                marginRight: 8,
              }}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={{
                  color: isActive ? "#FFFFFF" : "#6A6A6A",
                  fontSize: 13,
                  fontFamily: isActive ? "Inter_600SemiBold" : "Inter_400Regular",
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        </ScrollView>
      </View>

      {/* Error banner */}
      {error && !loading && (
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 12,
            padding: 12,
            borderRadius: 12,
            backgroundColor: "#FFF8F0",
            borderWidth: 1,
            borderColor: "#FFDAB8",
          }}
        >
          <Text
            style={{
              color: "#92400E",
              fontSize: 13,
              fontFamily: "Inter_600SemiBold",
              marginBottom: 4,
            }}
          >
            API error
          </Text>
          <Text
            style={{
              color: "#92400E",
              fontSize: 12,
              fontFamily: "Inter_400Regular",
              marginBottom: 8,
            }}
            numberOfLines={2}
          >
            {error}
          </Text>
          <TouchableOpacity onPress={refresh}>
            <Text style={{ color: "#1B1918", fontSize: 12, fontFamily: "Inter_600SemiBold" }}>
              Tap to retry →
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#1B1918" />
          <Text
            style={{
              color: "#6A6A6A",
              fontSize: 14,
              fontFamily: "Inter_400Regular",
              marginTop: 16,
            }}
          >
            Loading categories…
          </Text>
        </View>
      ) : (
        <CategoryGrid groups={groups} />
      )}
    </SafeAreaView>
  );
}
