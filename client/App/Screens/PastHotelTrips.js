import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const dummyHotels = [
  {
    name: "Sliverpine Botique, Thimphu",
    rating: 4.26,
    description: "3-star hotel",
    price: "305 XRP night",
    images: [
      require('./../../src/assets/four.png'),
     
    ]
  },
  {
    name: "Khang Heritage, Thimphu",
    rating: 4.81,
    description: "3-star hotel",
    price: "315 XRP  night",
    images: [
      require('./../../src/assets/khang1.png'),

    ]
  },


];

export default function PastTrips() {
  const navigation = useNavigation(); // Hook for navigation
  const handleImagePress = (imageUri, names, price) => {
    navigation.navigate('PastHotelTripDetails', { imageUri, names, price });
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Trips &gt; Hotel</Text>
      </View>
      <View>
        <Text style={styles.detailText}>Hotels</Text>
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
