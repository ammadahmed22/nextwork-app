import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CatalogProjectCard from "../../components/CatalogProjectCard";
import CategoryFilter from "../../components/CategoryFilter";
import { useProjectCatalog } from "../../hooks/useProjectCatalog";

export default function ExploreScreen() {
  const { projects, categories, loading, error, refresh } = useProjectCatalog();
  const [selected, setSelected] = useState("All");

  const filtered = useMemo(() => {
    if (selected === "All") return projects;
    return projects.filter((p) => p.category === selected);
  }, [projects, selected]);

  return (
    <SafeAreaView className="flex-1 bg-nw-bg">
      <View className="px-4 pt-5 pb-3">
        <Text className="text-nw-white text-[28px] font-inter-bold mb-1">
          Explore
        </Text>
        <Text className="text-nw-muted text-sm font-inter">
          {loading
            ? "Loading catalog…"
            : `${filtered.length.toLocaleString()} project${filtered.length !== 1 ? "s" : ""} ${selected !== "All" ? `in ${selected}` : "available"}`}
        </Text>
      </View>

      <CategoryFilter
        selected={selected}
        onSelect={setSelected}
        categories={categories.length > 1 ? categories : undefined}
      />

      {error && !loading && projects.length === 0 && (
        <View
          className="px-4 py-3 mx-4 rounded-xl mb-4"
          style={{
            backgroundColor: "#FFF8F0",
            borderWidth: 1,
            borderColor: "#FFDAB8",
          }}
        >
          <Text
            className="text-sm font-inter-semi mb-1"
            style={{ color: "#92400E" }}
          >
            API error
          </Text>
          <Text
            className="text-xs font-inter mb-2"
            style={{ color: "#92400E" }}
            numberOfLines={3}
          >
            {error}
          </Text>
          <TouchableOpacity onPress={refresh}>
            <Text className="text-xs font-inter-semi" style={{ color: "#1B1918" }}>
              Tap to retry →
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CatalogProjectCard project={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 4, paddingBottom: 32 }}
        ListEmptyComponent={
          loading ? (
            <View className="items-center py-24">
              <ActivityIndicator size="large" color="#D6FF3F" />
              <Text className="text-nw-muted text-sm font-inter mt-4">
                Loading 336 projects…
              </Text>
            </View>
          ) : (
            <View className="items-center py-20 px-8">
              <Text className="text-4xl mb-4">🔍</Text>
              <Text className="text-nw-white text-base font-inter-semi text-center mb-2">
                No projects found
              </Text>
              <Text className="text-nw-muted text-sm font-inter text-center">
                No {selected} projects available right now.
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
