import * as React from 'react';
import { Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from './components/Navigation';
import Settings from './pages/Settings';
import Nutrition from './pages/Nutrition';

const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Text> HI </Text>
    );
  }

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: Navigation,
            }}>
            <Stack.Screen 
                name="Home" 
                component={LogoTitle} 
            />
            <Stack.Screen 
                name="Settings" 
                component={Settings} 
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;