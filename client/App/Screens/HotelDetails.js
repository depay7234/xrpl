import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native'; // Added TouchableOpacity import
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome6, Feather, MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
// import { Calendar } from 'react-native-calendars';
import { CalendarList } from 'react-native-calendars';

export default function HotelDetails({ route }) {
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const { imageUri, name, price } = route.params;
    const [token, setToken] = useState(100);
    const [transactionModalVisible, setTransactionModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const handleReserve = () => {
        // Placeholder function for handling the reservation process
        // console.log("Reservation process initiated");
        // You can add your reservation logic here
        setTransactionModalVisible(true);
    };

    const handleConfirmTransaction = () => {
        // Placeholder function for handling the transaction confirmation
        // console.log("Transaction confirmed");
        // You can add your transaction confirmation logic here
        setTransactionModalVisible(false);
    };


    useEffect(() => {
        // Set the current date as the default selected start date
        const currentDate = new Date();
        setSelectedStartDate(currentDate);

        // Calculate the end date as two days after the current date
        const nextTwoDays = new Date();
        nextTwoDays.setDate(nextTwoDays.getDate() + 2);
        setSelectedEndDate(nextTwoDays);
    }, []);

    const formatSelectedDate = (date) => {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const startDay = date.getDate();
        const startMonth = monthNames[date.getMonth()];
        return `${startMonth} ${startDay}`;
    };

    const formatSelectedDateRange = (startDate, endDate) => {
        const formattedStartDate = formatSelectedDate(startDate);
        const formattedEndDate = formatSelectedDate(endDate);
        return `${formattedStartDate}-${formattedEndDate}`;
    };

    const handleCalendarPress = () => {
        setCalendarVisible(true);
    };

    const handleConfirmDate = () => {
        // Process selected dates if needed
        setCalendarVisible(false);
    };



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View>
                    <Image source={imageUri} style={styles.image} />
                    <Text style={styles.name}>{name}</Text>
                </View>
                <View style={styles.horizontalLine}></View>
                <View style={styles.highlightcontainer}>
                    <Text style={styles.highlight}>Highlights</Text>
                    <View style={styles.highlightItem}>
                        <FontAwesome6 name="image" size={24} color="black" style={styles.highlightIcon} />
                        <Text style={styles.highlightText}>Mountain view</Text>
                    </View>
                    <View style={styles.highlightItem}>
                        <FontAwesome6 name="image" size={24} color="black" style={styles.highlightIcon} />
                        <Text style={styles.highlightText}>Valley view</Text>
                    </View>
                    <View style={styles.highlightItem}>
                        <Feather name="sunrise" size={24} color="black" style={styles.highlightIcon} />
                        <Text style={styles.highlightText}>Sunrise hotspot</Text>
                    </View>
                    <View style={styles.highlightItem}>
                        <MaterialCommunityIcons name="pot-steam" size={28} color="black" style={styles.highlightIcon} />
                        <Text style={styles.highlightText}>Kitchen</Text>
                    </View>
                    <View style={styles.highlightItem}>
                        <FontAwesome name="video-camera" size={24} color="black" style={styles.highlightIcon} />
                        <Text style={styles.highlightText}>Security cameras on property</Text>
                    </View>
                </View>

                <View><Text style={styles.show}>Show all 58 amenities</Text></View>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.room}>Room Types</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.roomtypes}>
                        <Ionicons name="bed-outline" size={40} color="black" style={styles.typesicon} />
                        <View style={styles.roomTypeTextContainer}>
                            <Text style={styles.roomTypeText}>Deluxe</Text>
                            <Text style={styles.bedsizeText}>1 queen Bed</Text>
                        </View>
                    </View>
                    <View style={styles.roomtypes}>
                        <Ionicons name="bed-outline" size={40} color="black" style={styles.typesicon} />
                        <View style={styles.roomTypeTextContainer}>
                            <Text style={styles.roomTypeText}>Double</Text>
                            <Text style={styles.bedsizeText}>2 single Bed</Text>
                        </View>
                    </View>
                    <View style={styles.roomtypes}>
                        <Ionicons name="bed-outline" size={40} color="black" style={styles.typesicon} />
                        <View style={styles.roomTypeTextContainer}>
                            <Text style={styles.roomTypeText}>Single</Text>
                            <Text style={styles.bedsizeText}>1 single Bed</Text>
                        </View>
                    </View>
                    <View style={styles.roomtypes}>
                        <Ionicons name="bed-outline" size={40} color="black" style={styles.typesicon} />
                        <View style={styles.roomTypeTextContainer}>
                            <Text style={styles.roomTypeText}>Twin </Text>
                            <Text style={styles.bedsizeText}>2 single Beds</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.horizontalLine}></View>
                <View style={styles.remindercontainer}>
                    <Text style={styles.reminder}>Reminders</Text>
                    <Text style={styles.remindertext}>Check-in after 5:00 pm</Text>
                    <Text style={styles.remindertext}>Checkout after 10:00 am</Text>
                    <Text style={styles.remindertext}>No pets allowed</Text>
                    <Text style={styles.remindertext}>Smoking not allowed</Text>
                    <Text style={styles.remindertext}>No parties or events</Text>

                </View>

                <View style={styles.horizontalLine}></View>
                <View style={styles.reserve}>
                    <Text style={styles.reserveprice}>{price}</Text>
                    <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.calendarButton}>
                        <Text style={styles.selectedDate}>
                            {selectedStartDate && selectedEndDate && formatSelectedDateRange(selectedStartDate, selectedEndDate)}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReserve} style={styles.reserveButton}>
                        <Text style={styles.reserveButtonText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
                <Modal visible={calendarVisible} animationType='fade' transparent>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalTitleContainer}>
                                <Text style={styles.modalTitle}>Select trip date</Text>
                                <TouchableOpacity onPress={() => setCalendarVisible(false)} style={styles.closeButton}>
                                    <FontAwesome name="close" size={18} color="black" />
                                </TouchableOpacity>

                            </View>
                            <View style={styles.calendarContainer}>
                                <CalendarList
                                    current={selectedStartDate} // Set the current month
                                    pastScrollRange={24}
                                    futureScrollRange={24}
                                    scrollEnabled={true}
                                    showScrollIndicator={true}
                                    markedDates={{
                                        [selectedStartDate]: { startingDay: true, color: 'black', textColor: 'white' }, // Highlight start date
                                        [selectedEndDate]: { endingDay: true, color: 'black', textColor: 'white' }, // Highlight end date
                                        [selectedStartDate && selectedEndDate]: { selected: true, marked: true, color: 'gray', textColor: 'white' }, // Highlight range between start and end dates
                                    }}
                                    onDayPress={(day) => {
                                        if (!selectedStartDate || (day.timestamp < selectedStartDate.getTime())) {
                                            // If no start date is selected or the selected day is before the current start date, set the selected day as the new start date
                                            setSelectedStartDate(new Date(day.timestamp));
                                            setSelectedEndDate(null); // Reset end date
                                        } else if (!selectedEndDate || (day.timestamp > selectedEndDate.getTime())) {
                                            // If no end date is selected or the selected day is after the current end date, set the selected day as the new end date
                                            setSelectedEndDate(new Date(day.timestamp));
                                        } else {
                                            // If the selected day is between the start and end dates, reset both start and end dates
                                            setSelectedStartDate(new Date(day.timestamp));
                                            setSelectedEndDate(null);
                                        }
                                    }}
                                />

                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal visible={transactionModalVisible} animationType='fade' transparent>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Transaction Details</Text>
                            <View style={styles.rowContainer}>
                                <View style={styles.leftColumn}>
                                    <Text style={styles.label}>Token Available:</Text>
                                    <Text style={styles.value}>{token} XRP </Text>
                                </View>
                                <View style={styles.rightColumn}>
                                    <Text style={styles.label}>Token Fee:</Text>
                                    <Text style={styles.value}>10</Text>
                                </View>
                            </View>
                            <Text style={styles.label}>To: 0x6F1D78614aDD90B19C5e61eB07AaEeF8</Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Amount:</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setAmount}
                                    value={amount}
                                    placeholder="Enter Amount"
                                    keyboardType="numeric"
                                    accessibilityLabel="Amount"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Secret Key:</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setSecretKey}
                                    value={secretKey}
                                    placeholder="Enter Secret Key"
                                    secureTextEntry={true}
                                    accessibilityLabel="Secret Key"
                                />
                            </View>
                            <Button
                                title="Transfer"
                                onPress={handleConfirmTransaction}
                                color="#00AF87"
                                accessibilityLabel="Transfer Button"
                                style={styles.transferButton}
                            />
                        </View>
                    </View>
                </Modal>


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    image: {
        width: 356,
        height: 250,
        marginBottom: 10,
    },
    name: {
        marginLeft: 40,
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 16,
    },
    horizontalLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginHorizontal: 20,
        marginTop: 40,
    },
    highlightcontainer: {
        marginTop: 20,
        marginLeft: 20,
    },
    highlight: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    highlightItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    highlightIcon: {
        marginLeft: 40,
        color: 'gray',
        marginTop: 10
    },
    highlightText: {
        fontSize: 16,
        marginLeft: 20,
        marginTop: 10,
        padding: 2
    },
    show: {
        fontSize: 16,
        borderWidth: 1,
        width: 320,
        borderRadius: 5,
        marginLeft: 20,
        textAlign: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 20,
        textAlignVertical: 'center',
    },
    typesicon: {
        borderWidth: 1,
        width: 100,
        height: 100,
        borderRadius: 7,
        borderColor: "gray",
        marginLeft: 20,
        marginTop: 20,
        paddingLeft: 10,
        paddingTop: 20,
        position: "relative",

    },
    roomTypeTextContainer: {
        position: "absolute",
        bottom: 5,
        left: 30,
    },
    room: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,

    },
    roomTypeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    bedsizeText: {
        fontSize: 12,
        color: "gray"
    },
    roomtypes: {
        flexDirection: 'row',
        marginRight: 10,
    },
    remindercontainer: {
        marginTop: 20,
        marginLeft: 20,
    },
    reminder: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
    remindertext: {
        marginLeft: 20,
        fontSize: 14,

    },
    reserveprice: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    selectedDate: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 20,

    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    calendarContainer: {
        borderColor: 'gray',
        marginBottom: 20,
        height: '80%',
    },
    closeButton: {
        alignItems: 'flex-end',
        marginTop: -20,
    },
    reserveContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    priceContainer: {
        flex: 1,
    },
    dateContainer: {
        flex: 1,
        alignItems: 'center',
    },
    reserveButton: {
        backgroundColor: '#00AF87',
        borderRadius: 10,
        width: 100,
        height: 45,
        marginLeft: 240,
        marginTop: -60,
        marginBottom: 20,

    },
    reserveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 7
    },
    modalContainers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContents: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        height: 360,
    },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 1,
        marginEnd:-120
    },
    text: {
        fontWeight: 'bold',
    },
    value: {
        marginTop: 5, // Add margin to separate from text
    },
    transferButton: {
        borderRadius: 10,
    }
    




});
