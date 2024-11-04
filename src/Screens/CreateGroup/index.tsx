import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  height,
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  CommonInput,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  createMeetGroup,
  getEventTypes,
  getFollowerList,
} from '../../Utilities/Constants/auth';
import fontFamily from '../../Utilities/Styles/fontFamily';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import {languages} from '../../Utilities/Constants';
import uuid from 'react-native-uuid';

const CreateGroup = ({navigation}: any) => {
  const [musicStyle, setMusicStyle] = useState([]);
  const [interestType, setInterestType] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedInterestType, setselectedInterestType] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [searchMusic, setSearchMusic] = useState('');
  const [searchInterest, setSearchInterest] = useState('');
  const [searchLang, setSearchLang] = useState('');
  const [selectMembers, setSelectMembers] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [members, setMembers] = useState([]);
  const [eventname, setEventname] = useState('');
  const [bio, setBio] = useState('');

  const onCreate = () => {
    if (!eventname) {
      return showError('Enter group name ');
    }
    if (!members) {
      return showError('Add a members');
    }
    if (selectedLanguage.length === 0) {
      return showError('Select languages !');
    }
    if (selectedMusic.length === 0) {
      return showError('Select music type');
    }
    if (selectedInterestType.length === 0) {
      return showError('Select Event type');
    }
    if (!bio) {
      return showError('Add party description');
    }
    if (!bio) {
      return showError('Add images and video');
    }

    var membersFilter = selectMembers?.map(i => {
      return i?.id;
    });
    var interestFilter = selectedInterestType?.map(i => {
      return i?.id;
    });

    const data = new FormData();
    data.append('name', eventname);
    data.append('description', bio);
    data.append('music_type', selectedMusic);
    data.append('interest', interestFilter);
    data.append('language', selectedLanguage);
    data.append('members', membersFilter);
    selectedImages.forEach((image, index) => {
      data.append('image', {
        uri: image.path,
        name:
          image?.mime === 'image/png' || image?.mime === 'image/jpeg'
            ? `image_${image.id}.jpg`
            : `video${image.id}.mp4`,
        type: image?.mime,
      });
    });
    setLoader(true);
    console.log(JSON.stringify(data), 'data');
    createMeetGroup(data)
      .then(res => {
        console.log(res, 'ress in createMeetGroup');
        setLoader(false);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err, 'err in createMeetGroup');
        setLoader(false);
      });
  };

  useEffect(() => {
    setLoader(true);
    getEventsTypes();
    getFollower();
  }, []);

  const getEventsTypes = () => {
    getEventTypes()
      .then((res: any) => {
        setMusicStyle(res?.musictype);
        setInterestType(res?.interesttype);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message), console.log(err);
      });
  };

  const getFollower = () => {
    getFollowerList()
      .then((res: any) => {
        setMembers(res?.followers);
        setLoader(false);
      })
      .catch(err => {
        showError(err?.message), console.log(err);
        setLoader(false);
      });
  };

  const selectModalHandler = (item: any) => {
    if (modalVisible) {
      const filterData = selectMembers?.filter(
        (i: any) => i?.username == item?.username,
      );
      if (filterData?.length > 0) {
        const filterData2 = selectMembers?.filter(
          (i: any) => i?.username != item?.username,
        );
        setSelectMembers(filterData2);
      } else if (selectMembers?.length == 3) {
        setSelectMembers(selectMembers);
      } else {
        setSelectMembers([...selectMembers, item]);
      }
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
    setselectedInterestType((prevSelectedItems): any => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter(id => id !== item);
      }
      return [...prevSelectedItems, item];
    });
  };

  const handleLangItem = (item: any) => {
    setSelectedLanguage((prevSelectedItems): any => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter(id => id !== item);
      }
      return [...prevSelectedItems, item];
    });
  };

  const addImg = () => {
    if (selectedImages?.length <= 6) {
      var id = uuid.v4();
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: 'any',
      }).then(image => {
        setSelectedImages(prevImages => [...prevImages, {id: id, ...image}]);
      });
    } else {
      showError('Max limit of images and video is 6');
    }
  };

  const removeImg = (id: any) => {
    setSelectedImages(prevImages =>
      prevImages.filter((image: any) => image?.id !== id),
    );
  };

  const handleSearchMusic = useCallback(() => {
    const results = searchItems(searchMusic, musicStyle);
    return results;
  }, [searchMusic]);

  const handleSearchInterest = useCallback(() => {
    const results = searchItems(searchInterest, interestType);
    return results;
  }, [searchInterest]);

  const handleSearchLang = useCallback(() => {
    const results = searchItems(searchLang, languages?.slice(0, 10));
    return results;
  }, [searchLang]);

  const searchItems = (query, items) => {
    return items.filter(item =>
      item?.name
        ? item?.name?.toLowerCase().includes(query?.toLowerCase())
        : item?.toLowerCase().includes(query?.toLowerCase()),
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <Image source={ImagePath.Arrow_Left_2} />
            </TouchableOpacity>
            <Text style={{...commonStyles.Heading20font}}>New Team</Text>
            <VectorIcon
              groupName="Entypo"
              name="menu"
              size={32}
              color={Colors.white}
            />
          </View>
          <SizeBox size={10} />
          <ImageBackground
            source={ImagePath.Rectangle_new}
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
                Invite Friends (3 max.)
              </Text>
            </View>
            <SizeBox size={5} />
            <View
              style={{
                // flexDirection: 'row',
                height: height / 6.3,
                width: '100%',
              }}>
              <ScrollView
                horizontal
                // contentContainerStyle={{flexGrow: 1}}
                // style={{width: '100%', height: '100%'}}
                // contentContainerStyle={{width: '100%', height: '100%'}}
              >
                {selectMembers?.map(
                  item => (
                    console.log(item, 'item'),
                    (
                      <View
                        style={[
                          styles.imageContainer2,
                          {height: height / 7, borderWidth: 0},
                        ]}>
                        <Image
                          source={{uri: item?.image}}
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
                          onPress={() => {
                            const filterData2 = selectMembers?.filter(
                              (i: any) => i != item,
                            );
                            setSelectMembers(filterData2);
                          }}
                          style={{bottom: -15, position: 'absolute'}}
                        />
                      </View>
                    )
                  ),
                )}
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
              </ScrollView>
            </View>
            <SizeBox size={15} />
            <View style={styles.camerarow}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                  marginLeft: 10,
                }}>
                Pictures & Videos (6 max.)
              </Text>
            </View>
            <SizeBox size={5} />
            <View
              style={{
                // flexDirection: 'row',
                height: height / 6.3,
                width: '100%',
              }}>
              <ScrollView
                horizontal
                // contentContainerStyle={{flexGrow: 1}}
                // style={{width: '100%', height: '100%'}}
                // contentContainerStyle={{width: '100%', height: '100%'}}
              >
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
                {selectedImages.map((item, index) => (
                  <>
                    {item?.mime === 'image/png' ||
                    item?.mime === 'image/jpeg' ? (
                      <View
                        key={index}
                        style={[
                          styles.imageContainer2,
                          {
                            height: height / 7,
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
                ))}
              </ScrollView>
            </View>
            {/* <View style={styles.flatbox}>
                {selectedImages?.length ? (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    data={selectedImages}
                    // contentContainerStyle={{flexGrow: 1}}
                    renderItem={({item}) => (
                      <>
                        {item?.mime === 'image/png' ||
                        item?.mime === 'image/jpeg' ? (
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
              </View> */}
            {/* </View> */}
            <SizeBox size={15} />
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.white,
              }}>
              Who are we?
            </Text>
            <SizeBox size={10} />
            <CommonInput
              multiline={true}
              placeholder="Bio"
              value={bio}
              onChangeText={(text: string) => setBio(text)}
              styless={styles.multiInput}
            />
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
                  height: moderateScaleVertical(33),
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
                  value={searchMusic}
                  onChangeText={text => setSearchMusic(text)}
                  style={{
                    // flex: 1,
                    ...commonStyles.font10Regular,
                    color: Colors.black,
                    width: '90%',
                  }}
                />
                <Image source={ImagePath.SearchNewGroup} />
              </View>
            </View>
            <SizeBox size={5} />
            <FlatList
              data={searchMusic?.length > 0 ? handleSearchMusic() : musicStyle}
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
                      borderRadius: 2,
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}
                    onPress={() => selectMusicType(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
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
                  height: moderateScaleVertical(33),
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
                  value={searchInterest}
                  onChangeText={text => setSearchInterest(text)}
                  style={{
                    ...commonStyles.font10Regular,
                    color: Colors.black,
                    width: '90%',
                  }}
                />
                <Image source={ImagePath.SearchNewGroup} />
              </View>
            </View>
            <SizeBox size={5} />
            <FlatList
              data={
                searchInterest?.length > 0
                  ? handleSearchInterest()
                  : interestType
              }
              renderItem={({item}) => {
                if (!item) {
                  return null;
                }
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      borderWidth: selectedInterestType.includes(item) ? 0 : 1,
                      borderColor: Colors.white,
                      padding: 5,
                      backgroundColor: selectedInterestType.includes(item)
                        ? Colors.lightPink
                        : Colors.tranparent,
                      borderRadius: 2,
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}
                    onPress={() => handleSelectItem(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
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
                  height: moderateScaleVertical(33),
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
                  value={searchLang}
                  onChangeText={text => setSearchLang(text)}
                  style={{
                    ...commonStyles.font10Regular,
                    color: Colors.black,
                    width: '90%',
                  }}
                />
                <Image source={ImagePath.SearchNewGroup} />
              </View>
            </View>
            <SizeBox size={5} />
            <FlatList
              data={
                searchLang?.length > 0
                  ? handleSearchLang()
                  : languages?.slice(0, 10)
              }
              renderItem={({item}) => {
                if (!item) {
                  return null;
                }
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      borderWidth: selectedLanguage.includes(item.name) ? 0 : 1,
                      borderColor: Colors.white,
                      padding: 5,
                      backgroundColor: selectedLanguage.includes(item.name)
                        ? Colors.lightPink
                        : Colors.tranparent,
                      borderRadius: 4,
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}
                    onPress={() => handleLangItem(item.name)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
            <SizeBox size={10} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => onCreate()}>
              <Text style={styles.btnText}>Create Team</Text>
            </TouchableOpacity>
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
        <Loadingcomponent isVisible={loader} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CreateGroup;
