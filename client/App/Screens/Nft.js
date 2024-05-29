import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const Nft = () => {
  return (
    <View style={styles.centeredContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./../../src/assets/chimi.png')}
            style={styles.backgroundImage}
          />
          <Svg
            height={height * 0.08}
            width={width * 0.8}
            style={styles.curve}
          >
            <Path
              d={`M0,${height * 0.08} Q${width * 0.4},${-height * 0.04} ${
                width * 0.8
              },${height * 0.08} L${width * 0.8},${height * 0.32} L0,${
                height * 0.32
              } Z`}
              fill="blue"
            />
          </Svg>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>2024 TOUR XRPLORE</Text>
          <View style={styles.horizontalLine} />
          <Text style={styles.location}>THIMPHU, BHUTAN</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.inputContainer}
              placeholder="NFT ID"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.inputContainer}
              placeholder="DATE AND TIME"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.inputContainer}
              placeholder="No. OF HEADS"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.inputContainer}
              placeholder="No. OF ATTRACTION"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.inputContainer}
              placeholder="PLACE"
              placeholderTextColor="gray"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// const App = () => {
//   return (
//     <Swiper
//       loop={false}
//       showsButtons={false}
//       showsPagination={false}
//       style={styles.swiper}
//     >
//       <Nft />
//       <Nft />
//     </Swiper>
//   );
// };

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: 'blue',
  },
  imageContainer: {
    position: 'relative',
    width: width * 0.8,
    height: height * 0.32,
    marginTop: height * 0.01,
    marginBottom: height * -0.01,
    marginLeft: width * 0.04,
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  curve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
  },
  heading: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
  },
  location: {
    fontSize: width * 0.026,
    color: 'white',
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
  },
  formContainer: {
    width: '100%',
    height: '100%',
    padding: width * 0.032,
    borderRadius: 6,
  },
  inputContainer: {
    height: height * 0.048,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    marginBottom: height * 0.016,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  horizontalLine: {
    height: 1,
    width: '98%',
    backgroundColor: 'white',
    marginVertical: height * 0.01,
    marginTop: height * 0.018,
    marginLeft: width * -0.02
  },
  swiper: {
    flex: 1,
  },
});

export default Nft;