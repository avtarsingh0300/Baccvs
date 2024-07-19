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
  Alert,
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
import {
  CommonBtn,
  ImageComponent,
  SizeBox,
  dummydata,
  showError,
} from '../../Utilities/Component/Helpers';
import {ImageBackground} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import styles from './style';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import MapView, {Marker} from 'react-native-maps';
import {getEventTypes} from '../../Utilities/Constants/auth';
import languages from '../../Utilities/Constants';
import fontFamily from '../../Utilities/Styles/fontFamily';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
const AddScreen = ({navigation}: any) => {
  const swiper: any = useRef();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [musicStyle, setMusicStyle] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [venueType, setVenueType] = useState([]);
  const [modalVisibleLang, SetModalVisibleLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedMusicID, setSelectedMusicID] = useState([]);
  const [selectedEventType, setselectedEventType] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
    Alert.alert('Event create  !!');
  };

  const handleMapPress = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    console.log(latitude, 'latitude');
    console.log(longitude, 'longitude');
    setPin({latitude, longitude});
  };

  useEffect(() => {
    getEventsTypes();
  }, []);

  const getEventsTypes = () => {
    getEventTypes()
      .then(res => {
        setMusicStyle(res?.musictype);
        setEventType(res?.eventtype);
        setVenueType(res?.venuetype);
        console.log(res, 'ressss');
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
    // console.log(item._id);
    if (modalVisible) {
      const filterData = selectedMusic?.filter((i: any) => i == item?.name);
      if (filterData?.length > 0) {
        const filterData2 = selectedMusic?.filter((i: any) => i != item?.name);
        setSelectedMusic(filterData2);
        const filterData3 = selectedMusic?.filter((i: any) => i != item?._id);
        setSelectedMusicID(filterData3);
      } else {
        setSelectedMusic([...selectedMusic, item?.name]);
        setSelectedMusicID(...selectedMusicID, item?._id);
      }
    } else {
      // setSelectedGender(item);
      // setModalVisible(false);
      // setModalLanguageVisible(false);
    }
  };
  const handleSelectItem = (item: any) => {
    setselectedEventType((prevSelectedItems): any => {
      if (prevSelectedItems.includes(item?._id)) {
        return prevSelectedItems.filter(id => id !== item?._id);
      } else if (prevSelectedItems.length < 3) {
        return [...prevSelectedItems, item._id];
      }
      return prevSelectedItems;
    });
  };
  const handleVenueItem = (item: any) => {
    setSelectedVenue((prevSelectedItems): any => {
      if (prevSelectedItems.includes(item?._id)) {
        return prevSelectedItems.filter(id => id !== item?._id);
      } else if (prevSelectedItems.length < 2) {
        return [...prevSelectedItems, item._id];
      }
      return prevSelectedItems;
    });
  };
  const addImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setSelectedImages(prevImages => [
        ...prevImages,
        {id: prevImages.length, uri: image.path},
      ]);
    });
  };
  const removeImg = id => {
    setSelectedImages(prevImages =>
      prevImages.filter(image => image.id !== id),
    );
  };
  const addVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      setSelectedVideos(prevVideos => [
        ...prevVideos,
        {id: prevVideos.length, uri: video.path},
      ]);
    });
  };

  const removeVideo = id => {
    setSelectedVideos(prevVideos =>
      prevVideos.filter(video => video.id !== id),
    );
  };
  return (
    <LinearGradient
      colors={[Colors.Linear, Colors.LinearBlack]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{...commonStyles.Heading20font}}>Create Event</Text>
          <SizeBox size={20} />
          <ImageBackground
            source={ImagePath.eventback}
            resizeMode="contain"
            style={styles.backimg}>
            <TextInput
              style={{
                ...commonStyles.font12Regualar2,
                color: Colors.green,
                paddingHorizontal: 10,
                width: '50%',
                textAlign: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              placeholder="Event Name"
            />
            {/* <Text
              style={{...commonStyles.font12Regualar2, color: Colors.green}}>
              Event Name
            </Text> */}
          </ImageBackground>
          <SizeBox size={10} />
          <TouchableOpacity activeOpacity={0.7} style={styles.locbtn}>
            <Text
              style={{...commonStyles.font12Regualar2, color: Colors.white}}>
              Add event location
            </Text>
          </TouchableOpacity>
          <SizeBox size={5} />
          <View
            style={{
              height: moderateScaleVertical(200),
            }}>
            <MapView
              style={styles.map}
              // customMapStyle={mapStyle}
              onPress={handleMapPress}
              initialRegion={initialRegion}>
              <Marker
                coordinate={pin}
                title={'My Marker'}
                description={'Some description'}
              />
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
                            isActive ? Colors.green : Colors.calenderback,
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
          <TouchableOpacity
            style={[styles.startbtn, {marginLeft: 15, width: '90%'}]}>
            <Text style={{...commonStyles.font12Regualar2, color: Colors.Pink}}>
              {moment(value).format('DD MMMM YYYY')}
            </Text>
          </TouchableOpacity>

          <SizeBox size={10} />
          <View style={styles.timecon}>
            <TouchableOpacity style={styles.startbtn}>
              <Text
                style={{...commonStyles.font12Regualar2, color: Colors.Pink}}>
                Start
              </Text>
            </TouchableOpacity>
            <Text
              style={{...commonStyles.font12Regualar2, color: Colors.white}}>
              Time
            </Text>
            <TouchableOpacity style={styles.startbtn}>
              <Text
                style={{...commonStyles.font12Regualar2, color: Colors.Pink}}>
                End
              </Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={20} />
          <View style={{paddingHorizontal: moderateScale(20)}}>
            <View style={[styles.cardBtn, {padding: 0, paddingHorizontal: 10}]}>
              <VectorIcon
                groupName="SimpleLineIcons"
                name="screen-smartphone"
                size={20}
                color={Colors.Pink}
              />
              <TextInput
                keyboardType="phone-pad"
                style={{
                  ...commonStyles.font12Regualar2,
                  color: Colors.white,
                  paddingHorizontal: 10,
                }}
                placeholder="+33 (___) ___ _____"
              />
            </View>
            <SizeBox size={10} />
            <View style={[styles.cardBtn, {padding: 0, paddingHorizontal: 10}]}>
              <VectorIcon
                groupName="Feather"
                name="users"
                size={20}
                color={Colors.Pink}
              />
              <TextInput
                keyboardType="number-pad"
                maxLength={5}
                style={{
                  ...commonStyles.font12Regualar2,
                  color: Colors.white,
                  paddingHorizontal: 10,
                }}
                placeholder="Number of people allowed"
              />
            </View>

            <SizeBox size={10} />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setModalVisible(true)}
              style={styles.cardBtn}>
              <VectorIcon
                groupName="Feather"
                name="speaker"
                size={25}
                color={Colors.Pink}
              />
              {selectedMusic.length ? null : (
                <Text
                  style={{
                    ...commonStyles.font12Regualar2,
                    color: Colors.white,
                  }}>
                  {`  `}Music Style
                </Text>
              )}
              {selectedMusic?.map(item => (
                <ScrollView horizontal>
                  <TouchableOpacity
                    style={styles.langItem}
                    activeOpacity={0.8}
                    onPress={() => {
                      const filterData2 = selectedMusic?.filter(
                        (i: any) => i != item,
                      );
                      setSelectedMusic(filterData2);
                    }}>
                    <Text style={styles.langItemText}>{item} &#x2715;</Text>
                  </TouchableOpacity>
                </ScrollView>
              ))}
            </TouchableOpacity>
            <SizeBox size={10} />
            <View style={[styles.cardBtn, {padding: 0, paddingHorizontal: 10}]}>
              <Image
                resizeMode="contain"
                source={ImagePath.priceTag}
                style={{
                  tintColor: Colors.Pink,
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
                placeholder="Free / Chargeable"
              />
            </View>

            <SizeBox size={10} />
            <TouchableOpacity
              style={styles.cardBtn}
              activeOpacity={0.5}
              onPress={() => SetModalVisibleLang(true)}>
              <ImageComponent
                resizeMode="contain"
                source={ImagePath.lang}
                style={{
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
                  {`  `}Languages
                </Text>
              )}
              {selectedLang?.map(item => (
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
              ))}
            </TouchableOpacity>
            <SizeBox size={10} />
            <View style={styles.timecon}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    ...commonStyles.font12Regualar2,
                    color: Colors.green,
                  }}>
                  Private
                </Text>
                <VectorIcon
                  groupName="AntDesign"
                  name="questioncircleo"
                  color={Colors.Pink}
                  size={15}
                  style={{marginLeft: moderateScale(10)}}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    ...commonStyles.font12Regualar2,
                    color: Colors.white,
                  }}>
                  Public
                </Text>
                <VectorIcon
                  groupName="AntDesign"
                  name="questioncircleo"
                  color={Colors.Pink}
                  size={15}
                  style={{marginLeft: moderateScale(10)}}
                />
              </View>
            </View>
            <SizeBox size={10} />

            <View style={styles.flatbox}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                }}>
                Event type
                <Text
                  style={{
                    fontSize: textScale(8),
                    color: Colors.white,
                  }}>
                  {` `}(Up to 3)
                </Text>
              </Text>
              <FlatList
                data={eventType}
                renderItem={({item}) => {
                  if (!item || !item._id) {
                    return null;
                  }
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.flatcon}
                      onPress={() => handleSelectItem(item)}>
                      <Text
                        style={{
                          ...commonStyles.font12Regular,
                          color: Colors.white,
                        }}>
                        {item?.name}
                      </Text>
                      <View style={styles.tickvw}>
                        {selectedEventType.includes(item._id) && (
                          <VectorIcon
                            groupName="MaterialCommunityIcons"
                            name="check-outline"
                            color={Colors.Pink}
                            size={15}
                            style={{bottom: 5, alignSlef: 'centre'}}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item._id.toString()}
              />
            </View>
            <SizeBox size={10} />
            <View style={styles.flatbox}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                }}>
                Venue type
                <Text
                  style={{
                    fontSize: textScale(8),
                    color: Colors.white,
                  }}>
                  {` `}(Up to 2)
                </Text>
              </Text>
              <FlatList
                data={venueType}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.flatcon}
                    onPress={() => handleVenueItem(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                    <View style={styles.tickvw}>
                      {selectedVenue.includes(item._id) && (
                        <VectorIcon
                          groupName="MaterialCommunityIcons"
                          name="check-outline"
                          color={Colors.Pink}
                          size={15}
                          style={{bottom: 5, alignSlef: 'centre'}}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item._id.toString()}
              />
            </View>
            <SizeBox size={10} />
            <TouchableOpacity onPress={() => addVideo()} style={styles.flatbox}>
              <VectorIcon
                groupName="SimpleLineIcons"
                name="camera"
                size={20}
                style={{alignSelf: 'center'}}
              />
              <View style={styles.camerarow}>
                <Text
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.white,
                  }}>
                  Add videos
                </Text>

                <VectorIcon
                  groupName="AntDesign"
                  name="questioncircleo"
                  color={Colors.Pink}
                  size={15}
                  style={{left: moderateScale(20)}}
                />
              </View>
              {selectedVideos.length ? (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  data={selectedVideos}
                  renderItem={({item}) => (
                    <View
                      style={[
                        styles.imageContainer,
                        {backgroundColor: Colors.black},
                      ]}>
                      <VectorIcon
                        groupName="AntDesign"
                        name="playcircleo"
                        size={15}
                        color={Colors.white}
                      />
                      {/* <Image
                        source={{uri: item.uri}}
                        style={{width: '100%', height: '100%'}}
                      /> */}
                      <TouchableOpacity
                        onPress={() => removeVideo(item.id)}
                        style={{position: 'absolute', top: -2, right: -1}}>
                        <VectorIcon
                          groupName="AntDesign"
                          name="closecircle"
                          size={15}
                          color={Colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item.id.toString()}
                />
              ) : null}
            </TouchableOpacity>
            <SizeBox size={10} />
            <TouchableOpacity onPress={() => addImg()} style={styles.flatbox}>
              <VectorIcon
                groupName="Fontisto"
                name="picture"
                size={15}
                style={{alignSelf: 'center'}}
              />
              <View style={styles.camerarow}>
                <Text
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.white,
                  }}>
                  Select a thumbnail
                </Text>

                <VectorIcon
                  groupName="AntDesign"
                  name="questioncircleo"
                  color={Colors.Pink}
                  size={15}
                  style={{left: moderateScale(20)}}
                />
              </View>
              {selectedImages.length ? (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  data={selectedImages}
                  renderItem={({item}) => (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{uri: item.uri}}
                        style={{width: '100%', height: '100%'}}
                      />
                      <TouchableOpacity
                        onPress={() => removeImg(item.id)}
                        style={{position: 'absolute', top: -2, right: -1}}>
                        <VectorIcon
                          groupName="AntDesign"
                          name="closecircle"
                          size={15}
                          color={Colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item.id.toString()}
                />
              ) : null}
            </TouchableOpacity>
            {/* <View style={styles.flatbox}>
              <VectorIcon
                groupName="Fontisto"
                name="picture"
                size={15}
                style={{alignSelf: 'center'}}
              />
              <View style={styles.camerarow}>
                <Text
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.white,
                  }}>
                  Select a thumbnail
                </Text>
                <VectorIcon
                  groupName="AntDesign"
                  name="questioncircleo"
                  color={Colors.Pink}
                  size={15}
                  style={{left: moderateScale(20)}}
                />
              </View>
            </View> */}
            <SizeBox size={10} />
            <View style={styles.flatbox}>
              <VectorIcon
                groupName="AntDesign"
                name="addusergroup"
                size={25}
                style={{alignSelf: 'center'}}
              />
              <View style={styles.camerarow}>
                <Text
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.white,
                  }}>
                  Add members
                </Text>
                <VectorIcon
                  groupName="AntDesign"
                  name="questioncircleo"
                  color={Colors.Pink}
                  size={15}
                  style={{left: moderateScale(20)}}
                />
              </View>
            </View>
            <SizeBox size={10} />
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.white,
                alignSelf: 'center',
              }}>
              Description
            </Text>
            <SizeBox size={10} />
            <LinearGradient
              colors={[Colors.Linear, Colors.green]}
              style={{
                minHeight: moderateScaleVertical(150),
                borderRadius: 10,
                padding: 10,
              }}>
              <TextInput
                placeholder="This party about...."
                placeholderTextColor={Colors.white}
                multiline={true}
                style={{...commonStyles.font12Regular, color: Colors.white}}
              />
            </LinearGradient>
            <SizeBox size={15} />
            <CommonBtn title="Create Event" onPress={onCreate} />
            <SizeBox size={15} />
          </View>
        </ScrollView>
        <Modal
          isVisible={modalVisible || modalVisibleLang}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          onBackdropPress={() => {
            SetModalVisibleLang(false);
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
            <View style={styles.modalContainer}>
              <FlatList
                data={modalVisible ? musicStyle : languages}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({item, index}) => {
                  const lengthFlag = modalVisible
                    ? musicStyle?.length
                    : languages?.length;

                  const filterData = selectedLang?.filter(
                    (i: any) => i == item?.name,
                  );
                  const filterData2 = selectedMusic?.filter(
                    (i: any) => i == item?.name,
                  );
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        if (modalVisible) {
                          selectMusicType(item);
                        } else {
                          selectModalHandler(item);
                        }
                      }}
                      style={[
                        {
                          borderBottomWidth: lengthFlag - 1 == index ? 0 : 1,
                        },
                        styles.mondaInvw,
                      ]}>
                      <Text
                        style={{
                          color: Colors.white,
                          padding: 5,
                          fontWeight: '600',
                          fontFamily: fontFamily.time_regular,
                        }}>
                        {item?.name}
                      </Text>
                      <VectorIcon
                        groupName="MaterialCommunityIcons"
                        name={
                          modalVisible
                            ? filterData2[0] === item?.name
                              ? 'radiobox-marked'
                              : 'radiobox-blank'
                            : filterData[0] == item?.name
                            ? 'radiobox-marked'
                            : 'radiobox-blank'
                        }
                        size={18}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddScreen;
