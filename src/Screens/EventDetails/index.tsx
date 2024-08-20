import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Share,
  Text,
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
import {TextInput} from 'react-native';
import {
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import MapView, {Marker} from 'react-native-maps';
import {getEventDetail} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
// import {EventEmitter} from 'react-native';
const EventDetails = ({navigation, route}: any) => {
  const refRBSheet: any = useRef();
  const refComRBSheet: any = useRef();
  const refInfoRBSheet: any = useRef();
  const refPeopleRBSheet: any = useRef();
  const refMapRBSheet: any = useRef();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({});

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
  const likeData = [
    {
      id: 0,
      name: 'Julie C.',
    },
    {
      id: 1,
      name: 'Anonymous',
    },
    {
      id: 2,
      name: 'Julius O.',
    },
    {
      id: 3,
      name: 'Esteban I.',
    },
    {
      id: 4,
      name: 'Lucia E.',
    },
  ];

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = () => {
    setLoading(true);
    getEventDetail(route.params.eventId)
      .then(res => {
        setLoading(false);
        setEventData(res);

        console.log(res, 'sss');
      })
      .catch(err => {
        setLoading(false), showError(err.message), console.log(err);
      });
  };
  const formatTime = (timeString: string) => {
    const date = new Date(`1970-01-01T${timeString}Z`);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    if (startTime !== '' || (undefined && endTime !== '') || undefined) {
      const startDate: any = new Date(`1970-01-01T${startTime}Z`);
      const endDate: any = new Date(`1970-01-01T${endTime}Z`);
      const diffMs = endDate - startDate;
      const diffHrs = Math.floor(diffMs / 3600000);
      const diffMins = Math.round((diffMs % 3600000) / 60000);
      return `${diffHrs}h ${diffMins}m`;
    }
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
        <View>
          <Text style={[styles.distanceText, {marginLeft: 10}]}>
            {item?.user?.name}
          </Text>
          <Text style={[styles.cmttxt, {marginLeft: 10}]}>
            {item?.description}
          </Text>
        </View>
      </View>
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
  const thumbnailUrl = eventData.thumbnail_urls?.[0];
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loading} />
        <ImageBackground
          source={
            thumbnailUrl ? {uri: IMAGE_URL + thumbnailUrl} : ImagePath.eventback
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
              <VectorIcon
                groupName={'MaterialCommunityIcons'}
                name={'share-outline'}
                size={25}
                color={Colors.white}
                onPress={onShare}
              />
              <TouchableOpacity
                style={{marginLeft: 10, justifyContent: 'center'}}
                activeOpacity={0.8}
                onPress={onReport}>
                <Image
                  style={{
                    width: moderateScale(16),
                    height: moderateScaleVertical(18),
                    alignSelf: 'center',
                  }}
                  source={ImagePath.Security_Rules}
                />
              </TouchableOpacity>
            </View>
          </View>
          <LinearGradient
            colors={[Colors.headerlinear, Colors.Linear]}
            start={{x: 0, y: 0}}
            end={{x: 1.3, y: 0.9}}
            style={styles.secondHeader}>
            <Text style={styles.timeText}>
              {formatTime(eventData?.start_time)} -
              {formatTime(eventData?.end_time)}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.ticketContainer}>
              <Image source={ImagePath.Ticket} />
              <Text style={styles.ticketPrice}> €{eventData?.price_type}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                refMapRBSheet.current.open();
              }}>
              <Text style={styles.distanceText}>{eventData?.distance}</Text>
              <Image source={ImagePath.Pin_alt} />
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.bottomBar}>
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
              <Text style={styles.bottomBarText}>Likes</Text>
            </TouchableOpacity>
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
              <Text style={styles.bottomBarText}>Comments</Text>
            </TouchableOpacity>
            <View
              style={[
                styles.likebtn,
                {
                  bottom: moderateScaleVertical(10),
                },
              ]}>
              <Image
                source={
                  thumbnailUrl
                    ? {uri: IMAGE_URL + thumbnailUrl}
                    : ImagePath.ProfileImg
                }
                style={styles.profileimg}
              />
              <Text style={[styles.bottomBarText, {fontSize: textScale(14)}]}>
                Kingson
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.likebtn}
              onPress={() => {
                refPeopleRBSheet.current.open();
              }}>
              <Image
                source={ImagePath.userprofile}
                resizeMode="contain"
                style={{width: 24, height: 24}}
              />
              <Text style={styles.bottomBarText}>people</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.likebtn}
              onPress={() => {
                refInfoRBSheet.current.open();
              }}>
              <Image
                source={ImagePath.infoIcon}
                resizeMode="contain"
                style={{width: 24, height: 24}}
              />
              <Text style={styles.bottomBarText}>info</Text>
            </TouchableOpacity>
          </View>

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
              colors={[Colors.LinearBlack, Colors.Linear]}
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
              colors={[Colors.LinearBlack, Colors.Linear]}
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

              {/* <TextInput
                placeholder="Add a comment... "
                multiline
                placeholderTextColor={Colors.white}
                style={styles.cmtinpt}
              /> */}
              <SizeBox size={10} />
            </LinearGradient>
          </RBSheet>
          <RBSheet
            ref={refInfoRBSheet}
            closeOnPressMask={true}
            height={height / 1.5}
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
              colors={[Colors.LinearBlack, Colors.Linear]}
              start={{x: 0, y: 0}}
              end={{x: 1.3, y: 0.9}}
              style={styles.sheetContent}>
              <View style={{paddingHorizontal: 15}}>
                <VectorIcon
                  groupName="Fontisto"
                  name="close-a"
                  size={15}
                  color={Colors.white}
                  style={{alignSelf: 'flex-end', top: 10}}
                  onPress={() => refInfoRBSheet.current.close()}
                />
                <Text style={[styles.timeText, styles.onelife]}>
                  {eventData?.event_name}
                </Text>
                <SizeBox size={10} />
                <Text style={[styles.cmttxt, {fontSize: textScale(10)}]}>
                  {eventData?.description}
                </Text>
                <Text style={[styles.cmttxt, {fontSize: textScale(10)}]}>
                  Free entry, be respectful of others.
                </Text>
                <SizeBox size={90} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <VectorIcon
                    groupName="Fontisto"
                    name="stopwatch"
                    size={25}
                    color={Colors.white}
                  />
                  <Text style={[styles.timeText, {color: Colors.green}]}>
                    {`  `}
                    {calculateDuration(
                      eventData?.start_time,
                      eventData?.end_time,
                    )}
                  </Text>
                </View>
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
                      <TouchableOpacity style={styles.allBtn}>
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
              <SizeBox size={30} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.ticketContainer,
                  {width: '30%', alignSelf: 'center'},
                ]}>
                <Image source={ImagePath.Ticket} />
                <Text style={styles.ticketPrice}>
                  {' '}
                  €{eventData?.price_type}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </RBSheet>
          <RBSheet
            ref={refPeopleRBSheet}
            // closeOnDragDown={true}
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
              colors={[Colors.LinearBlack, Colors.Linear]}
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
            // closeOnDragDown={true}
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
              colors={[Colors.LinearBlack, Colors.Linear]}
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
        </ImageBackground>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventDetails;
