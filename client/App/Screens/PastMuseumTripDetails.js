import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PastMuseumTripDetails({ route }) {
    const { imageUri, names, price } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Trips &gt; Monastery</Text>
            </View>
            <View style={styles.imageContainer}>
                <Text style={styles.name}>{names}</Text>
                <Image source={imageUri} style={styles.image} />
            </View>
            <View>
                <Text style={styles.xrp}>XRP</Text>
            </View>
            
            <View style={styles.transactiondetails}>

                <Text style={styles.transactionText}>XRP ID: 1234567</Text>
                <Text style={styles.transactionText}>Time: 10:00 AM</Text>
                <Text style={styles.transactionText}>Visit: {names}</Text>
                <Text style={styles.transactionText}>XRP: {price}</Text>
                <Text style={styles.transactionText}>Number of People: 5</Text>
                <Text style={styles.transactionText}>Fungible Token: 30</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        padding: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    name: {
        marginTop: -10,
        fontSize: 16,
        marginLeft: -155,
        fontWeight:'bold',
        color:"gray"
    },
    image: {
        width: 320,
        height: 300,
        borderRadius: 10,
        marginTop:20,
    },
    transactiondetails: {
        paddingHorizontal: 20,
        marginTop: 20,
        borderWidth:0.1,
        width: 320,
        marginLeft: 20,
        borderRadius: 7,
        borderColor:'white',
        paddingTop:10,
        elevation:3,
        backgroundColor:'white',

    },
    transactionText: {
        fontSize: 16,
        marginBottom: 10,
    },
    xrp:{
        marginTop:10,
        marginLeft: 20,
        fontWeight:'bold',
        color:"gray"
    }
});
