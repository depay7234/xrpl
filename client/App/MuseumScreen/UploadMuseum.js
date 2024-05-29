import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// Sample data for hotels
const hotelsData = [
  { id: '1', image: require('../../src/assets/khamsum.png'), name: 'Khamsum Namgyal Chorten', location: 'Punakha', description: 'A Meru tower or pelinggih meru is the principal shrine of a a wooden..', price: 200 },
  { id: '2', image: require('../../src/assets/rinpung.png'), name: 'Rinpung Museum', location: 'Paro', description: 'A Meru tower or pelinggih meru is the principal shrine of a a wooden..', price: 250 },
];
export default function UploadMuseum() {
  const navigation = useNavigation(); // Initialize navigation

  const handleBack = () => {
    navigation.navigate('Home');
  };

  // Render item function to render each hotel item
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EditMuseumDetails', { hotelId: item.id })}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#1C9FE2" />
            <Text style={styles.location}>{item.location}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>XRP: <Text style={styles.priceValue}>{item.price}</Text></Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Upload List</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={hotelsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background color
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:30
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 90,
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background for the list
    borderRadius: 10,
    padding: 10,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.1)', // Slightly transparent black border
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  location: {
    fontSize: 16,
    color: '#1C9FE2',
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  priceValue: {
    color: 'black',
  },
  backButton: {
    padding: 10,
  },
});
