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
import { categoryFromSlug } from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";
import { usePortfolio } from "../../hooks/usePortfolio";

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

function GuestProfile() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-nw-bg">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, paddingVertical: 60 }}
      >
        {/* Avatar placeholder */}
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: "#E6E6E6",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Ionicons name="person" size={44} color="#9CA3AF" />
        </View>

        <Text
          style={{
            fontSize: 22,
            fontFamily: "SuisseNeue_Medium",
            color: "#1B1918",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Sign in to NextWork
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "FKGroteskNeue_Medium",
            color: "#6A6A6A",
            textAlign: "center",
            lineHeight: 22,
            marginBottom: 32,
          }}
        >
          Track your progress, view your completed projects, and build your cloud portfolio.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={{
            backgroundColor: "#1B1918",
            paddingHorizontal: 40,
            paddingVertical: 14,
            borderRadius: 100,
            width: "100%",
            alignItems: "center",
            marginBottom: 14,
          }}
          accessibilityRole="button"
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 15,
              fontFamily: "FKGroteskNeue_Medium",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 12,
            fontFamily: "FKGroteskNeue_Medium",
            color: "#9CA3AF",
            textAlign: "center",
            lineHeight: 18,
          }}
        >
          NextWork is free to use.{"\n"}Sign in to unlock your personal dashboard.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const { projects, loading } = usePortfolio();
  const [avatarError, setAvatarError] = useState(false);

  if (!isLoggedIn) return <GuestProfile />;

  return (
    <SafeAreaView className="flex-1 bg-nw-bg">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar + name */}
        <View className="items-center px-4 pt-8 pb-6">
          {user?.avatarUrl && !avatarError ? (
            <Image
              source={{ uri: user.avatarUrl }}
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                marginBottom: 16,
                borderWidth: 3,
                borderColor: "#1B1918",
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
                style={{ color: "#FFFFFF" }}
              >
                {user?.initials ?? "?"}
              </Text>
            </View>
          )}
          <Text className="text-nw-white text-[22px] font-inter-bold">
            {user?.name || "NextWork Learner"}
          </Text>
          {!!user?.bio && (
            <Text className="text-nw-muted text-sm font-inter mt-1">
              {user.bio}
            </Text>
          )}
        </View>

        {/* Completed projects */}
        <View className="px-4 mb-8">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-nw-white text-[17px] font-inter-bold">
              Completed Projects{!loading && projects.length > 0 ? ` (${projects.length})` : ""}
            </Text>
            {loading && <ActivityIndicator size="small" color="#1B1918" />}
          </View>

          {projects.length > 0 ? (
            <View
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E6E6E6" }}
            >
              {projects.map((doc, i) => {
                const cat = categoryFromSlug(doc.project.id);
                const isLast = i === projects.length - 1;
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
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : !loading ? (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: "#E6E6E6",
                borderRadius: 16,
                padding: 24,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#6A6A6A", fontSize: 13, fontFamily: "FKGroteskNeue_Medium", textAlign: "center" }}>
                No completed projects yet.{"\n"}Head to Explore to get started!
              </Text>
            </View>
          ) : null}

        </View>

        {/* Sign out */}
        <View className="px-4 mb-10">
          <TouchableOpacity
            onPress={logout}
            style={{
              borderWidth: 1,
              borderColor: "#E6E6E6",
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
            }}
            accessibilityRole="button"
          >
            <Text style={{ color: "#9CA3AF", fontSize: 14, fontFamily: "FKGroteskNeue_Medium" }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
