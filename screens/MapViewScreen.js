// screens/MapViewScreen.js
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapViewScreen({ route }) {
  const { title, description, location } = route.params;
  if (!location) return (<View style={styles.container}><Text>No location data.</Text></View>);
  return (
    <MapView style={styles.map} initialRegion={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
      <Marker coordinate={location} title={title} description={description} />
    </MapView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center", alignItems: "center" }, map: { flex: 1 } });
