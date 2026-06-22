import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface ValuePropRowProps {
  iconName: keyof typeof Ionicons.glyphMap;
  heading: string;
  subtext: string;
  iconColor?: string;
}

export default function ValuePropRow({
  iconName,
  heading,
  subtext,
  iconColor = "#1B1918",
}: ValuePropRowProps) {
  return (
    <View className="flex-row items-start px-4 mb-5">
      <View
        className="w-11 h-11 rounded-xl items-center justify-center mr-4 mt-0.5"
        style={{
          backgroundColor: iconColor + "14",
          borderWidth: 1,
          borderColor: iconColor + "25",
        }}
      >
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-nw-white text-[15px] font-inter-bold mb-1">
          {heading}
        </Text>
        <Text className="text-nw-gray text-sm font-inter leading-relaxed">
          {subtext}
        </Text>
      </View>
    </View>
  );
}
