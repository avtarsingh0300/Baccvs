import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../Utilities/Styles/colors';
import styles from './style';
import { SizeBox } from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import commonStyles from '../../Utilities/Styles/commonStyles';
import ImagePath from '../../Utilities/Constants/ImagePath';
import { moderateScale, moderateScaleVertical } from '../../Utilities/Styles/responsiveSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const data = [
  { title: 'Frequently Contacted', data: [
      { id: '1', title: '@Kingson1' },
      { id: '2', title: '@Kingson2' },
      { id: '3', title: '@Kingson3' },
  ]},
  { title: 'Recent Chats', data: [
      { id: '4', title: '@Kingson4' },
      { id: '5', title: '@Kingson5' },
      { id: '6', title: '@Kingson6' },
  ]},
  { title: 'More', data: [
      { id: '7', title: '@Kingson7' },
      { id: '8', title: '@Kingson8' },
      { id: '9', title: '@Kingson9' },
  ]}
];

const TransferTicket = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);  
  const [showTransferCompletedModal, setShowTransferCompletedModal] = useState(false); 

  const filteredData = () => {
    if (!searchQuery) return data; 
    
    const query = searchQuery.toLowerCase(); 
    
    return data.map(section => ({
      ...section,
      data: section.data.filter(item => 
        item.title.toLowerCase().includes(query) 
      ),
    })).filter(section => section.data.length > 0); 
  };

  const handleTransfer = () => {
        setShowModal(false);
    setShowTransferCompletedModal(true);
  };

  const handleTransferCompletedClose = () => {
    setShowTransferCompletedModal(false);
  
  };

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.9 }}
      style={styles.LinearConatiner}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <SizeBox size={10} />
        <View style={styles.referalcontainer}>
          <VectorIcon
            groupName="SimpleLineIcons"
            name="arrow-left"
            size={22}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.referraltxt}>My Tickets</Text>
          <View/> 
        </View>
        <SizeBox size={20} />

        <KeyboardAwareScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: moderateScaleVertical(70) }} 
        >
          <View style={{ borderWidth: 1, borderColor: Colors.lightPink, padding: 20, borderRadius: 8 }}>
            <Text style={{ ...commonStyles.font18White, alignSelf: 'center' }}>Transfer ticket</Text>
            <SizeBox size={10} />
            <Text style={{ ...commonStyles.font13, textAlign: 'center' }}>
              Select a friend to send them the following ticket
            </Text>
            <SizeBox size={10} />
            <View style={styles.input}>
              <VectorIcon groupName="Feather" name="search" size={20} color={Colors.black} />
              <TextInput
                style={{ paddingHorizontal: 10, width: '90%' }}
                placeholder="Search by name or number"
                placeholderTextColor="black"
                value={searchQuery}
                onChangeText={setSearchQuery} 
              />
            </View>
            <SizeBox size={10} />

            {filteredData().map((section, index) => (
              <View key={index}>
                <Text style={{ ...commonStyles.font12, color: Colors.greyTxt}}>
                  {section.title}
                </Text>
                <SizeBox size={5} />

                <FlatList
                  data={section.data} 
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={[styles.item, { marginBottom: moderateScale(10), alignItems: "center" }]}>
                      <Image
                        source={ImagePath.ProfileImg}
                        style={{
                          width: moderateScale(36),
                          height: moderateScaleVertical(40),
                          borderRadius: 5,
                        }}
                      />
                      <Text style={{ ...commonStyles.font12Regular, color: Colors.white, paddingLeft: 10 }}>
                        {item.title}
                      </Text>
                    </View>
                  )}
                />
              </View>
            ))}
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#291846",
            width: "95%",
            position: "absolute",
            bottom: 15, 
            alignItems: "center",
            alignSelf: "center",
            paddingVertical: 5,
            backgroundColor: Colors.backgroundNew,
            marginBottom:10
          }}
          onPress={() => setShowModal(true)}  
        >
          <Text style={{ ...commonStyles.font18White, color: Colors.lightPink }}>Transfer</Text>
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
              <Text style={{ ...commonStyles.font14Regular, textAlign: 'center' }}>Are you sure you want to share this ticket to Kingson3112 ? </Text>
              <View style={{borderBottomWidth:1,borderColor:Colors.black,paddingVertical:10}}/>
              <TouchableOpacity
                onPress={handleTransferCompletedClose}
               
              >
                <Text style={{...commonStyles.font16Regular,color:Colors.lightgreen,textAlign:"center"}}>Transfer completed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TransferTicket;
