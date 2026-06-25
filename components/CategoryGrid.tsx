import { useRouter } from "expo-router";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import type { CategoryGroup } from "../types/api";

interface Props {
  groups: CategoryGroup[];
}

function CategoryTile({ group }: { group: CategoryGroup }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/category/${encodeURIComponent(group.title)}` as never,
          params: { imageUrl: group.imageUrl },
        })
      }
      activeOpacity={0.85}
      style={{ flex: 1, margin: 6, borderRadius: 14, overflow: "hidden", height: 120 }}
      accessibilityRole="button"
      accessibilityLabel={`${group.title}, ${group.count} project${group.count !== 1 ? "s" : ""}`}
    >
      <ImageBackground
        source={{ uri: group.imageUrl }}
        style={{ flex: 1, justifyContent: "flex-end" }}
        resizeMode="cover"
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        />
        <View style={{ padding: 10 }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 13,
              fontFamily: "SuisseNeue_Medium",
              lineHeight: 17,
            }}
            numberOfLines={2}
          >
            {group.title}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 11,
              fontFamily: "FKGroteskNeue_Medium",
              marginTop: 2,
            }}
          >
            {group.count} project{group.count !== 1 ? "s" : ""}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default function CategoryGrid({ groups }: Props) {
  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item.title}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 32, paddingTop: 4 }}
      renderItem={({ item }) => <CategoryTile group={item} />}
    />
  );
}
