// screens/ProfileScreen.js
import { useContext, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IssuesContext } from './IssuesContext';

export default function ProfileScreen({ navigation }) {
  const { issues } = useContext(IssuesContext);
  const [name, setName] = useState('Your Name');
  const [email, setEmail] = useState('your@email.com');
  const [mobile, setMobile] = useState('1234567890');

  const handleSave = () => {
    alert('Profile Updated!');
  };

  return (
    <View style={styles.container}>
      {/* Editable Profile Section */}
      <Image source={require('../assets/images.jpeg')} style={styles.profileImage} />

      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#888" />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={mobile}
        onChangeText={setMobile}
        placeholder="Mobile"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Citizen Reported Issues */}
      <Text style={styles.heading}>My Reported Issues</Text>

      {issues.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>You haven't reported any issues yet.</Text>
        </View>
      ) : (
        <FlatList
          data={issues}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image && <Image source={{ uri: item.image }} style={styles.issueImage} />}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.category}>Category: {item.category}</Text>
              <Text style={styles.status}>Status: {item.status || 'Pending'}</Text>
              {item.address && <Text style={styles.address}>📍 {item.address}</Text>}

              {item.location && (
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() =>
                    navigation.navigate('MapView', {
                      title: item.title,
                      description: item.description,
                      location: item.location,
                    })
                  }
                >
                  <Text style={styles.mapButtonText}>View on Map</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 12 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 15, borderWidth: 2, borderColor: '#6C63FF', alignSelf: 'center' },
  input: { width: '90%', height: 50, backgroundColor: '#1E1E1E', color: '#fff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#333', alignSelf: 'center' },
  button: { width: '90%', backgroundColor: '#6C63FF', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 10, alignSelf: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#333', marginVertical: 20, width: '90%', alignSelf: 'center' },
  heading: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 12, textAlign: 'center' },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 16 },
  card: { backgroundColor: '#1E1E1E', padding: 14, marginVertical: 8, borderRadius: 12 },
  issueImage: { width: '100%', height: 160, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 6 },
  desc: { fontSize: 14, color: '#ccc', marginBottom: 6 },
  category: { fontSize: 14, color: '#FFD700', marginBottom: 4 },
  status: { fontSize: 14, color: '#00CED1', marginBottom: 6 },
  address: { color: '#aaa', fontStyle: 'italic', marginBottom: 6 },
  mapButton: { backgroundColor: '#6C63FF', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  mapButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
