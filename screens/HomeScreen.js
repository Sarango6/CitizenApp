// screens/HomeScreen.js
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Profile Button */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={38} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Center Content */}
      <View style={styles.center}>
        <Text style={styles.title}>Citizen Issue App</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.reportButton]}
            onPress={() => navigation.navigate("ReportIssue")}
          >
            <Ionicons name="camera-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>Report an Issue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => navigation.navigate("ViewIssues")}
          >
            <Ionicons name="list-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>View Issues</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={() => navigation.replace("Login")}
          >
            <Ionicons name="log-out-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // dark background
  },
  topRow: {
    height: 80,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  profileButton: {
    backgroundColor: "#6C63FF",
    padding: 10,
    borderRadius: 50,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 50,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 25,
    marginVertical: 12,
    width: "90%",
    borderRadius: 20,
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
  },
  reportButton: {
    backgroundColor: "#6C63FF",
  },
  viewButton: {
    backgroundColor: "#00C853",
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
  },
});
