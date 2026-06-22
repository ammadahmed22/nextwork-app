import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryGrid from "../../components/CategoryGrid";
import { useProjectCatalog } from "../../hooks/useProjectCatalog";

export default function ExploreScreen() {
  const { categories, projectCounts, loading, error, refresh } = useProjectCatalog();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F5F3" }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12 }}>
        <Text style={{ color: "#1B1918", fontSize: 28, fontFamily: "Inter_700Bold", marginBottom: 2 }}>
          Explore
        </Text>
        <Text style={{ color: "#6A6A6A", fontSize: 14, fontFamily: "Inter_400Regular" }}>
          {loading
            ? "Loading categories…"
            : `${categories.length - 1} categories available`}
        </Text>
      </View>

      {error && !loading && (
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 12,
            padding: 12,
            borderRadius: 12,
            backgroundColor: "#FFF8F0",
            borderWidth: 1,
            borderColor: "#FFDAB8",
          }}
        >
          <Text style={{ color: "#92400E", fontSize: 13, fontFamily: "Inter_600SemiBold", marginBottom: 4 }}>
            API error
          </Text>
          <Text style={{ color: "#92400E", fontSize: 12, fontFamily: "Inter_400Regular", marginBottom: 8 }} numberOfLines={2}>
            {error}
          </Text>
          <TouchableOpacity onPress={refresh}>
            <Text style={{ color: "#1B1918", fontSize: 12, fontFamily: "Inter_600SemiBold" }}>
              Tap to retry →
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#1B1918" />
          <Text style={{ color: "#6A6A6A", fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 16 }}>
            Loading categories…
          </Text>
        </View>
      ) : (
        <CategoryGrid
          categories={categories}
          projectCounts={projectCounts}
        />
      )}
    </SafeAreaView>
  );
}
