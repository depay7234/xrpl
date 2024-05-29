import React from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation

export default function OTPVerified() {
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Login')
    };

    return (
        <ImageBackground source={require('../../src/assets/taktshang.png')} style={styles.background}>
            <View style={styles.overlay}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="cloud-done" size={100} color="#1C9FE2" />
                    <Text style={styles.exploreText}>Ready to Explore!</Text>
                    <Text style={styles.successText}>Your account has been created successfully.</Text>
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: "center",
        resizeMode: "cover",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(17, 96, 168, 0.3)',
        justifyContent: "center"
    },
    exploreText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 10
    },
    successText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    button: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#0D8BFF',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
