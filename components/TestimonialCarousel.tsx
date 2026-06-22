import { FlatList, View, useWindowDimensions } from "react-native";
import { testimonials } from "../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const CARD_MARGIN = 16;
const CARD_GAP = 12;

export default function TestimonialCarousel() {
  const { width } = useWindowDimensions();
  const cardWidth = width - CARD_MARGIN * 2;

  return (
    <FlatList
      data={testimonials}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={cardWidth + CARD_GAP}
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
      ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TestimonialCard testimonial={item} width={cardWidth} />
      )}
    />
  );
}
