import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { categoryColor } from "../constants/colors";
import type { CatalogProject } from "../types/api";

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}

interface Props {
  project: CatalogProject;
}

export default function CatalogProjectCard({ project }: Props) {
  const router = useRouter();
  const color = categoryColor(project.category);
  const isCompleted = project.status === "COMPLETE";

  function handlePress() {
    router.push(`/project/${project.id}`);
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="mx-4 mb-4 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E6E6E6",
      }}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${project.title}, ${isCompleted ? "completed" : "start project"}`}
    >
      {/* Category accent strip */}
      <View style={{ height: 3, backgroundColor: color }} />

      <View className="p-4">
        {/* Category badge + Completed pill */}
        <View className="flex-row items-center justify-between mb-2.5">
          <View
            className="rounded-full px-2.5 py-1"
            style={{ backgroundColor: `${color}1A` }}
          >
            <Text className="text-xs font-inter-semi" style={{ color }}>
              {project.category}
            </Text>
          </View>

          {isCompleted && (
            <View
              className="flex-row items-center rounded-full px-2.5 py-1"
              style={{
                backgroundColor: "#9CA3AF20",
                borderWidth: 1,
                borderColor: "#9CA3AF40",
              }}
            >
              <Ionicons name="checkmark-circle" size={11} color="#9CA3AF" />
              <Text
                className="text-xs font-inter-semi ml-1"
                style={{ color: "#9CA3AF" }}
              >
                Completed
              </Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text
          className="text-nw-white text-[15px] font-inter-bold mb-3"
          numberOfLines={2}
        >
          {project.title}
        </Text>

        {/* Learner count + CTA */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={13} color="#6A6A6A" />
            <Text className="text-nw-muted text-xs font-inter ml-1">
              {formatCount(project.completions)} learners
            </Text>
          </View>

          <TouchableOpacity
            onPress={handlePress}
            className="rounded-xl px-4 py-2"
            style={{
              backgroundColor: isCompleted ? "transparent" : "#1B1918",
              borderWidth: isCompleted ? 1 : 0,
              borderColor: isCompleted ? "#E6E6E6" : undefined,
            }}
            accessibilityRole="button"
          >
            <Text
              className="text-sm font-inter-semi"
              style={{ color: isCompleted ? "#6A6A6A" : "#FFFFFF" }}
            >
              {isCompleted ? "Review" : "Start →"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
