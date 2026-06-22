import { Text, View } from "react-native";
import { type Testimonial } from "../data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  width: number;
}

const AVATAR_COLORS = ["#8B5CF6", "#3B82F6", "#F97316", "#10B981", "#F59E0B", "#EC4899"];

export default function TestimonialCard({ testimonial, width }: TestimonialCardProps) {
  const idx = parseInt(testimonial.id, 10) - 1;
  const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];

  return (
    <View
      style={{
        width,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E6E6E6",
      }}
    >
      {/* Quote mark */}
      <Text
        style={{
          fontSize: 48,
          lineHeight: 40,
          color: "#D6FF3F",
          fontFamily: "serif",
          marginBottom: 8,
        }}
      >
        "
      </Text>

      {/* Quote text */}
      <Text
        style={{
          color: "#1B1918",
          fontSize: 15,
          lineHeight: 24,
          marginBottom: 20,
        }}
      >
        {testimonial.quote}
      </Text>

      {/* Author */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: avatarColor,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
            {testimonial.avatar}
          </Text>
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#1B1918", fontWeight: "600", fontSize: 14 }}>
              {testimonial.name}
            </Text>
            <Text style={{ marginLeft: 6, fontSize: 14 }}>{testimonial.flag}</Text>
          </View>
          <Text style={{ color: "#6A6A6A", fontSize: 12, marginTop: 2 }}>
            {testimonial.path}
          </Text>
        </View>
      </View>
    </View>
  );
}
