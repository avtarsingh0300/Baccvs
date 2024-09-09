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
import {styles} from './style';
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
import {getUserProfile} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const UserProfile = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({});
  const [eventCount, setEventCount] = useState([]);
  const onSocialpart = () => {
    setShowModal(false);
    navigation.navigate(NavigationStrings.SocialPart);
  };
    const onContinue = () => {
      navigation.navigate(NavigationStrings.FollowingScreen)
    }
  useEffect(() => {
    const _unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });
    return () => {
      _unsubscribe();
    };
  }, []);

  const getUserData = async () => {
    setLoader(true);
    getUserProfile()
      .then(res => {
        setLoader(false);
        console.log(res, 'res in getUserProfile');
        setUserData(res?.user);
        setEventCount(res);
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err in getUserProfile');
      });
  };
  const onBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item, index}) => (
    <View>
      <View style={styles.listContainer}>
        <ImageBackground
          source={{uri: IMAGE_URL + item?.pictures[0]}}
          borderRadius={5}
          style={styles.backimg}>
          <View style={styles.flexinner}>
            </View>
            </ImageBackground>
      </View>
    </View>
  );
  const renderMusicType = ({item,index}) => (
    <View style={{paddingLeft:10,marginVertical:8}}>
      <TouchableOpacity style={styles.musicbtn}>
        <Text style={styles.discotext}>Disco/Funk/Soul </Text>
      </TouchableOpacity>
    </View>
  );
  const renderEventType = ({item,index}) => (
    <View style={{paddingLeft:10,marginVertical:8}}>
      <TouchableOpacity style={styles.eventbtn}>
        <Text style={styles.discotext}>Small events </Text>
      </TouchableOpacity>
    </View>
  );
  const renderLanguages = ({item,index}) => (
    <View style={{paddingLeft:10,marginVertical:8}}>
      <TouchableOpacity style={styles.eventbtn}>
        <Text style={styles.discotext}>English</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={{flex: 1}}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View style={{flexDirection:"row"}}>
      <VectorIcon
        groupName={'Ionicons'}
        name={'chevron-back'}
        size={25}
        onPress={onBack}
      />
      <Text style={styles.headerTxt}> Profile</Text>
      </View>
        <VectorIcon
          groupName="Entypo"
          name="dots-three-horizontal"
          size={30}
          color={Colors.white}
          onPress={() => setShowModal(true)}
          style={styles.threedots}
        />
    </View>
            
          <View style={styles.header}>
            <Text style={{...commonStyles.Heading20font, color: Colors.white}}>
              {userData?.full_name?.charAt(0).toUpperCase() +
                userData?.full_name?.slice(1)}
            </Text>
          </View>
          <Image source={ImagePath.ProfileImg} style={styles.profileImage} />
          <View style={styles.followInfoContainer}>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Events</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {eventCount?.event_count}
              </Text>
            </View>
            <TouchableOpacity style={styles.followInner} onPress={onContinue}>
              <Text style={styles.followText}>Followers</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {userData?.followers?.length}
              </Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.followInner} onPress={onContinue}>
              <Text style={styles.followText}>Following</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {userData?.following?.length ? userData?.following?.lengt : 0}
              </Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={15}/>
          <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:40}}>
            <TouchableOpacity style={styles.msgbtn}>
              <Text style={styles.msgtxt}>Message</Text>
            </TouchableOpacity>
            <Image source={ImagePath.VectorLike}/>
            <TouchableOpacity style={styles.msgbtn}>
              <Text style={styles.msgtxt}>Follow</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{userData?.bio}</Text>
          </View>
          <View style={styles.row}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="cupcake"
              size={20}
            />
            <Text style={styles.rowText}>{userData?.age}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: Colors.white,
              }}
            />
            <VectorIcon
              groupName="SimpleLineIcons"
              name="location-pin"
              size={20}
            />
            <Text style={styles.rowText}>
              {userData?.location ? userData?.location : 'Eiffel Tower'}
            </Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: Colors.white,
              }}
            />
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="zodiac-leo"
              size={20}
            />
            <Text style={styles.rowText}>{userData?.zodiac_sign}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: Colors.white,
              }}
            />
            <Image source={ImagePath.line_height} style={{tintColor:Colors.white}}/>
            <Text style={styles.rowText}>{userData?.height}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor:Colors.white,
              }}
            />
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="glass-cocktail"
              size={20}
            />
          </View>
          <View style={styles.postContainer}>
            {userData?.thumbnail_urls?.map((i, index) => (
              <FastImage
                source={{uri: IMAGE_URL + i}}
                key={index}
                style={styles.postImage}
              />
            ))}
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: width,
              alignSelf: 'center',
            }}
            data={eventCount?.past_events}
            numColumns={3}
            renderItem={renderItem}
          />
          <SizeBox size={20}/>
          <Text style={styles.bensbio}>Ben’s Bio</Text>
          <SizeBox size={20}/>
          <Text style={styles.bensbio}>Music Type</Text>
          <SizeBox size={5}/>
          <FlatList
          data={[{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},]}
          renderItem={renderMusicType}
          numColumns={2}
          style={{paddingHorizontal:10}}
          />
          <SizeBox size={10}/>
          <Text style={styles.bensbio}>Event Type</Text>
          <SizeBox size={5}/>
          <FlatList
          data={[{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},]}
          renderItem={renderEventType}
          numColumns={2}
          style={{paddingHorizontal:10}}
          />
          <SizeBox size={10}/>
          <Text style={styles.bensbio}>Languages</Text>
          <SizeBox size={5}/>
          <FlatList
          data={[{id:1},{id:1},{id:1}]}
          renderItem={renderLanguages}
          numColumns={3}
          style={{paddingHorizontal:10}}
          />
          <SizeBox size={10}/>
          <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:20}}>
            <Text style={styles.pastevents}>Past Events </Text>
            <TouchableOpacity style={styles.seeallbtn} activeOpacity={0.8}>
              <Text style={styles.seetxt}>See all</Text>
            </TouchableOpacity>
          </View>
          
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
                navigation.navigate(NavigationStrings.EditProfile);
                setShowModal(false);
              }}>
              <Text style={styles.optionText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSocialpart}
              activeOpacity={0.8}
              style={styles.option}>
              <Text style={styles.optionText}>Edit Social part</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.option, {borderBottomWidth: 0}]}>
              <Text style={styles.optionText}>Turn profile to public</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UserProfile;
