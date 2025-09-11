import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useContext, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IssuesContext } from "./IssuesContext";

export default function ReportIssueScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);

  const { addIssue } = useContext(IssuesContext);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
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

    let rev = await Location.reverseGeocodeAsync(c);
    if (rev.length > 0) {
      let addr = rev[0];
      setAddress(`${addr.name || ""}, ${addr.street || ""}, ${addr.city || ""}, ${addr.region || ""}, ${addr.country || ""}`);
    }
  };

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert("Error", "Please enter all details");
      return;
    }

    const newIssue = { title, description, image, address, location: coords };
    addIssue(newIssue);

    Alert.alert("Success", "Issue reported successfully!");
    setTitle(""); setDescription(""); setImage(null); setAddress(""); setCoords(null);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Issue Title</Text>
      <TextInput style={styles.input} placeholder="Enter title" value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, { height: 100 }]} placeholder="Enter description" value={description} onChangeText={setDescription} multiline />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pick an Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TouchableOpacity style={styles.locationButton} onPress={fetchLocation}>
        <Text style={styles.locationButtonText}>Get Location</Text>
      </TouchableOpacity>
      {address ? <Text style={styles.address}>{address}</Text> : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Issue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginTop: 5 },
  imageButton: { backgroundColor: "#6c63ff", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 15 },
  imageButtonText: { color: "#fff", fontSize: 16 },
  preview: { width: "100%", height: 150, borderRadius: 8, marginVertical: 10 },
  locationButton: { backgroundColor: "#FFAA00", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  locationButtonText: { color: "#fff", fontWeight: "bold" },
  address: { marginTop: 8, fontSize: 14, fontStyle: "italic" },
  submitButton: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
