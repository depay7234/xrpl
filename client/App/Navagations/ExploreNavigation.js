import { createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Monastery from './../Screens/Monastery';
import Museum from './../Screens/Museum';
import Hotel from './../Screens/Hotel';
import Park from './../Screens/Park';
import Dzong from './../Screens/Dzong';
import Explore from '../Screens/Explore';
import MonasteryDetails from './../Screens/MonasteryDetails';
import MuseumDetails from './../Screens/MuseumDetails';
import HotelDetails from '../Screens/HotelDetails';
import ParkDetails from '../Screens/ParkDetails';
import DzongDetails from '../Screens/DzongDetails';

const Stack = createStackNavigator();

function ExploreNavigation() {
    return (    
        <Stack.Navigator>
            <Stack.Screen name="Explore" component={Explore} options={{ headerShown: false, tabBarVisible: true }} />
            <Stack.Screen name="Monastery" component={Monastery} options={{ headerShown: false, tabBarVisible: false }} />
            <Stack.Screen name="Museum" component={Museum} options={{ headerShown: false, tabBarVisible: false }} />
            <Stack.Screen name="Hotel" component={Hotel} options={{ headerShown: false, tabBarVisible: false }} />
            <Stack.Screen name="Park" component={Park} options={{ headerShown: false, tabBarVisible: false }} />
            <Stack.Screen name="Dzong" component={Dzong} options={{ headerShown: false, tabBarVisible: false }} />
            <Stack.Screen name="MonasteryDetails" component={MonasteryDetails} options={{ tabBarVisible: false, headerShown: false }} />
            <Stack.Screen name="MuseumDetails" component={MuseumDetails} options={{ headerShown: false, tabBarVisible: false }} />
            <Stack.Screen name="HotelDetails" component={HotelDetails} options={{ headerShown: false, tabBarVisible: false }} />
            <Stack.Screen name="ParkDetails" component={ParkDetails} options={{ headerShown: false, tabBarVisible: false }} />
            <Stack.Screen name="DzongDetails" component={DzongDetails} options={{ headerShown: false, tabBarVisible: false }} />
        </Stack.Navigator>
    );
}

export default ExploreNavigation;

