import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {
  ImageComponent,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {getTickets} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const SelectTicket = ({navigation}: any) => {
  const [buyticketdata, setBuyTicket] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState('');
  const [price, setPrice] = useState('');
  useEffect(() => {
    getMyTickets();
  }, []);

  const getMyTickets = () => {
    setLoader(true);

    getTickets()
      .then(res => {
        setLoader(false);
        setBuyTicket(res?.tickets);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err, 'err in getTickets');
      });
  };

  const handlePress = (item: any) => {
    setSelectedTicketNumber(item?.ticketNumber);
    setPrice(item?.price);
  };

  const submitSelectedTicket = () => {
    if (selectedTicketNumber) {
      navigation.navigate(NavigationStrings.UploadTicket, {
        price: price,
        ticketdata: selectedTicketNumber,
      });
    } else {
      showError('Please select ticket !');
    }
  };
  const renderItems = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.item}
      onPress={() => handlePress(item)}>
      <ImageComponent
        source={
          item?.eventId?.pictures?.length > 0
            ? {uri: IMAGE_URL + item?.eventId?.pictures[0]}
            : ImagePath.ProfileImg
        }
        style={styles.profileimgs}
      />

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 7,
          alignItems: 'center',
        }}>
        <View style={{width: '72%'}}>
          <Text style={styles.title}>{item?.eventId?.event_name}</Text>
          <Text style={styles.date}>{item?.eventId?.date}</Text>
        </View>
        <View style={styles.Radiobtn}>
          <VectorIcon
            groupName="Ionicons"
            name={
              selectedTicketNumber === item.ticketNumber
                ? 'radio-button-on'
                : 'radio-button-off'
            }
            size={25}
            color={Colors.white}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <View>
          <SizeBox size={10} />
          <Text style={styles.myticketstext}>Select event</Text>
          <SizeBox size={10} />
          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="Select my tickets"
              placeholderTextColor={Colors.black}
            />
          </View>
        </View>
        <SizeBox size={10} />
        {buyticketdata.length > 0 ? (
          <FlatList
            data={buyticketdata}
            renderItem={renderItems}
            keyExtractor={item => item?._id}
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

        <SizeBox size={30} />
        <TouchableOpacity onPress={submitSelectedTicket} style={styles.sytbtn}>
          <Text style={styles.sell}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SelectTicket;
