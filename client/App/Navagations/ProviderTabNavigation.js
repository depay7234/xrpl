import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import ExploreNavigation from './ExploreNavigation';
import ProviderWallet from '../Screens/ProviderWallet';
import ProfileNavigation from './ProviderProfileNavigation';
import TripsNavigation from './TripsNavigation';

export default function ProviderTabNavigation() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#00AF87',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: {
                    display: 'flex'
                }
            }}
        >
            <Tab.Screen
                name="ExploreNavigation"
                component={ExploreNavigation}
                options={{
                    tabBarLabel: "Explore",
                    tabBarIcon: ({ color}) => (
                        <Ionicons name="search" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="TripsNavigation"
                component={TripsNavigation}
                options={{
                    tabBarLabel: "Trips",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map-marker-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Wallet"
                component={ProviderWallet}
                options={{
                    tabBarLabel: "Wallet",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="wallet-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileNavigation"
                component={ProfileNavigation} 
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-circle" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
