import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL,Check_User_Login_WIth_Cookie } from '../../config';
// import Login from './Login';
// import ProviderTabNavigation from '../Navagations/ProviderTabNavigation';
const Landing = () => {
  const navigation = useNavigation(); // Initialize navigation using useNavigation hook

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : null;
    } catch (e) {
      console.error('Failed to fetch data', e);
      return null;
    }
  };

  useEffect(() => {
    const loadLoginjwt = async () => {
      const loginjwt = await getData('loginjwt');
      console.log("loginjwt", loginjwt);
      console.log("a,sdklaskdl")

      if (loginjwt) {
        try {
          const response = await axios.post(`${API_BASE_URL}${Check_User_Login_WIth_Cookie}`, { loginjwt });
          const { user, status } = response.data;
          if (status === "success") {
            if (user.role === "user") {
              navigation.navigate("ProviderTabNavigation");
            } else if (user.role === "admin") {
              navigation.navigate("MuseumTabNavigation");
            } else {
              navigation.navigate("Login");
            }
          } else {
            navigation.navigate("Login");
          }
        } catch (error) {
          console.error("Error verifying JWT:", error);
          navigation.navigate("Login");
        }
      }
    };

    loadLoginjwt();
  }, [navigation]);

  const handleServiceProviderSignIn = () => {
    // Handle navigation to the service provider sign-in page
    navigation.navigate('ServiceProviderLogin');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../src/assets/taktshang.png')} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLoginPress}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignupPress}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceProviderLink} onPress={handleServiceProviderSignIn}>
              <Text style={styles.serviceProviderLinkText}>Sign In as Service Provider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 96, 168, 0.2)', // Semi-transparent blue color
    justifyContent: "center"
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%', // Set width to 80% of the parent container
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 10, // Adjust spacing for buttons
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceProviderLink: {
    marginTop: 20,
  },
  serviceProviderLinkText: {
    color: 'white',
  },
});

export default Landing;
