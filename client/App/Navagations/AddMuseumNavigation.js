import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../MuseumScreen/Home';
import BookingDetails from '../Screens/BookingDetails';
import UploadMuseum from '../MuseumScreen/UploadMuseum';
import EditMuseumDetails from '../MuseumScreen/EditMuseumDetails';
import AddMuseum from '../MuseumScreen/AddMuseum';
import MuseumBookingDetails from '../MuseumScreen/MuseumBookingDetails';

const Stack = createStackNavigator();

function AddMuseumNavigate() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name='AddMuseum' component={AddMuseum} options={{ headerShown:false}}/>
      <Stack.Screen name='UploadMuseum' component={UploadMuseum} options={{ headerShown:false}}/>
      <Stack.Screen name='MuseumBookingDetails' component={MuseumBookingDetails} options={{ headerShown:false}}/>
      <Stack.Screen name='EditMuseumDetails' component={EditMuseumDetails} options={{ headerShown:false}}/>

    </Stack.Navigator>
  );
}

export default AddMuseumNavigate;