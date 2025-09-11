import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { IssuesProvider } from "./screens/IssuesContext";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MapViewScreen from "./screens/MapViewScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ReportIssueScreen from "./screens/ReportIssueScreen";
import SignupScreen from "./screens/SignupScreen";
import ViewIssuesScreen from "./screens/ViewIssuesScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <IssuesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Citizen Issue App" }} />
          <Stack.Screen name="ReportIssue" component={ReportIssueScreen} options={{ title: "Report an Issue" }} />
          <Stack.Screen name="ViewIssues" component={ViewIssuesScreen} options={{ title: "Reported Issues" }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
          <Stack.Screen name="MapView" component={MapViewScreen} options={{ title: "Issue Location" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </IssuesProvider>
  );
}
