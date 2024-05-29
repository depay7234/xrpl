import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function AddMuseum() {
    const [hotelName, setHotelName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [hotelNorms, setHotelNorms] = useState('');
    const [rewardSystem, setRewardSystem] = useState('');
    const [roomType, setRoomType] = useState('');
    const [photos, setPhotos] = useState('');
    const [availability, setAvailability] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedLuxury, setSelectedLuxury] = useState("1 star");

    const navigation = useNavigation();

    const handleLuxurySelect = (luxury) => {
        setSelectedLuxury(luxury);
    };

    const handleRoomTypeSelection = (type) => {
        if (selectedRoomTypes.includes(type)) {
            setSelectedRoomTypes(selectedRoomTypes.filter(item => item !== type));
        } else {
            setSelectedRoomTypes([...selectedRoomTypes, type]);
        }
    };
    const handleTypeSelection = (type) => {
        setSelectedType(type);
    };

    const roomTypesLeft = ['Standard Room', 'Single Room', 'Duplex Room'];
    const roomTypesRight = ['Deluxe Room', 'Suites Room', 'Connecting Room'];

    const handleSave = () => {
        console.log("Details Saved!");
    };

    const handleBack = () => {
        navigation.navigate('Home');
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setPhotos(result.uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const handleUploadNow = () => {
        console.log("Upload Now!");
        setUploadSuccess(true); 
    };

    const renderUploadSuccessMessage = () => {
        if (uploadSuccess) {
            return (
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <FontAwesome5 name="check-circle" size={50} color="green" />
                        <Text style={styles.uploadSuccessText}>Upload Success!</Text>
                        <TouchableOpacity style={styles.okButton} onPress={() => setUploadSuccess(false)}>
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
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Museum</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name of Museum</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="Enter hotel name"
                        value={hotelName}
                        onChangeText={text => setHotelName(text)}
                    />
                </View>
 
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="Thimphu, Bhutan"
                        value={location}
                        onChangeText={text => setLocation(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="XRP per night"
                        value={price}
                        onChangeText={text => setPrice(text)}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Known For</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="Enter description"
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Highlight</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="Free WiFi, breakfast"
                        value={features}
                        onChangeText={text => setFeatures(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Museum Norms and Regualtion</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="Pets not allowed"
                        value={hotelNorms}
                        onChangeText={text => setHotelNorms(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Reward System</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="Reward of token for"
                        value={rewardSystem}
                        onChangeText={text => setRewardSystem(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Photos</Text>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Add image"
                        value={photos}
                        onChangeText={text => setPhotos(text)}
                    />
                    <TouchableOpacity onPress={pickImage}>
                        <FontAwesome5 name="images" size={24} color="black" style={styles.photoIcon} />
                    </TouchableOpacity>
                </View>

                {/* Upload Button */}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#0D8BFF' }]} onPress={handleUploadNow}>
                    <Text style={styles.buttonText}>Upload Now</Text>
                </TouchableOpacity>

                {/* Render upload success message */}
                {renderUploadSuccessMessage()}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    saveButton: {
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginLeft: 50,
    },
    saveButtonText: {
        color: '#808080',
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        paddingHorizontal: 15,
        marginRight: 100,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#C2BC8E',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },

    typeButtonText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: 'lightblue',
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: '90%',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: -10,
        alignItems: 'center', // Added alignItems
        width: '100%', // Added width to ensure it takes full width
    },
    labelAvailability: {
        marginTop: 40,
        marginLeft: -300,
        fontSize: 18,
        marginBottom: 10
    },


    photoIcon: {
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    uploadSuccessContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    uploadSuccessText: {
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
        top: -90
    },
});
