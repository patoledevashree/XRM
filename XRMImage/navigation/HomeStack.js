import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import {View, Text, Image} from 'react-native';
import Features from '../screens/Features';
import ExteriorImages from '../screens/ExteriorImages';
import InteriorImages from '../screens/InteriorImages';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Features"
        component={Features}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ExteriorImages"
        component={ExteriorImages}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InteriorImages"
        component={InteriorImages}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
