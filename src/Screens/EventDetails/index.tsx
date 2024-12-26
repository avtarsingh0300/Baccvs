import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import RBSheet from 'react-native-raw-bottom-sheet';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {
  Loadingcomponent,
  SizeBox,
  showError,
  showSuccess,
} from '../../Utilities/Component/Helpers';
import MapView, {Marker} from 'react-native-maps';
import {
  createCommets,
  deleteComment,
  editComment,
  getEventDetail,
  likeEvents,
} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {useSelector} from 'react-redux';
import fontFamily from '../../Utilities/Styles/fontFamily';
import Video from 'react-native-video';

const EventDetails = ({navigation, route}: any) => {
  const refRBSheet: any = useRef();
  const refComRBSheet: any = useRef();
  const refInfoRBSheet: any = useRef();
  const refPeopleRBSheet: any = useRef();
  const refMapRBSheet: any = useRef();
  const refTicketsRBSheet: any = useRef();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<any>({});
  const [commentvalue, setCommentValue] = useState('');
  const [commentid, setCommentId] = useState('');
  const [freeTicket, setFreeTicket] = useState(0);
  const [earlyTicket, setEarlyTicket] = useState(0);
  const [regularTicket, setRegularTicket] = useState(0);
  const [lateTicket, setLateTicket] = useState(0);

  const user = useSelector((data: any) => data?.auth?.userData);

  const onPressBack = () => {
    navigation.goBack();
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const onReport = () => {
    navigation.navigate(NavigationStrings.Report);
  };

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = () => {
    setLoading(true);
    getEventDetail(route.params.eventId)
      .then(res => {
        setLoading(false);
        // console.log(res, 'sdcds');
        setEventData(res);
        // console.log(res);
      })
      .catch(err => {
        setLoading(false), showError(err.message), console.log(err);
      });
  };
  const getEvent2 = () => {
    setLoading(false);
    getEventDetail(route.params.eventId)
      .then(res => {
        setLoading(false);
        setEventData(res);
      })
      .catch(err => {
        setLoading(false), showError(err.message), console.log(err);
      });
  };
  const onSendComments = () => {
    if (!commentvalue) {
      showError('Type comments');
      return;
    }
    const formData = {
      id: commentid,
      user_id: user?.user?.id,
      event_id: route?.params?.eventId,
      description: commentvalue,
    };
    const data = {
      user_id: user?.user?.id,
      event_id: route?.params?.eventId,
      description: commentvalue,
    };
    if (commentid?.length > 0) {
      editComment(formData)
        .then(res => {
          setCommentValue('');
          setCommentId('');
          getEvent2();
        })
        .catch(err => {
          setCommentValue('');
          setCommentId('');
          showError(err?.msg);
          console.log(err);
        });
    } else {
      createCommets(data)
        .then((res: any) => {
          showSuccess(res?.message);
          setCommentValue('');
          setCommentId('');
          getEvent2();
          console.log(res);
        })
        .catch(err => {
          setCommentValue('');
          setCommentId('');
          showError(err?.msg);
          console.log(err);
        });
    }
    // console.log(formData)
  };

  const onLikePress = () => {
    const data = {
      user_id: user?.user?.id,
      event_id: route?.params?.eventId,
    };
    console.log(data);
    likeEvents(data)
      .then(res => {
        getEvent2();
        console.log(res);
      })
      .catch(err => {
        showError(err?.msg);
        console.log(err);
      });
  };
  const onDeletePress = (id: string) => {
    deleteComment(id)
      .then(res => {
        getEvent2();
      })
      .catch(err => {
        showError(err?.msg);
        console.log(err);
      });
  };
  const onEditPress = (item: any) => {
    setCommentId(item?.id);
    setCommentValue(item?.description);
  };

  const calculateDuration = (
    startTime: string,
    endTime: string,
  ): string | undefined => {
    if (startTime && endTime) {
      // Parse time strings into Date objects using a helper function
      const parseTime = (time: string): Date | null => {
        const [_, hours, minutes, seconds, period] =
          time.match(/(\d{1,2}):(\d{2}):(\d{2})\s?(AM|PM)/i) || [];
        if (!hours || !minutes || !seconds || !period) return null;

        // Convert to 24-hour format
        let hrs = parseInt(hours);
        const mins = parseInt(minutes);
        const secs = parseInt(seconds);
        if (period.toUpperCase() === 'PM' && hrs !== 12) hrs += 12;
        if (period.toUpperCase() === 'AM' && hrs === 12) hrs = 0;

        // Create a Date object
        return new Date(1970, 0, 1, hrs, mins, secs);
      };

      const startDate = parseTime(startTime);
      const endDate = parseTime(endTime);

      if (!startDate || !endDate) return undefined;

      // Calculate the difference in milliseconds
      const diffMs = endDate.getTime() - startDate.getTime();

      // Adjust for crossing midnight
      const adjustedDiffMs = diffMs < 0 ? diffMs + 24 * 3600000 : diffMs;

      // Convert milliseconds to hours and minutes
      const diffHrs = Math.floor(adjustedDiffMs / 3600000);
      const diffMins = Math.round((adjustedDiffMs % 3600000) / 60000);

      return `${diffHrs}h ${diffMins}m`;
    }
    return undefined;
  };

  const initialRegion = {
    latitude: eventData.latitude ? eventData.latitude : 37.78825,
    longitude: eventData.longitude ? eventData.longitude : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const renderItem = ({item, index}: any) => (
    <View style={styles.itemContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item?.user?.image ? (
          <Image
            source={{uri: IMAGE_URL + item?.user?.image}}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              borderColor: Colors.Pink,
              width: 40,
              height: 47,
            }}
          />
        ) : (
          <Image
            source={ImagePath.followProfile}
            style={{borderWidth: 1, borderRadius: 8, borderColor: Colors.Pink}}
          />
        )}
        <Text style={[styles.distanceText, {marginLeft: 10}]}>
          {item?.user?.name}
        </Text>
      </View>
      {/* <TouchableOpacity activeOpacity={0.8}>
        <LinearGradient
          colors={[Colors.LinearBlack, Colors.Pink]}
          style={{
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}>
          <Text style={styles.timeText}>Follow</Text>
        </LinearGradient>
      </TouchableOpacity> */}
    </View>
  );

  const comItem = ({item, index}: any) => (
    <View style={styles.itemContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {item?.user?.image ? (
          <Image
            source={{uri: IMAGE_URL + item?.user?.image}}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              borderColor: Colors.Pink,
              width: 40,
              height: 47,
            }}
          />
        ) : (
          <Image
            source={ImagePath.followProfile}
            style={{borderWidth: 1, borderRadius: 8, borderColor: Colors.Pink}}
          />
        )}
        <View>
          <Text style={[styles.distanceText, {marginLeft: 10, fontSize: 12}]}>
            {item?.user?.name}
          </Text>
          <Text
            numberOfLines={2}
            style={[styles.cmttxt, {marginLeft: 10, width: width / 1.9}]}>
            {item?.description}
          </Text>
        </View>
      </View>
      {item?.userId === user?.user?.id ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <VectorIcon
            groupName="Octicons"
            name="pencil"
            size={15}
            color={Colors.white}
            style={{marginHorizontal: 15}}
            onPress={() => onEditPress(item)}
          />

          <VectorIcon
            groupName="MaterialCommunityIcons"
            name="delete"
            size={20}
            onPress={() => onDeletePress(item?.id)}
          />
        </View>
      ) : null}
    </View>
  );

  const renderMembers = ({item, index}: any) => (
    <View style={styles.itemContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item?.user?.image ? (
          <Image
            source={{uri: IMAGE_URL + item?.user?.image}}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              borderColor: Colors.Pink,
              width: 40,
              height: 47,
            }}
          />
        ) : (
          <Image
            source={ImagePath.followProfile}
            style={{borderWidth: 1, borderRadius: 8, borderColor: Colors.Pink}}
          />
        )}
        <Text style={[styles.distanceText, {marginLeft: 10}]}>
          {item?.name}
        </Text>
      </View>
    </View>
  );
  const thumbnailUrl = eventData.thumbnail_urls?.[0];

  const renderHost = () => (
    <View style={{paddingHorizontal: 15}}>
      <Image
        source={
          eventData?.createdby?.image
            ? {uri: IMAGE_URL + eventData?.createdby?.image}
            : ImagePath.ProfileImg
        }
        style={{width: 44, height: 50, borderRadius: 5}}
      />
      <Text style={{...commonStyles.font12Regular, paddingTop: 5}}>
        {eventData?.createdby?.name}
      </Text>
    </View>
  );

  const renderLineUp = ({item, index}: any) => (
    <View style={{paddingHorizontal: 15, alignItems: 'center'}}>
      <Image
        source={
          eventData?.createdby?.image
            ? {uri: eventData?.createdby?.image}
            : ImagePath.ProfileImg
        }
        style={{width: 44, height: 50, borderRadius: 5}}
      />
      <Text style={{...commonStyles.font12Regular, paddingTop: 5}}>
        {eventData?.createdby?.name}
      </Text>
    </View>
  );

  const renderParticipants = ({item, index}: any) => (
    <View style={{paddingHorizontal: 15, alignItems: 'center'}}>
      <Image
        source={
          item?.image ? {uri: IMAGE_URL + item?.image} : ImagePath.ProfileImg
        }
        style={{width: 44, height: 50, borderRadius: 5}}
      />
      <Text style={{...commonStyles.font12Regular, paddingTop: 5}}>
        {item?.name}
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loading} />
        {eventData?.video_urls?.length > 0 ? (
          <View style={{height: height, width: width}}>
            <Video
              repeat={true}
              source={{uri: IMAGE_URL + eventData?.video_urls}}
              style={{
                height: height,
                width: width,
                position: 'absolute',
              }}
              resizeMode="stretch"
            />
            <View style={styles.headerRow}>
              <VectorIcon
                groupName={'Ionicons'}
                name={'chevron-back'}
                size={25}
                onPress={onPressBack}
              />
              <Text style={styles.headerTxt}>{eventData?.event_name}</Text>
              <View style={{flexDirection: 'row'}}>
                {/* <VectorIcon
                groupName={'MaterialCommunityIcons'}
                name={'share-outline'}
                size={25}
                color={Colors.white}
                onPress={onShare}
              /> */}
                <TouchableOpacity
                  style={{marginLeft: 10, justifyContent: 'center'}}
                  activeOpacity={0.8}
                  onPress={onReport}>
                  <Image
                    style={{
                      width: moderateScale(16),
                      height: moderateScaleVertical(18),
                      alignSelf: 'center',
                      tintColor: Colors.white,
                    }}
                    source={ImagePath.Security_Rules}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.abview}>
              <View style={styles.bottomBar}>
                <SizeBox size={5} />
                <VectorIcon
                  groupName={'MaterialCommunityIcons'}
                  name={'share-outline'}
                  size={25}
                  color={Colors.white}
                  onPress={onShare}
                />
                <SizeBox size={5} />
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    refMapRBSheet.current.open();
                  }}>
                  <Image source={ImagePath.Pin_alt} />
                </TouchableOpacity>
                <SizeBox size={5} />
                <TouchableOpacity
                  style={styles.likebtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    refComRBSheet.current.open();
                  }}>
                  <VectorIcon
                    groupName="Ionicons"
                    name="chatbubble-ellipses-outline"
                    size={24}
                    color={Colors.white}
                  />
                  <Text style={styles.bottomBarText}>
                    {eventData?.comments?.length}
                  </Text>
                </TouchableOpacity>
                <SizeBox size={5} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.likebtn]}
                  onPress={() => {
                    refRBSheet.current.open();
                  }}>
                  <Image
                    source={ImagePath.likes}
                    resizeMode="contain"
                    style={{width: 24, height: 24}}
                  />
                  <Text style={styles.bottomBarText}>
                    {eventData?.likes?.length}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (eventData?.user?.id === user?.user?.id) {
                      navigation.navigate(NavigationStrings.UserProfile);
                    } else {
                      navigation.navigate(NavigationStrings.OtherProfiles, {
                        id: eventData?.user?.id,
                      });
                    }
                  }}
                  style={[
                    styles.likebtn,
                    {
                      bottom: moderateScaleVertical(-10),
                    },
                  ]}>
                  <Image
                    source={
                      thumbnailUrl
                        ? {uri: IMAGE_URL + eventData?.user?.image}
                        : ImagePath.ProfileImg
                    }
                    style={styles.profileimg}
                  />
                  <Text
                    style={[styles.bottomBarText, {fontSize: textScale(14)}]}>
                    {eventData?.user?.name}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  refTicketsRBSheet.current.open();
                }}
                style={styles.ticketContainer}>
                <Image
                  source={ImagePath.Ticket}
                  style={{tintColor: Colors.white}}
                />
                <Text style={styles.ticketPrice}>
                  {' '}
                  €{eventData?.early_price}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  refInfoRBSheet.current.open();
                }}>
                <Image
                  source={ImagePath.openSheet}
                  style={{
                    resizeMode: 'contain',
                    width: moderateScale(40),
                    height: moderateScaleVertical(40),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ImageBackground
            source={
              thumbnailUrl
                ? {uri: IMAGE_URL + thumbnailUrl}
                : ImagePath.eventback
            }
            style={{height: height, width: width}}>
            <View style={styles.headerRow}>
              <VectorIcon
                groupName={'Ionicons'}
                name={'chevron-back'}
                size={25}
                onPress={onPressBack}
              />
              <Text style={styles.headerTxt}>{eventData?.event_name}</Text>
              <View style={{flexDirection: 'row'}}>
                {/* <VectorIcon
                groupName={'MaterialCommunityIcons'}
                name={'share-outline'}
                size={25}
                color={Colors.white}
                onPress={onShare}
              /> */}
                <TouchableOpacity
                  style={{marginLeft: 10, justifyContent: 'center'}}
                  activeOpacity={0.8}
                  onPress={onReport}>
                  <Image
                    style={{
                      width: moderateScale(16),
                      height: moderateScaleVertical(18),
                      alignSelf: 'center',
                      tintColor: Colors.white,
                    }}
                    source={ImagePath.Security_Rules}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.abview}>
              <View style={styles.bottomBar}>
                <SizeBox size={5} />
                <VectorIcon
                  groupName={'MaterialCommunityIcons'}
                  name={'share-outline'}
                  size={25}
                  color={Colors.white}
                  onPress={onShare}
                />
                <SizeBox size={5} />
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    refMapRBSheet.current.open();
                  }}>
                  <Image source={ImagePath.Pin_alt} />
                </TouchableOpacity>
                <SizeBox size={5} />
                <TouchableOpacity
                  style={styles.likebtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    refComRBSheet.current.open();
                  }}>
                  <VectorIcon
                    groupName="Ionicons"
                    name="chatbubble-ellipses-outline"
                    size={24}
                    color={Colors.white}
                  />
                  <Text style={styles.bottomBarText}>
                    {eventData?.comments?.length}
                  </Text>
                </TouchableOpacity>
                <SizeBox size={5} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.likebtn]}
                  onPress={() => {
                    refRBSheet.current.open();
                  }}>
                  <Image
                    source={ImagePath.likes}
                    resizeMode="contain"
                    style={{width: 24, height: 24}}
                  />
                  <Text style={styles.bottomBarText}>
                    {eventData?.likes?.length}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (eventData?.user?.id === user?.user?.id) {
                      navigation.navigate(NavigationStrings.UserProfile);
                    } else {
                      navigation.navigate(NavigationStrings.OtherProfiles, {
                        id: eventData?.user?.id,
                      });
                    }
                  }}
                  style={[
                    styles.likebtn,
                    {
                      bottom: moderateScaleVertical(-10),
                    },
                  ]}>
                  <Image
                    source={
                      thumbnailUrl
                        ? {uri: IMAGE_URL + eventData?.user?.image}
                        : ImagePath.ProfileImg
                    }
                    style={styles.profileimg}
                  />
                  <Text
                    style={[styles.bottomBarText, {fontSize: textScale(14)}]}>
                    {eventData?.user?.name}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  refTicketsRBSheet.current.open();
                }}
                style={styles.ticketContainer}>
                <Image
                  source={ImagePath.Ticket}
                  style={{tintColor: Colors.white}}
                />
                <Text style={styles.ticketPrice}>
                  {' '}
                  €{eventData?.early_price}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  refInfoRBSheet.current.open();
                }}>
                <Image
                  source={ImagePath.openSheet}
                  style={{
                    resizeMode: 'contain',
                    width: moderateScale(40),
                    height: moderateScaleVertical(40),
                  }}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
        <RBSheet
          ref={refRBSheet}
          closeOnPressMask={true}
          height={height / 1.7}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
              width: '90%',
              bottom: height / 30,
              alignSelf: 'center',
            },
            container: {
              borderRadius: 10,
            },
          }}>
          <LinearGradient
            colors={[Colors.backgroundNew, Colors.backgroundNew]}
            start={{x: 0, y: 0}}
            end={{x: 1.3, y: 0.9}}
            style={styles.sheetContent}>
            <VectorIcon
              groupName="Fontisto"
              name="close-a"
              size={15}
              color={Colors.white}
              style={{alignSelf: 'flex-end', top: 10, right: 10}}
              onPress={() => refRBSheet.current.close()}
            />
            <Text
              style={[
                styles.timeText,
                {
                  fontSize: textScale(16),
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Likes
            </Text>
            <FlatList
              data={eventData?.likes}
              keyExtractor={item => item?.id?.toString()}
              renderItem={renderItem}
            />
            <TouchableOpacity
              onPress={onLikePress}
              activeOpacity={0.8}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                bottom: moderateScale(20),
              }}>
              <Image
                source={ImagePath.likes}
                resizeMode="contain"
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          </LinearGradient>
        </RBSheet>
        <RBSheet
          ref={refComRBSheet}
          closeOnPressMask={true}
          height={height / 1.7}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
              width: '90%',
              bottom: height / 30,
              alignSelf: 'center',
            },
            container: {
              borderRadius: 10,
            },
          }}>
          <LinearGradient
            colors={[Colors.backgroundNew, Colors.backgroundNew]}
            start={{x: 0, y: 0}}
            end={{x: 1.3, y: 0.9}}
            style={styles.sheetContent}>
            <VectorIcon
              groupName="Fontisto"
              name="close-a"
              size={15}
              color={Colors.white}
              style={{alignSelf: 'flex-end', top: 10, right: 10}}
              onPress={() => refComRBSheet.current.close()}
            />
            <Text
              style={[
                styles.timeText,
                {
                  fontSize: textScale(16),
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Comments
            </Text>
            <FlatList
              data={eventData?.comments}
              keyExtractor={item => item?.id?.toString()}
              renderItem={comItem}
            />
            <SizeBox size={10} />
            <View
              style={{
                backgroundColor: Colors.white,
                width: '90%',
                minHeight: 40,
                alignSelf: 'center',
                borderRadius: 5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Type here"
                multiline
                value={commentvalue}
                onChangeText={(text: string) => {
                  setCommentValue(text);
                  text.length == 0 && setCommentId('');
                }}
                style={{
                  width: '90%',
                  paddingVertical: 5,
                  color: Colors.black,
                  fontFamily: fontFamily.regular,
                }}
              />
              <VectorIcon
                groupName="Ionicons"
                name="send-outline"
                onPress={onSendComments}
                size={20}
                color={Colors.lightPink}
              />
            </View>
            <SizeBox size={5} />
          </LinearGradient>
        </RBSheet>
        <RBSheet
          ref={refInfoRBSheet}
          closeOnPressMask={true}
          height={height / 1.2}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
              width: '90%',
              bottom: height / 30,
              alignSelf: 'center',
            },
            container: {
              borderRadius: 10,
            },
          }}>
          <LinearGradient
            colors={[Colors.backgroundNew, Colors.backgroundNew]}
            start={{x: 0, y: 0}}
            end={{x: 1.3, y: 0.9}}
            style={styles.sheetContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{paddingHorizontal: 15}}>
                <SizeBox size={10} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                  }}>
                  <Text style={{...commonStyles.font16Regular}}>
                    Event details
                  </Text>
                  <Image
                    style={{
                      width: moderateScale(16),
                      height: moderateScaleVertical(18),
                      alignSelf: 'center',
                      tintColor: Colors.white,
                    }}
                    source={ImagePath.Security_Rules}
                  />
                </View>
                <SizeBox size={10} />
                <Text
                  style={{
                    ...commonStyles.font12Regular,
                    paddingHorizontal: 5,
                  }}>
                  {eventData?.description}
                </Text>
                <SizeBox size={10} />
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    paddingHorizontal: 5,
                  }}>
                  Details
                </Text>
                <SizeBox size={10} />
                <View style={{flexDirection: 'row'}}>
                  <VectorIcon
                    groupName="Feather"
                    name="speaker"
                    size={25}
                    color={Colors.white}
                  />
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={eventData?.music_type}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.allBtn}>
                        <Text style={styles.timeText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <SizeBox size={10} />
                <View style={{flexDirection: 'row'}}>
                  <Image source={ImagePath.Pin_alt} />
                  <Text style={styles.distanceText}>
                    {`  `}
                    {eventData?.distance}
                  </Text>
                </View>
              </View>
              <SizeBox size={10} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 17,
                }}>
                <VectorIcon
                  groupName="Fontisto"
                  name="stopwatch"
                  size={25}
                  color={Colors.white}
                />
                <Text style={[styles.timeText, {color: Colors.white}]}>
                  {`  `}
                  {calculateDuration(
                    eventData?.start_time,
                    eventData?.end_time,
                  )}
                </Text>
              </View>
              <SizeBox size={10} />
              <Text style={{...commonStyles.font16Regular, marginLeft: 18}}>
                Hosted by
              </Text>
              <SizeBox size={10} />
              {renderHost()}
              <SizeBox size={10} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...commonStyles.font16Regular, marginLeft: 18}}>
                  Participants{' '}
                </Text>
                <VectorIcon
                  groupName="Octicons"
                  name="dot-fill"
                  size={20}
                  color={Colors.white}
                />
                <Text style={{...commonStyles.font16Regular}}>
                  {' '}
                  {eventData?.members_names?.length}
                </Text>
              </View>
              <SizeBox size={10} />
              <FlatList
                data={eventData?.members_names}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={renderParticipants}
              />
              <SizeBox size={10} />
            </ScrollView>
          </LinearGradient>
        </RBSheet>
        <RBSheet
          ref={refPeopleRBSheet}
          closeOnPressMask={true}
          height={height / 1.7}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
              width: '90%',
              bottom: height / 30,
              alignSelf: 'center',
            },
            container: {
              borderRadius: 10,
            },
          }}>
          <LinearGradient
            colors={[Colors.backgroundNew, Colors.backgroundNew]}
            start={{x: 0, y: 0}}
            end={{x: 1.3, y: 0.9}}
            style={styles.sheetContent}>
            <VectorIcon
              groupName="Fontisto"
              name="close-a"
              size={15}
              color={Colors.white}
              style={{alignSelf: 'flex-end', top: 10, right: 10}}
              onPress={() => refPeopleRBSheet.current.close()}
            />
            <Text
              style={[
                styles.timeText,
                {
                  fontSize: textScale(16),
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Event members
            </Text>
            {eventData?.members_names ? (
              <FlatList
                data={eventData?.members_names}
                keyExtractor={item => item?.id?.toString()}
                renderItem={renderMembers}
              />
            ) : (
              <Text
                style={[
                  styles.cmttxt,
                  {
                    fontSize: textScale(10),
                    alignSelf: 'center',
                    marginTop: 20,
                  },
                ]}>
                No data found ..
              </Text>
            )}
          </LinearGradient>
        </RBSheet>
        <RBSheet
          ref={refMapRBSheet}
          closeOnPressMask={true}
          height={height / 1.3}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
              width: '90%',
              bottom: height / 30,
              alignSelf: 'center',
            },
            container: {
              borderRadius: 10,
            },
          }}>
          <LinearGradient
            colors={[Colors.backgroundNew, Colors.backgroundNew]}
            start={{x: 0, y: 0}}
            end={{x: 1.3, y: 0.9}}
            style={styles.sheetContent}>
            <VectorIcon
              groupName="Fontisto"
              name="close-a"
              size={15}
              color={Colors.white}
              style={{alignSelf: 'flex-end', top: 10, right: 10}}
              onPress={() => refMapRBSheet.current.close()}
            />
            <Text
              style={[
                styles.timeText,
                {
                  fontSize: textScale(16),
                  textAlign: 'center',
                  marginTop: 10,
                },
              ]}>
              Maps
            </Text>
            <SizeBox size={10} />
            <View
              style={{
                height: height,
                borderWidth: 1,
                borderColor: Colors.Pink,
              }}>
              <MapView style={styles.map} initialRegion={initialRegion}>
                <Marker
                  coordinate={{
                    latitude: eventData?.latitude
                      ? eventData?.latitude
                      : 37.78825,
                    longitude: eventData?.longitude
                      ? eventData?.longitude
                      : -122.4324,
                  }}
                  title={'My Marker'}
                  description={'Some description'}
                />
              </MapView>
            </View>
          </LinearGradient>
        </RBSheet>
        <RBSheet
          ref={refTicketsRBSheet}
          // closeOnDragDown={true}
          closeOnPressMask={true}
          height={height / 1.8}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
              width: '90%',
              bottom: height / 30,
              alignSelf: 'center',
            },
            container: {
              height: height / 1.8,
              borderRadius: 10,
            },
          }}>
          <LinearGradient
            colors={[Colors.backgroundNew, Colors.backgroundNew]}
            start={{x: 0, y: 0}}
            end={{x: 1.3, y: 0.9}}
            style={styles.sheetContent}>
            <SizeBox size={10} />
            <Text
              style={{
                ...commonStyles.font16WhiteBold,
                fontSize: textScale(20),
                alignSelf: 'center',
              }}>
              Tickets
            </Text>
            <SizeBox size={2} />
            <Text
              style={{
                ...styles.ticketText,
                alignSelf: 'center',
                color: Colors.greyTxt,
              }}>
              Select a ticket
            </Text>
            {eventData?.isfree && (
              <>
                <SizeBox size={10} />
                <View style={styles.row}>
                  <View style={{width: '30%'}}>
                    <Text style={styles.ticketText}>Free ticket</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <VectorIcon
                      groupName="AntDesign"
                      name="minuscircleo"
                      color={Colors.white}
                      size={24}
                      onPress={() => {
                        if (freeTicket > 0) {
                          setFreeTicket(freeTicket - 1);
                        }
                      }}
                    />
                    <View style={{width: 10}} />
                    <Text
                      style={{
                        ...commonStyles.font14Bold,
                        color: Colors.white,
                      }}>
                      {freeTicket}
                    </Text>
                    <View style={{width: 10}} />
                    <VectorIcon
                      groupName="AntDesign"
                      name="pluscircleo"
                      color={Colors.white}
                      size={24}
                      onPress={() => {
                        if (
                          eventData?.memberscount >
                          lateTicket + regularTicket + freeTicket + earlyTicket
                        ) {
                          setFreeTicket(freeTicket + 1);
                        }
                      }}
                    />
                  </View>
                  <View style={styles.soldBox}>
                    {freeTicket + regularTicket + earlyTicket + lateTicket ==
                    eventData?.memberscount ? (
                      <Text style={styles.ticketText}>Sold out</Text>
                    ) : (
                      <Text style={styles.ticketText}>0</Text>
                    )}
                  </View>
                  <Text style={styles.ticketText}>€</Text>
                </View>
              </>
            )}
            <SizeBox size={10} />
            <View style={styles.row}>
              <View style={{width: '30%'}}>
                <Text style={styles.ticketText}>Early tickets</Text>
                <Text
                  style={{
                    ...commonStyles.font12Bold,
                    color: Colors.greyTxt,
                  }}>
                  Before 22h00
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <VectorIcon
                  groupName="AntDesign"
                  name="minuscircleo"
                  color={Colors.white}
                  size={24}
                  onPress={() => {
                    if (earlyTicket > 0) {
                      setEarlyTicket(earlyTicket - 1);
                    }
                  }}
                />
                <View style={{width: 10}} />
                <Text
                  style={{
                    ...commonStyles.font14Bold,
                    color: Colors.white,
                  }}>
                  {earlyTicket}
                </Text>
                <View style={{width: 10}} />
                <VectorIcon
                  groupName="AntDesign"
                  name="pluscircleo"
                  color={Colors.white}
                  size={24}
                  onPress={() => {
                    if (
                      lateTicket + regularTicket + freeTicket + earlyTicket <
                      eventData?.memberscount
                    ) {
                      setEarlyTicket(earlyTicket + 1);
                    }
                  }}
                />
              </View>
              <View style={styles.soldBox}>
                {freeTicket + regularTicket + earlyTicket + lateTicket ==
                eventData?.memberscount ? (
                  <Text style={styles.ticketText}>Sold out</Text>
                ) : (
                  <Text style={styles.ticketText}>
                    {eventData?.early_price}
                  </Text>
                )}
              </View>
              <Text style={styles.ticketText}>€</Text>
            </View>
            <SizeBox size={10} />
            <View style={styles.row}>
              <View style={{width: '30%'}}>
                <Text style={styles.ticketText}>Regular tickets</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <VectorIcon
                  groupName="AntDesign"
                  name="minuscircleo"
                  color={Colors.white}
                  size={24}
                  onPress={() => {
                    if (regularTicket > 0) {
                      setRegularTicket(regularTicket - 1);
                    }
                  }}
                />
                <View style={{width: 10}} />
                <Text
                  style={{
                    ...commonStyles.font14Bold,
                    color: Colors.white,
                  }}>
                  {regularTicket}
                </Text>
                <View style={{width: 10}} />
                <VectorIcon
                  groupName="AntDesign"
                  name="pluscircleo"
                  color={Colors.white}
                  size={24}
                  onPress={() => {
                    if (
                      lateTicket + regularTicket + freeTicket + earlyTicket <
                      eventData?.memberscount
                    ) {
                      setRegularTicket(regularTicket + 1);
                    }
                  }}
                />
              </View>
              <View style={styles.soldBox}>
                {freeTicket + regularTicket + earlyTicket + lateTicket ==
                eventData?.memberscount ? (
                  <Text style={styles.ticketText}>Sold out</Text>
                ) : (
                  <Text style={styles.ticketText}>
                    {eventData?.regular_price}
                  </Text>
                )}
              </View>
              <Text style={styles.ticketText}>€</Text>
            </View>
            <SizeBox size={10} />
            <View style={styles.row}>
              <View style={{width: '30%'}}>
                <Text style={styles.ticketText}>Late tickets</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <VectorIcon
                  groupName="AntDesign"
                  name="minuscircleo"
                  color={Colors.white}
                  size={24}
                  onPress={() => {
                    if (lateTicket > 0) {
                      setLateTicket(lateTicket - 1);
                    }
                  }}
                />
                <View style={{width: 10}} />
                <Text
                  style={{
                    ...commonStyles.font14Bold,
                    color: Colors.white,
                  }}>
                  {lateTicket}
                </Text>
                <View style={{width: 10}} />
                <VectorIcon
                  groupName="AntDesign"
                  name="pluscircleo"
                  color={Colors.white}
                  size={24}
                  onPress={() => {
                    if (
                      lateTicket + regularTicket + freeTicket + earlyTicket <
                      eventData?.memberscount
                    ) {
                      setLateTicket(lateTicket + 1);
                    }
                  }}
                />
              </View>
              <View style={styles.soldBox}>
                {freeTicket + regularTicket + earlyTicket + lateTicket ==
                eventData?.memberscount ? (
                  <Text style={styles.ticketText}>Sold out</Text>
                ) : (
                  <Text style={styles.ticketText}>{eventData?.late_price}</Text>
                )}
              </View>
              <Text style={styles.ticketText}>€</Text>
            </View>
            <SizeBox size={10} />
            <Text
              style={{
                ...commonStyles.font16WhiteBold,
                alignSelf: 'center',
              }}>
              Total : €
              {freeTicket * 0 +
                regularTicket * eventData?.regular_price +
                earlyTicket * eventData?.early_price +
                lateTicket * eventData?.late_price}
            </Text>
            <SizeBox size={10} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.soldBox,
                width: '50%',
                alignSelf: 'center',
              }}>
              <Text style={styles.ticketText}>Confirm Purchase</Text>
            </TouchableOpacity>
          </LinearGradient>
        </RBSheet>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventDetails;
