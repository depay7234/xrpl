import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { API_BASE_URL,OTP_VArification } from '../../config';



const OTPVerification = () => {
    const navigation = useNavigation();
    const [verificationCode, setVerificationCode] = useState(new Array(6).fill(''));
    const [clicked, setClicked] = useState(false);
    const [registrationProcessEmail, setRegistrationProcessEmail] = useState("");


    const inputRefs = useRef([]);
    useEffect(() => {
        setVerificationCode(new Array(6).fill(null));

        const loadEmail = async () => {
            const email = await getData('registrationProcessEmail');
            // console.log("email",email)
            if (email) {
                setRegistrationProcessEmail(email);
            } else {
                setRegistrationProcessEmail("")
            }
        };

        loadEmail();
    }, []);



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
                return value;
            } else {
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

    const handleBack = () => {
        navigation.navigate('Signup');
    };

    const handleVerify = async () => {
        // console.log(registrationProcessEmail)
        // console.log(otp.length);
        // navigation.navigate('OTPVerified')
        // setClicked(true);
        const otp = verificationCode.join('');
        if (registrationProcessEmail && otp.length === 6) {
            try {
                const response = await axios.post(`${API_BASE_URL}${OTP_VArification}`, {
                    otp: otp,
                    email: registrationProcessEmail,
                });
                console.log('Response:', response.data);
                if (response.data.status === "success") {
                    showToast(response.data.status, "Success", response.data.message)
                    removeData("registrationProcessEmail")
                    navigation.navigate('OTPVerified')
                    setClicked(true)
                } else {
                    showToast(response.data.status, "Error : ", response.data.message)
                }
            } catch (error) {
                console.log(error)
                // console.error('Error:', error.response ? error.response.data : error.message);
                Toast.show({ type: 'error', text1: 'Error', text2: 'An error occurred while creating the user.' });
            }
        } else if (otp.length < 6) {
            showToast("error", "Error", "Enter the Valid OTP")
        }
    };

    const handleResendCode = () => {
        // Handle resend code logic
    };

    const handleChangeText = (text, index) => {
        const newCode = [...verificationCode];
        newCode[index] = text;
        setVerificationCode(newCode);

        if (text && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../src/assets/otpback.png')} style={styles.background}>
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>OTP Verification</Text>
                    </View>

                    <Text style={styles.verificationText}>
                        Enter the verification code we just sent to your email {registrationProcessEmail}
                    </Text>

                    <View style={styles.inputContainer}>
                        {verificationCode.map((_, index) => (
                            <TextInput
                                key={index}
                                style={styles.input}
                                keyboardType="numeric"
                                maxLength={1}
                                onChangeText={(text) => handleChangeText(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={verificationCode[index]}
                            />
                        ))}
                    </View>
                    <Text style={styles.resendText}>Didn't receive code? </Text>
                    <TouchableOpacity onPress={handleResendCode}>
                        <Text style={styles.resendLink}>Resend</Text>
                    </TouchableOpacity>

                    <View style={styles.innerContainer}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: clicked ? '#0D8BFF' : 'white' }]}
                            onPress={handleVerify}
                        >
                            <Text style={[styles.buttonText, { color: clicked ? 'white' : '#000000' }]}>Verify</Text>
                        </TouchableOpacity>
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
        justifyContent: "center"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: -30,
        marginTop: 90,
        color: 'white'
    },
    verificationText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
        textAlign: 'center',
        marginHorizontal: 5,
        borderRadius: 5,
        color: 'white',
        fontSize: 20,
        marginTop: 30,
    },
    resendText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    resendLink: {
        textDecorationLine: 'underline',
        color: 'white',
        marginLeft: 260,
        marginTop: -35,
        fontWeight: 'bold'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OTPVerification;