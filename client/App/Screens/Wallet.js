import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons'; // Import Entypo for the squared-cross icon

export default function Wallet() {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleSend = () => {
    setModalVisible(true);
  };

  const handleSendTransaction = () => {
    // Functionality to handle sending transaction
    // You can use the 'amount' and 'address' states here
    setModalVisible(false);
    setUpdateSuccess(true); // Set upload success to true

  };
  const renderUpdateSuccessMessage = () => {
    if (updateSuccess) {
        return (
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <FontAwesome name="check-circle" size={50} color="green" />
                    <Text style={styles.updateSuccessText}>Transaction Success!</Text>
                    <TouchableOpacity style={styles.okButton} onPress={() => setUpdateSuccess(false)}>
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return null;
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Wallet</Text>
      </View>
      {/* Horizontal line */}
      <View style={styles.horizontalLine} />
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../src/assets/xrp.png')} // Provide your image path
          style={styles.image}
        />
      </View>
      {/* Send Button */}
      <View style={styles.sendContainer}>
      <TouchableOpacity onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>r3SWtfBBD52v4TuqqmBH2uePPH2cBYmKnJ</Text>
      </View>
      {/* Container with black border and border radius */}
      <View style={styles.blackContainer}>
        <View style={styles.xrpContent}>
          <Image
            source={require('../../src/assets/xrp.png')} // Provide the path to your XRP image
            style={styles.xrpImage}
          />
          <Text style={styles.xrpText}>XRP</Text>
          <Text style={styles.amountText}>3000</Text>
        </View>
        <View style={styles.tokenContent}>
          <Image
            source={require('../../src/assets/xrp.png')} // Provide the path to your XRP image
            style={styles.tokenImage}
          />
          <Text style={styles.tokenText}>Token</Text>
          <Text style={styles.amountText}>30 NFT</Text>
        </View>
      </View>
      
      {/* Transaction Header */}
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionHeaderText}>Transaction</Text>
      </View>
      
      {/* Container with transaction border */}
      <View style={styles.transactionContainer}>
        <FontAwesome name="plus-circle" size={24} color="green" />
        <View style={styles.transactionContent}>
          <Text style={styles.transactionAddress}>r3SWtfBBD52v4TuqqmBH2uePPH2cBYmKnJ</Text>
          <Text style={styles.transactionValue}>30 XRP</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Entypo name="squared-cross" size={24} color="#940E37" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={setAmount}
              value={amount}
              keyboardType="numeric"
              placeholder='Amount'
            />
            <TextInput
              style={styles.input}
              onChangeText={setAddress}
              value={address}
              placeholder='Address'
            />
            <TouchableOpacity onPress={handleSendTransaction}>
              <Text style={styles.sendButton}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {renderUpdateSuccessMessage()}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 40,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 120,
  },
  horizontalLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  image: {
    width: 90, // Adjust image width
    height: 90, // Adjust image height
    resizeMode: 'contain', // Adjust image resize mode
  },
  sendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    padding: 4,
    paddingLeft:12,
    paddingRight: 10,
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 170,
    marginRight: 160
  },
  sendText: {
    marginLeft: 5,
    color: '#637887'
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 15,
    borderColor: 'gray', // Border color
    borderWidth: 0.5, // Border width
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30
  },
  addressText: {
    color: '#B0B0B0'
  },
  blackContainer: {
    borderColor: '#D3D3D3', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    marginTop: 20,
    marginHorizontal: 30,
    padding: 20,
  },
  xrpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  xrpImage: {
    width: 25, // Adjust image width as needed
    height: 25, // Adjust image height as needed
    resizeMode: 'contain',
  },
  xrpText: {
    color: '#6C6868',
    fontSize: 18,
    marginRight: 180, // Adjust spacing between image and text
  },
  tokenContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tokenImage: {
    width: 25, // Adjust image width as needed
    height: 25, // Adjust image height as needed
    resizeMode: 'contain',
  },
  tokenText: {
    color: '#6C6868',
    fontSize: 18,
    marginRight: 150, // Adjust spacing between image and text
  },
  amountText: {
    color: '#888888',
    fontSize: 18,
  },
  transactionHeader: {
    justifyContent: 'flex-start', // Align at the beginning of the container
    alignItems: 'flex-start', // Align at the beginning of the container
    marginTop: 20,
    marginLeft: 30, // Adjust as needed
  },
  transactionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  transactionContainer: {
    borderColor: '#629683', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Border radius
    marginTop: 20,
    marginHorizontal: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionContent: {
    marginLeft: 10,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center vertically
    flex: 1, // Take remaining space
    justifyContent: 'space-between', // Space between address and value
  },
  transactionAddress: {
    color: 'gray',
    fontSize: 12,
  },
  transactionValue: {
    color: 'gray',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    // height: '90%',
    width: '90%', // 80% of parent width
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#1C9FE2',
    color: 'white',
    textAlign: 'center',
    padding: 14,
    borderRadius: 10,
    fontSize: 18
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 15, // Add padding for easier tapping
  },
  updateSuccessContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
},
updateSuccessText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
},
okButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 20,
    borderColor: "#2AD73B", // Set border color to green
    borderWidth: 2, // Set border width
},
okButtonText: {
    color: 'black',
    fontSize: 18,

},
overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
},
modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    bottom: 150

},

  
});
