import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Profile Button at Top-Left */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.profileButtonText}>👤 Profile</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Welcome to Citizen Issue App</Text>

      {/* Report Issue */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007BFF" }]}
        onPress={() => navigation.navigate("ReportIssue")}
      >
        <Text style={styles.buttonText}>Report an Issue</Text>
      </TouchableOpacity>

      {/* View Issues */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#28A745" }]}
        onPress={() => navigation.navigate("ViewIssues")}
      >
        <Text style={styles.buttonText}>View Reported Issues</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#DC3545" }]}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 40, textAlign: "center" },
  button: { padding: 15, marginVertical: 10, width: "80%", borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  profileButton: { position: "absolute", top: 40, left: 20, backgroundColor: "#6c63ff", padding: 10, borderRadius: 8 },
  profileButtonText: { color: "#fff", fontWeight: "bold" },
});
