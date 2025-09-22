// screens/ReportIssueScreen.js
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useContext, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IssuesContext } from "./IssuesContext";

export default function ReportIssueScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");   // ✅ new state
  const [category, setCategory] = useState("");       // ✅ issue type
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);
  const { addIssue } = useContext(IssuesContext);

  // 🔹 Departments and their related issues
  const departmentIssues = {
    Roads: ["Pothole", "Illegal Speed Breaker", "Damaged Road, speed Breaker","Traffic",],
    Sanitation: ["Garbage", "Drainage Blockage", "Open Dumping","Illegal Waste Disposal" ],
    Electricity: ["Streetlight", "Power Outage", "Hanging Wires", "Electicity tower damaged"],
    Water: ["Water Leakage", "Broken Pipeline", "Low Pressure"],
    Civic: ["Public Transport Issues", "Unclean Public Benches", "Illegal Parking",],
    Environment:["Tree Cutting", "Pollution Complaint","Noise Complaints", "Illegal Dumping in Parks or Lakes"],
    Other: ["Miscellaneous Requests","Unauthorized Shops"],
  };

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  }

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    const c = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
    setCoords(c);
    const rev = await Location.reverseGeocodeAsync(c);
    if (rev.length > 0) {
      let addr = rev[0];
      setAddress(
        `${addr.name || ""} ${addr.street || ""}, ${addr.city || ""} ${addr.region || ""}, ${addr.country || ""}`
      );
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !coords || !department || !category) {
      Alert.alert("Error", "Please fill all details & select location.");
      return;
    }
    addIssue({ title, description, department, category, image, address, location: coords });
    Alert.alert("Success", "Issue reported!");
    setTitle(""); 
    setDescription(""); 
    setDepartment(""); 
    setCategory(""); 
    setImage(null); 
    setAddress(""); 
    setCoords(null);
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={require("../assets/remain_bg.jpg")}
      style={styles.bg}
      resizeMode="cover"
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.heading}>Report an Issue</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* 🔹 Department Dropdown */}
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={department}
            dropdownIconColor="#000"
            style={styles.dropdown}
            onValueChange={(val) => {
              setDepartment(val);
              setCategory(""); // reset category when department changes
            }}
          >
            <Picker.Item label="Select Department" value="" />
            {Object.keys(departmentIssues).map((dept) => (
              <Picker.Item key={dept} label={dept} value={dept} />
            ))}
          </Picker>
        </View>

        {/* 🔹 Category Dropdown (depends on department) */}
        {department ? (
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={category}
              dropdownIconColor="#000"
              style={styles.dropdown}
              onValueChange={(val) => setCategory(val)}
            >
              <Picker.Item label="Select Issue Type" value="" />
              {departmentIssues[department].map((issue) => (
                <Picker.Item key={issue} label={issue} value={issue} />
              ))}
            </Picker>
          </View>
        ) : null}

        <View style={styles.row}>
          <TouchableOpacity style={styles.secondary} onPress={pickImage}>
            <Ionicons name="albums-outline" size={22} color="#000" />
            <Text style={styles.secondaryText}>Pick Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAlt} onPress={takePhoto}>
            <Ionicons name="camera-outline" size={22} color="#000" />
            <Text style={styles.secondaryText}>Take Photo</Text>
          </TouchableOpacity>
        </View>

        {image && <Image source={{ uri: image }} style={styles.preview} />}

        <TouchableOpacity
          style={[styles.tertiary, { flexDirection: "row", alignItems: "center", justifyContent: "center" }]}
          onPress={fetchLocation}
        >
          <Ionicons name="location" size={22} color="#000" />
          <Text style={styles.tertiaryText}>Get Current Location</Text>
        </TouchableOpacity>

        {address ? <Text style={styles.address}>{address}</Text> : null}

        {coords && (
          <MapView
            style={styles.map}
            region={{
              ...coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={(e) => {
              const newCoords = e.nativeEvent.coordinate;
              setCoords(newCoords);
            }}
          >
            <Marker
              coordinate={coords}
              draggable
              onDragEnd={(e) => setCoords(e.nativeEvent.coordinate)}
            />
          </MapView>
        )}

        <TouchableOpacity style={styles.primary} onPress={handleSubmit}>
          <Text style={styles.primaryText}>Submit Issue</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 24, fontWeight: "700", color: "#fff", marginBottom: 16, textAlign: "center" },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  dropdownContainer: { backgroundColor: "#fff", borderRadius: 12, marginVertical: 8, borderWidth: 1, borderColor: "#333" },
  dropdown: { color: "#000", height: 60 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  secondary: { flex: 1, margin: 4, backgroundColor: "#fff", padding: 14, borderRadius: 50, alignItems: "center", borderWidth: 1, borderColor: "#333" },
  secondaryAlt: { flex: 1, margin: 4, backgroundColor: "#fff", padding: 14, borderRadius: 50, alignItems: "center", borderWidth: 1, borderColor: "#333" },
  secondaryText: { color: "#000", fontWeight: "700", fontSize: 16 },
  preview: { width: "100%", height: 280, borderRadius: 12, marginTop: 12, borderWidth: 1, borderColor: "#333" },
  tertiary: { backgroundColor: "#fff", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 12, borderWidth: 1, borderColor: "#333" },
  tertiaryText: { color: "#000", fontWeight: "700", fontSize: 16 },
  address: { backgroundColor: "#fff", color: "#000", marginTop: 10, padding: 10, borderRadius: 12, fontSize: 14, textAlign: "left", borderWidth: 1, borderColor: "#333" },
  map: { width: "100%", height: 200, borderRadius: 12, marginTop: 12, borderWidth: 1, borderColor: "#333" },
  primary: { backgroundColor: "#fff", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 18, borderWidth: 1, borderColor: "#333" },
  primaryText: { color: "#000", fontWeight: "700", fontSize: 16 },
});
