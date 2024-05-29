import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const handleAddMuseumPress = () => {
    navigation.navigate('AddMuseum');
  };

  const handleTotalUploadsPress = () => {
    navigation.navigate('UploadMuseum'); // Navigate to Uploads page
  };

  const handleReservePress = () => {
    navigation.navigate('MuseumBookingDetails'); // Navigate to BookingDetails page
  };


  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Hello Pema!</Text>
      </View>

      <View style={styles.sectionsContainer}>
        <TouchableOpacity onPress={handleTotalUploadsPress}>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Total Uploads</Text>
            <Text style={styles.data}>03</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleReservePress}>
          <View style={styles.sections}>
            <Text style={styles.sectionsHeading}>Reserve</Text>
            <Text style={styles.datas}>02</Text>
          </View>
        </TouchableOpacity>

      </View>

      <View style={styles.quickActionsContainer}>
        <View style={styles.quickActionsHeaderContainer}>
          <Text style={styles.quickActionsHeader}>Quick Actions</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMuseumPress}>
          <Text style={[styles.addButtonText, { color: 'black' }]}>Add Museum</Text>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '23%',
    paddingHorizontal: 10,
  },

  section: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 25,
    marginBottom: 20,
    borderRadius: 10,
    marginLeft: 'auto', // Align to the right edge
    marginRight: 'auto', // Align to the left edge
    width: '100%',
    justifyContent: 'space-between',

  },
  sections: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 45,
    marginBottom: 20,
    borderRadius: 10,
    marginLeft: 'auto', // Align to the right edge
    marginRight: 'auto', // Align to the left edge
    width: '100%',
    justifyContent: 'space-between',

  },
  
  sectionHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    
  },
  data: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  sectionsHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: -15
  },
  datas: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  quickActionsContainer: {
    marginTop: 20,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  quickActionsHeaderContainer: {
    marginBottom: 10,
  },
  quickActionsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  addButtonText: {
    fontSize: 20,
    marginLeft: 10,
  },
});
