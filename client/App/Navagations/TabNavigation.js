import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home';
import Wallet from '../Screens/Wallet';
import Uploads from '../Screens/Uploads';
import Profile from '../Screens/Profile';
import { Ionicons } from '@expo/vector-icons';
import AddHotelNavigate from './AddNavigation';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileNavigation from './ProfileNavigation';
import { Entypo } from '@expo/vector-icons';
import UploadMuseum from '../MuseumScreen/UploadMuseum';
import ProviderWallet from '../Screens/ProviderWallet';
import ProviderTabNavigation from './ProviderTabNavigation';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#121417',
            tabBarInactiveTintColor: '#637887',
        }}>
            <Tab.Screen name="Home" component={AddHotelNavigate}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name='home' color={color} size={size} />
                    )
                }} />
            <Tab.Screen name="ProviderWallet" component={ProviderWallet}
                options={{
                    tabBarLabel: 'Wallet',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='compass-outline' color={color} size={size} />
                    )
                }} />
            <Tab.Screen name="UploadMuseum" component={UploadMuseum}
                options={{
                    tabBarLabel: 'My Uploads',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='briefcase-outline' color={color} size={20} />
                    )
                }} />
            <Tab.Screen name="ProviderTabNavigation" component={ProviderTabNavigation}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-circle" size={20} color={color} />
                    )
                }} />

        </Tab.Navigator>
    )
}