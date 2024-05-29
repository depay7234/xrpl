import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../Component/Home/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const dummyHotels = [
  {
    name: "Sliverpine Botique, Thimphu",
    rating: 4.26,
    description: "3-star hotel",
    price: "305 XRP night",
    types: "Monastry",
    images: [
      require('./../../src/assets/four.png'),
      require('./../../src/assets/onee.png'),
      require('./../../src/assets/three.png'),
      require('./../../src/assets/twoo.png')
    ]
  },
  {
    name: "Khang Heritage, Thimphu",
    rating: 4.81,
    description: "3-star hotel",
    price: "315 XRP  night",
    types: "Monastry",
    images: [
      require('./../../src/assets/khang1.png'),
      require('./../../src/assets/khang.png'),
      require('./../../src/assets/khang2.png'),
      require('./../../src/assets/khang3.png')
    ]
  },
  {
    name: "Kyichu Lhakhang, Paro",
    rating: 4.51,
    description: "open from time 9am to 5pm",
    price: "12XRP entry",
    types: "Museum",
    images: [
      require('./../../src/assets/kyichu1.png'),
      require('./../../src/assets/kyichu.png'),
      require('./../../src/assets/kyichu2.png'),
      require('./../../src/assets/kyichu3.png')
    ]
  },
  {
    name: "Chimi Lhakhang, Punakha",
    rating: 4.91,
    description: "open from time 9am to 5pm",
    price: "8XRP entry",
    types: "Museum",
    images: [
      require('./../../src/assets/chimi.png'),
      require('./../../src/assets/chimi1.png'),
      require('./../../src/assets/chimi2.png'),
      require('./../../src/assets/chimi3.png')
    ]
  },
  {
    name: "Ta Dzong Mesuem, Paro",
    rating: 3.91,
    description: "open from time 9am to 5pm",
    price: "8XRP entry",
    types: "Hotel",
    images: [
      require('./../../src/assets/ta3.png'),
      require('./../../src/assets/ta1.png'),
      require('./../../src/assets/ta.png'),
      require('./../../src/assets/ta2.png')
    ]
  },
  {
    name: "Oygen Palace, Bumthang",
    rating: 3.99,
    description: "open from time 9am to 5pm",
    price: "8XRP entry",
    types: "Hotel",
    images: [
      require('./../../src/assets/oygen3.png'),
      require('./../../src/assets/oygen1.png'),
      require('./../../src/assets/oygen2.png'),
      require('./../../src/assets/oygen.png')
    ]
  },
  {
    name: "Takin Preserve, Thimphu",
    rating: 3.99,
    description: "open from time 9am to 5pm",
    price: "8XRP entry",
    types: "Museum",
    images: [
      require('./../../src/assets/takin3.png'),
      require('./../../src/assets/takin2.png'),
      require('./../../src/assets/takin1.png'),
      require('./../../src/assets/takin.png')
    ]
  },
  {
    name: "Royal Botanical park, Thimphu",
    rating: 4.75,
    description: "open from time 9am to 5pm",
    price: "12 XRP entry",
    types: "Hotel",
    images: [
      require('./../../src/assets/royal3.png'),
      require('./../../src/assets/royal1.png'),
      require('./../../src/assets/royal2.png'),
      require('./../../src/assets/royal.png')
    ]
  },
  {
    name: "Tashichho Dzong, Thimphu",
    rating: 3.51,
    description: "open from time 9am to 5pm",
    price: "12 XRP entry",
    types: "Museum",
    images: [
      require('./../../src/assets/thimphu3.png'),
      require('./../../src/assets/thimphu1.png'),
      require('./../../src/assets/thimphu2.png'),
      require('./../../src/assets/thimphu.png')
    ]
  },
  {
    name: "Punakha Dzong, Punakha",
    rating: 3.51,
    description: "open from time 9am to 5pm",
    price: "12 XRP entry",
    types: "Monastry",
    images: [
      require('./../../src/assets/punakha.png'),
      require('./../../src/assets/punakha1.png'),
      require('./../../src/assets/punakha2.png'),
      require('./../../src/assets/punakha3.png')
    ]
  },
];

export default function Dzong() {
  const navigation = useNavigation(); 
  const handleImagePress = (imageUri, name, price) => {
    navigation.navigate('DzongDetails', { imageUri, name, price});
  };
    

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        {dummyHotels.map((hotel, index) => (
          <View key={index}>
            <Swiper
              style={styles.swiper}
              showsButtons={false}
              activeDotColor="#00AF87"
            >
              {hotel.images.map((image, idx) => (
                <TouchableOpacity key={idx} onPress={() => handleImagePress(image, hotel.name, hotel.price)}>
                  <View>
                    <Image source={image} style={[styles.image, styles.imageBorderRadius]} />
                  </View>
                </TouchableOpacity>
              ))}
            </Swiper>

            <View style={styles.detailsContainer}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.ratingContainer}>
                <Image source={require('./../../src/assets/star.png')} style={styles.starIcon} />
                <Text style={styles.hotelRating}>{hotel.rating}</Text>
              </View>
              <Text style={[styles.hotelDescription, { color: 'gray' }]}>{hotel.description}</Text>
              <Text style={styles.hotelPrice}>{hotel.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  swiper: {
    height: 300, // Adjust the height as needed
    marginTop: 10,
  },
  image: {
    width: '90%',
    height: '100%',
    marginLeft:20,
  },
  imageBorderRadius: {
    borderRadius: 10, 
  },
  detailsContainer: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  hotelRating: {
    fontSize: 14,
    marginLeft: 3,
    marginTop: -30,
  },
  hotelDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  hotelPrice: {
    fontSize: 14,
  },
  starIcon: {
    marginRight: 5,
    marginLeft: 255,
    marginTop: -30,
    width: 12,
  },
});
