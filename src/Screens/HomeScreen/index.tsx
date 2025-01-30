import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import {useSelector} from 'react-redux';
import {saveHomeScreenData} from '../../Redux/Action/homScreenActions';
import {
  Drawer,
  ImageComponent,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  getHomedata,
  getUserProfile,
  likeEvents,
} from '../../Utilities/Constants/auth';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {formatTimeRange} from '../../Utilities/Helpers';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {
  height,
  moderateScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import styles from './style';

const HomeScreen = ({navigation}: any) => {
  const currentTime = moment();

  const [isModalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const swiper: any = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [modalVisible, SetModalVisible] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [memberData, SetMemberData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const [userData, setUserData] = useState<any>();

  const user = useSelector((data: any) => data?.auth?.userData?.user);
  const data = useSelector((data: any) => data?.homeScreen?.eventData); // Home Screen Data from Redux
  const isEventsFiltered = useSelector(
    (data: any) => data?.homeScreen?.isFlterApplied,
  );

  // console.log(user, 'user');
  // const userId = user?.id;
  // const socket = io('http://13.48.250.217:3003/', {
  //   withCredentials: true,
  //   transports: ['websocket'],
  // });
  // console.log(user, 'user');
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to socket server');
  //   });
  //   socket.emit('user-online', {userId});

  //   // Emit the offline status when the user disconnects
  //   return () => {
  //     socket.emit('user-offline', {
  //       userId,
  //       lastSeen: new Date().toISOString(),
  //     });
  //   };
  //   // Listen for successful connection
  // }, [user]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleStatus = (status: any) => {
    getdata(lat, lon, status);
    setSelectedOption(status);
    setModalVisible(!isModalVisible);
  };

  const weeks = useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');
    return [-1, 0, 1].map(adj => {
      return Array.from({length: 7}).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');
        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const showDrawer = () => {
    SetModalVisible(!modalVisible);
  };
  const onFilter = () => {
    navigation.navigate(NavigationStrings.EventFilter, {lat, lon});
  };
  const onNoti = () => {
    navigation.navigate(NavigationStrings.Notification);
  };
  const onEventDetails = (item: any) => {
    navigation.navigate(NavigationStrings.EventDetails, {eventId: item?.id});
  };
  const onMapPress = () => {
    navigation.navigate(NavigationStrings.MapScreen);
  };

  const onLikePress = (id: string) => {
    const data = {
      user_id: user?.id,
      event_id: id,
    };
    likeEvents(data)
      .then(res => {
        getdata2(lat, lon);
        console.log(res);
      })
      .catch(err => {
        showError(err?.msg);
        console.log(err);
      });
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        SetLoading(true);
        setLocation(position);
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        SetLoading(false);
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

  const getdata = (lat: any, long: any, status: any) => {
    SetLoading(true);
    getHomedata(lat, long, status ? status : selectedOption)
      .then((res: any) => {
        SetLoading(false);
        saveHomeScreenData(res.events);
        SetMemberData(res.events.members);
      })
      .catch(err => {
        SetLoading(false);
        showError(err.message);
        console.log(err);
      });
  };
  const getdata2 = (lat: any, long: any) => {
    SetLoading(false);
    getHomedata(lat, long, selectedOption)
      .then((res: any) => {
        SetLoading(false);
        saveHomeScreenData(res.events);
        SetMemberData(res.events.members);
      })
      .catch(err => {
        SetLoading(false);
        showError(err.message);
        console.log(err);
      });
  };

  const renderItem = ({item, index}: any) => {
    // Clean the start and end times to remove non-breaking spaces
    const cleanedStartTime = item.start_time.replace(/\u202f/g, ' ').trim();
    const cleanedEndTime = item.end_time.replace(/\u202f/g, ' ').trim();

    // Combine date and time for eventStartTime and eventEndTime
    const eventStartTime = moment(
      `${item.event_date} ${cleanedStartTime}`,
      'YYYY-MM-DD hh:mm:ss A',
    );
    const eventEndTime = moment(
      `${item.event_date} ${cleanedEndTime}`,
      'YYYY-MM-DD hh:mm:ss A',
    );

    // Determine event status
    const isOngoing = currentTime.isBetween(eventStartTime, eventEndTime); // Event is currently happening
    const isPastEvent = currentTime.isAfter(eventEndTime); // Event has ended
    const isUpcoming = currentTime.isBefore(eventStartTime); // Event hasn't started yet

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onEventDetails(item)}>
        <View>
          <View style={styles.listContainer}>
            <View style={styles.backContainer}>
              {/* <View /> */}
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                  marginLeft: moderateScale(80),
                }}>
                {item?.event_name}
              </Text>
              <View style={styles.flex}>
                <Text
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.white,
                  }}>
                  {item?.distance}
                  {` `}
                </Text>
                <VectorIcon groupName="Feather" name="map-pin" size={15} />
              </View>
            </View>
            <ImageBackground
              source={{uri: IMAGE_URL + item?.thumbnail_urls[0]}}
              style={styles.backimg}>
              <View style={styles.flexinner}>
                <ImageComponent
                  source={{uri: IMAGE_URL + item?.members[0]?.imageUrl}}
                  style={styles.shortimg}
                />
                {item?.members[1]?.imageUrl ? (
                  <ImageComponent
                    source={{uri: IMAGE_URL + item?.members[1]?.imageUrl}}
                    style={[
                      styles.extraimg,
                      {
                        marginLeft: 5,
                      },
                    ]}
                  />
                ) : null}
                {item?.members[2]?.imageUrl ? (
                  <ImageComponent
                    source={{uri: IMAGE_URL + item?.members[2]?.imageUrl}}
                    style={[
                      styles.extraimg,
                      {
                        right: 10,
                      },
                    ]}
                  />
                ) : null}
                {item?.members?.length > 3 ? (
                  <Text
                    style={{
                      ...commonStyles.font16Regular,
                      alignSelf: 'flex-end',
                      color: Colors.white,
                    }}>
                    +{item?.members?.length - 3}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.liktxtcon}
                onPress={() => onLikePress(item?.id)}>
                <Text style={styles.likestxt}>{item?.likes_count} Likes </Text>
                <Image source={ImagePath.likes} style={styles.likeimg} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <SizeBox size={14} />
          {/* {item?.event_date > moment(new Date()).format('YYYY-MM-DD') ? ( */}
          {isOngoing ? (
            <View style={{paddingHorizontal: 15}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ImageComponent
                    source={ImagePath.priceTag}
                    resizeMode="contain"
                    style={styles.tag}
                  />
                  <Text
                    style={{
                      ...commonStyles.font14,
                      fontFamily: fontFamily.time_bold,
                    }}>
                    {` `}
                    {item?.early_price} €
                  </Text>
                </View>
                <Text style={styles.ontxt}>
                  Ongoing{` `}
                  <Text
                    style={{
                      color: Colors.white,
                    }}>
                    - {moment(item?.duration, 'H:mm').format('HH[h]mm')}
                  </Text>
                </Text>
              </View>
              <View style={styles.backContainer}>
                <View style={styles.flex}>
                  <VectorIcon groupName="Feather" name="users" size={15} />
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.lightorange,
                    }}>
                    {` `}
                    {item?.spot} spots
                  </Text>
                </View>
                <Text
                  style={{
                    ...commonStyles.font14Center,
                    color: Colors.white,
                  }}>
                  Party - Afterparty
                </Text>
              </View>
            </View>
          ) : isPastEvent ? (
            <View style={{paddingHorizontal: 15, marginBottom: 10}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.lightPink,
                    }}>
                    Past Event{' '}
                    <Text
                      style={{
                        fontSize: 10,
                        color: Colors.white,
                      }}>
                      - AfterParty
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={{paddingHorizontal: 15}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ImageComponent
                    source={ImagePath.priceTag}
                    resizeMode="contain"
                    style={styles.tag}
                  />
                  <Text
                    style={{
                      ...commonStyles.font14,
                      fontFamily: fontFamily.time_bold,
                    }}>
                    {item?.early_price} €
                  </Text>
                </View>
                <Text style={styles.ontxt}>
                  <Text
                    style={{
                      color: Colors.white,
                    }}>
                    {formatTimeRange(
                      moment(item?.start_time, 'HH:mm:ss').format('hh:mm:ss A'),
                      moment(item?.end_time, 'HH:mm:ss').format('hh:mm:ss A'),
                    )}
                  </Text>
                </Text>
              </View>
              <View style={styles.backContainer}>
                <View style={styles.flex}>
                  <VectorIcon groupName="Feather" name="users" size={15} />
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.lightorange,
                    }}>
                    {` `}
                    {item?.spot} spots
                  </Text>
                </View>
                <Text
                  style={{
                    ...commonStyles.font14Center,
                    color: Colors.white,
                  }}>
                  Party - Afterparty
                </Text>
              </View>
            </View>
          )}
          <FlatList
            data={item.music_type}
            horizontal
            style={{paddingHorizontal: 15}}
            renderItem={({item}) => (
              <View style={styles.music}>
                <Text style={styles.musictxt}>{item}</Text>
              </View>
            )}
          />
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else if (Platform.OS === 'ios') {
        // Geolocation.requestAuthorization();
        getLocation();
      }
    };
    const _unsubscribe = navigation.addListener('focus', () => {
      requestLocationPermission();
    });
    return () => {
      _unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isEventsFiltered && lat && lon && selectedOption) {
      getdata(lat, lon, selectedOption);
    }
  }, [lat, lon, isEventsFiltered, selectedOption]);

  useEffect(() => {
    getUserProfile().then((res: any) => {
      setUserData(res?.user);
    });
  }, []);

  return (
    <View style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loading} />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={showDrawer}>
            {userData?.pictures?.length > 0 ? (
              <ImageComponent
                source={{uri: IMAGE_URL + userData?.pictures[0].url}}
                style={styles.profileimg}
              />
            ) : (
              <ImageComponent
                source={ImagePath.ProfileImg}
                style={styles.profileimg}
              />
            )}
          </TouchableOpacity>
          <ImageComponent
            source={ImagePath.AppLogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.rowvw}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="map-marker-radius-outline"
              size={25}
              onPress={onMapPress}
              style={{right: moderateScale(25)}}
            />
            <VectorIcon
              groupName="Fontisto"
              name="bell"
              onPress={onNoti}
              size={25}
              style={{right: moderateScale(12)}}
            />
            <TouchableOpacity onPress={onFilter}>
              <ImageComponent
                source={ImagePath.filterIcon}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks?.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates?.map((item, dateIndex) => {
                  const isActive =
                    value?.toDateString() === item?.date?.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => {
                        setValue(item?.date);
                      }}>
                      <LinearGradient
                        colors={[
                          isActive ? Colors.Pink : '#151d28',
                          isActive ? Colors.LinearBlack : Colors.calenderback,
                        ]}
                        style={styles.btn}>
                        <View>
                          <Text
                            style={[
                              styles.itemDate,
                              isActive && {color: Colors.white},
                            ]}>
                            {item?.date?.getDate()}
                          </Text>
                          <Text
                            style={[
                              styles.itemWeekday,
                              isActive && {color: Colors.white},
                            ]}>
                            {item?.weekday}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
        <View style={styles.datevw}>
          <Text style={styles.date}>
            {moment(value).format('DD MMMM YYYY')} ({data?.length})
          </Text>
          <TouchableOpacity
            style={[
              styles.allBtn,
              {
                borderWidth: 1,
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={toggleModal}>
            <Text style={{...commonStyles.font12Regular, color: Colors.white}}>
              {selectedOption}
            </Text>
          </TouchableOpacity>
        </View>
        {data?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: width,
              alignSelf: 'center',
              marginBottom:
                Platform.OS === 'android' ? height / 3.5 : height / 3.6,
            }}
            data={data}
            renderItem={renderItem}
            ListFooterComponent={() => <SizeBox size={10} />}
          />
        ) : (
          <Text style={[styles.date, {alignSelf: 'center', marginTop: 20}]}>
            No data found ...
          </Text>
        )}
        <Drawer
          username={user?.username}
          isVisible={modalVisible}
          onBackdropPress={showDrawer}
          onClose={showDrawer}
          profilePic={IMAGE_URL + userData?.pictures[0]?.url}
        />
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          onBackdropPress={toggleModal}
          avoidKeyboard={true}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          isVisible={isModalVisible}
          backdropOpacity={0.8}
          animationIn="slideInUp"
          animationOut="flipOutY">
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={styles.allBtn}
              onPress={() => toggleStatus('all')}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  alignSelf: 'center',
                }}>
                All
              </Text>
              <VectorIcon
                groupName="Fontisto"
                name={
                  selectedOption == 'all'
                    ? 'radio-btn-active'
                    : 'radio-btn-passive'
                }
                color={Colors.lightPink}
                size={15}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.allBtn}
              onPress={() => toggleStatus('Ongoing')}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  alignSelf: 'center',
                }}>
                Ongoing
              </Text>
              <VectorIcon
                groupName="Fontisto"
                name={
                  selectedOption == 'Ongoing'
                    ? 'radio-btn-active'
                    : 'radio-btn-passive'
                }
                color={Colors.lightPink}
                size={15}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.allBtn}
              onPress={() => toggleStatus('upcoming')}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  alignSelf: 'center',
                }}>
                Upcoming
              </Text>
              <VectorIcon
                groupName="Fontisto"
                name={
                  selectedOption == 'upcoming'
                    ? 'radio-btn-active'
                    : 'radio-btn-passive'
                }
                color={Colors.lightPink}
                size={15}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.allBtn]}
              onPress={() => toggleStatus('missed')}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  alignSelf: 'center',
                }}>
                Missed
              </Text>
              <VectorIcon
                groupName="Fontisto"
                name={
                  selectedOption == 'missed'
                    ? 'radio-btn-active'
                    : 'radio-btn-passive'
                }
                color={Colors.lightPink}
                size={15}
              />
            </TouchableOpacity>
            <SizeBox size={10} />
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
