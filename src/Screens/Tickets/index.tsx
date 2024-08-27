import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {
  ImageComponent,
  Loadingcomponent,
  showError,
} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {getTickets} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import moment from 'moment';
import { height, moderateScale, moderateScaleVertical, width } from '../../Utilities/Styles/responsiveSize';
import Modal from 'react-native-modal';

const Tickets = ({navigation}: any) => {
  const [colors, setColors] = useState(0);
  const [sellBtn, setSellBtn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getMyTickets();
  }, []);

  const getMyTickets = () => {
    setLoader(true);
    getTickets()
      .then(res => {
        setLoader(false);
        console.log(res, 'res in getTickets');
        setUserData(res?.tickets);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err, 'err in getTickets');
      });
  };

  const data1 = [
    {
      id: '1',
      title: 'Babylone - Solum - Esposito B2B Giann...',
      imageUrl: ImagePath.ProfileImg,
    },
    {
      id: '1',
      title: 'Babylone - Solum - Esposito B2B Giann...',
      imageUrl: ImagePath.ProfileImg,
    },
    {
      id: '1',
      title: 'Babylone - Solum - Esposito B2B Giann...',
      imageUrl: ImagePath.ProfileImg,
    },
    {
      id: '1',
      title: 'Babylone - Solum - Esposito B2B Giann...',
      imageUrl: ImagePath.ProfileImg,
    },
  ];

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(NavigationStrings.QrCode)}>
      <View style={styles.item}>
        <ImageComponent
          source={
            item?.eventId?.pictures?.length > 0
              ? {uri: IMAGE_URL + item?.eventId?.pictures[0]}
              : ImagePath.ProfileImg
          }
          style={styles.profileimg}
        />

        <View style={{width: '80%'}}>
          <Text style={styles.title}>{item?.eventId?.event_name}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.date}>{item?.eventId?.date}</Text>
            {moment(item?.eventId?.date).format('YYYY-MM-DD') >
              moment(new Date()).format('YYYY-MM-DD') && (
              <Text style={styles.date1}>Upcoming</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItemm = ({item}: any) => (
    <View style={styles.item}>
      <ImageComponent source={item.imageUrl} style={styles.profileimgs} />

      <View style={{flexDirection: 'row', paddingHorizontal: 7}}>
        <View style={{width: '60%'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>Wed 20 Dec 2023</Text>
        </View>
        <TouchableOpacity
        onPress={()=> setModalVisible(!modalVisible)}
          style={styles.buybtn}>
        <Text style={styles.date}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderItems = ({item}: any) => (
    <View style={styles.item}>
      <ImageComponent source={item.imageUrl} style={styles.profileimgs} />

      <View style={{flexDirection: 'row', paddingHorizontal: 7}}>
        <View style={{width: '60%'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>Wed 20 Dec 2023</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 11,
          }}>
          <TouchableOpacity>
            <LinearGradient
              colors={[Colors.LinearBlack, Colors.lightPink]}
              style={styles.linear}>
              <Text style={styles.cancelbtn}>Cancel</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.price}>15€99</Text>
        </View>
      </View>
    </View>
  );

  const handleBuyPress = () => {
    setModalVisible(false);
    console.log('Buy button pressed');
  };

  const handleCancelPress = () => {
    setModalVisible(false);
    console.log('Cancel button pressed');
  };

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <View style={styles.headerContainer}>
          <ImageComponent
            source={ImagePath.ProfileImg}
            style={styles.profileimg}
          />
          <Text style={styles.myticketstext}>My Tickets</Text>
          <View style={{width: 20}}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginVertical: 20,
          }}>
          <Text
            onPress={() => setColors(0)}
            style={[
              styles.tickets,
              {
                color: colors == 0 ? Colors.green : Colors.white,
              },
            ]}>
            My Tickets
          </Text>

          <Text
            onPress={() => setColors(1)}
            style={[
              styles.text,
              {
                color: colors == 1 ? Colors.green : Colors.white,
              },
            ]}>
            BUY
          </Text>

          <Text
            onPress={() => {
              setColors(2), setSellBtn(false);
            }}
            style={[
              styles.text,
              {
                color: colors == 2 ? Colors.green : Colors.white,
              },
            ]}>
            SELL
          </Text>
        </View>
        {colors == 0 ? (
          <>
            {userData ? (
              <FlatList
                data={userData}
                renderItem={renderItem}
                keyExtractor={item => item?.id}
                style={{marginBottom: 50}}
              />
            ) : (
              <Text
                style={[
                  styles.tickets,
                  {color: Colors.white, alignSelf: 'center'},
                ]}>
                No data found ...
              </Text>
            )}
          </>
        ) : null}

        {colors == 1 ? (
          <>
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="Nightclub, party, dj, promoter"
                placeholderTextColor="#000"
                underlineColorAndroid="transparent"
              />
              <VectorIcon
                groupName="Fontisto"
                name="search"
                size={20}
                color="black"
                style={styles.searchIcon}
              />
            </View>
            <FlatList data={data1} renderItem={renderItemm} />
          </>
        ) : null}

        {colors == 2 ? (
          <>
            {!sellBtn && (
              <TouchableOpacity
                onPress={() => setSellBtn(!sellBtn)}
                style={styles.sytbtn}>
                <Text style={styles.sell}>Sell your ticket</Text>
              </TouchableOpacity>
            )}
            {sellBtn ? (
              <>
                <FlatList data={data1} renderItem={renderItems} />

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(NavigationStrings.SelectTicket)
                  }
                  style={styles.sytbtn}>
                  <Text style={styles.sell}>Sell more ticket</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </>
        ) : null}
        <Modal
          isVisible={modalVisible}
          style={{
            alignSelf:"center"
          }}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          backdropOpacity={0.5}
          animationIn="slideInUp"
          animationOut="flipOutY"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View
            style={{
              minHeight: height / 5,
              maxHeight: height / 3,
              width: '95%',
              alignSelf: 'center',
            }}>

            <LinearGradient 
            colors={[Colors.LinearBlack, Colors.Linear]}
            start={{x: 1.5, y:1.9}}
            end={{x: 1.4, y: 0.4}}
            style={styles.modalView}>
      <Text style={styles.modalText}>Are you sure you want to buy this ticket at 120 € for [Event name]?</Text>
      <View style={styles.brdbotm}></View>
      <TouchableOpacity style={styles.modalButton} onPress={handleBuyPress}>
        <Text style={styles.modalButtonText}>Buy</Text>
      </TouchableOpacity>
      <View style={styles.brdbotm}></View>
      <TouchableOpacity style={styles.modalButton} onPress={handleCancelPress}>
        <Text style={styles.modalbtnText}>Cancel</Text>
      </TouchableOpacity>
    </LinearGradient>
          </View>
        </Modal>
        </SafeAreaView>
    </LinearGradient>
  );
};

export default Tickets;
