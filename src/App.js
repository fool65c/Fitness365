import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import FoodSearch from './pages/FoodSearch';
import CreateMeal from './pages/CreateMeal';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Main"
                component={Main}
            />
            <Stack.Screen
                name="FoodSearch"
                component={FoodSearch}
            />
            <Stack.Screen
                name="CreateMeal"
                component={CreateMeal}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;