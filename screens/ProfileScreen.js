import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const user = { name: 'John Doe', email: 'johndoe@example.com', phone: '+91 9876543210' };
  const reportedIssues = [
    { id: 1, title: 'Pothole on Main Street', status: 'Pending' },
    { id: 2, title: 'Streetlight not working', status: 'Resolved' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.label}>Name: {user.name}</Text>
      <Text style={styles.label}>Email: {user.email}</Text>
      <Text style={styles.label}>Phone: {user.phone}</Text>

      <Text style={[styles.title, { marginTop: 30 }]}>Reported Issues</Text>
      {reportedIssues.map((issue) => (
        <View key={issue.id} style={styles.issueCard}>
          <Text style={styles.issueTitle}>{issue.title}</Text>
          <Text>Status: {issue.status}</Text>
        </View>
      ))}

      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 10 },
  issueCard: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
  },
  issueTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
});
