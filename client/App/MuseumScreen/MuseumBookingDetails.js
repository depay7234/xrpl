import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


export default function BookingDetails() {
  // Sample data for users with associated hotel names
  const userData = [
    { id: '1', name: 'Logun Paul', mobile: '1234567890', id: '12345678gfdw', cid: '123456789', hotelName: 'Chagri Dorjeden Monastery', timestamp: new Date().getTime() - 3600000 }, // 1 hour ago
    { id: '2', name: 'James Paul', mobile: '9876543210', id: 'hbuiuo76879', cid: '6754364532', hotelName: 'Rinpung Museum', timestamp: new Date().getTime() - 7200000 }, // 2 hours ago
    { id: '3', name: 'Michael Johnson', mobile: '4567890123', id: 'jk3rnug954b', cid: '7867543234567', hotelName: 'Terma Linca Resort & Spa', timestamp: new Date().getTime() - 10800000 }, // 3 hours ago
  ];
  const navigation = useNavigation();
  // State variables for pop-up and room information
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);


  // Function to convert timestamp to "time ago" format
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now.getTime() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  };
  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    console.log(`Deleting ${selectedUser.name}'s booking`);
    setModalVisible(false);
    setDeleteSuccess(true);

  };

  const renderDeleteSuccessMessage = () => {
    if (deleteSuccess) {
      return (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <FontAwesome name="check-circle" size={50} color="green" />
            <Text style={styles.deleteSuccessText}>Delete Success!</Text>
            <TouchableOpacity style={styles.okButton} onPress={() => setDeleteSuccess(false)}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={[styles.userIcon, { backgroundColor: '#ddd' }]}>
        <FontAwesome5 name="user-friends" size={24} color="#000" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.userName}>({item.name})</Text>
          <Text style={styles.timestamp}>{getTimeAgo(item.timestamp)}</Text>
        </View>
        <Text style={styles.hotelName}>{item.hotelName}</Text>
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={() => handleViewDetails(item)}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );
  // Pop-up component
  const RoomInfoModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalText}>VISITORS INFO</Text>
          </View>
          <View style={styles.roomInfoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>No. of guest</Text>
              <Text style={styles.label}>Cost</Text>
              <Text style={styles.label}>Gas fee</Text>
              <View style={styles.horizontalLine}></View>
              <Text style={styles.label}>Total</Text>
              <View style={styles.horizontalLine}></View>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>11</Text>
              <Text style={styles.value}>(100*11=1100)</Text>
              <Text style={styles.value}>2</Text>
              <View style={styles.horizontalLine}></View>
              <Text style={styles.totalValue}>XRP. 1122</Text>
              <View style={styles.horizontalLine}></View>
            </View>
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleCloseModal} style={[styles.modalButton, { backgroundColor: '#0D8BFF' }]}>
              <Text style={styles.modelButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={[styles.modalButton, { backgroundColor: '#FF0D90' }]}>
              <Text style={styles.modelButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );



  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Booking Details</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log("All bookings button pressed")}>
          <Text style={styles.buttonText}>All Bookings</Text>
        </TouchableOpacity>
      </View>
      {/* User Section */}
      <FlatList
        data={userData}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.userList, { marginBottom: 20 }]}
      />
      {/* Pop-up */}
      <RoomInfoModal />
      {renderDeleteSuccessMessage()}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  horizontalLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginTop: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 10,
    marginLeft: 100

  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00000000',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#398133',
    alignItems: 'center',
    marginLeft: 100,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },

  userList: {
    marginTop: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    borderRadius: 10,
    marginRight: 20,
    padding: 9,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 14,
    color: 'gray',
  },
  hotelName: {
    fontSize: 14,
    color: '#1C9FE2',
  },
  viewButton: {
    backgroundColor: '#ddd', // Adjust the background color here
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  viewButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: -200
  },
  modalText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#00000000',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: '#fff',
    alignItems: 'center',
    width: 110,
    height: 35,
    marginBottom: 10, // Add margin bottom to create space between buttons
  },
  modelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start (left) of the container
  },

  labelContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10, // Adjust margin as needed
  },
  valueContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: "55%", // Adjust margin as needed
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray'
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  roomInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  deleteSuccessContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  deleteSuccessText: {
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
