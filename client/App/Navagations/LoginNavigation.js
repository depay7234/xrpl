import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../LoginScreen/Landing';
import Login from '../LoginScreen/Login';
import Signup from '../LoginScreen/Signup';
import OTPVerification from '../LoginScreen/OTPVerification';
import OTPVerified from '../LoginScreen/OTPVerified';
import TabNavigation from './TabNavigation';
import ProviderTabNavigation from './ProviderTabNavigation';

const Stack = createStackNavigator();

function LoginNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name='OTPVerification' component={OTPVerification} options={{ headerShown: false }} />
            <Stack.Screen name='TabNavigation' component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='ProviderTabNavigation' component={ProviderTabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='OTPVerified' component={OTPVerified} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default LoginNavigation;