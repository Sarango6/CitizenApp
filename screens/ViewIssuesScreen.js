// screens/ViewIssuesScreen.js
import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IssuesContext } from "./IssuesContext";

export default function ViewIssuesScreen({ navigation }) {
  const { issues, updateIssueStatus } = useContext(IssuesContext);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Simulated admin flag (replace with real auth later)
  const isAdmin = true; // set to false for normal citizen

  // Filter issues
  const filteredIssues = issues.filter(
    (issue) =>
      (filterCategory === "All" || issue.category === filterCategory) &&
      (filterStatus === "All" || issue.status === filterStatus)
  );

  return (
    <ImageBackground
      source={require("../assets/remain_bg.jpg")} // put your image in assets folder
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.dropdownContainer1}>
          <Picker
            selectedValue={filterCategory}
            dropdownIconColor="#000"
            style={styles.dropdown}
            onValueChange={(val) => setFilterCategory(val)}
          >
            <Picker.Item label="All Categories" value="All" />
            <Picker.Item label="General" value="General" />
            <Picker.Item label="Pothole" value="Pothole" />
            <Picker.Item label="Streetlight" value="Streetlight" />
            <Picker.Item label="Garbage" value="Garbage" />
            <Picker.Item label="Water Leakage" value="Water Leakage" />
            <Picker.Item label="Escalated" value="Escalated" />
          </Picker>
        </View>

        <View style={styles.dropdownContainer2}>
          <Picker
            selectedValue={filterStatus}
            dropdownIconColor="#000"
            style={[styles.dropdown, { marginTop: 8 }]}
            onValueChange={(val) => setFilterStatus(val)}
          >
            <Picker.Item label="All Status" value="All" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Resolved" value="Resolved" />
          </Picker>
        </View>

        {filteredIssues.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No issues reported yet.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredIssues}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.image} />
                )}
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.category}>Category: {item.category}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
                {item.address && (
                  <Text style={styles.address}>📍 {item.address}</Text>
                )}

                {item.location && (
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
                )}
              </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, padding: 12 },

  dropdownContainer1: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#333",
    height: 60,
  },
  dropdownContainer2: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#333",
    height: 60,
  },
  dropdown: { color: "#000", height: 60 },
  emptyWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#888", fontSize: 18 },
  card: {
    backgroundColor: "#000",
    padding: 14,
    marginVertical: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  image: { width: "100%", height: 160, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "700", color: "#fff", marginBottom: 6 },
  desc: { fontSize: 14, color: "#fff", marginBottom: 6 },
  category: { fontSize: 16, color: "#FFD700", marginBottom: 6 },
  status: { fontSize: 16, color: "#00CED1", marginBottom: 6 },
  address: { color: "#f77f7fff", fontStyle: "normal", marginBottom: 6 },
  mapButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  mapButtonText: { color: "#000", fontWeight: "700", fontSize: 15 },
});
