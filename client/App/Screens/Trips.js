import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Trips() {
  const [activeScreen, setActiveScreen] = useState(null);

  const navigation = useNavigation();

  const navigateToMonsPastTrips = () => {
    navigation.navigate('PastMonastryTrips'); 
  };

  const navigateToMusePastTrips = () => {
    navigation.navigate('PastMuseumTrips'); 
  };
  const navigateToHotelPastTrips = () => {
    navigation.navigate('PastHotelTrips'); 
  };
  const navigateToParkPastTrips = () => {
    navigation.navigate('PastParkTrips'); 
  };

  const navigateToDzongPastTrips = () => {
    navigation.navigate('PastDzongTrips'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.trips}>Trips</Text>
      </View>
      <View>
        <Text style={styles.details}>Keep tracks of the trips</Text>
      </View>
      <View style={styles.typesContainer}>
        {/* First row */}
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={navigateToMonsPastTrips}>
            <Image source={require('./../../src/assets/monastery.png')} style={styles.image} />
            <Text style={styles.names}>Monastery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={navigateToMusePastTrips}>
            <Image source={require('./../../src/assets/museum.png')} style={styles.image} />
            <Text style={styles.names}>Museum</Text>
          </TouchableOpacity>
        </View>
        {/* Second row */}
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={navigateToHotelPastTrips}>
            <Image source={require('./../../src/assets/hotel.png')} style={styles.images} />
            <Text style={styles.name}>Hotel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={navigateToParkPastTrips}>
            <Image source={require('./../../src/assets/park.png')} style={styles.image} />
            <Text style={styles.names}>Park</Text>
          </TouchableOpacity>
        </View>
        {/* Third row */}
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={navigateToDzongPastTrips}>
            <Image source={require('./../../src/assets/dzong.png')} style={styles.image} />
            <Text style={styles.names}>Dzong</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tripcontainer: {
    flex: 1,
  },
  trips: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  details: {
    marginLeft: 20,
    padding: 5,
    marginTop: 20,
  },
  typesContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    borderWidth: 0.1,
    width: 155,
    height: 120,
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor:'white',
    paddingTop: 20,
    elevation: 3,
  },
  image: {
    marginBottom: 5,
    width:45,
    height:45,

  },
  names:{
    color:'gray',
  },
  name:{
    color:'gray',
    marginTop:20,

  },
  images:{
    width:40,
    height:30,
    position:'relative',
    top: "20%",
    

  },
});
