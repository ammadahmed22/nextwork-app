import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatsBar from "../../components/StatsBar";
import TestimonialCarousel from "../../components/TestimonialCarousel";

const HIGHLIGHTS = [
  {
    emoji: "🎓",
    title: "190,000+ Projects Completed",
    sub: "Learners across the globe shipping real work every day.",
  },
  {
    emoji: "🌍",
    title: "190+ Countries Represented",
    sub: "A truly global community united by learning and building.",
  },
  {
    emoji: "💼",
    title: "Thousands of Jobs Landed",
    sub: "NextWork portfolios impress employers across every industry.",
  },
  {
    emoji: "⭐",
    title: "4.8 / 5 Average Rating",
    sub: "Learners consistently rate projects as practical and career-relevant.",
  },
];

export default function CommunityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-nw-bg">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-5 pb-4">
          <Text className="text-nw-white text-[28px] font-inter-bold mb-1">
            Community
          </Text>
          <Text className="text-nw-muted text-sm font-inter">
            190,000+ learners across 190+ countries
          </Text>
        </View>

        <StatsBar />

        <View className="mb-6">
          <Text className="text-nw-white text-[20px] font-inter-bold px-4 mb-4">
            Success Stories
          </Text>
          <TestimonialCarousel />
        </View>

        <View className="px-4 mb-8">
          <Text className="text-nw-white text-[20px] font-inter-bold mb-4">
            Community Highlights
          </Text>
          <View
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E6E6E6" }}
          >
            {HIGHLIGHTS.map((item, i) => (
              <View
                key={i}
                className="flex-row items-start p-4"
                style={
                  i < HIGHLIGHTS.length - 1
                    ? { borderBottomWidth: 1, borderBottomColor: "#E6E6E6" }
                    : undefined
                }
              >
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: "#F7F5F3" }}
                >
                  <Text style={{ fontSize: 18 }}>{item.emoji}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-nw-white text-sm font-inter-semi mb-0.5">
                    {item.title}
                  </Text>
                  <Text className="text-nw-muted text-xs font-inter leading-relaxed">
                    {item.sub}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
