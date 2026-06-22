import { ScrollView, Text, TouchableOpacity } from "react-native";

const EMOJI_MAP: Record<string, string> = {
  All: "✦",
  "Amazon VPC": "🌐",
  "Cloud Beginner Challenge": "🎯",
  Security: "🔐",
  Databases: "🗄️",
  Kubernetes: "🐳",
  Claude: "🤖",
  "Claude Code": "💻",
  "6 Day DevOps Challenge": "⚙️",
  "Amazon Lex Chatbot": "💬",
  DevOps: "⚙️",
  "Three-Tier": "📐",
  "Generative AI Developer": "🧠",
  "AI Tooling": "🛠️",
  "AI Second Brain": "🧠",
  "Build with OpenClaw": "🦀",
  Archived: "📦",
  AI: "🤖",
  Frontend: "🎨",
  Backend: "🔧",
  Data: "📊",
  Cloud: "☁️",
};

const STATIC_CATEGORIES: { label: string; emoji: string }[] = [
  { label: "All", emoji: "✦" },
  { label: "AI", emoji: "🤖" },
  { label: "DevOps", emoji: "⚙️" },
  { label: "Frontend", emoji: "🎨" },
  { label: "Backend", emoji: "🔧" },
  { label: "Data", emoji: "📊" },
  { label: "Cloud", emoji: "☁️" },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
  /** When provided, overrides the static fallback list */
  categories?: string[];
}

export default function CategoryFilter({
  selected,
  onSelect,
  categories,
}: CategoryFilterProps) {
  const items = categories
    ? categories.map((label) => ({ label, emoji: EMOJI_MAP[label] ?? "📂" }))
    : STATIC_CATEGORIES;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 16, paddingRight: 24, paddingVertical: 4 }}
      className="mb-4"
    >
      {items.map(({ label, emoji }) => {
        const isSelected = selected === label;
        return (
          <TouchableOpacity
            key={label}
            onPress={() => onSelect(label)}
            className="flex-row items-center h-10 px-4 rounded-full mr-2"
            style={{
              backgroundColor: isSelected ? "#1B1918" : "#FFFFFF",
              borderWidth: 1,
              borderColor: isSelected ? "#1B1918" : "#E6E6E6",
            }}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={{ fontSize: 13, marginRight: 6 }}>{emoji}</Text>
            <Text
              className="text-sm font-inter-semi"
              style={{ color: isSelected ? "#FFFFFF" : "#6A6A6A" }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
