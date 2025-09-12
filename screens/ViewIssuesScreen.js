// screens/ViewIssuesScreen.js
import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IssuesContext } from "./IssuesContext";

export default function ViewIssuesScreen({ navigation }) {
  const { issues, updateIssueStatus } = useContext(IssuesContext);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Simulated admin flag (replace with real auth later)
  const isAdmin = true; // set to false for normal citizen

  // Filter issues based on category and status
  const filteredIssues = issues.filter(issue => 
    (filterCategory === "All" || issue.category === filterCategory) &&
    (filterStatus === "All" || issue.status === filterStatus)
  );

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={filterCategory}
          dropdownIconColor="#fff"
          style={styles.dropdown}
          onValueChange={(val) => setFilterCategory(val)}
        >
          <Picker.Item label="All Categories" value="All" />
          <Picker.Item label="General" value="General" />
          <Picker.Item label="Pothole" value="Pothole" />
          <Picker.Item label="Streetlight" value="Streetlight" />
          <Picker.Item label="Garbage" value="Garbage" />
          <Picker.Item label="Water Leakage" value="Water Leakage" />
          <Picker.Item label="Escalated" value="Escalated" /> // in both filter and admin status update

        </Picker>

        <Picker
          selectedValue={filterStatus}
          dropdownIconColor="#fff"
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
              {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.category}>Category: {item.category}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
              {item.address && <Text style={styles.address}>📍 {item.address}</Text>}

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

              {/* Admin-only status update */}
              {isAdmin && (
                <View style={styles.adminRow}>
                  <Text style={{ color: "#fff", marginRight: 8 }}>Update Status:</Text>
                  <Picker
                    selectedValue={item.status}
                    dropdownIconColor="#fff"
                    style={styles.statusDropdown}
                    onValueChange={(val) => updateIssueStatus(item.id, val)}
                  >
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="In Progress" value="In Progress" />
                    <Picker.Item label="Resolved" value="Resolved" />
                  </Picker>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 12 },
  dropdownContainer: { backgroundColor: "#1E1E1E", borderRadius: 12, marginVertical: 8, padding: 8 },
  dropdown: { color: "#fff", height: 50 },
  emptyWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#888", fontSize: 18 },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 14,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: { width: "100%", height: 160, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 6 },
  desc: { fontSize: 14, color: "#ccc", marginBottom: 6 },
  category: { fontSize: 14, color: "#FFD700", marginBottom: 6 },
  status: { fontSize: 14, color: "#00CED1", marginBottom: 6 },
  address: { color: "#aaa", fontStyle: "italic", marginBottom: 6 },
  mapButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  mapButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  adminRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  statusDropdown: { color: "#fff", height: 40, flex: 1 },
});
