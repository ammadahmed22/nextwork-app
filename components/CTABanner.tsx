import { Ionicons } from "@expo/vector-icons";
import { Linking, Text, TouchableOpacity, View } from "react-native";

export default function CTABanner() {
  return (
    <View
      className="mx-4 my-6 rounded-3xl p-6"
      style={{ backgroundColor: "#1B1918" }}
    >
      <Text
        className="text-[22px] font-inter-bold text-center mb-2"
        style={{ color: "#FFFFFF" }}
      >
        Ready to Build?
      </Text>
      <Text
        className="text-sm font-inter text-center mb-6 leading-relaxed"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        Join 190,000+ learners building portfolios and landing tech jobs.
      </Text>

      <TouchableOpacity
        className="rounded-xl h-14 items-center justify-center mb-3"
        style={{ backgroundColor: "#D6FF3F" }}
        onPress={() => Linking.openURL("https://learn.nextwork.org")}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Start building for free"
      >
        <Text
          className="text-[15px] font-inter-bold"
          style={{ color: "#1B1918" }}
        >
          Start for Free →
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="rounded-xl h-12 items-center justify-center"
        style={{
          borderWidth: 1.5,
          borderColor: "rgba(255,255,255,0.15)",
        }}
        onPress={() => Linking.openURL("https://github.com/nextwork-org")}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="View NextWork on GitHub"
      >
        <View className="flex-row items-center">
          <Ionicons name="logo-github" size={16} color="rgba(255,255,255,0.6)" />
          <Text
            className="text-sm font-inter-semi ml-2"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            View on GitHub
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
