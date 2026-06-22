import { Ionicons } from "@expo/vector-icons";
import { Linking, Text, TouchableOpacity, View } from "react-native";

const AVATARS = [
  { letter: "B", bg: "#8B5CF6" },
  { letter: "Z", bg: "#3B82F6" },
  { letter: "A", bg: "#F97316" },
  { letter: "D", bg: "#10B981" },
];

export default function HeroSection() {
  return (
    <View className="px-4 pt-6 pb-2">
      {/* Live badge */}
      <View
        className="flex-row items-center self-start rounded-full px-3 py-1.5 mb-5"
        style={{ backgroundColor: "#1B1918" }}
      >
        <View
          className="w-1.5 h-1.5 rounded-full mr-2"
          style={{ backgroundColor: "#D6FF3F" }}
        />
        <Text
          className="text-xs font-inter-semi tracking-widest uppercase"
          style={{ color: "#D6FF3F" }}
        >
          190K+ Learners Building
        </Text>
      </View>

      {/* Headline */}
      <Text className="text-nw-white text-[36px] font-inter-bold leading-tight mb-3">
        Build Real{"\n"}Projects.{" "}
        <Text
          style={{
            color: "#1B1918",
            backgroundColor: "#D6FF3F",
            borderRadius: 4,
          }}
        >
          Get Hired.
        </Text>
      </Text>

      {/* Subheadline */}
      <Text className="text-nw-gray text-[15px] font-inter mb-6 leading-relaxed">
        Hands-on guided projects that build your portfolio and prove your
        skills to employers.
      </Text>

      {/* Avatar stack + learner count */}
      <View className="flex-row items-center mb-6">
        <View className="flex-row mr-3">
          {AVATARS.map((a, i) => (
            <View
              key={i}
              className="w-8 h-8 rounded-full items-center justify-center border-2 border-nw-bg"
              style={{
                backgroundColor: a.bg,
                marginLeft: i > 0 ? -8 : 0,
              }}
            >
              <Text className="text-white text-xs font-inter-bold">
                {a.letter}
              </Text>
            </View>
          ))}
        </View>
        <Text className="text-nw-gray text-sm font-inter">
          <Text className="text-nw-white font-inter-semi">190,000+</Text>{" "}
          learners worldwide
        </Text>
      </View>

      {/* Primary CTA */}
      <TouchableOpacity
        className="rounded-xl py-4 items-center mb-3"
        style={{ backgroundColor: "#D6FF3F" }}
        onPress={() => Linking.openURL("https://learn.nextwork.org")}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Start building for free on NextWork"
      >
        <Text
          className="text-[15px] font-inter-bold"
          style={{ color: "#1B1918" }}
        >
          Start Building for Free →
        </Text>
      </TouchableOpacity>

      {/* Secondary CTA */}
      <TouchableOpacity
        className="rounded-xl py-4 items-center flex-row justify-center"
        style={{
          borderWidth: 1.5,
          borderColor: "#E6E6E6",
        }}
        onPress={() => Linking.openURL("https://nextwork.org")}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Learn more about NextWork"
      >
        <Ionicons name="play-circle-outline" size={16} color="#6A6A6A" />
        <Text className="text-nw-gray text-[15px] font-inter-semi ml-2">
          See how it works
        </Text>
      </TouchableOpacity>
    </View>
  );
}
