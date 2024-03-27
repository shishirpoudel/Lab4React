import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './components/TabNavigation.js';
import TransactionDetail from './components/TransactionDetail'; 
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'blue', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Main" component={TabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
