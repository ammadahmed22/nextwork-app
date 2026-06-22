import { useRouter } from "expo-router";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { getCategoryImage } from "../constants/categoryImages";

interface Props {
  categories: string[];
  projectCounts: Record<string, number>;
}

function CategoryTile({ name, count }: { name: string; count: number }) {
  const router = useRouter();
  const imageUri = getCategoryImage(name);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/category/${encodeURIComponent(name)}`)}
      activeOpacity={0.85}
      style={{ flex: 1, margin: 6, borderRadius: 14, overflow: "hidden", height: 120 }}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${count} project${count !== 1 ? "s" : ""}`}
    >
      <ImageBackground
        source={{ uri: imageUri }}
        style={{ flex: 1, justifyContent: "flex-end" }}
        resizeMode="cover"
      >
        {/* Dark gradient overlay */}
        <View
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        />
        <View style={{ padding: 10 }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 13,
              fontFamily: "Inter_700Bold",
              lineHeight: 17,
            }}
            numberOfLines={2}
          >
            {name}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 11,
              fontFamily: "Inter_400Regular",
              marginTop: 2,
            }}
          >
            {count} project{count !== 1 ? "s" : ""}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default function CategoryGrid({ categories, projectCounts }: Props) {
  // Filter out "All" — it's not a real category tile
  const items = categories.filter((c) => c !== "All");

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 32, paddingTop: 4 }}
      renderItem={({ item }) => (
        <CategoryTile name={item} count={projectCounts[item] ?? 0} />
      )}
    />
  );
}
