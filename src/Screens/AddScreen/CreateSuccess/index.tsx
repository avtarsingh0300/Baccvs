import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import {height, moderateScale} from '../../../Utilities/Styles/responsiveSize';
import {Colors} from '../../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';

import {
  CommonBtn,
  Header,
  Loadingcomponent,
  SizeBox,
  showError,
  showSuccess,
} from '../../../Utilities/Component/Helpers';

import styles from './style';
import VectorIcon from '../../../Utilities/Component/vectorIcons';
import ImagePicker from 'react-native-image-crop-picker';

import Geocoder from 'react-native-geocoding';
import {createEvent, getFollowerList} from '../../../Utilities/Constants/auth';
import Modal from 'react-native-modal';
import fontFamily from '../../../Utilities/Styles/fontFamily';
import moment from 'moment';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';
import {CommonActions} from '@react-navigation/native';
Geocoder.init('AIzaSyA-WTLYCwUjh4ffr-NkzBJnVHv6NEaHYSc');
const CreateSuccess = ({navigation, route}: any) => {
  const routeData = route?.params?.data;
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectMembers, setSelectMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const onCreate = () => {
    if (selectedVideos.length === 0) {
      return showError('Upload atleat one video');
    }
    if (selectedImages.length == 0) {
      return showError('Please select thumbnails');
    }

    const video = selectedVideos.map(n => n.uri);
    const images = selectedImages.map(n => n.uri);
    const members = selectMembers.map(n => n.id);

    const formData = new FormData();
    formData.append('event_name', routeData.eventname);
    formData.append('longitude', routeData.pin.longitude);
    formData.append('latitude', routeData.pin.latitude);
    formData.append('address', routeData.address);
    formData.append('state', 'California');
    formData.append('city', 'San Francisco');
    formData.append('country', 'USA');
    formData.append('zipcode', '12345');
    formData.append('start_time', routeData.startTime);
    formData.append('end_time', routeData.endTime);
    formData.append('date', moment(routeData.value).format('YYYY-MM-DD'));
    formData.append('allowed_people', routeData.numpeople);
    formData.append('music_style_id', routeData.selectedMusic);
    formData.append('phone_number', routeData.phone);
    formData.append('price_type', routeData.charges ? routeData.charges : '0');
    formData.append('language', routeData.selectedLang);
    formData.append('mode', 'In-person');
    formData.append('event_type_id', routeData.selectedEventType);
    formData.append('venue_type_id', routeData.selectedVenue);

    selectedVideos.forEach((video, index) => {
      formData.append('videos', {
        uri: video.uri,
        name: `video_${index}.mp4`,
        type: 'video/mp4',
      });
    });

    selectedImages.forEach((image, index) => {
      formData.append('pictures', {
        uri: image.uri,
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
      });
    });
    formData.append('members', members);
    formData.append('description', routeData.bio);
    formData.append('distance', '250m');
    formData.append('capacity', '2500');
    console.log(JSON.stringify(formData), 'formData');
    apiCall(formData);
  };
  const apiCall = (formData: Object) => {
    setLoader(true);
    createEvent(formData)
      .then(res => {
        setLoader(false);
        showSuccess('Event create successfully');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: NavigationStrings.TabRoutes,
                state: {
                  routes: [
                    {
                      name: NavigationStrings.HomeScreen,
                    },
                  ],
                },
              },
            ],
          }),
        );
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message), console.log(err);
        console.log(err);
      });
  };
  useEffect(() => {
    getFollower();
  }, []);

  const getFollower = () => {
    getFollowerList()
      .then(res => {
        setMembers(res?.followers), console.log(res);
      })
      .catch(err => {
        showError(err?.message), console.log(err);
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
      } else {
        setSelectMembers([...selectMembers, item]);
      }
    } else {
    }
  };

  return (
    <LinearGradient
      colors={[Colors.Linear, Colors.LinearBlack, Colors.LinearBlack]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header title="Create Event" onPress={() => navigation.goBack()} />

          <View style={{paddingHorizontal: moderateScale(20)}}>
            <SizeBox size={10} />
            <View style={styles.camerarow}>
              <VectorIcon
                groupName="SimpleLineIcons"
                name="camera"
                size={20}
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                  marginLeft: 10,
                }}>
                Add videos
              </Text>

              <VectorIcon
                groupName="AntDesign"
                name="questioncircleo"
                color={Colors.lightPink}
                size={10}
                style={{bottom: 2, left: 5}}
              />
            </View>
            <SizeBox size={5} />
            <View style={styles.dahesvw} />
            <SizeBox size={5} />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => addVideo()}
                style={styles.imageContainer2}>
                <View style={styles.innerCon}>
                  <LinearGradient
                    colors={[Colors.Linear, Colors.lightPink]}
                    start={{x: 0.4, y: 1.1}}
                    end={{x: 1.3, y: 0.2}}
                    style={styles.btnLinear}>
                    <VectorIcon groupName="AntDesign" name="plus" size={20} />
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              <View style={styles.flatbox}>
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

                        <VectorIcon
                          groupName="Entypo"
                          name="cross"
                          color={Colors.red}
                          size={26}
                          onPress={() => removeVideo(item.id)}
                          style={{bottom: -8, position: 'absolute'}}
                        />
                      </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                  />
                ) : null}
              </View>
            </View>
            <SizeBox size={10} />
            <View style={styles.camerarow}>
              <VectorIcon
                groupName="Fontisto"
                name="picture"
                size={20}
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                  marginLeft: 10,
                }}>
                Select a thumbnail
              </Text>

              <VectorIcon
                groupName="AntDesign"
                name="questioncircleo"
                color={Colors.lightPink}
                size={10}
                style={{bottom: 2, left: 5}}
              />
            </View>
            <SizeBox size={5} />
            <View style={styles.dahesvw} />
            <SizeBox size={5} />
            {selectedImages.length ? null : (
              <TouchableOpacity
                onPress={() => addImg()}
                style={[styles.imageContainer2, {width: '100%'}]}>
                <View style={styles.innerCon}>
                  <LinearGradient
                    colors={[Colors.Linear, Colors.lightPink]}
                    start={{x: 0.4, y: 1.1}}
                    end={{x: 1.3, y: 0.2}}
                    style={styles.btnLinear}>
                    <VectorIcon groupName="AntDesign" name="plus" size={20} />
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            )}
            {selectedImages.length ? (
              <FlatList
                // horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={selectedImages}
                renderItem={({item}) => (
                  <View
                    style={[
                      styles.imageContainer,
                      {width: '100%', height: height / 5},
                    ]}>
                    <Image
                      source={{uri: item.uri}}
                      style={{width: '100%', height: height / 5}}
                    />
                    <VectorIcon
                      groupName="Entypo"
                      name="cross"
                      color={Colors.red}
                      size={26}
                      style={{top: -10}}
                      onPress={() => removeImg(item.id)}
                    />
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            ) : null}
            {/* </View> */}
            <SizeBox size={10} />
            <View style={styles.camerarow}>
              <VectorIcon
                groupName="AntDesign"
                name="addusergroup"
                size={20}
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                  marginLeft: 10,
                }}>
                Add People
              </Text>

              <VectorIcon
                groupName="AntDesign"
                name="questioncircleo"
                color={Colors.lightPink}
                size={10}
                style={{bottom: 2, left: 5}}
              />
            </View>
            <SizeBox size={5} />
            <View style={styles.dahesvw} />
            <SizeBox size={5} />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[styles.imageContainer2, {height: height / 7}]}>
                <View style={styles.innerCon}>
                  <LinearGradient
                    colors={[Colors.Linear, Colors.lightPink]}
                    start={{x: 0.4, y: 1.1}}
                    end={{x: 1.3, y: 0.2}}
                    style={styles.btnLinear}>
                    <VectorIcon groupName="AntDesign" name="plus" size={20} />
                  </LinearGradient>
                </View>
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
            <SizeBox size={10} />
            <CommonBtn title="Create Event" onPress={onCreate} />
            <SizeBox size={15} />
          </View>
        </ScrollView>
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

export default CreateSuccess;
