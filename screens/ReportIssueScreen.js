// screens/ReportIssueScreen.js
// No major changes needed here, just the `status` will be automatically added via IssuesContext.
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useContext, useState } from "react";
import {
  Alert,
  Image,
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
  const [category, setCategory] = useState("General");
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);
  const { addIssue } = useContext(IssuesContext);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

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
    if (!title || !description || !coords) {
      Alert.alert("Error", "Please enter all details & select location.");
      return;
    }
    addIssue({ title, description, category, image, address, location: coords });
    Alert.alert("Success", "Issue reported!");
    setTitle(""); setDescription(""); setCategory("General"); setImage(null); setAddress(""); setCoords(null);
    navigation.navigate("Home");
  };

  return (
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

      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={category}
          dropdownIconColor="#fff"
          style={styles.dropdown}
          onValueChange={(val) => setCategory(val)}
        >
          <Picker.Item label="General" value="General" />
          <Picker.Item label="Pothole" value="Pothole" />
          <Picker.Item label="Streetlight" value="Streetlight" />
          <Picker.Item label="Garbage" value="Garbage" />
          <Picker.Item label="Water Leakage" value="Water Leakage" />
        </Picker>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.secondary} onPress={pickImage}>
          <Text style={styles.secondaryText}>Pick Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryAlt} onPress={takePhoto}>
          <Text style={styles.secondaryText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TouchableOpacity style={styles.tertiary} onPress={fetchLocation}>
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 16 },
  heading: { fontSize: 24, fontWeight: "700", color: "#fff", marginBottom: 16, textAlign: "center" },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  dropdownContainer: { backgroundColor: "#1E1E1E", borderRadius: 12, marginVertical: 8 },
  dropdown: { color: "#fff", height: 50 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  secondary: { flex: 1, margin: 4, backgroundColor: "#6C63FF", padding: 14, borderRadius: 12, alignItems: "center" },
  secondaryAlt: { flex: 1, margin: 4, backgroundColor: "#0096FF", padding: 14, borderRadius: 12, alignItems: "center" },
  secondaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  preview: { width: "100%", height: 160, borderRadius: 12, marginTop: 12 },
  tertiary: { backgroundColor: "#FFAA00", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 12 },
  tertiaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  address: { backgroundColor: "#1E1E1E", color: "#fff", marginTop: 10, padding: 10, borderRadius: 12, fontStyle: "italic", fontSize: 14, textAlign: "center" },
  map: { width: "100%", height: 200, borderRadius: 12, marginTop: 12 },
  primary: { backgroundColor: "#28A745", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 18 },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
