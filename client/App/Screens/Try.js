import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import Header from '../Component/Home/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Import FontAwesome
import Monastery from './Monastery';
import Mesuem from './Museum';
import Hotel from './Hotel';
import Park from './Park';
import Dzong from './Dzong';

// Dummy data arrays
const dummyHotels = [
  {
    name: "Sliverpine Botique, Thimphu",
    rating: 4.26,
    description: "3-star hotel",
    price: "305 XRP night",
    images: [
      require('./../../assets/four.png'),
      require('./../../assets/onee.png'),
      require('./../../assets/three.png'),
      require('./../../assets/twoo.png')
    ]
  },
  {
    name: "Khang Heritage, Thimphu",
    rating: 4.81,
    description: "3-star hotel",
    price: "315 XRP  night",
    images: [
      require('./../../assets/khang1.png'),
      require('./../../assets/khang.png'),
      require('./../../assets/khang2.png'),
      require('./../../assets/khang3.png')
    ]
  },
  {
    name: "Kyichu Lhakhang, Paro",
    rating: 4.51,
    description: "open from time 9am to 5pm",
    price: "12XRP entry",
    images: [
      require('./../../assets/kyichu1.png'),
      require('./../../assets/kyichu.png'),
      require('./../../assets/kyichu2.png'),
      require('./../../assets/kyichu3.png')
    ]
  },
  {
    name: "Chimi Lhakhang, Punakha",
    rating: 4.91,
    description: "open from time 9am to 5pm",
    price: "8XRP entry",
    images: [
      require('./../../assets/chimi.png'),
      require('./../../assets/chimi1.png'),
      require('./../../assets/chimi2.png'),
      require('./../../assets/chimi3.png')
    ]
  },

  {
    name: "Ta Dzong Mesuem, Paro",
    rating: 3.91,
    description: "open from time 9am to 5pm",
    price: "8XRP entry",
    images: [
      require('./../../assets/ta3.png'),
      require('./../../assets/ta1.png'),
      require('./../../assets/ta.png'),
      require('./../../assets/ta2.png')
    ]
  },

  {
    name: "Oygen Palace, Bumthang",
    rating: 3.99,
    description: "open from time 9am to 5pm",
    price: "8XRP entry",
    images: [
      require('./../../assets/oygen3.png'),
      require('./../../assets/oygen1.png'),
      require('./../../assets/oygen2.png'),
      require('./../../assets/oygen.png')
    ]
  },

  {
    name: "Takin Preserve, Thimphu",
    rating: 3.99,
    description: "open from time 9am to 5pm",
    price: "8XRP entry",
    images: [
      require('./../../assets/takin3.png'),
      require('./../../assets/takin2.png'),
      require('./../../assets/takin1.png'),
      require('./../../assets/takin.png')
    ]
  },

  {
    name: "Royal Botanical park, Thimphu",
    rating: 4.75,
    description: "open from time 9am to 5pm",
    price: "12 XRP entry",
    images: [
      require('./../../assets/royal3.png'),
      require('./../../assets/royal1.png'),
      require('./../../assets/royal2.png'),
      require('./../../assets/royal.png')
    ]
  },

  {
    name: "Tashichho Dzong, Thimphu",
    rating: 3.51,
    description: "open from time 9am to 5pm",
    price: "12 XRP entry",
    images: [
      require('./../../assets/thimphu3.png'),
      require('./../../assets/thimphu1.png'),
      require('./../../assets/thimphu2.png'),
      require('./../../assets/thimphu.png')
    ]
  },

  {
    name: "Punakha Dzong, Punakha",
    rating: 3.51,
    description: "open from time 9am to 5pm",
    price: "12 XRP entry",
    images: [
      require('./../../assets/punakha.png'),
      require('./../../assets/punakha1.png'),
      require('./../../assets/punakha2.png'),
      require('./../../assets/punakha3.png')
    ]
  },

];

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      {/* <ScrollView>
        {dummyHotels.map((hotel, index) => (
          <View key={index}>
            <ScrollView horizontal>
              <View style={styles.imageContainer}>
                {hotel.images.map((image, idx) => (
                  <Image key={idx} source={image} style={styles.image} />
                ))}
              </View>
            </ScrollView>
            <View style={styles.detailsContainer}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star-sharp" size={24} color="black" style={styles.starIcon} />
                <Text style={styles.hotelRating}>{hotel.rating}</Text>
              </View>
              <Text style={styles.hotelDescription}>{hotel.description}</Text>
              <Text style={styles.hotelPrice}>{hotel.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView> */}
      <Monastery/>
      <Mesuem/>
      <Hotel/>
      <Park/>
      <Dzong/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // imageContainer: {
  //   flexDirection: 'row', // Arrange images horizontally
  //   marginLeft: 20,
  //   marginTop: 20,
  // },
  // image: {
  //   width: 320,
  //   height: 320,
  //   borderRadius: 10,
  //   marginRight: 20, // Add margin between images
  // },
  // detailsContainer: {
  //   marginLeft: 20,
  //   marginTop: 10,
  // },
  // hotelName: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 5,
  // },
  // ratingContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 5,
  // },
  // hotelRating: {
  //   fontSize: 16,
  //   marginLeft: 3,
  //   marginTop: -30,
  // },
  // hotelDescription: {
  //   fontSize: 16,
  //   marginBottom: 5,
  //   color: 'gray',
  // },
  // hotelPrice: {
  //   fontSize: 16,
  // },
  // starIcon: {
  //   marginRight: 5,
  //   marginLeft: 255,
  //   marginTop: -30,
  //   width: 25,
  // },
});





