import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import ImagePath from '../../Utilities/Constants/ImagePath';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {SizeBox} from '../../Utilities/Component/Helpers';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';

const HomeNight = ({navigation}: any) => {
  const user = useSelector((data: any) => data?.auth?.userData);
  const [showOptionModal, setShowOptionModal] = useState(false);
  // console.log(user, 'user');
  const onContinue = () => {
    setShowOptionModal(true);
  };

  console.log(user);
  

  const nightclubNames: any = [
    {id: 1, name: 'Nightclub Analytics'},
    {id: 2, name: 'Events'},
    {id: 3, name: 'Dj’s & Promoters'},
    {id: 4, name: 'Feedback & Reviews'},
    {id: 5, name: 'Marketing tools'},
    {id: 6, name: 'Promote'},
    {id: 7, name: 'Bookings'},
    // {id: 8, name: 'Invoices'},
  ];

  const djData: any = [
    {id: 1, name: 'DJ Analytics'},
    {id: 2, name: 'Bookings'},
    {id: 3, name: 'Invoices'},
    {id: 4, name: 'Feedback & Reviews'},
    {id: 5, name: 'Marketing tools'},
    {id: 6, name: 'Promote yourself'},
  ];

  const promoterData: any = [
    {id: 1, name: 'Promoter Analytics'},
    {id: 2, name: 'Bookings'},
    {id: 3, name: 'Invoices'},
    {id: 4, name: 'Feedback & Reviews'},
    {id: 5, name: 'Marketing tools'},
    {id: 6, name: 'Promote yourself'},
  ];

  const handlePress = (name: string) => {
    if (name.includes('Marketing')) {
      navigation.navigate(NavigationStrings.MarketingTools);
    } else if (name.includes('Feedback')) {
      navigation.navigate(NavigationStrings.FeedbackScreen);
    } else if (name.includes('Promote')) {
      navigation.navigate(NavigationStrings.PromoteScreen);
    } else if (name.includes('Analytics')) {
      navigation.navigate(NavigationStrings.AnalyticsScreen);
    } else if (name.includes('Dj’s & Promoters')) {
      navigation.navigate(NavigationStrings.DjPromoters);
    } else if (name.includes('Bookings')) {
      navigation.navigate(NavigationStrings.DjBooking);
    } else if (name.includes('Invoices')) {
      navigation.navigate(NavigationStrings.DjInvoices);
    } else {
      navigation.navigate(NavigationStrings.NightEvents);
    }
  };

  const renderNightClub = ({item}: any) => {
    // const name = nightclubNames[item?.id] || 'Nightclub';
    return (
      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <TouchableOpacity
          style={styles.flatcontainer}
          onPress={() => handlePress(item?.name)}>
          <Text
            style={{...commonStyles.font14Regular, color: Colors.lightPink}}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const drawerData = [
    {id: 0, name: 'Profile', nav: NavigationStrings.Profile},
    {id: 1, name: 'Settings', nav: NavigationStrings.Profile},
    {id: 2, name: 'Upgrade ', nav: NavigationStrings.Profile},
    {id: 3, name: 'Help ', nav: NavigationStrings.Profile},
    {id: 4, name: 'Scan ', nav: NavigationStrings.Profile},
    {id: 5, name: 'Blacklist ', nav: NavigationStrings.Profile},
    {id: 6, name: 'Support ', nav: NavigationStrings.Profile},
    {id: 7, name: 'Switch to user ', nav: NavigationStrings.TabRoutes},
  ];

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(item.nav);
        setShowOptionModal(false);
      }}
      style={{paddingHorizontal: 7, paddingVertical: 7}}>
      <Text style={{...commonStyles.font20White}}>{item?.name}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <View style={styles.phantomcon}>
          <TouchableOpacity activeOpacity={0.7} onPress={onContinue}>
            <Image source={ImagePath.ProfileImg} style={styles.editedimg} />
          </TouchableOpacity>
          <Text style={{...commonStyles.font20White}}>The Phantom</Text>
          <VectorIcon
            groupName="Fontisto"
            name="bell"
            size={25}
            color={Colors.white}
          />
        </View>
        <SizeBox size={10} />
        <FlatList
          data={
            user?.role == 'DJ'
              ? djData
              : user?.role == 'Promoter'
              ? promoterData
              : nightclubNames
          }
          renderItem={renderNightClub}
          numColumns={2}
          style={{alignSelf: 'center'}}
          keyExtractor={item => item.id.toString()}
        />
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() => setShowOptionModal(false)}
          avoidKeyboard={true}
          style={{flex: 1, margin: 0, justifyContent: 'flex-start'}}
          isVisible={showOptionModal}
          // isVisible={true}
          backdropOpacity={0.5}>
          <LinearGradient
            colors={[Colors.backgroundNew, Colors.backgroundNew]}
            start={{x: 0, y: 0}}
            end={{x: 1.3, y: 0.9}}
            style={styles.dawerContainer}>
            <FlatList
              data={drawerData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </LinearGradient>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeNight;
