import { useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // Mock login success
    Alert.alert("Success", "Login successful!");
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={require("../assets/loginscreen_bg.jpg")} // 👈 put your background image here
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title1}></Text>
        

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#dad7d7db"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#dad7d7db"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don't have an account? Signup</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title1: {
    fontSize: 50,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 1,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  title2: {
    fontSize: 25,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 70,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#0009",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#fff",
  },
  button: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
  link: {
    color: "#fff",
    marginTop: 20,
    fontSize: 15,
    textAlign: "center",
  },
});