import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import Header from '../Component/Home/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const dummyHotels = [
  {
    name: "Sliverpine Botique, Thimphu",
    rating: 4.26,
    description: "3-star hotel",
    price: "305 XRP night",
    images: [
      require('./../../assets/four.png'),
      require('./../../assets/onee.png'),
      require('./../../assets/three.png'),
      require('./../../assets/twoo.png')
    ]
  },
  {
    name: "Khang Heritage, Thimphu",
    rating: 4.81,
    description: "3-star hotel",
    price: "315 XRP  night",
    images: [
      require('./../../assets/khang1.png'),
      require('./../../assets/khang.png'),
      require('./../../assets/khang2.png'),
      require('./../../assets/khang3.png')
    ]
  },
  // Add your other dummy data here...
];

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        {dummyHotels.map((hotel, index) => (
          <View key={index} style={styles.hotelContainer}>
            <ScrollView horizontal>
              <View style={styles.imageContainer}>
                {hotel.images.map((image, idx) => (
                  <Image key={idx} source={image} style={styles.image} />
                ))}
              </View>
            </ScrollView>
            <View style={styles.detailsContainer}>
              <View style={styles.hotelNameContainer}>
                <Text style={styles.hotelName}>{hotel.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star-sharp" size={16} color="black" style={styles.starIcon} />
                  <Text style={styles.hotelRating}>{hotel.rating}</Text>
                </View>
              </View>
              <Text style={styles.hotelDescription}>{hotel.description}</Text>
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
  },
  hotelContainer: {
    flexDirection: 'column', // Layout hotel details vertically
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    flexDirection: 'row', // Arrange images horizontally
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 10,
    marginRight: 20, // Add margin between images
  },
  detailsContainer: {
    padding: 10,
  },
  hotelNameContainer: {
    flexDirection: 'row', // Align name and rating horizontally
    alignItems: 'center', // Align items vertically within the row
    marginBottom: 5,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row', // Align rating icon and text horizontally
    alignItems: 'center', // Align items vertically within the row
    marginLeft: 10, // Add space between name and rating
  },
  hotelRating: {
    fontSize: 16,
    marginLeft: 3, // Add space between rating icon and text
  },
  hotelDescription: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
  },
  hotelPrice: {
    fontSize: 16,
  },
  starIcon:{
    marginLeft:40,
  }
});
