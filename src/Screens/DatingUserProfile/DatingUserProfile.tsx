import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Loadingcomponent,
  showError,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  disLikeUser,
  getEventTypes,
  getMemberDetails,
  likeUser,
} from '../../Utilities/Constants/auth';
import Swiper from 'react-native-swiper';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import haversine from 'haversine-distance';
import moment from 'moment';

const DatingUserProfile = ({navigation, route}: any) => {
  const [musicStyle, setMusicStyle] = useState([]);
  const [interestType, setInterestType] = useState([]);
  const [pastEventData, setPastEventData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [loading, SetLoading] = useState(false);
  const user = useSelector((data: any) => data?.auth?.userData);

  useEffect(() => {
    setLoader(true);
    getEventsTypes();
    getLocation();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position, 'position');
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        SetLoading(true);
        getMemberData();
      },
      error => {
        SetLoading(false);
        console.log(error.code, error.message);
      },
      {
        timeout: 15000,
      },
    );
  };

  const getEventsTypes = () => {
    getEventTypes()
      .then((res: any) => {
        setMusicStyle(res?.musictype);
        setInterestType(res?.interesttype);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };

  const getMemberData = () => {
    const data = {
      id: route?.params?.id,
    };
    // console.log(route?.params?.id);
    getMemberDetails(data)
      .then((res: any) => {
        setUserData(res?.user);
        if (res?.user?.latitude && res?.user?.longitude) {
          handleCalculate(res?.user?.latitude, res?.user?.longitude);
        }
        console.log(res, 'res in getMemberDetails');
        setPastEventData(res?.past_events);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err in getMemberDetails');
      });
  };
  type Coordinates = {
    latitude: number;
    longitude: number;
  };

  // Function to calculate distance in kilometers
  const calculateDistance = (start: Coordinates, end: Coordinates) => {
    const distanceInMeters = haversine(
      {lat: start.latitude, lon: start.longitude},
      {lat: end.latitude, lon: end.longitude},
    );

    const distanceInKm = distanceInMeters / 1000; // Convert meters to kilometers
    setDistanceKm(distanceInKm);
  };

  const handleCalculate = (lati: number, longi: number) => {
    const start: Coordinates = {
      latitude: lati, // San Francisco
      longitude: longi,
    };

    const end: Coordinates = {
      latitude: lat, // Los Angeles
      longitude: lon,
    };

    calculateDistance(start, end);
  };
  const onEventDetails = (item: any) => {
    navigation.navigate(NavigationStrings.EventDetails, {eventId: item?._id});
  };

  const renderItem = ({item}: any) => (
    console.log(JSON.stringify(item), 'item'),
    (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{alignSelf: 'center', marginTop: 20}}
        onPress={() => {
          onEventDetails(item);
        }}>
        <ImageBackground
          source={
            item?.pictures?.length > 0
              ? {uri: IMAGE_URL + item?.pictures[0]}
              : ImagePath.ProfileImg
          }
          borderRadius={4}
          style={styles.bottomListImg}>
          <VectorIcon
            groupName="Feather"
            name="play-circle"
            size={80}
            color={Colors.white}
          />
          <Image
            source={
              item?.members?.length > 0
                ? {uri: IMAGE_URL + item?.members[0]?.picture[0]?.url}
                : ImagePath.ProfileImg
            }
            style={styles.bottomListMediumImg}
          />
          <Image
            source={
              item?.members?.length > 0
                ? {uri: IMAGE_URL + item?.members[1]?.picture[0]?.url}
                : ImagePath.ProfileImg
            }
            style={styles.bottomListSmallImg}
          />
          <Text style={styles.countText}>
            {item?.members?.length - 2 > 0
              ? '+' + item?.members?.length - 2
              : ''}
          </Text>
        </ImageBackground>
        <SizeBox size={2} />
        <View
          style={{
            width: '75%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <VectorIcon
              groupName="Entypo"
              name="calendar"
              color={Colors.white}
              size={14}
            />
            <Text style={styles.dateText}>
              {moment(item?.date).subtract(10, 'days').calendar()}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <VectorIcon
              groupName="EvilIcons"
              name="location"
              color={Colors.white}
              size={18}
            />
            <Text style={styles.dateText}>
              {item?.state} {item?.zipcode}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  );

  const likeUserProfileHanlder = (type: string) => {
    const data = {
      userId: user?.user?.id,
      likedUserId: userData?.id,
      type: type,
    };
    // console.log(type, 'type');
    likeUser(data)
      .then(res => {
        console.log(res, 'res in likeUserProfileHanlder');
        getMemberData();
      })
      .catch(err => {
        console.log(err, 'err in likeUserProfileHanlder');
        setLoader(false);
      });
  };

  const disLikeUserProfileHanlder = () => {
    const data = {
      userId: user?.user?.id,
      likedUserId: userData?.id,
      // type: type,
    };
    // console.log(type, 'type');
    disLikeUser(data)
      .then(res => {
        console.log(res, 'res in disLikeUser');
        getMemberData();
      })
      .catch(err => {
        console.log(err, 'err in disLikeUser');
        setLoader(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundNew,
        // paddingHorizontal: moderateScale(22),
      }}>
      <Loadingcomponent isVisible={loader} />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Loadingcomponent isVisible={false} />
          <SizeBox size={10} />
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <Image source={ImagePath.Arrow_Left_2} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{userData?.full_name}</Text>
            <SizeBox size={5} />
          </View>
          <SizeBox size={10} />
          <Text style={[styles.label, {}]}>Pictures & Videos</Text>
          <SizeBox size={10} />
          {userData?.pictures && (
            <Swiper
              // showsButtons={false}
              loop={true}
              autoplay
              // autoplayDirection={true}
              autoplayTimeout={2000}
              // scrollEnabled={false}
              showsPagination={false}
              height={height / 3}
              width={width}
              style={{
                borderRadius: 10,
              }}
              containerStyle={{borderRadius: 10}}
              contentContainerStyle={{borderRadius: 10}}
              // index={activeIndex}
              onIndexChanged={index => {
                setActiveIndex(index);
              }}>
              {userData?.pictures?.map((i, ind) => (
                <ImageBackground
                  borderRadius={10}
                  source={{uri: IMAGE_URL + i?.url}}
                  // source={ImagePath.ProfileImg}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: Colors.Pink,
                    borderRadius: 10,
                    // marginBottom: 20,
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      flexDirection: 'row',
                      marginTop: moderateScaleVertical(20),
                    }}>
                    {userData?.pictures?.map((i, ind) => (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{paddingVertical: 5}}>
                        <View
                          style={{
                            ...styles.bar,
                            backgroundColor:
                              activeIndex === ind ? Colors.Pink : Colors.white,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </ImageBackground>
              ))}
            </Swiper>
          )}
          <SizeBox size={15} />
          <Text style={styles.label}>About {userData?.username}</Text>
          <SizeBox size={6} />
          <Text style={styles.description}>{userData?.bio}</Text>
          <SizeBox size={5} />
          {/* <View style={styles.loactionContainer}>
            <VectorIcon
              groupName="Ionicons"
              name="location-outline"
              size={18}
              color={Colors.white}
            />
            <Text style={{...commonStyles.font14Bold, marginLeft: 10}}>
              {} km away
            </Text>
          </View> */}
          <SizeBox size={10} />
          <Text style={styles.label}>Music Type</Text>
          <SizeBox size={10} />
          <FlatList
            data={userData?.music_type_names}
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(20),
            }}
            renderItem={({item}) => {
              if (!item) {
                return null;
              }
              return (
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: Colors.white,
                    padding: 5,
                    backgroundColor: Colors.lightPink,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <SizeBox size={10} />
          <Text style={styles.label}>Interests</Text>
          <SizeBox size={10} />
          <FlatList
            data={userData?.interests_names}
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(20),
            }}
            renderItem={({item}) => {
              if (!item) {
                return null;
              }
              return (
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: Colors.white,
                    padding: 5,
                    backgroundColor: Colors.lightPink,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <SizeBox size={10} />
          <Text style={styles.label}>Languages</Text>
          <SizeBox size={10} />
          <FlatList
            data={userData?.language}
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(20),
            }}
            renderItem={({item}) => {
              if (!item) {
                return null;
              }
              return (
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: Colors.white,
                    padding: 5,
                    backgroundColor: Colors.lightPink,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <SizeBox size={10} />
          <View
            style={[
              styles.invw,
              {
                justifyContent: 'space-between',
                paddingHorizontal: moderateScale(20),
              },
            ]}>
            <Text style={[styles.label, {marginLeft: 0}]}>Past Events </Text>
            <Text style={[styles.label, {textDecorationLine: 'underline'}]}>
              See all
            </Text>
          </View>
          <SizeBox size={10} />
          <FlatList
            data={pastEventData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          <SizeBox size={45} />
        </ScrollView>
        <View
          style={[
            styles.invw,
            {
              alignSelf: 'center',
              position: 'absolute',
              bottom: moderateScaleVertical(30),
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NavigationStrings.Messages);
            }}
            activeOpacity={0.8}
            style={styles.bottomBtn}>
            <Image source={ImagePath.sent} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBtn}
            onPress={() => disLikeUserProfileHanlder()}>
            <VectorIcon
              groupName="Entypo"
              name="cross"
              color={Colors.red}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBtn}
            onPress={() => likeUserProfileHanlder('superlike')}>
            <VectorIcon
              groupName={
                !userData?.isSuperliked
                  ? 'SimpleLineIcons'
                  : 'MaterialCommunityIcons'
              }
              name={'fire'}
              color={Colors.lightPink}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBtn}
            onPress={() => likeUserProfileHanlder('like')}>
            <VectorIcon
              groupName="Feather"
              name={!userData?.isLiked ? 'heart-o' : 'heart'}
              color={Colors.green}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.goBack();
            }}
            style={[styles.bottomBtn, {backgroundColor: '#FF813A'}]}>
            <Image
              source={ImagePath.link_backward}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DatingUserProfile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(22),
  },
  headerInnerBox: {
    width: '50%',
    paddingVertical: moderateScaleVertical(6),
    borderWidth: 1,
    borderColor: Colors.lightPink,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    ...commonStyles.font16White,
  },
  label: {
    ...commonStyles.font16White,
    marginLeft: moderateScale(20),
  },
  description: {
    ...commonStyles.font14Regular,
    marginHorizontal: moderateScale(20),
  },
  topImages: {
    width: moderateScale(70),
    height: moderateScaleVertical(90),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    marginRight: moderateScale(15),
  },
  nameTopImg: {
    ...commonStyles.font12Bold,
  },
  midImage: {
    width: width,
    height: height / 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  loactionContainer: {
    paddingLeft: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBtn: {
    height: moderateScaleVertical(40),
    width: moderateScale(40),
    borderRadius: 40,
    backgroundColor: '#252131',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  invw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomListImg: {
    width: width / 1.1,
    height: moderateScaleVertical(203),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomListMediumImg: {
    width: moderateScale(50),
    height: moderateScaleVertical(67),
    borderWidth: 1,
    borderColor: Colors.Pink,
    borderRadius: 5,
    position: 'absolute',
    left: 12,
    bottom: 9,
  },
  bottomListSmallImg: {
    width: moderateScale(30),
    height: moderateScaleVertical(35),
    borderWidth: 1,
    borderColor: Colors.Pink,
    borderRadius: 5,
    position: 'absolute',
    left: moderateScale(70),
    bottom: 9,
  },
  countText: {
    ...commonStyles.font14Bold,
    position: 'absolute',
    bottom: moderateScaleVertical(15),
    left: moderateScale(110),
  },
  dateText: {
    ...commonStyles.font14,
    marginLeft: moderateScale(7),
  },
  bar: {
    width: 59,
    height: 1,
    marginRight: 10,
  },
});
