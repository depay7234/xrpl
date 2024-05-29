import React from 'react'
import PastMuseumTrips from './../Screens/PastMuseumTrips'
import PastMonastryTrips from '../Screens/PastMonastryTrips'
import PastHotelTrips from '../Screens/PastHotelTrips'
import Trips from '../Screens/Trips'
import { createStackNavigator } from '@react-navigation/stack';
import PastMonasteryTripDetails from '../Screens/PastMonasteryTripDetails'
import PastMuseumTripDetails from '../Screens/PastMuseumTripDetails'
import PastHotelTripDetails from '../Screens/PastHotelTripDetails'
import PastParkTrips from '../Screens/PastParkTrips'
import PastParkTripDetails from '../Screens/PastParkTripDetails'
import PastDzongTrips from '../Screens/PastDzongTrips'
import PastDzongTripDetails from '../Screens/PastDzongTripDetails'

const Stack = createStackNavigator();

export default function TripsNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Trips" component={Trips} options={{ headerShown: false }} />
      <Stack.Screen name="PastMonastryTrips" component={PastMonastryTrips} options={{ headerShown: false }} />
      <Stack.Screen name="PastMuseumTrips" component={PastMuseumTrips} options={{ headerShown: false }} />
      <Stack.Screen name="PastHotelTrips" component={PastHotelTrips} options={{ headerShown: false }} />
      <Stack.Screen name="PastParkTrips" component={PastParkTrips} options={{ headerShown: false }} />
      <Stack.Screen name="PastDzongTrips" component={PastDzongTrips} options={{ headerShown: false }} />
      <Stack.Screen name="PastMonasteryTripDetails" component={PastMonasteryTripDetails} options={{ headerShown: false }} />
      <Stack.Screen name="PastMuseumTripDetails" component={PastMuseumTripDetails} options={{ headerShown: false }} />
      <Stack.Screen name="PastHotelTripDetails" component={PastHotelTripDetails} options={{ headerShown: false }} />
      <Stack.Screen name="PastParkTripDetails" component={PastParkTripDetails} options={{ headerShown: false }} />
      <Stack.Screen name="PastDzongTripDetails" component={PastDzongTripDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
    
  )
}