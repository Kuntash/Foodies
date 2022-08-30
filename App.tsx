import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ThemeProvider from './contexts/ThemeProvider';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';

/* 
  TODO:
  -> Create custom hook for all the animations. <DONE>
  -> Create a scrollable view with the main image changing size based on swiped up or down:
    If scroll to top image zooms, else image hides. <DONE>
  -> Integrate firebase with the app.
  -> Implement Phone authentication with firebase. 
  -> Create a cool UI for SIGNUP and LOGIN and use lottie animations
  -> Create a cool Food menu screen with ability to add items to the cart.
*/
type RootStackParamList = {};
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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

          {/* NOTE: Account screen should be placed such that, it can cover any       screen during navigation */}
          <AccountScreen />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
