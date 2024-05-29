import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons} from '@expo/vector-icons';

export default function Header() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [activeScreen, setActiveScreen] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [activeType, setActiveType] = useState(null);

  useEffect(() => {
    if (isFocused && navigation.dangerouslyGetState) {
      const state = navigation.dangerouslyGetState();
      const activeRoute = state.routes[state.index];
      setActiveScreen(activeRoute.name);
    }
  }, [isFocused, navigation]);

  const navigateToList = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleClearSearch = () => {
    setSearchInput('');
  };

  const handleSubmitSearch = () => {
    console.log('Search submitted:', searchInput);
    setSearchInput('');
  };

  const handleTypePress = (type) => {
    setActiveType(type);
  };

  return (
    <SafeAreaView style={styles.containers}>
      <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder='Where to? Anytime, Any week'
          style={styles.input}
          value={searchInput}
          onChangeText={setSearchInput}
          onSubmitEditing={handleSubmitSearch}
        />
        {searchInput.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Ionicons name="close-circle" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.typesContainer}>
        <TouchableOpacity onPress={() => {navigateToList('Monastery'); handleTypePress('Monastery');}} style={styles.typeIcon}>
          <Image source={require('../../../src/assets/monastery.png')} style={[styles.icon, activeType === 'Monastery' && styles.activeIcon]} />
          <Text style={[styles.iconText, activeType === 'Monastery' && styles.activeIconText]}>Monastery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigateToList('Museum'); handleTypePress('Museum');}} style={styles.typeIcon}>
          <Image source={require('../../../src/assets/museum.png')} style={[styles.icon, activeType === 'Museum' && styles.activeIcon]} />
          <Text style={[styles.iconText, activeType === 'Museum' && styles.activeIconText]}>Museum</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigateToList('Hotel'); handleTypePress('Hotel');}} style={styles.typeIcon}>
          <Image source={require('../../../src/assets/hotel.png')} style={[styles.iconhotel, activeType === 'Hotel' && styles.activeIcon]} />
          <Text style={[styles.iconText, activeType === 'Hotel' && styles.activeIconText]}>Hotel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigateToList('Park'); handleTypePress('Park');}} style={styles.typeIcon}>
          <Image source={require('../../../src/assets/park.png')} style={[styles.icon, activeType === 'Park' && styles.activeIcon]} />
          <Text style={[styles.iconText, activeType === 'Park' && styles.activeIconText]}>Park</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigateToList('Dzong'); handleTypePress('Dzong');}} style={styles.typeIcon}>
          <Image source={require('../../../src/assets/dzong.png')} style={[styles.icon, activeType === 'Dzong' && styles.activeIcon]} />
          <Text style={[styles.iconText, activeType === 'Dzong' && styles.activeIconText]}>Dzong</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.1,
    borderRadius: 50,
    width: 320, 
    marginLeft: 20,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderColor:"white",
    backgroundColor: 'white',
    shadowRadius: 4,
    elevation: 3,
    marginTop:-35,
  },
  icon: {
    marginRight: 10,
    width: 26,
    height: 24,
  },
  activeIcon: {
    tintColor: 'black',
  },
  input: {
    flex: 1,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  typeIcon: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    color:'gray'
  },
  activeIconText: {
    color: 'black',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginHorizontal: 20,
    marginTop: 10,
  },
  iconhotel:{
    height:24,
    width: 30
  }
});
