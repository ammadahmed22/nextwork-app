import { Text, View } from "react-native";

const STATS = [
  { value: "190K+", label: "Learners" },
  { value: "190+", label: "Countries" },
  { value: "8×", label: "Job Growth" },
];

export default function StatsBar() {
  return (
    <View
      className="flex-row mx-4 mb-6 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#1B1918",
        borderRadius: 16,
      }}
    >
      {STATS.map((stat, i) => (
        <View
          key={i}
          className="flex-1 items-center py-4"
          style={
            i < STATS.length - 1
              ? { borderRightWidth: 1, borderRightColor: "rgba(255,255,255,0.1)" }
              : undefined
          }
        >
          <Text
            className="text-xl font-inter-bold"
            style={{ color: "#FFFFFF" }}
          >
            {stat.value}
          </Text>
          <Text
            className="text-xs font-inter mt-0.5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
