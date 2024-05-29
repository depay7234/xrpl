import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function Personal() {
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [nationality, setNationality] = useState('');
    const [cid, setCid] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    const handleBack = () => {
        navigation.navigate('Profile')
    }

    const handleDone = () => {
        console.log('Form submitted!');
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <SafeAreaView style={styles.container}>
                {/* <View style={styles.popup}> */}
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="chevron-back-outline" size={24} color="#7F7F7F" />
                </TouchableOpacity>
                    <Text style={styles.personal}>Personal Information</Text>
                    <View style={styles.horizontalLine}></View>
                    <TouchableOpacity style={styles.profileContainer} onPress={pickImage}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.profile} resizeMode="contain" />
                        ) : (
                            <Image source={require('../../src/assets/profile.jpg')} style={styles.profile} resizeMode="contain" />
                        )}
                        <View style={styles.cameraIconContainer}>
                            <MaterialCommunityIcons name="camera" size={20} color="#686868" />
                            <Text style={styles.addText}>Add</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.formContainer}>
                        <Text style={styles.editTitle}>Edit Personal Details</Text>
                        <InputLabel name="Name">
                            <TextInput
                                style={styles.input}
                                placeholder="Pema Yangzom"
                                value={name}
                                onChangeText={setName}
                            />
                        </InputLabel>
                        <InputLabel name="Contact Number">
                            <TextInput
                                style={styles.input}
                                placeholder="975+ 77736803"
                                value={contactNumber}
                                onChangeText={setContactNumber}
                            />
                        </InputLabel>
                        <InputLabel name="Email">
                            <TextInput
                                style={styles.input}
                                placeholder="pema@gmail.com"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </InputLabel>
                        <InputLabel name="Nationality">
                            <TextInput
                                style={styles.input}
                                placeholder="Bhutanese"
                                value={nationality}
                                onChangeText={setNationality}
                            />
                        </InputLabel>
                        <InputLabel name="CID">
                            <TextInput
                                style={styles.input}
                                placeholder="10902001851"
                                value={cid}
                                onChangeText={setCid}
                            />
                        </InputLabel>
                        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
            {renderUpdateSuccessMessage()}

                {/* </View> */}
            </SafeAreaView>
        </ScrollView>
    );
}

const InputLabel = ({ name, children }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{name}</Text>
        {children}
    </View>
);

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    editTitle: {
        // textAlign: 'center',
        fontWeight: 'bold',
        color: '#686868',
        marginBottom: 10,
        fontSize: 18,
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        padding: 20,
    },
    personal: {
        textAlign: 'center',
        fontWeight: 'bold',
        // marginTop: -0,
        fontSize: 18,
    },
    horizontalLine: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.7,
        marginBottom: 20, 
        marginTop: 15
    },
    backButton: {
        marginTop: 10,
    },
    profileContainer: {
        alignItems: 'center',
    },
    profile: {
        width: 200,
        height: 200,
    },
    cameraIconContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 2,
        paddingLeft:10,
        paddingRight: 10,
        borderRadius: 15,
        marginTop: -80,
        marginLeft: 4,
    },
    addText: {
        marginLeft: 5,
        color: '#686868'
    },
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 5,
        marginBottom: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    doneButton: {
        backgroundColor: '#1C9FE2',
        paddingVertical: 14,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginTop: 5,
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
