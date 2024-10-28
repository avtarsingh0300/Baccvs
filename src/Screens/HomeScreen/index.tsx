import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Platform,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  Drawer,
  ImageComponent,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  height,
  moderateScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import fontFamily from '../../Utilities/Styles/fontFamily';
import commonStyles from '../../Utilities/Styles/commonStyles';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import Geolocation from '@react-native-community/geolocation';
import {getHomedata, likeEvents} from '../../Utilities/Constants/auth';
import Modal from 'react-native-modal';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {useSelector} from 'react-redux';
const HomeScreen = ({navigation}: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const swiper: any = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [modalVisible, SetModalVisible] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [eventData, SetEventData] = useState([]);
  const [memberData, SetMemberData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const user = useSelector((data: any) => data?.auth?.userData?.user);

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
    navigation.navigate(NavigationStrings.EventFilter);
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
    console.log(data);
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

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        SetLoading(true);
        setLocation(position);
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setTimeout(() => {
          getdata(
            position.coords.latitude,
            position.coords.longitude,
            'selectedOption',
          );
        }, 500);
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
        SetEventData(res.events);

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
        SetEventData(res.events);
        SetMemberData(res.events.members);
      })
      .catch(err => {
        SetLoading(false);
        showError(err.message);
        console.log(err);
      });
  };

  const renderItem = ({item}: any) => (
    // console.log(item, 'item'),
    <TouchableOpacity activeOpacity={0.8} onPress={() => onEventDetails(item)}>
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
        {item?.event_date > moment(new Date()).format('YYYY-MM-DD') ? (
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
                  - {item?.duration}
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
        ) : (
          <View style={{paddingHorizontal: moderateScale(15)}}>
            <SizeBox size={5} />
            <Text
              style={{
                ...commonStyles.font16WhiteBold,
                color: Colors.lightPink,
              }}>
              Past event
              <Text style={{...commonStyles.font16White}}> - Afterparty</Text>
            </Text>
            <SizeBox size={5} />
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

  return (
    <View style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loading} />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={showDrawer}>
            <ImageComponent
              source={ImagePath.ProfileImg}
              style={styles.profileimg}
            />
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
            {moment(value).format('DD MMMM YYYY')} ({eventData?.length})
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
        {eventData?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: width,
              alignSelf: 'center',
              marginBottom:
                Platform.OS === 'android' ? height / 3.5 : height / 3.6,
            }}
            data={eventData}
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
