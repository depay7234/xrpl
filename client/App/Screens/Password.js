import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Password() {
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const navigation = useNavigation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleBack = () => {
        navigation.navigate('Profile')
    }

    const handleDone = () => {
        // Add your logic to handle the password change
        console.log('Current Password:', currentPassword);
        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);
        // You can add more logic here, like sending the data to a server or validating the passwords
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setUpdateSuccess(true); // Set upload success to true

    };


    const renderUpdateSuccessMessage = () => {
        if (updateSuccess) {
            return (
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <FontAwesome name="check-circle" size={50} color="green" />
                        <Text style={styles.updateSuccessText}>Update Success!</Text>
                        <TouchableOpacity style={styles.okButton} onPress={() => setUpdateSuccess(false)}>
                            <Text style={styles.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Ionicons name="chevron-back-outline" size={24} color="#7F7F7F" />
            </TouchableOpacity>
            <Text style={styles.passwordTitle}>Password & Security</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.labels}>
                <InputLabel label="Current Password" value={currentPassword} onChangeText={setCurrentPassword} showPassword={showCurrentPassword} setShowPassword={setShowCurrentPassword} style={styles.label} />
                <InputLabel label="New Password" value={newPassword} onChangeText={setNewPassword} showPassword={showNewPassword} setShowPassword={setShowNewPassword} />
                <InputLabel label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} />
            </View>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
            {renderUpdateSuccessMessage()}

        </SafeAreaView>
    );
}

const InputLabel = ({ label, value, onChangeText, showPassword, setShowPassword }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                placeholder={`Enter ${label.toLowerCase()}`}
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#B0B0B0" />
            </TouchableOpacity>
        </View>

    </View>
);

const styles = StyleSheet.create({
    horizontalLine: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.7,
        marginBottom: 20,
        marginTop: 15
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%', // Reduced width
        borderRadius: 10,
        padding: 20,
        height: '100%', // Set maximum height of the popup
        flex: 1.8, //
    },
    labels: {
        marginTop: 7,
        padding: 5,

    },
    passwordTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        // marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 10,
        width: '100%',
    },
    label: {
        marginBottom: 30,
        fontWeight: 'bold',
    },
    inputWrapper: {
        position: 'relative',
        marginTop: -20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D0D0D0', // Change border color to gray
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        position: 'absolute',
        top: 8,
        right: 10,
    },
    doneButton: {
        backgroundColor: '#1C9FE2',
        paddingVertical: 14,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    doneButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    backButton: {
        padding: 10,
        position: 'absolute', // Add this line
        left: 10, // Add this line
        top: 42
    },
    updateSuccessContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    updateSuccessText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    okButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 20,
        borderColor: "#2AD73B", // Set border color to green
        borderWidth: 2, // Set border width
    },
    okButtonText: {
        color: 'black',
        fontSize: 18,

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        bottom: 150

    },

});
