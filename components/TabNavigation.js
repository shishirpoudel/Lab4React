import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import TransactionsPage from './TransactionsPage';
import SummaryPage from './SummaryPage';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Transactions') {
            iconName = focused ? 'file1' : 'file1';
          } else if (route.name === 'Summary') {
            iconName = focused ? 'info' : 'info';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue', 
        tabBarInactiveTintColor: 'gray', 
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      })}
    >
      <Tab.Screen name="Transactions" component={TransactionsPage} />
      <Tab.Screen name="Summary" component={SummaryPage} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
