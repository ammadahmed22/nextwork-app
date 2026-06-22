import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CURRENT_USER } from "../../constants/auth";
import { usePortfolio } from "../../hooks/usePortfolio";

const BADGES = [
  { label: "AWS Builder", color: "#F59E0B" },
  { label: "Cloud Pro", color: "#06B6D4" },
  { label: "Security+", color: "#8B5CF6" },
];

function categoryFromSlug(slug: string): { label: string; color: string } {
  if (slug.includes("compute")) return { label: "Compute", color: "#3B82F6" };
  if (slug.includes("networks")) return { label: "Networking", color: "#06B6D4" };
  if (slug.includes("security")) return { label: "Security", color: "#F59E0B" };
  if (slug.includes("databases")) return { label: "Databases", color: "#8B5CF6" };
  if (slug.includes("analytics")) return { label: "Analytics", color: "#EC4899" };
  return { label: "Cloud", color: "#10B981" };
}

function relativeTime(isoDate: string): string {
  const ms = Date.now() - new Date(isoDate).getTime();
  const days = Math.floor(ms / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { projects, loading } = usePortfolio();
  const recentProjects = projects.slice(0, 6);
  const [avatarError, setAvatarError] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-nw-bg">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar + name */}
        <View className="items-center px-4 pt-8 pb-6">
          {!avatarError ? (
            <Image
              source={{ uri: CURRENT_USER.avatarUrl }}
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                marginBottom: 16,
                borderWidth: 3,
                borderColor: "#D6FF3F",
              }}
              onError={() => setAvatarError(true)}
            />
          ) : (
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: "#1B1918" }}
            >
              <Text
                className="text-4xl font-inter-bold"
                style={{ color: "#D6FF3F" }}
              >
                {CURRENT_USER.initials}
              </Text>
            </View>
          )}
          <Text className="text-nw-white text-[22px] font-inter-bold">
            {CURRENT_USER.name}
          </Text>
          <Text className="text-nw-muted text-sm font-inter mt-1">
            {CURRENT_USER.bio}
          </Text>
          <View
            className="flex-row items-center mt-1.5 px-3 py-1 rounded-full"
            style={{ backgroundColor: "#EEEAE6" }}
          >
            <Ionicons name="calendar-outline" size={11} color="#6A6A6A" />
            <Text className="text-nw-muted text-xs font-inter ml-1">
              {CURRENT_USER.joinedLabel}
            </Text>
          </View>
        </View>

        {/* Stats row */}
        <View
          className="flex-row mx-4 mb-6 rounded-2xl overflow-hidden"
          style={{ backgroundColor: "#1B1918" }}
        >
          {[
            { value: loading ? "—" : String(projects.length), label: "Projects" },
            { value: "14", label: "Day Streak" },
            { value: String(BADGES.length), label: "Badges" },
          ].map((stat, i, arr) => (
            <View
              key={stat.label}
              className="flex-1 items-center py-5"
              style={
                i < arr.length - 1
                  ? { borderRightWidth: 1, borderRightColor: "rgba(255,255,255,0.1)" }
                  : undefined
              }
            >
              <Text
                className="text-2xl font-inter-bold"
                style={{ color: "#D6FF3F" }}
              >
                {stat.value}
              </Text>
              <Text
                className="text-xs font-inter mt-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Portfolio blurb */}
        <View className="px-4 mb-6">
          <Text
            className="text-nw-muted text-sm font-inter leading-5"
            numberOfLines={3}
          >
            {CURRENT_USER.portfolioDescription}
          </Text>
        </View>

        {/* Badges */}
        <View className="px-4 mb-6">
          <Text className="text-nw-white text-[17px] font-inter-bold mb-3">
            Badges
          </Text>
          <View className="flex-row flex-wrap">
            {BADGES.map((badge) => (
              <View
                key={badge.label}
                className="flex-row items-center rounded-full px-3 py-2 mr-2 mb-2"
                style={{
                  backgroundColor: badge.color + "18",
                  borderWidth: 1,
                  borderColor: badge.color + "35",
                }}
              >
                <Ionicons name="ribbon" size={13} color={badge.color} />
                <Text
                  className="text-xs font-inter-semi ml-1.5"
                  style={{ color: badge.color }}
                >
                  {badge.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Completed projects */}
        <View className="px-4 mb-8">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-nw-white text-[17px] font-inter-bold">
              Completed Projects
            </Text>
            {loading && <ActivityIndicator size="small" color="#D6FF3F" />}
          </View>

          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E6E6E6" }}
          >
            {recentProjects.map((doc, i) => {
              const cat = categoryFromSlug(doc.project.id);
              const isLast = i === recentProjects.length - 1;
              return (
                <TouchableOpacity
                  key={doc.id}
                  onPress={() => router.push(`/project/${doc.project.id}`)}
                  className="flex-row items-center px-4 py-3.5"
                  style={isLast ? undefined : { borderBottomWidth: 1, borderBottomColor: "#E6E6E6" }}
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${doc.title}`}
                >
                  <View
                    className="w-1 self-stretch rounded-full mr-3"
                    style={{ backgroundColor: cat.color }}
                  />
                  <View className="flex-1 mr-3">
                    <Text
                      className="text-nw-white text-sm font-inter-semi"
                      numberOfLines={1}
                    >
                      {doc.title}
                    </Text>
                    <View className="flex-row items-center mt-0.5">
                      <Text
                        className="text-xs font-inter-semi"
                        style={{ color: cat.color }}
                      >
                        {cat.label}
                      </Text>
                      <Text className="text-nw-muted text-xs font-inter ml-2">
                        · {relativeTime(doc.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color="#4CD964" />
                </TouchableOpacity>
              );
            })}
          </View>

          {projects.length > 6 && (
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/explore")}
              className="items-center py-3 rounded-xl mt-3"
              style={{ backgroundColor: "#1B1918" }}
            >
              <Text
                className="text-sm font-inter-semi"
                style={{ color: "#D6FF3F" }}
              >
                View all {projects.length} completed →
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
