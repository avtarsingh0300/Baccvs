// OtherProfiles;
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import FastImage from 'react-native-fast-image';
import {
  Header,
  ImageComponent,
  Loadingcomponent,
  SizeBox,
  dummydata,
} from '../../Utilities/Component/Helpers';
import Modal from 'react-native-modal';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {getMemberDetails, getUserProfile} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {styles} from './style';

const OtherProfiles = ({navigation, route}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({});
  const [eventCount, setEventCount] = useState('');

  const onSocialpart = () => {
    setShowModal(false);
    navigation.navigate(NavigationStrings.SocialPart);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoader(true);
    const data = {
      id: route?.params?.id,
    };

    getMemberDetails(data)
      .then(res => {
        setLoader(false);
        setUserData(res?.user);
        setEventCount(res);
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err in getMemberDetails');
      });
  };

  const musictype = [
    'Disco / Funk / Soul',
    'EDM / Dance music',
    'Underground',
    'Hip-hop / R&B',
    'House',
    'Tech-House',
    'Commercial',
    'Latin / Raggaeton',
    'Pop / Rock',
  ];

  const renderItem = ({item, index}) => (
    <View>
      <View style={styles.listContainer}>
        <ImageBackground
          source={{uri: IMAGE_URL + item?.pictures[0]}}
          style={styles.backimg}>
          <View style={styles.flexinner}></View>
        </ImageBackground>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={{flex: 1}}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <SizeBox size={5} />
          <View style={styles.header}>
            {/* <Image source={ImagePath.le}/> */}
            <VectorIcon
              groupName={'Ionicons'}
              name={'chevron-back'}
              size={25}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{...commonStyles.Heading20font, color: Colors.lightPink}}>
              {userData?.full_name?.charAt(0).toUpperCase() +
                userData?.full_name?.slice(1)}
            </Text>
            <VectorIcon
              groupName="Entypo"
              name="dots-three-horizontal"
              size={30}
              color={Colors.white}
              onPress={() => setShowModal(true)}
            />
          </View>
          {userData?.pictures?.length > 0 ? (
            <Image
              source={{uri: IMAGE_URL + userData?.pictures[0]}}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={{uri: ImagePath.ProfileImg}}
              style={styles.profileImage}
            />
          )}
          <View style={styles.followInfoContainer}>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Events</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {eventCount?.event_count}
              </Text>
            </View>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Followers</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {userData?.followers?.length}
              </Text>
            </View>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Following</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {userData?.following?.length ? userData?.following?.lengt : 0}
              </Text>
            </View>
          </View>
          <View style={styles.midButtonContainer}>
            <TouchableOpacity style={styles.midButton} activeOpacity={0.8}>
              <Text style={styles.btnText}>Message</Text>
            </TouchableOpacity>
            <VectorIcon
              groupName="AntDesign"
              name="hearto"
              color={Colors.red}
              size={24}
            />
            <TouchableOpacity style={styles.midButton} activeOpacity={0.8}>
              <Text style={styles.btnText}>Follow</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="cupcake"
              size={20}
              color={Colors.lightPink}
            />
            <Text style={styles.rowText}>{userData?.age}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: '#7D67EE',
              }}
            />
            <Image
              source={ImagePath.line_height}
              tintColor={Colors.lightPink}
            />
            <Text style={styles.rowText}>{userData?.height}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: '#7D67EE',
              }}
            />
            <VectorIcon
              groupName="SimpleLineIcons"
              name="location-pin"
              size={20}
              color={Colors.lightPink}
            />
            <Text style={styles.rowText}>
              {userData?.location ? userData?.location : 'Eiffel Tower'}
            </Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: '#7D67EE',
              }}
            />
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="zodiac-leo"
              size={20}
              color={Colors.lightPink}
            />
            <Text style={styles.rowText}>{userData?.zodiac_sign}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: '#7D67EE',
              }}
            />
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="glass-cocktail"
              size={20}
              color={Colors.lightPink}
            />
          </View>
          <View style={styles.postContainer}>
            {userData?.pictures?.map((i, index) => (
              <FastImage
                source={{uri: IMAGE_URL + i}}
                key={index}
                style={styles.postImage}
              />
            ))}
          </View>
          <Text style={{...commonStyles.font16White, alignSelf: 'center'}}>
            See more
          </Text>
          <SizeBox size={10} />
          <Text style={styles.bioTitle}>Sasha Bio</Text>
          <SizeBox size={8} />
          <Text style={styles.bioText}>{userData?.bio}</Text>
          <SizeBox size={5} />
          <Text style={styles.title}>Music type</Text>
          <View style={styles.typeContainer}>
            {musictype.map((i, index) => (
              <View style={styles.type}>
                <Text style={styles.typeText}>{i}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.title}>Event type</Text>
          <View style={styles.typeContainer}>
            {musictype.map((i, index) => (
              <View style={styles.type}>
                <Text style={styles.typeText}>{i}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.title}>Languages</Text>
          <View style={styles.typeContainer}>
            {userData?.language?.map((i, index) => (
              <View style={styles.type}>
                <Text style={styles.typeText}>{i}</Text>
              </View>
            ))}
          </View>
          <SizeBox size={10} />
          <Text
            style={{
              ...commonStyles.font13,
              fontWeight: '700',
              marginLeft: moderateScale(31),
            }}>
            Past events (1/{eventCount?.event_count})
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: width,
              alignSelf: 'center',
            }}
            data={eventCount?.past_events}
            renderItem={renderItem}
          />
        </ScrollView>
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() => setShowModal(false)}
          avoidKeyboard={true}
          style={{flex: 1, margin: 0, justifyContent: 'flex-start'}}
          isVisible={showModal}
          backdropOpacity={0.2}>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.option}
              onPress={() => {
                navigation.goBack();
                setShowModal(false);
              }}>
              <Text style={styles.optionText}>Block</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                setShowModal(false);
              }}
              activeOpacity={0.8}
              style={styles.option}>
              <Text style={styles.optionText}>Report</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OtherProfiles;
