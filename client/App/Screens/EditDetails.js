
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function EditDetails() {
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
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [availabilitySingle, setAvailabilitySingle] = useState(false);
    const [availabilityDuplex, setAvailabilityDuplex] = useState(false);
    const [availabilityStandard, setAvailabilityStandard] = useState(false);
    const [availabilitySuits, setAvailabilitySuits] = useState(false);
    const [selectedLuxury, setSelectedLuxury] = useState("1 star");

    const [level, setLevel] = useState('');
    const handleLuxurySelect = (luxury) => {
        setSelectedLuxury(luxury);
    };

    const navigation = useNavigation();

    const handleRoomTypeSelection = (type) => {
        setRoomType(type);
    };
    const handleBack = () => {
        navigation.navigate('Uploads');
    };

    const handleDelete = () => {
        // Logic to save the entered details
        console.log("Deleted successfully!");
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

    const handleUpdateNow = () => {
        // Logic to upload
        console.log("Update Now!");
        setUpdateSuccess(true); // Set upload success to true
    };
    const handleDeleteNow = () => {
        // Logic to save the entered details
        console.log("Deleted successfully!");
        setDeleteSuccess(true);
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
    const renderDeleteSuccessMessage = () => {
        if (deleteSuccess) {
            return (
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <FontAwesome name="check-circle" size={50} color="green" />
                        <Text style={styles.deleteSuccessText}>Delete Success!</Text>
                        <TouchableOpacity style={styles.okButton} onPress={() => setDeleteSuccess(false)}>
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
                    <Text style={styles.title}>Edit Details</Text>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
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
                        {selectedLuxury === "1 Star" && <FontAwesome5 name="check-circle" size={20} color="green" />}
                        {selectedLuxury !== "1 Star" && <MaterialIcons name="radio-button-unchecked" size={24} color="gray" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLuxurySelect("2 Stars")} style={[styles.luxuryButton, selectedLuxury === "2 Stars" ? styles.selectedLuxuryButton : null]}>
                        <Text style={styles.luxuryButtonText}>2 Stars</Text>
                        {selectedLuxury === "2 Stars" && <FontAwesome5 name="check-circle" size={20} color="green" />}
                        {selectedLuxury !== "2 Stars" && <MaterialIcons name="radio-button-unchecked" size={24} color="gray" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLuxurySelect("3 Stars")} style={[styles.luxuryButton, selectedLuxury === "3 Stars" ? styles.selectedLuxuryButton : null]}>
                        <Text style={styles.luxuryButtonText}>3 Stars</Text>
                        {selectedLuxury === "3 Stars" && <FontAwesome5 name="check-circle" size={20} color="green" />}
                        {selectedLuxury !== "3 Stars" && <MaterialIcons name="radio-button-unchecked" size={24} color="gray" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLuxurySelect("4 Stars")} style={[styles.luxuryButton, selectedLuxury === "4 Stars" ? styles.selectedLuxuryButton : null]}>
                        <Text style={styles.luxuryButtonText}>4 Stars</Text>
                        {selectedLuxury === "4 Stars" && <FontAwesome5 name="check-circle" size={20} color="green" />}
                        {selectedLuxury !== "4 Stars" && <MaterialIcons name="radio-button-unchecked" size={24} color="gray" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLuxurySelect("5 Stars")} style={[styles.luxuryButton, selectedLuxury === "5 Stars" ? styles.selectedLuxuryButton : null]}>
                        <Text style={styles.luxuryButtonText}>5 Stars</Text>
                        {selectedLuxury === "5 Stars" && <FontAwesome5 name="check-circle" size={20} color="green" />}
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
                        placeholder="A luxury hotel with a pool and gym"
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Features</Text>
                    <View style={styles.inputWithIcon}>
                        <TextInput
                            style={[styles.input, { width: '100%' }]}
                            placeholder="Free WiFi, breakfast"
                            value={features}
                            onChangeText={text => setFeatures(text)}
                        />
                        <TouchableOpacity onPress={() => setFeatures('')}>
                            <FontAwesome name="minus-circle" size={20} color="red" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.addMoreContainer}>
                        <Text style={styles.addMoreText}>Add more</Text>
                        <FontAwesome name="plus-circle" size={17} color="black" style={styles.addMoreIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Hotel Norms</Text>
                    <View style={styles.inputWithIcon}>
                        <TextInput
                            style={[styles.input, { width: '100%' }]}
                            placeholder="Pets not allowed"
                            value={hotelNorms}
                            onChangeText={text => setHotelNorms(text)}
                        />
                        <TouchableOpacity onPress={() => setHotelNorms('')}>
                            <FontAwesome name="minus-circle" size={20} color="red" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.addMoreContainer}>
                        <Text style={styles.addMoreText}>Add more</Text>
                        <FontAwesome name="plus-circle" size={17} color="black" style={styles.addMoreIcon} />
                    </TouchableOpacity>
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
                    <Text style={styles.label}>Room Type</Text>
                    <View style={styles.switchContainer}>
                        <Text style={styles.labelA}>Availability</Text>
                        <Text style={[styles.labelAvailability, { color: '#808080' }]}>Single</Text>
                        <Switch
                            value={availabilitySingle}
                            onValueChange={(value) => setAvailabilitySingle(value)}
                        />
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.switchContainer}>
                        <Text style={styles.labelA}>Availability</Text>
                        <Text style={[styles.labelAvailability, { color: '#808080' }]}>Duplex</Text>
                        <Switch
                            value={availabilityDuplex}
                            onValueChange={(value) => setAvailabilityDuplex(value)}
                        />
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.switchContainer}>
                        <Text style={styles.labelA}>Availability</Text>
                        <Text style={[styles.labelAvailability, { color: '#808080' }]}>Standard</Text>
                        <Switch
                            value={availabilityStandard}
                            onValueChange={(value) => setAvailabilityStandard(value)}
                        />
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.switchContainer}>
                        <Text style={styles.labelA}>Availability</Text>
                        <Text style={[styles.labelAvailability, { color: '#808080' }]}>Suits</Text>
                        <Switch
                            value={availabilitySuits}
                            onValueChange={(value) => setAvailabilitySuits(value)}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Images</Text>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Add image"
                        value={photos}
                        onChangeText={text => setPhotos(text)}
                    />
                    <TouchableOpacity onPress={pickImage}>
                        <FontAwesome5 name="images" size={24} color="black" style={styles.photoIcon} />
                    </TouchableOpacity>
                    <Text style={styles.addImagesLabel}>Add Images</Text>
                    <TouchableOpacity style={styles.plusButton}>
                        <FontAwesome name="plus-circle" size={18} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Upload Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#0D8BFF' }]} onPress={handleUpdateNow}>
                        <Text style={styles.buttonText}>Update Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0D56' }]} onPress={handleDeleteNow}>
                        <Text style={styles.buttonText}>Delete Now</Text>
                    </TouchableOpacity>
                </View>

                {/* Render upload success message */}
                {renderUpdateSuccessMessage()}
                {renderDeleteSuccessMessage()}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    horizontalLine: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.7,
        marginBottom: 10, // Adjust this margin to control the space between the switches and the line
    },
    
    labelAvailability: {
        marginTop: 30,
        marginLeft: -330,
        fontSize: 18,
        marginBottom: 10
    },
    labelA: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: -18
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
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    deleteButton: {
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginLeft: 80,
    },
    deleteButtonText: {
        color: '#808080',
        fontSize: 20,
        fontWeight: 'bold'

    },
    backButton: {
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 80,
    },
    backButtonText: {
        color: '#808080',
        fontSize: 20,
        fontWeight: 'bold'

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
        borderColor: '#C2BD34',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
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
        // alignItems: 'center', // Added alignItems
        width: '110%', // Added width to ensure it takes full width
    },
    selectionOuterContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    column: {
        flex: 1,
        alignItems: 'center',
    },
    roomTypeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },

    // photoInputContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     width: '100%',
    //     paddingHorizontal: 10,
    //     position: 'relative', // Added position relative to position the icon
    // },
    photoIcon: {
        position: 'absolute',
        right: 10,
        bottom: 10
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
    deleteSuccessContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    deleteSuccessText: {
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
        top: 250
        
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 20
    },
    button: {
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: '48%',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    addMoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    addMoreText: {
        textDecorationLine: 'underline',
        marginRight: 5,
        fontSize: 16
    },
    addMoreIcon: {
        marginLeft: 5,
    },

    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        right: 10,
        bottom: -10
    },
    addImagesLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    plusButton: {
        position: 'absolute',
        right: 15,
        bottom: -10,
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
