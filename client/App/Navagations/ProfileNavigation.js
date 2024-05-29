import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Personal from '../Screens/Personal';
import Password from '../Screens/Password';
import Profile from '../Screens/Profile';

const Stack = createStackNavigator();

function ProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Personal" component={Personal} options={{ headerShown: false }} />
      <Stack.Screen name="Password" component={Password} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;
