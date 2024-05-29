import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'; // Import MaterialIcons
import { useNavigation } from '@react-navigation/native';


export default function Profile() {
  const navigation = useNavigation();

  const navigateToPersonalInfo = () => {
    navigation.navigate('Personal'); // Navigate to the 'Personal' screen
  };

  const navigateToPasswordSecurity = () => {
    navigation.navigate('Password');
  };
  const handleBack = () => {
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back-outline" size={24} color="#7F7F7F" />
        </TouchableOpacity>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={require('../../src/assets/profile.png')} style={styles.profile} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Dorji Phuntsho</Text>
          <Text style={styles.showProfile}>Show Profile</Text>
        </View>
      </View>
      <View style={styles.horizontalLine}></View>
      <View>
        <Text style={styles.settings}>Settings</Text>
      </View>
      <TouchableOpacity onPress={navigateToPersonalInfo}>
        <View style={styles.settingItem}>
          <FontAwesome5 name="user-alt" size={22} color="gray" style={styles.personal} />
          <Text style={styles.information}>Personal Information</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToPasswordSecurity}>
        <View style={styles.settingItem}>
          <MaterialCommunityIcons name="security" size={24} color="gray" style={styles.security} />
          <Text style={styles.information}>Password & Security</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Align items in the center horizontally
    marginBottom: 20,
    marginTop: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  showProfile: {
    color: 'gray',
  },
  horizontalLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginTop: 10
  },
  settings: {
    marginLeft: 20,
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 18
  },
  personal: {
    marginLeft: 20,
    marginTop: 10,
    // color: 'gray',
  },
  security: {
    marginLeft: 20,
    marginTop: 10,
  },
  information: {
    marginTop: 10,
    marginRight: 180,
    fontSize: 16,
  },
  infoIcon: {
    color: '#808080',
  },
  nextIcon: {
    color: 'gray',

  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this line
    paddingRight: 20, // Adjusted paddingRight for spacing
    paddingVertical: 10,
  },

  iconContainer: {
    marginRight: 20,
  },
  backButton: {
    padding: 10,
    position: 'absolute', // Add this line
    left: 10, // Add this line
  },

});
