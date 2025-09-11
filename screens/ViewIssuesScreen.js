import { useContext } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IssuesContext } from "./IssuesContext";

export default function ViewIssuesScreen({ route, navigation }) {
  const { issues, currentUser } = useContext(IssuesContext);

  // If coming from Profile → show only user’s issues
  const filterUser = route?.params?.filterUser;
  const filteredIssues = filterUser
    ? issues.filter((i) => i.user?.email === currentUser.email)
    : issues;

  if (filteredIssues.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>
          {filterUser ? "You haven’t reported any issues yet." : "No issues reported yet."}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={filteredIssues}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          {item.address && <Text style={styles.location}>📍 {item.address}</Text>}

          {item.location && (
            <>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker coordinate={item.location} title={item.title} description={item.description} />
              </MapView>

              <TouchableOpacity
                style={styles.mapButton}
                onPress={() =>
                  navigation.navigate("MapView", {
                    title: item.title,
                    description: item.description,
                    location: item.location,
                  })
                }
              >
                <Text style={styles.mapButtonText}>View on Map</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  empty: { fontSize: 18, color: "#666" },
  list: { flex: 1, backgroundColor: "#fff" },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  desc: { fontSize: 14, color: "#555" },
  location: { marginTop: 8, fontSize: 13, color: "#333", fontStyle: "italic" },
  map: { width: "100%", height: 200, borderRadius: 8, marginTop: 10 },
  mapButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  mapButtonText: { color: "#fff", fontWeight: "bold" },
});
