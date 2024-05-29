import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL,login_APi } from '../../config';
const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error('Failed to save data', e);
        }
    };
    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            visibilityTime: 2500,
            autoHide: true,
            // topOffset: 30,
            position: 'center',
            // bottomOffset: 40,
            props: {
                backgroundColor: type === 'error' ? 'red' : 'green',
                textColor: 'white',
            },
        });
    };
    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                console.log(`Retrieved value for key ${key}:`, value);
                return value;
            } else {
                console.log(`No value found for key ${key}`);
                return null;
            }
        } catch (e) {
            console.error('Failed to fetch data', e);
            return null;
        }
    };
    const removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error('Failed to remove data', e);
        }
};

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}${login_APi}`, {
                email: email,
                password: password,
            });
            console.log('Response:', response.data);
            if (response.data.status === "success") {
                console.log("inside signup : email")
                await storeData("loginjwt", response.data.token).then(() => {
                    showToast(response.data.status, "Success", response.data.message)
                    if (response.data.role === "user") {
                        navigation.navigate('ProviderTabNavigation')
                    }else{
                        navigation.navigate('TabNavigation')
                    }
                })
            } else {
                showToast(response.data.status, "Error", response.data.message)
            }
        } catch (error) {
            console.log("error",error)
            // console.error('Error:', error.response ? error.response.data : error.message);
            Toast.show({ type: 'error', text1: 'Error', text2: 'An error occurred while creating the user.' });
        }
    };

    const handleForgotPassword = () => {
    };

    const handleSignup = () => {
        // Navigate to sign up screen
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../src/assets/back.png')} style={styles.background}>
                <View style={styles.overlay}>
                    <View style={styles.innerContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="white" // Set placeholder text color to white
                            keyboardType="email-address" // Set keyboard type to email address
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="white" // Set placeholder text color to white
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        {/* Forgot Password link */}
                        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                        {/* Login button */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                        {/* Horizontal line with text */}
                        <View style={styles.horizontalLine}>
                            <View style={styles.line}></View>
                            <Text style={styles.orText}>or</Text>
                            <View style={styles.line}></View>
                        </View>
                        {/* Don't have an account link */}
                        <View style={styles.signUpContainer}>
                            <Text style={styles.infoText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={handleSignup}>
                                <Text style={[styles.signUpText, styles.linkText]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <Toast />
        </View>
    );
};

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
        // backgroundColor: 'rgba(17, 96, 168, 0.2)', // Semi-transparent blue color
        justifyContent: "center"
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white', // Set text color to white
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#0D8BFF',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end', // Align to the right
        marginRight: 5, // Add margin to the right
        marginBottom: 10,
    },
    forgotPassword: {
        color: 'white',
    },
    horizontalLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'white',
    },
    orText: {
        color: 'white',
        marginHorizontal: 10,
    },
    signUpContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    signUpText: {
        color: '#D3D3D3', // Change color to grey
    },
    linkText: {
        // Remove textDecorationLine
    },
    infoText: {
        color: 'white',
    },
});

export default Login;
