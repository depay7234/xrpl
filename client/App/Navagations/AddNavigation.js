import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import AddHotel from '../Screens/AddHotel';
import Uploads from '../Screens/Uploads';
import BookingDetails from '../Screens/BookingDetails';
import EditDetails from '../Screens/EditDetails';

const Stack = createStackNavigator();

function AddHotelNavigate() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name='AddHotel' component={AddHotel} options={{ headerShown:false}}/>
      <Stack.Screen name='Uploads' component={Uploads} options={{ headerShown:false}}/>
      <Stack.Screen name='BookingDetails' component={BookingDetails} options={{ headerShown:false}}/>
      <Stack.Screen name='EditDetails' component={EditDetails} options={{ headerShown:false}}/>

    </Stack.Navigator>
  );
}

export default AddHotelNavigate;