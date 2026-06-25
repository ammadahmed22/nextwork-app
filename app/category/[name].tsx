import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CatalogProjectCard from "../../components/CatalogProjectCard";
import { useCategoryProjects } from "../../hooks/useCategoryProjects";

export default function CategoryScreen() {
  const { name, imageUrl: paramImageUrl } = useLocalSearchParams<{
    name: string;
    imageUrl?: string;
  }>();
  const router = useRouter();
  const categoryName = decodeURIComponent(name ?? "");

  const { projects, imageUrl: fetchedImageUrl, loading, error, refresh } =
    useCategoryProjects(categoryName);

  // Prefer the image URL fetched from the API; fall back to the one passed as a route param
  const heroImage = fetchedImageUrl || paramImageUrl || "";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F5F3" }} edges={["top"]}>
      {/* Hero header */}
      <ImageBackground
        source={heroImage ? { uri: heroImage } : undefined}
        style={{ height: 160, justifyContent: "flex-end" }}
        resizeMode="cover"
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: heroImage ? "rgba(0,0,0,0.5)" : "#1B1918",
          }}
        />

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 12,
            left: 16,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
          }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={{ padding: 16 }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 22,
              fontFamily: "SuisseNeue_Medium",
              lineHeight: 28,
            }}
            numberOfLines={2}
          >
            {categoryName}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              fontFamily: "FKGroteskNeue_Medium",
              marginTop: 2,
            }}
          >
            {loading
              ? "Loading…"
              : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
          </Text>
        </View>
      </ImageBackground>

      {/* Error state */}
      {error && !loading && (
        <View
          style={{
            margin: 16,
            padding: 12,
            borderRadius: 12,
            backgroundColor: "#FFF8F0",
            borderWidth: 1,
            borderColor: "#FFDAB8",
          }}
        >
          <Text
            style={{
              color: "#92400E",
              fontSize: 13,
              fontFamily: "FKGroteskNeue_Medium",
              marginBottom: 4,
            }}
          >
            Failed to load
          </Text>
          <Text
            style={{
              color: "#92400E",
              fontSize: 12,
              fontFamily: "FKGroteskNeue_Medium",
              marginBottom: 8,
            }}
            numberOfLines={2}
          >
            {error}
          </Text>
          <TouchableOpacity onPress={refresh}>
            <Text style={{ color: "#1B1918", fontSize: 12, fontFamily: "FKGroteskNeue_Medium" }}>
              Tap to retry →
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Project list */}
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CatalogProjectCard project={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 40 }}
        ListEmptyComponent={
          loading ? (
            <View style={{ alignItems: "center", paddingVertical: 80 }}>
              <ActivityIndicator size="large" color="#1B1918" />
              <Text
                style={{
                  color: "#6A6A6A",
                  fontSize: 14,
                  fontFamily: "FKGroteskNeue_Medium",
                  marginTop: 16,
                }}
              >
                Loading projects…
              </Text>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                paddingVertical: 60,
                paddingHorizontal: 32,
              }}
            >
              <Text style={{ fontSize: 40, marginBottom: 12 }}>🔍</Text>
              <Text
                style={{
                  color: "#1B1918",
                  fontSize: 16,
                  fontFamily: "SuisseNeue_Medium",
                  textAlign: "center",
                  marginBottom: 6,
                }}
              >
                No projects found
              </Text>
              <Text
                style={{
                  color: "#6A6A6A",
                  fontSize: 14,
                  fontFamily: "FKGroteskNeue_Medium",
                  textAlign: "center",
                }}
              >
                No projects in {categoryName} right now.
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
