import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IssuesContext } from "./IssuesContext";

export default function ProfileScreen({ navigation }) {
  const { currentUser, updateUser } = useContext(IssuesContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [photo, setPhoto] = useState(currentUser.photo);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const saveProfile = () => {
    const updated = { name, email, phone, photo };
    updateUser(updated);
    Alert.alert("Saved!", "Profile updated successfully.");
  };

  return (
    <View style={styles.container}>
      {/* Profile Photo */}
      <TouchableOpacity onPress={pickPhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={{ color: "#fff" }}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Editable Info */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveText}>Save Profile</Text>
      </TouchableOpacity>

      {/* My Issues Button */}
      <TouchableOpacity
        style={styles.myIssuesButton}
        onPress={() => navigation.navigate("ViewIssues", { filterUser: true })}
      >
        <Text style={styles.myIssuesText}>📋 My Issues</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", alignItems: "center" },
  label: { fontWeight: "bold", marginTop: 15, alignSelf: "flex-start" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, width: "100%", marginTop: 5 },
  photo: { width: 120, height: 120, borderRadius: 60, marginTop: 20 },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#6c63ff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  myIssuesButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },
  myIssuesText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
