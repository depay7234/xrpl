import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { API_BASE_URL,Check_User_Login_WIth_Cookie } from '../../config';

export default function AddHotel() {
    const [hotelName, setHotelName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    // const [features, setFeatures] = useState('');
    // const [hotelNorms, setHotelNorms] = useState('');
    const [rewardSystem, setRewardSystem] = useState('');
    // const [roomType, setRoomType] = useState('');
    const [photos, setPhotos] = useState('');
    const [availability, setAvailability] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedLuxury, setSelectedLuxury] = useState("1 star");
    const [owner, setOwner] = useState("")



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


    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value !== null ? value : null;
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
    useEffect(() => {
        const loadLoginjwt = async () => {
            const loginjwt = await getData('loginjwt');
            if (loginjwt) {
                try {
                    const response = await axios.post(`${API_BASE_URL}${Check_User_Login_WIth_Cookie}`, { loginjwt });
                    const { user, status, } = response.data;
                    console.log("response", response.data)
                    if (status === "success") {
                        setOwner(response.data.user._id)
                    } else {
                        navigation.navigate("Login");
                    }
                } catch (error) {
                    console.error("Error verifying JWT:", error);
                    navigation.navigate("Login");
                }
            }
            else {
                await removeData("loginjwt")
                navigation.navigate("Login");
            }
        };

        loadLoginjwt();
    }, [navigation]);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setPhotos(result.assets[0].uri);  // Update here based on the result structure
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };


    const uploadImage = async () => {
        if (!photos) {
            Alert.alert('Error', 'Please select an image first');
            return;
        }

        let formData = new FormData();
        formData.append('photo', {
            uri: photos,
            name: 'photo.jpg',
            type: 'image/jpeg'
        });

        try {
            let response = await fetch('http://your-backend-url/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            let responseJson = await response.json();
            if (response.status === 200) {
                Alert.alert('Success', 'Image uploaded successfully');
            } else {
                Alert.alert('Error', 'Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
    };

    const handleUploadNow = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}${Upload_Hotel}`,{
                    owner: owner,
                    name: hotelName,
                    location: location,
                    star: selectedLuxury,
                    amount: price,
                    knownfor: description,
                    roomtype: selectedRoomTypes,
                    sovereignty: rewardSystem,
                },{
                    timeout: 5000, // 5000 milliseconds = 5 seconds
                }
            );
            console.log('Response:', response.data.status);
            if (response.data.status === "success") {
                // showToast(response.data.status, "Success", "Uploaded successfully")
                Alert.alert("successfully Uploaded")
                setHotelName(" ")
                setLocation(" ")
                setPrice(" ")
                setDescription(" ")
                setAvailability(false)
                setSelectedLuxury(" ")
                setSelectedRoomTypes([])
                setRewardSystem(" ")
            } else {
                Alert.alert("Failed uploading try again")
            }
        } catch (error) {
            console.log(error)
            // console.error('Error:', error.response ? error.response.data : error.message);
            Toast.show({ type: 'error', text1: 'Error', text2: 'An error occurred while creating the user.' });
        }










        // uploadSuccess




        // alert("alksjd")
        // console.log("Upload Now!");
        // setUploadSuccess(true); 
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
            <Toast />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Hotel</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name of hotel</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="Enter hotel name"
                        value={hotelName}
                        onChangeText={text => setHotelName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Luxury Level</Text>
                    <TouchableOpacity onPress={() => handleLuxurySelect("1 Star")} style={[styles.luxuryButton, selectedLuxury === "1 Star" ? styles.selectedLuxuryButton : null]}>
                        <Text style={styles.luxuryButtonText}>1 Star</Text>
                        {selectedLuxury === "1 Star" && <MaterialIcons name="radio-button-checked" size={24} color="black" />}
                        {selectedLuxury !== "1 Star" && <MaterialIcons name="radio-button-unchecked" size={24} color="gray" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLuxurySelect("2 Stars")} style={[styles.luxuryButton, selectedLuxury === "2 Stars" ? styles.selectedLuxuryButton : null]}>
                        <Text style={styles.luxuryButtonText}>2 Stars</Text>
                        {selectedLuxury === "2 Stars" && <MaterialIcons name="radio-button-checked" size={24} color="black" />}
                        {selectedLuxury !== "2 Stars" && <MaterialIcons name="radio-button-unchecked" size={24} color="gray" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLuxurySelect("3 Stars")} style={[styles.luxuryButton, selectedLuxury === "3 Stars" ? styles.selectedLuxuryButton : null]}>
                        <Text style={styles.luxuryButtonText}>3 Stars</Text>
                        {selectedLuxury === "3 Stars" && <MaterialIcons name="radio-button-checked" size={24} color="black" />}
                        {selectedLuxury !== "3 Stars" && <MaterialIcons name="radio-button-unchecked" size={24} color="gray" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLuxurySelect("4 Stars")} style={[styles.luxuryButton, selectedLuxury === "4 Stars" ? styles.selectedLuxuryButton : null]}>
                        <Text style={styles.luxuryButtonText}>4 Stars</Text>
                        {selectedLuxury === "4 Stars" && <MaterialIcons name="radio-button-checked" size={24} color="black" />}
                        {selectedLuxury !== "4 Stars" && <MaterialIcons name="radio-button-unchecked" size={24} color="gray" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLuxurySelect("5 Stars")} style={[styles.luxuryButton, selectedLuxury === "5 Stars" ? styles.selectedLuxuryButton : null]}>
                        <Text style={styles.luxuryButtonText}>5 Stars</Text>
                        {selectedLuxury === "5 Stars" && <MaterialIcons name="radio-button-checked" size={24} color="black" />}
                        {selectedLuxury !== "5 Stars" && <MaterialIcons name="radio-button-unchecked" size={24} color="gray" />}
                    </TouchableOpacity>
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

                {/* <View style={styles.inputContainer}>
                    <Text style={styles.label}>Features</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="Free WiFi, breakfast"
                        value={features}
                        onChangeText={text => setFeatures(text)}
                    />
                </View> */}
                {/* 
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hotel Norms</Text>
                    <TextInput
                        style={[styles.input, { width: '100%' }]}
                        placeholder="Pets not allowed"
                        value={hotelNorms}
                        onChangeText={text => setHotelNorms(text)}
                    />
                </View> */}

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
                    <Text style={styles.label}>Room Types</Text>
                    <View style={styles.selectionOuterContainer}>
                        <View style={styles.column}>
                            {roomTypesLeft.map((type, index) => (
                                <View key={index} style={styles.checkboxContainer}>
                                    <TouchableOpacity
                                        style={[styles.checkbox, selectedRoomTypes.includes(type) && styles.checkboxChecked]}
                                        onPress={() => handleRoomTypeSelection(type)}>
                                        {selectedRoomTypes.includes(type) ? (
                                            <MaterialCommunityIcons name="checkbox-marked-circle" style={styles.checkboxCheckedIcon} />
                                        ) : (
                                            <MaterialCommunityIcons name="checkbox-blank-circle-outline" style={styles.checkboxCheckedIcon} />
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.typeButtonText}>{type}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.column}>
                            {roomTypesRight.map((type, index) => (
                                <View key={index} style={styles.checkboxContainer}>
                                    <TouchableOpacity
                                        style={[styles.checkbox, selectedRoomTypes.includes(type) && styles.checkboxChecked]}
                                        onPress={() => handleRoomTypeSelection(type)}>
                                        {selectedRoomTypes.includes(type) ? (
                                            <MaterialCommunityIcons name="checkbox-marked-circle" style={styles.checkboxCheckedIcon} />
                                        ) : (
                                            <MaterialCommunityIcons name="checkbox-blank-circle-outline" style={styles.checkboxCheckedIcon} />
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.typeButtonText}>{type}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                {/* 
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
                </View> */}

                {/* Availability Switch */}
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Availability</Text>
                    <Text style={[styles.labelAvailability, { color: '#808080' }]}>Available</Text>
                    <Switch
                        value={availability}
                        onValueChange={(value) => setAvailability(value)}
                    />
                </View>

                {/* Upload Button */}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#0D8BFF' }]} onPress={handleUploadNow}>
                    <Text style={styles.buttonText}>Upload Now</Text>
                </TouchableOpacity>

                {/* Render upload success message */}
                {renderUploadSuccessMessage()}

            </View>
            <Toast />

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
    },
    saveButton: {
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginLeft: 80,
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
    // radioContainer: {
    //     marginTop: 10,
    // },
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
    },
    typeButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#ccc',
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
    selectionOuterContainer: {
        borderWidth: 1,
        borderColor: '#C2BD34',
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    column: {
        flex: 1,
        alignItems: 'flex-start',
    },
    roomTypeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#ccc',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 30,
        height: 30,
        borderColor: '#2AD73B',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    checkboxChecked: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    checkboxCheckedIcon: {
        position: 'absolute',
        color: '#2AD73B',
        fontSize: 24,
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
        top: 210
    },
    luxuryButton: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
        flexDirection: 'row', // Added
        justifyContent: 'space-between', // Added
        backgroundColor: 'transparent',
    },
    luxuryButtonText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 9,
        textAlign: 'center'

    },
});
