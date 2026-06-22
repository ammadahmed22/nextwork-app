import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CURRENT_USER } from "../../constants/auth";
import CTABanner from "../../components/CTABanner";
import HeroSection from "../../components/HeroSection";
import ProjectCard from "../../components/ProjectCard";
import StatsBar from "../../components/StatsBar";
import TestimonialCarousel from "../../components/TestimonialCarousel";
import ValuePropRow from "../../components/ValuePropRow";
import { projects } from "../../data/projects";
import { usePortfolio } from "../../hooks/usePortfolio";

const FEATURED = projects.slice(0, 3);

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

export default function HomeScreen() {
  const router = useRouter();
  const { projects: portfolio } = usePortfolio();
  const [avatarError, setAvatarError] = useState(false);
  const recentCompletions = portfolio.slice(0, 3);

  return (
    <SafeAreaView className="flex-1 bg-nw-bg">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection />

        <View className="mx-4 mb-6" style={{ height: 1, backgroundColor: "#E6E6E6" }} />

        <StatsBar />

        {/* Personalized progress card */}
        <View className="px-4 mb-8">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-nw-white text-[20px] font-inter-bold">
                Welcome back,{" "}
                <Text style={{ color: "#1B1918" }}>
                  {CURRENT_USER.name.split(" ")[0]}
                </Text>
              </Text>
              <Text className="text-nw-muted text-sm font-inter mt-0.5">
                {portfolio.length} projects completed · Keep going!
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile")}
              className="w-10 h-10 rounded-full overflow-hidden"
              style={{
                backgroundColor: "#1B1918",
                borderWidth: 2,
                borderColor: "#1B1918",
              }}
              accessibilityRole="button"
            >
              {!avatarError ? (
                <Image
                  source={{ uri: CURRENT_USER.avatarUrl }}
                  style={{ width: 36, height: 36 }}
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <View className="flex-1 items-center justify-center">
                  <Text
                    className="text-base font-inter-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {CURRENT_USER.initials}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E6E6E6" }}
          >
            <View
              className="px-4 py-3 flex-row items-center"
              style={{ borderBottomWidth: 1, borderBottomColor: "#E6E6E6" }}
            >
              <Ionicons name="checkmark-circle" size={16} color="#9CA3AF" />
              <Text className="text-nw-white text-sm font-inter-semi ml-2">
                Recently Completed
              </Text>
            </View>
            {recentCompletions.map((doc, i) => {
              const cat = categoryFromSlug(doc.project.id);
              const isLast = i === recentCompletions.length - 1;
              return (
                <TouchableOpacity
                  key={doc.id}
                  onPress={() => router.push(`/project/${doc.project.id}`)}
                  className="flex-row items-center px-4 py-3"
                  style={isLast ? undefined : { borderBottomWidth: 1, borderBottomColor: "#E6E6E6" }}
                  accessibilityRole="button"
                >
                  <View
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: cat.color }}
                  />
                  <Text
                    className="text-nw-white text-sm font-inter flex-1"
                    numberOfLines={1}
                  >
                    {doc.title}
                  </Text>
                  <Text className="text-nw-muted text-xs font-inter ml-2">
                    {relativeTime(doc.createdAt)}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile")}
              className="px-4 py-3 flex-row items-center justify-center"
              style={{ borderTopWidth: 1, borderTopColor: "#E6E6E6" }}
            >
              <Text
                className="text-xs font-inter-semi"
                style={{ color: "#1B1918" }}
              >
                View all {portfolio.length} completed
              </Text>
              <Ionicons name="chevron-forward" size={12} color="#1B1918" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Why NextWork */}
        <View className="mb-6">
          <Text className="text-nw-white text-[20px] font-inter-bold px-4 mb-5">
            Why NextWork?
          </Text>
          <ValuePropRow
            iconName="hammer-outline"
            heading="Learn by Building"
            subtext="No passive video watching. Build real projects from day one with guided walkthroughs."
            iconColor="#1B1918"
          />
          <ValuePropRow
            iconName="briefcase-outline"
            heading="Portfolio Builds Itself"
            subtext="Every project you complete adds to an auto-generated portfolio that impresses recruiters."
            iconColor="#8B5CF6"
          />
          <ValuePropRow
            iconName="people-outline"
            heading="Global Community"
            subtext="Join 190,000+ learners from 190+ countries. Get help, give help, and grow together."
            iconColor="#06B6D4"
          />
        </View>

        {/* Featured projects */}
        <View className="mb-2">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <Text className="text-nw-white text-[20px] font-inter-bold">
              Featured Projects
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/explore")}
              accessibilityRole="button"
            >
              <Text
                className="text-sm font-inter-semi"
                style={{ color: "#1B1918" }}
              >
                View all →
              </Text>
            </TouchableOpacity>
          </View>
          {FEATURED.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </View>

        <View className="mb-2">
          <Text className="text-nw-white text-[20px] font-inter-bold px-4 mb-4">
            What Learners Say
          </Text>
          <TestimonialCarousel />
        </View>

        <CTABanner />
        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
