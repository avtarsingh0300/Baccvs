import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  TextInput,
  SectionList,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {CommonBtn, SizeBox, showError} from '../../Utilities/Component/Helpers';
import {ImageBackground} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import styles from './style';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import MapView, {Marker} from 'react-native-maps';
import {getEventTypes} from '../../Utilities/Constants/auth';
import {languages} from '../../Utilities/Constants';
import fontFamily from '../../Utilities/Styles/fontFamily';
import Modal from 'react-native-modal';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import {Switch} from 'react-native-paper';
import {stringList} from 'aws-sdk/clients/datapipeline';

Geocoder.init('AIzaSyA-WTLYCwUjh4ffr-NkzBJnVHv6NEaHYSc');

export type TicketPrice = {
  title: string;
  price: number;
  quantity: number;
  type: 'free' | 'early' | 'regular' | 'late';
};

const AddScreen = ({navigation}: any) => {
  const swiper: any = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [musicStyle, setMusicStyle] = useState([]);
  const [eventType, setEventType] = useState<any>([]);
  const [venueType, setVenueType] = useState<any>([]);
  const [modalVisibleLang, SetModalVisibleLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState<any>([]);
  const [selectedMusic, setSelectedMusic] = useState<any>([]);
  const [selectedEventType, setselectedEventType] = useState<any>([]);
  const [selectedVenue, setSelectedVenue] = useState<any>([]);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [userLocation, setUserLocation] = useState<any>(null);
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [eventname, setEventname] = useState('');
  const [phone, setPhone] = useState('');
  const [numpeople, setNumPeople] = useState('');
  const [bio, setBio] = useState('');
  const [charges, setCharges] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [callingCode, setCallingCode] = useState('1');
  const [isCountryCodeVisible, setIsCountryCodeVisible] = useState(false);

  const [isFree, setIsFree] = useState(false);
  const onToggleIsFree = () => setIsFree(!isFree);

  const [ticketPricing, setTicketPricing] = useState<TicketPrice[]>([
    {
      title: 'Free Tickets',
      price: 0,
      quantity: 0,
      type: 'free',
    },
    {
      title: 'Early Tickets',
      price: 0,
      quantity: 0,
      type: 'early',
    },
    {
      title: 'Regular Tickets',
      price: 0,
      quantity: 0,
      type: 'regular',
    },
    {
      title: 'Late Tickets',
      price: 0,
      quantity: 0,
      type: 'late',
    },
  ]);

  const handlePriceChange = (index: number, value: string) => {
    const updatedTicketPricing = [...ticketPricing];
    updatedTicketPricing[index].price = parseFloat(value) || 0; // Parse as number
    setTicketPricing(updatedTicketPricing);
  };

  const handleQuantityChange = (index: number, value: string) => {
    const updatedTicketPricing = [...ticketPricing];
    updatedTicketPricing[index].quantity = parseInt(value, 10) || 0; // Parse as integer
    setTicketPricing(updatedTicketPricing);
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

  const onCreate = () => {
    if (!eventname) {
      return showError('Enter event name ');
    }
    if (!value) {
      return showError('Select event date');
    }
    if (phone.length < 10) {
      return showError('Invalid phonenumber !');
    }
    if (!numpeople) {
      return showError('Add a people capacity');
    }
    if (selectedLang.length === 0) {
      return showError('Select languages !');
    }
    if (selectedMusic.length === 0) {
      return showError('Select music type');
    }
    if (selectedEventType.length === 0) {
      return showError('Select Event type');
    }
    if (selectedVenue.length === 0) {
      return showError('Select venue type');
    }
    if (!bio) {
      return showError('Add party description');
    }
    if (!address) {
      return showError('Select address of event');
    }
    if (!startTime) {
      return showError('Select start time');
    }
    if (!endTime) {
      return showError('Select end time');
    }

    const data = {
      eventname,
      phone,
      numpeople,
      bio,
      charges,
      address,
      pin,
      startTime,
      endTime,
      selectedLang,
      selectedMusic,
      selectedEventType,
      selectedVenue,
      value,
      tickets: ticketPricing,
    };
    navigation.navigate(NavigationStrings.CreateSuccess, {data: data});
  };

  const getEventsTypes = () => {
    getEventTypes()
      .then((res: any) => {
        setMusicStyle(res?.musictype);
        setEventType(res?.eventtype);
        setVenueType(res?.venuetype);
        // console.log(res, 'ressss');
      })
      .catch(err => {
        showError(err?.message), console.log(err);
      });
  };

  const selectModalHandler = (item: any) => {
    if (modalVisibleLang) {
      const filterData = selectedLang?.filter((i: any) => i == item?.name);
      if (filterData?.length > 0) {
        const filterData2 = selectedLang?.filter((i: any) => i != item?.name);
        setSelectedLang(filterData2);
      } else {
        setSelectedLang([...selectedLang, item?.name]);
      }
    } else {
    }
  };

  const selectMusicType = (item: any) => {
    setSelectedMusic((prevSelectedItems: any[]): any => {
      if (prevSelectedItems.includes(item?._id)) {
        return prevSelectedItems.filter((id: any) => id !== item?._id);
      }

      return [...prevSelectedItems, item._id];
    });
  };

  const handleSelectItem = (item: any) => {
    setselectedEventType((prevSelectedItems: any[]): any => {
      if (prevSelectedItems.includes(item?._id)) {
        return prevSelectedItems.filter((id: any) => id !== item?._id);
      } else if (prevSelectedItems.length < 3) {
        return [...prevSelectedItems, item._id];
      }
      return prevSelectedItems;
    });
  };

  const handleVenueItem = (item: any) => {
    setSelectedVenue((prevSelectedItems: any[]): any => {
      if (prevSelectedItems.includes(item?._id)) {
        return prevSelectedItems.filter((id: any) => id !== item?._id);
      } else if (prevSelectedItems.length < 2) {
        return [...prevSelectedItems, item._id];
      }
      return prevSelectedItems;
    });
  };

  const showDatePicker = () => {
    setShowStartPicker(true);
  };
  const showDatePicker2 = () => {
    setShowEndPicker(true);
  };

  const hideDatePicker = () => {
    setShowStartPicker(false);
    setShowEndPicker(false);
  };

  const handleConfirm = (date: any) => {
    const currentDate = date || new Date();
    setStartTime(currentDate.toLocaleTimeString());
    hideDatePicker();
  };

  const onEndChange = (date: any) => {
    const currentDate = date || new Date();
    setEndTime(currentDate.toLocaleTimeString());
    hideDatePicker();
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation(position?.coords);
        // console.log(position, 'hghg');
      },
      error => {
        console.log(error.code, error.message, 'jiwhd');
      },
      {
        // enableHighAccuracy: true,
        timeout: 15000,
        // maximumAge: 10000
      },
    );
  };

  const handleMapPress = (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setPin({latitude, longitude});
    getAddressFromCoords(latitude, longitude);
  };

  const getAddressFromCoords = (latitude: any, longitude: any) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  const onSelectCountryCode = (country: any) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const renderTicketItem = ({
    item,
    index,
  }: {
    item: TicketPrice;
    index: number;
  }) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: Colors.white,
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 10,
            textAlign: 'center',
            minWidth: 120,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: Colors.white,
            marginHorizontal: 15,
          }}>
          :
        </Text>
        <TextInput
          style={{
            color: Colors.white,
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 10,
            width: 80,
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
          placeholderTextColor={Colors.white}
          placeholder="price"
          value={item.price === 0 ? '' : item.price.toString()} // If price is 0, show empty
          onChangeText={text => handlePriceChange(index, text)} // Handle price change
          keyboardType="numeric" // Numeric input
        />
        <Text
          style={{
            color: Colors.white,
            marginHorizontal: 5,
          }}>
          x
        </Text>
        <TextInput
          style={{
            color: Colors.white,
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 10,
            width: 80,
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
          placeholderTextColor={Colors.white}
          placeholder="quantity"
          value={item.quantity === 0 ? '' : item.quantity.toString()} // If quantity is 0, show empty
          onChangeText={text => handleQuantityChange(index, text)} // Handle quantity change
          keyboardType="numeric" // Numeric input
        />
      </View>
    );
  };

  const calculateTotalPrice = () => {
    // Sum up the total price for all tickets
    return ticketPricing.reduce((total, ticket) => {
      return total + ticket.price * ticket.quantity; // price * quantity for each ticket
    }, 0);
  };

  useEffect(() => {
    getLocation();
    getEventsTypes();
  }, []);

  return (
    <LinearGradient
      colors={[
        Colors.backgroundNew,
        Colors.backgroundNew,
        Colors.backgroundNew,
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...commonStyles.Heading20font}}>Create Event</Text>
          <SizeBox size={20} />
          <ImageBackground
            source={ImagePath.eventback}
            resizeMode="contain"
            style={styles.backimg}>
            <TextInput
              placeholderTextColor={Colors.greyTxt}
              style={{
                ...commonStyles.font12Regualar2,
                color: Colors.lightPink,
                paddingHorizontal: 10,
                width: '50%',
                textAlign: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              value={eventname}
              onChangeText={text => setEventname(text)}
              placeholder="Enter event Name"
            />
          </ImageBackground>
          <SizeBox size={10} />
          <TouchableOpacity activeOpacity={0.7} style={styles.locbtn}>
            <TextInput
              value={address}
              onChangeText={text => setAddress(text)}
              placeholder=" Enter or Drag the marker on the map "
              placeholderTextColor={Colors.greyTxt}
              style={{...commonStyles.font12Regualar2, color: Colors.white}}
            />
            {/* <Text
              style={{...commonStyles.font12Regualar2, color: Colors.white}}>
              {address ? address : 'Drag the marker on the map'}
            </Text> */}
          </TouchableOpacity>
          <SizeBox size={5} />
          <View
            style={{
              height: moderateScaleVertical(200),
            }}>
            <MapView
              style={styles.map}
              onPress={handleMapPress}
              region={{
                latitude: userLocation ? userLocation?.latitude : 37.78825,
                longitude: userLocation ? userLocation?.longitude : -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              {userLocation && (
                <Marker coordinate={pin} title={'My Marker'} description={''} />
              )}
            </MapView>
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
              {weeks.map((dates, index) => (
                <View style={styles.itemRow} key={index}>
                  {dates.map((item, dateIndex) => {
                    const isActive =
                      value.toDateString() === item.date.toDateString();
                    return (
                      <TouchableWithoutFeedback
                        key={dateIndex}
                        onPress={() => {
                          setValue(item.date);
                        }}>
                        <LinearGradient
                          colors={[
                            isActive ? Colors.lightPink : Colors.calenderback,
                            isActive ? Colors.Linear : Colors.calenderback,
                          ]}
                          style={styles.btn}>
                          <View>
                            <Text
                              style={[
                                styles.itemDate,
                                isActive && {color: Colors.white},
                              ]}>
                              {item.date.getDate()}
                            </Text>
                            <Text
                              style={[
                                styles.itemWeekday,
                                isActive && {color: Colors.white},
                              ]}>
                              {item.weekday}
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
          <View style={[styles.startbtn, {marginLeft: 15, width: '90%'}]}>
            <Text
              style={{
                ...commonStyles.font12Regualar2,
                color: Colors.lightPink,
              }}>
              {moment(value).format('DD MMMM YYYY')}
            </Text>
          </View>
          <SizeBox size={10} />
          <View style={styles.timecon}>
            <TouchableOpacity onPress={showDatePicker} style={styles.startbtn}>
              <Text
                style={{
                  ...commonStyles.font12Regualar2,
                  color: Colors.lightPink,
                }}>
                Start
              </Text>
            </TouchableOpacity>
            <Text
              style={{...commonStyles.font12Regualar2, color: Colors.white}}>
              {startTime ? startTime : '0:0:0'}
            </Text>
            <Text
              style={{
                ...commonStyles.font12Regualar2,
                color: Colors.lightPink,
              }}>
              -
            </Text>
            <Text
              style={{...commonStyles.font12Regualar2, color: Colors.white}}>
              {endTime ? endTime : '0:0:0'}
            </Text>
            <TouchableOpacity style={styles.startbtn} onPress={showDatePicker2}>
              <Text
                style={{
                  ...commonStyles.font12Regualar2,
                  color: Colors.lightPink,
                }}>
                End
              </Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={20} />
          <View style={{paddingHorizontal: moderateScale(20)}}>
            <View style={[styles.cardBtn]}>
              <VectorIcon
                groupName="SimpleLineIcons"
                name="screen-smartphone"
                size={20}
                color={Colors.lightPink}
              />
              <TouchableOpacity
                onPress={() => setIsCountryCodeVisible(!isCountryCodeVisible)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <Text style={{color: Colors.white}}>+{callingCode}</Text>
              </TouchableOpacity>
              <TextInput
                keyboardType="phone-pad"
                style={{
                  ...commonStyles.font12Regualar2,
                  color: Colors.white,
                }}
                value={phone}
                onChangeText={text => setPhone(text)}
                placeholder="Mobile number"
                placeholderTextColor="white"
              />
            </View>
            <SizeBox size={10} />
            <View style={[styles.cardBtn]}>
              <VectorIcon
                groupName="Feather"
                name="users"
                size={20}
                color={Colors.lightPink}
              />
              <TextInput
                keyboardType="number-pad"
                maxLength={5}
                style={{
                  ...commonStyles.font12Regualar2,
                  color: Colors.white,
                  paddingHorizontal: 10,
                }}
                value={numpeople}
                onChangeText={text => setNumPeople(text)}
                placeholder="People Capacity"
                placeholderTextColor="white"
              />
            </View>
            <SizeBox size={10} />
            {/* <View style={[styles.cardBtn]}>
              <Image
                resizeMode="contain"
                source={ImagePath.priceTag}
                style={{
                  tintColor: Colors.lightPink,
                  width: moderateScale(22),
                  height: moderateScaleVertical(22),
                }}
              />
              <TextInput
                keyboardType="number-pad"
                maxLength={5}
                style={{
                  ...commonStyles.font12Regualar2,
                  color: Colors.white,
                  paddingHorizontal: 10,
                }}
                value={charges}
                onChangeText={text => setCharges(text)}
                placeholder="Free / Chargeable"
              />
            </View> */}
            {/* <SizeBox size={10} /> */}
            <TouchableOpacity
              style={[styles.cardBtn, {gap: 5}]}
              activeOpacity={0.5}
              onPress={() => SetModalVisibleLang(true)}>
              <Image
                resizeMode="contain"
                source={ImagePath.lang}
                style={{
                  tintColor: Colors.lightPink,
                  width: moderateScale(22),
                  height: moderateScaleVertical(22),
                }}
              />
              {selectedLang.length ? null : (
                <Text
                  style={{
                    ...commonStyles.font12Regualar2,
                    color: Colors.white,
                  }}>
                  Languages
                </Text>
              )}
              {selectedLang?.map(
                (
                  item:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined,
                ) => (
                  <ScrollView horizontal>
                    <TouchableOpacity
                      style={styles.langItem}
                      activeOpacity={0.8}
                      onPress={() => {
                        const filterData2 = selectedLang?.filter(
                          (i: any) => i != item,
                        );
                        setSelectedLang(filterData2);
                      }}>
                      <Text style={styles.langItemText}>{item} &#x2715;</Text>
                    </TouchableOpacity>
                  </ScrollView>
                ),
              )}
            </TouchableOpacity>
            <SizeBox size={10} />

            <View style={{gap: 10, marginVertical: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 30,
                }}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  Ticket pricing
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Switch
                    value={isFree}
                    onValueChange={onToggleIsFree}
                    style={{
                      transform: [{scaleX: 0.7}, {scaleY: 0.7}],
                    }}
                    trackColor={{
                      false: '#c6c6c6',
                      true: 'white',
                    }}
                    ios_backgroundColor={'transparent'}
                  />
                  <Text
                    style={{
                      ...commonStyles.font13,
                      color: Colors.white,
                    }}>
                    Free
                  </Text>
                </View>
              </View>
              <FlatList
                data={ticketPricing}
                renderItem={renderTicketItem}
                keyExtractor={item => item.title}
                contentContainerStyle={{gap: 5}}
              />
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                }}>
                Total : {calculateTotalPrice()}€
              </Text>
            </View>
            <Text
              style={{
                ...commonStyles.font13,
                color: Colors.lightPink,
              }}>
              Music type
            </Text>
            <SizeBox size={5} />
            <FlatList
              data={musicStyle}
              renderItem={({item}) => {
                if (!item || !item._id) {
                  return null;
                }
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      borderWidth: selectedMusic.includes(item._id) ? 0 : 1,
                      borderColor: Colors.white,
                      padding: 5,
                      backgroundColor: selectedMusic.includes(item._id)
                        ? Colors.lightPink
                        : Colors.tranparent,
                      borderRadius: 8,
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}
                    onPress={() => selectMusicType(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: selectedMusic.includes(item._id)
                          ? Colors.black
                          : Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              numColumns={3}
              keyExtractor={(item: any) => item._id.toString()}
            />
            <SizeBox size={10} />
            <Text
              style={{
                ...commonStyles.font16Regular,
                color: Colors.lightPink,
              }}>
              Event type
              <Text
                style={{
                  fontSize: textScale(8),
                  color: Colors.lightPink,
                }}>
                {` `}(Up to 3)
              </Text>
            </Text>
            <SizeBox size={5} />
            <FlatList
              data={eventType}
              renderItem={({item}) => {
                if (!item || !item._id) {
                  return null;
                }
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      borderWidth: selectedEventType.includes(item._id) ? 0 : 1,
                      borderColor: Colors.white,
                      padding: 5,
                      backgroundColor: selectedEventType.includes(item._id)
                        ? Colors.lightPink
                        : Colors.tranparent,
                      borderRadius: 8,
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}
                    onPress={() => handleSelectItem(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: selectedEventType.includes(item._id)
                          ? Colors.black
                          : Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              numColumns={3}
              keyExtractor={item => item._id.toString()}
            />
            <SizeBox size={10} />
            <Text
              style={{
                ...commonStyles.font16Regular,
                color: Colors.lightPink,
              }}>
              Venue type
              <Text
                style={{
                  fontSize: textScale(8),
                  color: Colors.lightPink,
                }}>
                {` `}(Up to 2)
              </Text>
            </Text>
            <SizeBox size={5} />
            <FlatList
              data={venueType}
              renderItem={({item}) => {
                if (!item || !item._id) {
                  return null;
                }
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      borderWidth: selectedVenue.includes(item._id) ? 0 : 1,
                      borderColor: Colors.white,
                      padding: 5,
                      backgroundColor: selectedVenue.includes(item._id)
                        ? Colors.lightPink
                        : Colors.tranparent,
                      borderRadius: 8,
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}
                    onPress={() => handleVenueItem(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: selectedVenue.includes(item._id)
                          ? Colors.black
                          : Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              numColumns={3}
              keyExtractor={item => item._id.toString()}
            />

            <SizeBox size={10} />
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.white,
                alignSelf: 'center',
              }}>
              Party Description
            </Text>
            <SizeBox size={10} />
            <LinearGradient
              colors={[Colors.Linear, Colors.lightPink]}
              style={{
                minHeight: moderateScaleVertical(150),
                borderRadius: 10,
                padding: 10,
              }}>
              <TextInput
                placeholder="This party about...."
                placeholderTextColor={Colors.white}
                multiline={true}
                value={bio}
                onChangeText={text => setBio(text)}
                style={{...commonStyles.font12Regular, color: Colors.white}}
              />
            </LinearGradient>
            <SizeBox size={15} />
            <CommonBtn title="Create Event" onPress={onCreate} />
            <SizeBox size={15} />
          </View>
        </KeyboardAwareScrollView>
        <Modal
          isVisible={modalVisibleLang}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
            paddingBottom: 0,
          }}
          onBackdropPress={() => {
            SetModalVisibleLang(false);
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
              maxHeight: height / 1.8,
              width: '95%',
              alignSelf: 'center',
              paddingBottom: 50,
            }}>
            <View style={styles.modalContainer}>
              <Text
                style={{
                  ...commonStyles.font16WhiteBold,
                  fontSize: textScale(20),
                  alignSelf: 'center',
                }}>
                Select Languages
              </Text>
              <SectionList
                sections={languages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  const filterData = selectedLang?.filter(
                    (i: any) => i == item?.name,
                  );

                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        selectModalHandler(item);
                      }}
                      style={[
                        {
                          width: '85%',
                          alignSelf: 'center',
                          // borderBottomWidth: lengthFlag - 1 == index ? 0 : 1,
                        },
                        styles.mondaInvw,
                      ]}>
                      <Text
                        style={{
                          ...commonStyles.font10Regular,
                          color: Colors.white,
                          padding: 5,
                          fontWeight: '600',
                          fontFamily: fontFamily.time_regular,
                        }}>
                        {item?.name}
                      </Text>
                      <View
                        style={{
                          width: 14,
                          height: 14,
                          backgroundColor: Colors.white,
                          borderRadius: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {filterData[0] == item?.name && (
                          <VectorIcon
                            groupName="FontAwesome"
                            name={'check'}
                            size={10}
                            color={Colors.black}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
                renderSectionHeader={({section: {title}}) => {
                  const filterData = languages
                    .filter(i => i.title === title) // Get only the category with the given title
                    .flatMap(i => i.data.map(item => item.name)); // Extract and flatten the names
                  // console.log(title, 'title');
                  var allSelected = filterData.every(item =>
                    selectedLang.includes(item),
                  );
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {}}
                      style={[
                        {
                          // borderBottomWidth: lengthFlag - 1 == index ? 0 : 1,
                        },
                        styles.mondaInvw,
                      ]}>
                      <Text
                        style={{
                          ...commonStyles.font16White,
                          padding: 5,
                          fontWeight: '600',
                          fontFamily: fontFamily.time_regular,
                        }}>
                        {title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>

        <DateTimePickerModal
          isVisible={showStartPicker}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={new Date()}
        />

        <DateTimePickerModal
          isVisible={showEndPicker}
          mode="time"
          onConfirm={onEndChange}
          onCancel={hideDatePicker}
          date={new Date()}
        />

        <CountryPicker
          visible={isCountryCodeVisible}
          withCallingCode
          withFlagButton={false}
          onSelect={onSelectCountryCode}
          countryCode={countryCode}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddScreen;
