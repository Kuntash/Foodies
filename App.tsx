import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ThemeProvider from './contexts/ThemeProvider';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';

type RootStackParamList = {};
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <AccountScreen />
      </NavigationContainer>
    </ThemeProvider>
  );
}
