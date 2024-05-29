import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigation from './App/Navagations/TabNavigation';
import MuseumTabNavigation from './App/Navagations/MuseumTabNavigation';
import LoginNavigation from './App/Navagations/LoginNavigation'; 
import ProviderTabNavigation from './App/Navagations/ProviderTabNavigation';
// import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>

      <LoginNavigation />

        {/* <ProviderTabNavigation/> */}
        {/* <MuseumTabNavigation /> */}
        {/* <Toast /> */}


      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});




