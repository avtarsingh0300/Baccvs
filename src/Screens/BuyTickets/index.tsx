import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, Modal, Alert  } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../Utilities/Styles/colors';
import styles from './style';
import { SizeBox } from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import QrCode from '../QrCode';
import commonStyles from '../../Utilities/Styles/commonStyles';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import { moderateScale, moderateScaleVertical, width } from '../../Utilities/Styles/responsiveSize';
import ImagePath from '../../Utilities/Constants/ImagePath';

const data = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

const BuyTickets = ({ navigation }: any) => {
  const [showModal, setShowModal] = useState(false);  
  const [showTransferCompletedModal, setShowTransferCompletedModal] = useState(false); 
  const [isTransferred, setIsTransferred] = useState(false);  

  const handleTransfer = () => {
    setShowModal(false);
    setShowTransferCompletedModal(true);
    setIsTransferred(true);  
  };

  const handleTransferCompletedClose = () => {
    setShowTransferCompletedModal(false);
  };

  const handleTransferButtonPress = () => {
    if (!isTransferred) {
      setShowModal(true);  
    } 
  };
  const renderItems = ({ item }: any) => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Progressive</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.9 }}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={10} />
        <View style={styles.referalcontainer}>
          <VectorIcon
            groupName="SimpleLineIcons"
            name="arrow-left"
            size={22}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.referraltxt}>Kingson’s tickets</Text>
          <View/>
        </View>
        <SizeBox size={10} />
        <View style={{ alignSelf: 'center', padding: 10, backgroundColor: Colors.white, borderRadius: 16 }}>
          <Image
          source={ImagePath.blurpic}
          style={{
            height:moderateScaleVertical(220),
            width: moderateScale(220),
            alignItems: 'center',
            tintColor: '#1A2232',
          }}
        />
        </View>
        <SizeBox size={10} />
        <Text style={{ ...commonStyles.font12Regular, color: '#637394', textAlign: 'center' }}>
          Show this code to the gatekeeper at the entrance.
        </Text>
        <SizeBox size={10} />
        <Image
          source={ImagePath.dotline}
          style={{
            height: 40,
            width: width / 1.1,
            alignItems: 'center',
            tintColor: '#1A2232',
          }}
        />
        <SizeBox size={10} />
        <Text style={styles.solumtxt}>Babylone - Solum - Esposito B2B Gianni romano</Text>
        <SizeBox size={10} />
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
        />
        <SizeBox size={10} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...commonStyles.font12Regular, color: '#637394', width: '25%' }}>Location</Text>
          <View>
            <Text style={{ ...commonStyles.font12Regular, color: '#ffffff' }}>Phantom Paris</Text>
            <SizeBox size={1} />
            <Text style={{ ...commonStyles.font12Regular, color: '#637394' }}>8 Bd de Bercy, 75012 Paris</Text>
          </View>
        </View>
        <SizeBox size={3} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...commonStyles.font12Regular, color: '#637394', width: '25%' }}>Date</Text>
          <Text style={{ ...commonStyles.font12Regular, color: '#ffffff' }}>6 April 2022, 23h00 - 05h00</Text>
        </View>
        <SizeBox size={3} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...commonStyles.font12Regular, color: '#637394', width: '25%' }}>Cost</Text>
          <Text style={{ ...commonStyles.font12Regular, color: '#ffffff' }}>40€ (paid)</Text>
        </View>
        <SizeBox size={3} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ ...commonStyles.font12Regular, color: '#637394', width: '25%' }}>Early ticket</Text>
          <Text style={{ ...commonStyles.font12Regular, color: '#ffffff' }}>Entry before 00h30</Text>
        </View>
        <SizeBox size={40} />

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#291846",
            width: "95%",
            alignItems: "center",
            alignSelf: "center",
            paddingVertical: 5,
            backgroundColor: Colors.backgroundNew,
            marginBottom:10
          }}   onPress={handleTransferButtonPress}>
          <Text style={{ ...commonStyles.font18White, color: isTransferred ? Colors.lightgreen : Colors.lightPink}}>{isTransferred ? "Purchase" : "Transfer"}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: Colors.backgroundNew, padding: 20, borderRadius: 10, width: '80%', borderWidth: 1, borderColor: "#291846" }}>
              <Text style={{ ...commonStyles.font14Regular, textAlign: "center" }}>Are you sure you want to transfer this ticket?</Text>
              <View style={{ borderBottomWidth: 1, borderColor: Colors.black, paddingTop: 10 }} />
              <View style={{ justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={handleTransfer}
                  style={{ paddingVertical: 10 }}
                >
                  <Text style={{ ...commonStyles.font16Regular, color: Colors.lightPink, textAlign: "center" }}>Confirm</Text>
                </TouchableOpacity>
                <View style={{ borderBottomWidth: 1, borderColor: Colors.black }} />
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={{ paddingTop: 10 }}
                >
                  <Text style={{ ...commonStyles.font16Regular, textAlign: "center" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showTransferCompletedModal}
          onRequestClose={handleTransferCompletedClose}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor:Colors.backgroundNew, padding: 20, borderRadius: 10, width: '80%',borderWidth:1,borderColor:"#291846" }}>
              <Text style={{ ...commonStyles.font14Regular, textAlign: 'center',color:Colors.lightgreen }}>You have successfully purchased this ticket.</Text>
              <View style={{borderBottomWidth:1,borderColor:Colors.black,paddingBottom:10}}/>
              <TouchableOpacity
                
                onPress={()=>{navigation.navigate(NavigationStrings.QrCode)}}
              >
                <Text style={{...commonStyles.font16Regular,color:Colors.lightPink,textAlign:"center",paddingVertical:10}}>See my ticket</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTransferCompletedClose}
              >
          <View style={{borderBottomWidth:1,borderColor:Colors.black}}/>
                <Text style={{...commonStyles.font16Regular,color:Colors.white,textAlign:"center",paddingTop:10}}>Continue buying</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BuyTickets;
