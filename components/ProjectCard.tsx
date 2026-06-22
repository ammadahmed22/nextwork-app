import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { categoryColors } from "../constants/colors";
import { type Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const DIFFICULTY_STYLES = {
  Beginner: { text: "#15803D", bg: "#DCFCE7", border: "#BBF7D0" },
  Intermediate: { text: "#92400E", bg: "#FEF3C7", border: "#FDE68A" },
  Advanced: { text: "#991B1B", bg: "#FEE2E2", border: "#FECACA" },
} as const;

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const router = useRouter();
  const diff = DIFFICULTY_STYLES[project.difficulty];
  const catColor = categoryColors[project.category] ?? "#1B1918";

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => router.push(`/project/${project.id}`)}
      className="mb-3 mx-4"
      accessibilityRole="button"
      accessibilityLabel={`Open project: ${project.title}`}
    >
      <View
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: "#E6E6E6",
        }}
      >
        {/* Category color accent strip */}
        <View style={{ height: 3, backgroundColor: catColor }} />

        <View className="p-4">
          {/* Category + difficulty row */}
          <View className="flex-row items-center justify-between mb-3">
            <View
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: catColor + "18" }}
            >
              <Text
                className="text-xs font-inter-bold uppercase tracking-wider"
                style={{ color: catColor }}
              >
                {project.category}
              </Text>
            </View>
            <View
              className="rounded-full px-3 py-1"
              style={{
                backgroundColor: diff.bg,
                borderWidth: 1,
                borderColor: diff.border,
              }}
            >
              <Text className="text-xs font-inter-semi" style={{ color: diff.text }}>
                {project.difficulty}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text
            className="text-nw-white text-[17px] font-inter-bold mb-2 leading-snug"
            numberOfLines={compact ? 1 : 2}
          >
            {project.title}
          </Text>

          {!compact && (
            <Text
              className="text-nw-gray text-sm font-inter mb-3 leading-relaxed"
              numberOfLines={2}
            >
              {project.description}
            </Text>
          )}

          {/* Duration + Start CTA */}
          <View className="flex-row items-center justify-between mt-1">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={13} color="#6A6A6A" />
              <Text className="text-nw-muted text-xs font-inter ml-1">
                {project.duration}
              </Text>
            </View>
            <View
              className="flex-row items-center rounded-xl px-4 py-2.5"
              style={{ backgroundColor: "#D6FF3F" }}
            >
              <Text
                className="text-sm font-inter-bold mr-1"
                style={{ color: "#1B1918" }}
              >
                Start
              </Text>
              <Ionicons name="arrow-forward" size={13} color="#1B1918" />
            </View>
          </View>

          {!compact && (
            <View className="flex-row flex-wrap mt-3">
              {project.tags.map((tag) => (
                <View
                  key={tag}
                  className="rounded-lg px-2.5 py-1 mr-1.5 mb-1"
                  style={{ backgroundColor: "#EEEAE6" }}
                >
                  <Text className="text-nw-muted text-xs font-inter">{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
