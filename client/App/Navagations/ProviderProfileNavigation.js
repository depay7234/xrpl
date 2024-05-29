import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Personal from '../Screens/Profile';
import Password from '../Screens/Password';
import Profile from '../Screens/Personal';

const Stack = createStackNavigator();

function PersonalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profiles" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Personal" component={Personal} options={{ headerShown: false }} />
      <Stack.Screen name="Password" component={Password} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default PersonalStack;
