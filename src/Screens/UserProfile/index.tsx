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
import {moderateScaleVertical} from '../../Utilities/Styles/responsiveSize';
import {styles} from './style';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import FastImage from 'react-native-fast-image';
import {Loadingcomponent, SizeBox} from '../../Utilities/Component/Helpers';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {getUserProfile} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const UserProfile = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({});
  const [eventCount, setEventCount] = useState([]);
  const onEdit = () => {
    navigation.navigate(NavigationStrings.EditProfile);
  };
  const onContinue = () => {
    navigation.navigate(NavigationStrings.FollowingScreen);
  };
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
          <View style={styles.flexinner}></View>
        </ImageBackground>
      </View>
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
          <SizeBox size={5} />
          <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
              <VectorIcon
                groupName={'Ionicons'}
                name={'chevron-back'}
                size={25}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.liketxt}>Profile</Text>
            </View>
            <VectorIcon
              groupName="Entypo"
              name="dots-three-horizontal"
              size={30}
              color={Colors.white}
              onPress={onEdit}
            />
          </View>
          <Text
            style={{
              ...commonStyles.font16Regular,
              color: Colors.white,
              textAlign: 'left',
              paddingLeft: 30,
              textTransform: 'capitalize',
            }}>
            {userData?.full_name}
          </Text>
          {userData?.pictures?.length > 0 ? (
            <Image
              source={{uri: IMAGE_URL + userData?.pictures[0]}}
              style={styles.profileImage}
            />
          ) : (
            <Image source={ImagePath.ProfileImg} style={styles.profileImage} />
          )}
          <View style={styles.followInfoContainer}>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Events</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {eventCount?.event_count}
              </Text>
            </View>
            <TouchableOpacity onPress={onContinue} style={styles.followInner}>
              <Text style={styles.followText}>Followers</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {userData?.followers_count}
              </Text>
            </TouchableOpacity>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Following</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {userData?.following_count}
              </Text>
            </View>
          </View>
          <ScrollView horizontal style={{}}>
            <View style={styles.row}>
              <VectorIcon
                groupName="MaterialCommunityIcons"
                name="cupcake"
                size={20}
                color={Colors.lightGrey}
              />
              <View style={{width: '5%'}} />
              <Text style={styles.rowText}>{userData?.age}</Text>
              <View style={{width: '5%'}} />
              <View
                style={{
                  height: moderateScaleVertical(25),
                  paddingHorizontal: 0.5,
                  backgroundColor: Colors.lightGrey,
                }}
              />
              <Image
                source={ImagePath.line_height}
                tintColor={Colors.lightGrey}
              />
              <Text style={styles.rowText}>{userData?.height}</Text>
              {/* <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: Colors.lightGrey,
              }}
            />
            <VectorIcon
              groupName="SimpleLineIcons"
              name="location-pin"
              size={20}
              color={Colors.lightGrey}
            />
            <Text style={styles.rowText}>
              {userData?.location ? userData?.location : 'Eiffel Tower'}
            </Text> */}
              <View
                style={{
                  height: moderateScaleVertical(25),
                  paddingHorizontal: 0.5,
                  backgroundColor: Colors.lightGrey,
                }}
              />
              <VectorIcon
                groupName="MaterialCommunityIcons"
                name="zodiac-leo"
                size={20}
                color={Colors.lightGrey}
              />
              <Text style={styles.rowText}>{userData?.zodiac_sign}</Text>
              <View
                style={{
                  height: moderateScaleVertical(25),
                  paddingHorizontal: 0.5,
                  backgroundColor: Colors.lightGrey,
                }}
              />
              <VectorIcon
                groupName="MaterialCommunityIcons"
                name="glass-cocktail"
                size={20}
                color={Colors.lightGrey}
              />
            </View>
          </ScrollView>
          <View style={styles.postContainer}>
            {userData?.pictures?.map((i, index) => (
              <FastImage
                source={{uri: IMAGE_URL + i}}
                key={index}
                style={styles.postImage}
              />
            ))}
          </View>

          {userData?.bio ? (
            <>
              <SizeBox size={10} />
              <Text style={[styles.title, {textTransform: 'capitalize'}]}>
                {userData?.full_name}'s Bio
              </Text>
              <Text style={styles.bioText}>{userData?.bio}</Text>
              <SizeBox size={8} />
            </>
          ) : null}

          <SizeBox size={5} />
          {userData?.music_type?.length > 0 ? (
            <>
              <Text style={styles.title}>Music Type</Text>
              <View style={styles.typeContainer}>
                {userData?.music_type?.map((i, index) => (
                  <View style={styles.type}>
                    <Text style={styles.typeText}>{i}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}

          {userData?.event_type?.length > 0 ? (
            <>
              <Text style={styles.title}>Event Type</Text>
              <View style={styles.typeContainer}>
                {userData?.event_type?.map((i, index) => (
                  <View style={styles.type}>
                    <Text style={styles.typeText}>{i}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}
          {userData?.language?.length > 0 ? (
            <>
              <Text style={styles.title}>Languages</Text>
              <View style={styles.typeContainer}>
                {userData?.language?.map((i, index) => (
                  <View style={styles.type}>
                    <Text style={styles.typeText}>{i}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}

          <SizeBox size={10} />
          {eventCount?.past_events ? (
            <>
              <Text style={styles.title}>Past events</Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                }}
                data={eventCount?.past_events}
                renderItem={renderItem}
              />
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UserProfile;
