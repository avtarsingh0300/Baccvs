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
import {CommonBtn, SizeBox, showError} from '../../Utilities/Component/Helpers';
import {ImageBackground} from 'react-native';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  getEventTypes,
  getFollowerList,
  getGroupPeople,
} from '../../Utilities/Constants/auth';
import fontFamily from '../../Utilities/Styles/fontFamily';
import Modal from 'react-native-modal';
import Geolocation from '@react-native-community/geolocation';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';

const CreateGroup = ({navigation}: any) => {
  const swiper: any = useRef();

  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [musicStyle, setMusicStyle] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [venueType, setVenueType] = useState([]);
  const [modalVisibleLang, SetModalVisibleLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedEventType, setselectedEventType] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [search, setSearch] = useState('');
  const [selectMembers, setSelectMembers] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [members, setMembers] = useState([]);
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [eventname, setEventname] = useState('');
  const [phone, setPhone] = useState('');
  const [numpeople, setNumPeople] = useState('');

  const [bio, setBio] = useState('');
  const [charges, setCharges] = useState('');

  const onCreate = () => {
    // if (!eventname) {
    //   return showError('Enter group name ');
    // }
    // if (!value) {
    //   return showError('Select event date');
    // }
    // if (phone.length < 10) {
    //   return showError('Invalid phonenumber !');
    // }
    // if (!numpeople) {
    //   return showError('Add a people capacity');
    // }
    // if (selectedLang.length === 0) {
    //   return showError('Select languages !');
    // }
    // if (selectedMusic.length === 0) {
    //   return showError('Select music type');
    // }
    // if (selectedEventType.length === 0) {
    //   return showError('Select Event type');
    // }
    // if (selectedVenue.length === 0) {
    //   return showError('Select venue type');
    // }
    // if (!bio) {
    //   return showError('Add party description');
    // }
    // if (!address) {
    //   return showError('Select address of event');
    // }
    // if (!startTime) {
    //   return showError('Select start time');
    // }
    // if (!endTime) {
    //   return showError('Select end time');
    // }

    // const data = {
    //   eventname,
    //   phone,
    //   numpeople,
    //   bio,
    //   charges,
    //   address,
    //   pin,
    //   startTime,
    //   endTime,
    //   selectedLang,
    //   selectedMusic,
    //   selectedEventType,
    //   selectedVenue,
    //   value,
    // };
    // console.log(data);
    navigation.goBack();
  };

  useEffect(() => {
    getLocation();
    getEventsTypes();
    getFollower();
  }, []);

  const getEventsTypes = () => {
    getEventTypes()
      .then(res => {
        setMusicStyle(res?.musictype);
        setEventType(res?.eventtype);
        setVenueType(res?.venuetype);
        // console.log(res, 'ressss');
      })
      .catch(err => {
        showError(err?.message), console.log(err);
      });
  };

  const getFollower = () => {
    getFollowerList()
      .then(res => {
        setMembers(res?.followers);
        //  console.log(res);
      })
      .catch(err => {
        showError(err?.message), console.log(err);
      });
  };

  const selectModalHandler = (item: any) => {
    // setSelectMembers([]);
    if (modalVisible) {
      //   console.log(item, 'item');
      const filterData = selectMembers?.filter(
        (i: any) => i?.username == item?.username,
      );
      if (filterData?.length > 0) {
        const filterData2 = selectMembers?.filter(
          (i: any) => i?.username != item?.username,
        );
        setSelectMembers(filterData2);
      } else {
        setSelectMembers([...selectMembers, item]);
      }
    } else {
    }
  };

  const selectMusicType = (item: any) => {
    setSelectedMusic((prevSelectedItems): any => {
      if (prevSelectedItems.includes(item?._id)) {
        return prevSelectedItems.filter(id => id !== item?._id);
      }

      return [...prevSelectedItems, item._id];
    });
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

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation(position?.coords);
        console.log(position, 'hghg');
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

  const addImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'any',
    }).then(image => {
      //   console.log(image, 'image');
      setSelectedImages(prevImages => [
        ...prevImages,
        {id: prevImages.length, ...image},
      ]);
    });
  };

  const removeImg = id => {
    setSelectedImages(prevImages =>
      prevImages.filter(image => image?.id !== id),
    );
  };

  return (
    <LinearGradient
      colors={[Colors.Linear, Colors.LinearBlack, Colors.LinearBlack]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <SizeBox size={10} />
          <View
            style={{
              paddingHorizontal: moderateScale(22),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '15%'}} />
            <Text style={{...commonStyles.Heading20font}}>New group</Text>
            <VectorIcon
              groupName="Entypo"
              name="menu"
              size={32}
              color={Colors.white}
            />
          </View>
          <SizeBox size={10} />
          <ImageBackground
            source={ImagePath.newGroupBack}
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
              placeholder="Group name"
            />
          </ImageBackground>
          <SizeBox size={15} />
          <View style={{paddingHorizontal: moderateScale(20)}}>
            <View style={styles.camerarow}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                  marginLeft: 10,
                }}>
                Add Members (3 max.)
              </Text>
            </View>
            <SizeBox size={5} />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[styles.imageContainer2, {height: height / 7}]}>
                <ImageBackground
                  source={ImagePath.backGroundGroup}
                  style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  borderRadius={15}>
                  <View style={styles.innerCon}>
                    <VectorIcon
                      groupName="Feather"
                      name="plus-square"
                      size={40}
                      color="#B69CFF"
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              {selectMembers?.map(item => (
                <View
                  style={[
                    styles.imageContainer2,
                    {height: height / 7, width: '25%', borderWidth: 0},
                  ]}>
                  <Image
                    source={{uri: item?.image}}
                    style={{width: '100%', height: '100%', borderRadius: 5}}
                  />

                  <VectorIcon
                    groupName="Entypo"
                    name="cross"
                    color={Colors.red}
                    size={26}
                    onPress={() => {
                      const filterData2 = selectMembers?.filter(
                        (i: any) => i != item,
                      );
                      setSelectMembers(filterData2);
                    }}
                    style={{bottom: -15, position: 'absolute'}}
                  />
                </View>
              ))}
            </View>
            <SizeBox size={15} />
            <View style={styles.camerarow}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                  marginLeft: 10,
                }}>
                Videos & Pictures (6 max.)
              </Text>
            </View>
            <SizeBox size={5} />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => addImg()}
                style={[styles.imageContainer2, {height: height / 7}]}>
                <LinearGradient
                  colors={[Colors.lightPink, '#21005D']}
                  style={{
                    borderRadius: 10,
                    padding: 10,
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={styles.innerCon}>
                    <VectorIcon
                      groupName="Feather"
                      name="plus-square"
                      size={40}
                      color="#CD3AFF"
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.flatbox}>
                {selectedImages?.length ? (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={selectedImages}
                    renderItem={({item}) => (
                      <>
                        {item?.mime === 'image/png' ? (
                          <View
                            style={[
                              styles.imageContainer2,
                              {
                                height: height / 7,
                                width: moderateScale(80),
                                borderWidth: 0,
                              },
                            ]}>
                            <Image
                              source={{uri: item?.path}}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 5,
                              }}
                            />

                            <VectorIcon
                              groupName="Entypo"
                              name="cross"
                              color={Colors.red}
                              size={26}
                              onPress={() => removeImg(item.id)}
                              style={{bottom: -15, position: 'absolute'}}
                            />
                          </View>
                        ) : (
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

                            <VectorIcon
                              groupName="Entypo"
                              name="cross"
                              color={Colors.red}
                              size={26}
                              onPress={() => removeImg(item.id)}
                              style={{bottom: -8, position: 'absolute'}}
                            />
                          </View>
                        )}
                      </>
                    )}
                  />
                ) : null}
              </View>
              {/* {selectedImages?.map(item => (
                <>
                  {item?.mime === 'image/png' ? (
                    <View
                      style={[
                        styles.imageContainer2,
                        {height: height / 7, width: '25%', borderWidth: 0},
                      ]}>
                      <Image
                        source={{uri: item?.path}}
                        style={{width: '100%', height: '100%', borderRadius: 5}}
                      />

                      <VectorIcon
                        groupName="Entypo"
                        name="cross"
                        color={Colors.red}
                        size={26}
                        onPress={() => removeImg(item.id)}
                        style={{bottom: -15, position: 'absolute'}}
                      />
                    </View>
                  ) : (
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

                      <VectorIcon
                        groupName="Entypo"
                        name="cross"
                        color={Colors.red}
                        size={26}
                        onPress={() => removeImg(item.id)}
                        style={{bottom: -8, position: 'absolute'}}
                      />
                    </View>
                  )}
                </>
              ))} */}
            </View>
            <SizeBox size={15} />
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.white,
              }}>
              Group Bio
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
                placeholder=""
                placeholderTextColor={Colors.white}
                multiline={true}
                value={bio}
                onChangeText={text => setBio(text)}
                style={{...commonStyles.font12Regular, color: Colors.white}}
              />
            </LinearGradient>
            <SizeBox size={15} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.lightPink,
                }}>
                Music type
              </Text>
              <View
                style={{
                  width: moderateScale(230),
                  height: moderateScaleVertical(23),
                  backgroundColor: Colors.white,
                  borderRadius: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={Colors.black}
                  value={search}
                  onChangeText={text => setSearch(text)}
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.black,
                    width: '90%',
                  }}
                />
                <Image source={ImagePath.SearchNewGroup} />
              </View>
            </View>
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
              keyExtractor={item => item._id.toString()}
            />
            <SizeBox size={10} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.lightPink,
                }}>
                Interests
              </Text>
              <View
                style={{
                  width: moderateScale(230),
                  height: moderateScaleVertical(23),
                  backgroundColor: Colors.white,
                  borderRadius: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={Colors.black}
                  value={search}
                  onChangeText={text => setSearch(text)}
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.black,
                    width: '90%',
                  }}
                />
                <Image source={ImagePath.SearchNewGroup} />
              </View>
            </View>
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.lightPink,
                }}>
                Languages
              </Text>
              <View
                style={{
                  width: moderateScale(230),
                  height: moderateScaleVertical(23),
                  backgroundColor: Colors.white,
                  borderRadius: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={Colors.black}
                  value={search}
                  onChangeText={text => setSearch(text)}
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.black,
                    width: '90%',
                  }}
                />
                <Image source={ImagePath.SearchNewGroup} />
              </View>
            </View>
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
            <CommonBtn title="Create Group" onPress={onCreate} />
            <SizeBox size={15} />
          </View>
        </KeyboardAwareScrollView>
        <Modal
          isVisible={modalVisible}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          onBackdropPress={() => {
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
                data={members}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({item, index}) => {
                  const lengthFlag = members?.length;

                  const filterData = selectMembers?.filter(
                    (i: any) => i?.username == item?.username,
                  );

                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        selectModalHandler(item);
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
                        {item?.username}
                      </Text>
                      <VectorIcon
                        groupName="MaterialCommunityIcons"
                        name={
                          filterData[0]?.username == item?.username
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

export default CreateGroup;
