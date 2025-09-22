// screens/HomeScreen.js
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/homescreen_bg.jpg")} // 👈 replace with your image path
      style={styles.container}
      resizeMode="cover"
    >
      {/* Center Content */}
      <View style={styles.center}>
        <Text style={styles.title}></Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.reportButton]}
            onPress={() => navigation.navigate("ReportIssue")}
          >
            <Ionicons name="camera-outline" size={22} color="#000" />
            <Text style={styles.buttonText}>Report an Issue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => navigation.navigate("ViewIssues")}
          >
            <Ionicons name="list-outline" size={22} color="#000" />
            <Text style={styles.buttonText}>View Issues</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={() => navigation.replace("Login")}
          >
            <Ionicons name="log-out-outline" size={22} color="#000" />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Profile Button */}
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={38} color="#000" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 55,
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
    shadowColor: "#fff",
    shadowOpacity: 0.25,
    shadowOffset: { width: 1, height: 5 },
    shadowRadius: 10,
  },
  reportButton: {
    backgroundColor: "#fff",
  },
  viewButton: {
    backgroundColor: "#fff",
  },
  logoutButton: {
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
  },
  bottomRow: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
});
