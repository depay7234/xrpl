import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL,checkemailondatabase, CreateUser} from '../../config';



const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState();

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error('Failed to save data', e);
        }
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

    const items = [
        { label: 'User', value: 'user' },
        { label: 'admin', value: 'admin' },
    ];

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

    const handleSignup = () => {
        if (name.trim() === '') {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter your name.' });
            return;
        }
        if (email.trim() === '') {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter your email.' });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter a valid email address.' });
            return;
        }
        if (role === '') {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Please select your role.' });
            return;
        }
        if (password.trim() === '') {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter your password.' });
            return;
        }
        if (password !== confirmPassword) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Passwords do not match.' });
            return;
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };
    const handleOtpVerification = async () => {
        try {
            const check = await axios.get(`${API_BASE_URL}${checkemailondatabase}/${email}`)
            // console.log("checlk", !check.data.proceed)
            if (check.data.proceed) {
                const response = await axios.post(`${API_BASE_URL}${CreateUser}`, {
                    name: name,
                    email: email,
                    role: role,
                    password: password,
                    passwordConfirm: confirmPassword
                });
                console.log('Response:', response.data.email);
                if (response.data.status === "success") {
                    // console.log("inside signup : email")
                    await storeData("registrationProcessEmail",email).then(()=>{
                        showToast(response.data.status, response.data.status, response.data.message)
                        navigation.navigate('OTPVerification');
                    })
                }
            } else {
                showToast("error", "Error", "Email exist : user another account")
            }
            // navigation.navigate('OTPVerification');



        } catch (error) {
            console.log(error)
            // console.error('Error:', error.response ? error.response.data : error.message);
            Toast.show({ type: 'error', text1: 'Error', text2: 'An error occurred while creating the user.' });
        }

        // navigation.navigate('OTPVerification');

    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../src/assets/back.png')} style={styles.background}>
                <View style={styles.overlay}>
                    <View style={styles.innerContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="white"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="white"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <DropDownPicker
                            style={styles.roleDropdown}
                            items={items}
                            open={isOpen}
                            setOpen={setIsOpen}
                            value={currentValue}
                            setValue={setCurrentValue}
                            placeholder='Select a role'
                            placeholderStyle={{ color: 'white' }}
                            onChangeValue={(value) => setRole(value)}
                            dropDownContainerStyle={{ backgroundColor: 'white' }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="white"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="white"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleOtpVerification}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={styles.horizontalLine}>
                            <View style={[styles.line]}></View>
                            <Text style={styles.orText}>or</Text>
                            <View style={[styles.line]}></View>
                        </View>
                        <View style={styles.loginContainer}>
                            <Text style={styles.infoText}>Already have an account? </Text>
                            <TouchableOpacity onPress={handleLogin}>
                                <Text style={[styles.loginText, styles.linkText]}>Sign In</Text>
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
        justifyContent: "center"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
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
        color: 'white',
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
    loginContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    loginText: {
        color: '#D3D3D3',
    },
    linkText: {},
    infoText: {
        color: 'white',
    },
    roleDropdown: {
        marginBottom: 20,
        width: '100%',
        backgroundColor: 'transparent',
        borderColor: 'white',
        color: 'white'
    }
});

export default Signup;



