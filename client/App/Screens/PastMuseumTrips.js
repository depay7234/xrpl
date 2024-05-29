import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const dummyHotels = [
    {
      name: "Ta Dzong Mesuem, Paro",
      rating: 3.91,
      description: "open from time 9am to 5pm",
      price: "8XRP entry",
      images: [
        require('./../../src/assets/ta3.png'),
       
      ]
    },
  
    {
      name: "Oygen Palace, Bumthang",
      rating: 3.99,
      description: "open from time 9am to 5pm",
      price: "8XRP entry",
      images: [
        require('./../../src/assets/oygen3.png'),
       
      ]
    },
  
  
  ];

export default function PastMuseumTrips() {

  const navigation = useNavigation(); // Hook for navigation

  const handleImagePress = (imageUri, names, price) => {
    navigation.navigate('PastMuseumTripDetails', { imageUri, names, price });
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Trips &gt; Museum</Text>
      </View>
      <View>
        <Text style={styles.detailText}>Museums</Text>
      </View>
      <View style={styles.imageContainer}>
        {dummyHotels.map((hotel, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(hotel.images[0], hotel.name, hotel.price)}>
            <View>
              {hotel.images.map((image, idx) => (
                <Image key={idx} source={image} style={styles.image} />
              ))}
              <View style={styles.detailsContainer}>
                <Text style={styles.hotelName}>{hotel.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    marginLeft: 20,
    fontWeight: "bold",
    color: 'gray',
  },
  imageContainer: {
    flexDirection: 'row', // Arrange images horizontally
    justifyContent: 'space-around', // Space evenly between images
    flexWrap: 'wrap', // Allow images to wrap to the next row if needed
    marginHorizontal: -5, // Remove horizontal margin to prevent spacing issues
    marginTop: 20,
  },
  image: {
    width: 150, // Adjust image width
    height: 150,
    borderRadius: 10,
    margin: 5, // Add margin to separate images
  },
  detailsContainer: {
    alignItems: 'center', // Center the text
    marginTop: 5,
  },
  hotelName: {
    fontSize: 12,
    marginBottom: 5,
  },
});
