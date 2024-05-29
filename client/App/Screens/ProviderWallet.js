import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import Svg, { Path } from 'react-native-svg';

import { API_BASE_URL, Check_User_Login_WIth_Cookie, get_NFT_Token_URl, Get_XRP_Balance, Add_XRPL_Account } from '../../config';

const { width, height } = Dimensions.get('window');

export default function ProviderWallet() {
  const [tokenListVisible, setTokenListVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [accountPopupVisible, setAccountPopupVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("Account 1");
  const [addAccountPopupVisible, setAddAccountPopupVisible] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const navigation = useNavigation();
  const [listofAccount, setListOfAccount] = useState([]);
  const [xrplaccount, setxrplaccount] = useState("0x0000000000000000000000000000000000000000");
  const [id, setId] = useState("");
  const [xrpl, setXrp] = useState("0");
  const [nftUrl, setNftUrl] = useState([])

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : null;
    } catch (e) {
      console.error('Failed to fetch data', e);
      return null;
    }
  };
  // const getNFTUrl = async () => {
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}${get_NFT_Token_URl}`, {
  //       raddress: xrplaccount
  //     });
  //     const { uriList, status } = response.data
  //     if (status === "success") {
  //       console.log("uriList kjsdkas", uriList)
  //       try {
  //         const pinataUrl = 'https://gateway.pinata.cloud/ipfs/QmZue49LNh5EwK1KtfJjrRuCdYDx28DkmXYFSWzSwrmiqp';
  //         // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'

  //         const response = await fetch(pinataUrl,{
  //           headers:{
  //             "x-pinata-geteway-token":"Sf1tfGrOYu91EB5nOZ_igFX6FDdi7C6KZoL7PRuTG1ZkGuSmLaIzlDkbR0gnaTX7s"
  //           }
  //         });
  //         console.log("response", response)
  //         const json = await response.json();
  //         console.log("json", json)
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else {
  //       Alert.alert("You Dont have any NFT")
  //     }

  //   } catch (error) {
  //     console.log("error", error)
  //     // console.error('Error:', error.response ? error.response.data : error.message);
  //     // Toast.show({ type: 'error', text1: 'Error', text2: 'An error occurred while creating the user.' });
  //     Alert.alert("failed to invoke nft")
  //   }
  // };

const getNFTUrl = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}${get_NFT_Token_URl}`, {
      raddress: xrplaccount
    });

    const { uriList, status } = response.data;

    if (status === "success") {
      console.log("uriList", uriList);

      try {
        const pinataUrl = 'https://violet-tremendous-horse-332.mypinata.cloud/ipfs/QmZue49LNh5EwK1KtfJjrRuCdYDx28DkmXYFSWzSwrmiqp';
        
        const fetchResponse = await fetch(pinataUrl, {
          headers: {
            "x-pinata-gateway-token": "Sf1tfGrOYu91EB5nOZ_igFX6FDdi7C6KZoL7PRuTG1ZkGuSmLaIzlDkbR0gnaTX7s"
          }
        });

        if (!fetchResponse.ok) {
          throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }

        const json = await fetchResponse.json();
        console.log("json", json);

      } catch (error) {
        console.error('Error fetching Pinata data:', error);
      }

    } else {
      Alert.alert("You don't have any NFT");
    }

  } catch (error) {
    console.log("error", error);
    Alert.alert("Failed to invoke NFT");
  }
};













  useEffect(() => {
    const loadLoginjwt = async () => {
      const loginjwt = await getData('loginjwt');
      if (loginjwt) {
        try {
          const response = await axios.post(`${API_BASE_URL}${Check_User_Login_WIth_Cookie}`, { loginjwt });
          const { user, status } = response.data;
          if (status === "success") {
            setListOfAccount(user.account);
            setxrplaccount(user.account[0]);
            setId(user._id);
            const balance = await axios.post(`${API_BASE_URL}${Get_XRP_Balance}`, { account: user.account[0] });
            setXrp(balance.data.Balance);

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

  const handleTokenListToggle = () => {
    setTokenListVisible(!tokenListVisible);
  };

  const handleOptionSelect = (option) => {

    getNFTUrl()
    // setSelectedOption(option);
    setTokenListVisible(false);

    // if (option === "NFT") {
    //   navigation.navigate('Nft'); // Navigate to your NFT screen
    // }

  };

  const handleAccountPopupToggle = () => {
    setAccountPopupVisible(!accountPopupVisible);
  };

  const handleAccountSelect = async (account, data) => {
    setSelectedAccount(account);
    setxrplaccount(data);
    setAccountPopupVisible(false);
    try {
      const response = await axios.post(`${API_BASE_URL}${Get_XRP_Balance}`, { account: data });
      setXrp(response.data.Balance);
    } catch (error) {
      console.error("Error fetching XRP balance:", error);
    }
  };

  const handleAddAccountPopupToggle = () => {
    setAddAccountPopupVisible(!addAccountPopupVisible);
  };

  const handleSecretKeyChange = (key) => {
    setSecretKey(key);
  };

  const handleAddAccount = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}${Add_XRPL_Account}`, {
        id: id,
        secretKey: secretKey,
      });
      console.log('Response:', response.data);
      if (response.data.status === "success") {
        Alert.alert("Account Added Successfully");
        setAddAccountPopupVisible(false);
        setSecretKey('');
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred while adding the account.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Wallet</Text>
        <TouchableOpacity onPress={handleAccountPopupToggle} style={styles.accountContainer}>
          <View style={styles.accountLabelContainer}>
            <Text style={styles.accountLabel}>{selectedAccount}</Text>
            <Image source={require('./../../src/assets/downarrow.png')} style={styles.arrowicon} />
          </View>
          <View style={styles.accountAddressContainer}>
            <Text style={styles.accountAddress}>{xrplaccount}</Text>
          </View>
        </TouchableOpacity>
        {accountPopupVisible && (
          <Modal visible={accountPopupVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.popup}>
                <Text style={styles.popupHeader}>My accounts</Text>
                <TouchableOpacity onPress={() => setAccountPopupVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddAccountPopupToggle} style={styles.addAccountButton}>
                  <Text style={styles.addAccountButtonText}>+ Add Account </Text>
                </TouchableOpacity>
                {listofAccount.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleAccountSelect(`Account ${index + 1}`, data)}
                    style={[
                      styles.accountButton,
                      selectedAccount === `Account ${index + 1}` ? styles.selectedAccountButton : null
                    ]}
                  >
                    <View style={styles.accountInfoContainer}>
                      <Text style={styles.accountButtonText}>Account {index + 1}</Text>
                      <Text style={styles.accountAddressText}>{data}</Text>
                    </View>
                    <MaterialIcons
                      name={selectedAccount === `Account ${index + 1}` ? "radio-button-checked" : "radio-button-unchecked"}
                      size={24}
                      color="gray"
                      style={styles.radioIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        )}
        <View style={styles.tokenContainer}>
          <TouchableOpacity onPress={handleTokenListToggle} style={styles.tokenButton}>
            <Text style={styles.tokenLabel}>Tokens</Text>
            <Image source={require('./../../src/assets/downarrow.png')} style={styles.iconarrow} />
          </TouchableOpacity>
        </View>
        {tokenListVisible && (
          <Modal visible={tokenListVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.popup}>
                <Text style={styles.popupHeader}>Select</Text>
                <TouchableOpacity onPress={() => setTokenListVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect("Tokens")} style={styles.optionButton}>
                  <Text style={styles.optionText}>Tokens</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect("NFT")} style={styles.optionButton}>
                  <Text style={styles.optionText}>NFT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionSelect("FT")} style={styles.optionButton}>
                  <Text style={styles.optionText}>FT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        <View style={styles.xrpContainer}>

          <Image source={require('./../../src/assets/Vector.png')} style={{ width: 20, height: 20 }} />
          <Text style={styles.xrpLabel}>XRP</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{xrpl} xrp</Text>
          </View>
        </View>
        <View style={styles.bordercontainer}>
          <Swiper showsPagination={true}
            loop={true}
            activeDotColor='#00AF87'
            paginationStyle={styles.pagination}>
            {[1, 2, 3].map((item, index) => (
              <View key={index} style={styles.centeredContainer}>
                <View style={styles.nftcontainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('./../../src/assets/nft.jpeg')}
                      style={styles.backgroundImage}
                    />
                    <Svg
                      height={height * 0.08}
                      width={width * 0.8}
                      style={styles.curve}
                    >
                      <Path
                        d={`M0,${height * 0.08} Q${width * 0.4},${-height * 0.04} ${width * 0.8
                          },${height * 0.08} L${width * 0.8},${height * 0.32} L0,${height * 0.32
                          } Z`}
                        fill="white"
                        stroke="white"
                        strokeWidth={0.1}
                      />
                    </Svg>
                  </View>
                  <View style={styles.contentContainer}>
                    <Text style={styles.heading}>2024 TOUR XRPLORE</Text>
                    <View style={styles.horizontalLine} />
                    <Text style={styles.location}>THIMPHU, BHUTAN</Text>

                    <View style={styles.formContainer}>
                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>NFT ID:</Text>
                      </View>
                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>DATE AND TIME:</Text>
                      </View>
                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>No. OF HEADS:</Text>
                      </View>
                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>No. OF ATTRACTION:</Text>
                      </View>
                      <View style={styles.detailContainer}>
                        <Text style={styles.detailLabel}>PLACE:</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </Swiper>
        </View>
        {addAccountPopupVisible && (
          <Modal visible={addAccountPopupVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.popup}>
                <Text style={styles.popupHeader}>Add Account</Text>
                <TouchableOpacity onPress={() => setAddAccountPopupVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Secret Key:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleSecretKeyChange}
                    value={secretKey}
                    placeholder="Enter your secret key"
                    placeholderTextColor="gray"
                  />
                </View>
                <TouchableOpacity onPress={handleAddAccount} style={styles.addButton}>
                  <Text style={styles.addButtonLabel}>Add Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 4,
  },
  accountContainer: {
    marginTop: 30,
    marginHorizontal: 4,
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.1,
    backgroundColor: 'white',
    borderColor: 'white',
    elevation: 3,
    width: "100%"
  },
  accountLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginLeft: 10,
  },
  arrowContainer: {
    justifyContent: 'center',
    marginLeft: 'auto',
    color: 'gray',
  },
  arrowicon: {
    tintColor: 'gray',
    width: 17,
    height: 10,
  },
  accountAddressContainer: {
    marginTop: 10,
  },
  accountAddress: {
    marginLeft: 10,
    fontSize: 10,
    color: 'gray',
  },
  tokenContainer: {
    marginTop: 30,
    marginHorizontal: 4,
  },
  tokenButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'gray',
  },
  iconarrow: {
    tintColor: 'gray',
    width: 17,
    height: 10,
    marginTop: 7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  popupHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'gray',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'gray',
  },
  optionButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 0.1,
    backgroundColor: 'white',
    borderColor: 'white',
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  xrpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    borderWidth: 0.1,
    width: '100%',
    height: 40,
    borderRadius: 6,
    backgroundColor: 'white',
    borderColor: 'white',
    elevation: 3,
  },
  xrpLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'gray',
  },
  amountContainer: {
    marginLeft: 'auto',
  },
  amountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
  },
  addAccountButton: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.1,
    color: 'gray',
    width: '45%',
    height: 40,
    marginLeft: 'auto',
    marginTop: -35,
    backgroundColor: 'white',
    borderColor: 'white',
    elevation: 3,
  },
  addAccountButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.1,
    backgroundColor: 'white',
    borderColor: 'white',
    elevation: 3,
  },
  selectedAccountButton: {},
  accountInfoContainer: {
    flex: 1,
  },
  accountButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'gray',
  },
  accountAddressText: {
    fontSize: 10,
    color: 'gray',
  },
  radioIcon: {
    marginLeft: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    height: 45,
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  addButtonLabel: {
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: '#00AF87',
    textAlign: 'center',
    height: 30,
    paddingTop: 7,
    width: '60%',
    borderRadius: 5,
    alignSelf: 'center',
  },
  bordercontainer: {
    borderWidth: 0.1,
    backgroundColor: 'white',
    borderColor: 'white',
    elevation: 3,
    height: height * 0.66,
    marginTop: height * 0.02,
    borderRadius: 10,
    // backgroundColor:"#DDDDDD"


  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.08,
    marginLeft: width * 0.02,



  },
  nftcontainer: {
    width: width * 0.9,
    height: height * 0.7,

  },
  imageContainer: {
    position: 'relative',
    width: width * 0.8,
    height: height * 0.32,
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
    height: '70%',
    resizeMode: 'cover',
  },
  curve: {
    position: 'absolute',
    bottom: height * 0.096,
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
    color: 'black',
    marginBottom: height * 0.01,
    marginTop: height * -0.14,
  },
  location: {
    fontSize: width * 0.023,
    color: 'black',
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
  },
  formContainer: {
    width: '100%',
    height: '100%',
    padding: width * 0.032,
    borderRadius: 6,

  },
  horizontalLine: {
    // height: 1,
    width: '98%',
    backgroundColor: 'black',
    marginVertical: height * 0.01,
    marginTop: height * 0.018,
    marginLeft: width * -0.02
  },
  swiper: {
    flex: 1,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01,
    // marginTop: height * 0.07,

    width: width * 0.82,
    height: height * 0.054,
    marginLeft: -18,
    borderWidth: 0.1,
    backgroundColor: 'white',
    borderColor: 'white',
    elevation: 3,
    borderRadius: 4,

  },
  detailLabel: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,

  },

});