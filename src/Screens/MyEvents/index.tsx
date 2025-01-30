import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  ImageComponent,
  Loadingcomponent,
  SizeBox,
  dummydata,
  showError,
  showSuccess,
} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {height, width} from '../../Utilities/Styles/responsiveSize';
import ImagePath from '../../Utilities/Constants/ImagePath';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {deleteEvent, getMyEvent} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {formatTimeRange} from '../../Utilities/Helpers';

const MyEvents = ({navigation}: any) => {
  const currentTime = moment();

  const [button, setButton] = useState('missed');
  const [loading, SetLoading] = useState(false);
  const [eventData, SetEventData] = useState([]);

  // console.log(user);
  const handleButton = (value: any) => {
    if (value === 'missed') {
      setButton('missed');
      getMyEvents('past');
    } else if (value === 'ongoing') {
      setButton('ongoing');
      getMyEvents('today');
    } else if (value === 'upcoming') {
      setButton('upcoming');
      getMyEvents('future');
    }
  };

  const getMyEvents = (status: any) => {
    SetLoading(true);
    getMyEvent(status)
      .then((res: any) => {
        SetLoading(false);
        SetEventData(res?.events);
      })
      .catch(err => {
        SetLoading(false), showError(err?.message);
        console.log(err);
      });
  };

  const deletePress = (id: any) => {
    deleteEvent(id)
      .then((res: any) => {
        getMyEvents('ongoing');
        showSuccess(res?.message);
      })
      .catch(err => {
        console.log(err);

        showError(err?.message);
      });
  };

  const onbackPress = () => {
    navigation.goBack();
  };

  const onEventDetails = (item: any) => {
    navigation.navigate(NavigationStrings.EventDetails, {eventId: item?.id});
  };

  const renderItem = ({item}: any) => {
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

    const remainingDays = eventStartTime.diff(currentTime, 'days');
    const remainingHours = eventStartTime.diff(currentTime, 'hours');
    const remainingMinutes = eventStartTime.diff(currentTime, 'minutes');

    const renderStatus = () => {
      if (isOngoing) {
        return {color: '#6DFF3ADD', time: 'Ongoing'};
      } else if (isPastEvent) {
        return {color: '#FFC542', time: 'Past event'};
      } else {
        if (remainingDays > 0) {
          return {color: '#6DFF3ADD', time: `In ${remainingDays} days`};
        } else if (remainingHours > 0) {
          return {color: '#6DFF3ADD', time: `In ${remainingHours} hours`};
        } else {
          return {color: '#6DFF3ADD', time: `In ${remainingMinutes} minutes`};
        }
      }
    };

    return (
      <View>
        <View style={styles.backContainer}>
          <View />
          <Text
            style={{
              ...commonStyles.font16Regular,
              color: Colors.white,
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
            </Text>
            <TouchableOpacity
              onPress={() => {
                deletePress(item?.id);
              }}>
              <VectorIcon
                groupName="MaterialCommunityIcons"
                name="delete"
                size={30}
                style={{marginRight: 15}}
                onPress={() => {
                  deletePress(item?.id);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onEventDetails(item)}
          style={styles.listContainer}>
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
            <TouchableOpacity style={styles.liktxtcon}>
              <Text style={styles.likestxt}>{item.like_count} Likes </Text>
              <Image source={ImagePath.likes} style={styles.likeimg} />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
        <SizeBox size={10} />
        <View style={{paddingHorizontal: 15}}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text
                style={{
                  ...commonStyles.font14,
                  fontFamily: fontFamily.time_bold,
                  color: renderStatus().color,
                }}>
                {renderStatus().time}
              </Text>

              {renderStatus().time === 'Past event' && (
                <Text
                  style={{
                    fontFamily: fontFamily.time_bold,
                    color: 'white',
                    fontSize: 10,
                  }}>
                  {moment(item?.event_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                </Text>
              )}
            </View>
            {renderStatus().time !== 'Past event' && (
              <Text style={styles.ontxt}>
                {formatTimeRange(
                  moment(item?.start_time, 'HH:mm:ss').format('hh:mm:ss A'),
                  moment(item?.end_time, 'HH:mm:ss').format('hh:mm:ss A'),
                )}
              </Text>
            )}
          </View>
          {renderStatus().time !== 'Past event' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  ...commonStyles.font14Center,
                  color: Colors.greyTxt,
                }}>
                Party - Afterparty{' '}
                {moment(item?.event_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
              </Text>
            </View>
          )}
        </View>
        <FlatList
          data={item.music_type}
          horizontal
          contentContainerStyle={{marginVertical: 10}}
          style={{paddingHorizontal: 15}}
          renderItem={({item}) => (
            <View style={styles.music}>
              <Text style={styles.musictxt}>{item}</Text>
            </View>
          )}
        />
        {/* </TouchableOpacity> */}
      </View>
    );
  };

  useEffect(() => {
    getMyEvents('past');
  }, []);

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loading} />
        <SizeBox size={10} />
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <VectorIcon
              groupName={'Ionicons'}
              name={'chevron-back'}
              size={25}
              onPress={onbackPress}
            />
            <Text
              style={{
                ...commonStyles.Heading20font,
                fontFamily: fontFamily.regular,
                paddingLeft: 15,
              }}>
              My Events
            </Text>
          </View>
          <VectorIcon
            groupName="Ionicons"
            name="search"
            size={28}
            color={Colors.white}
          />
        </View>
        <SizeBox size={15} />
        <View style={styles.buttonGroup}>
          <View>
            <Text
              onPress={() => handleButton('missed')}
              style={{
                ...commonStyles.font16White,
                fontWeight: '700',
                color: button === 'missed' ? Colors.lightPink : Colors.white,
              }}>
              Past
            </Text>
            {eventData?.length ? (
              <View style={styles.reddot}>
                <Text style={styles.dottxt}>{eventData?.length}</Text>
              </View>
            ) : null}
          </View>
          <Text
            onPress={() => handleButton('ongoing')}
            style={{
              ...commonStyles.font16White,
              fontWeight: '700',
              color: button === 'ongoing' ? Colors.lightPink : Colors.white,
            }}>
            Today
          </Text>
          <Text
            onPress={() => handleButton('upcoming')}
            style={{
              ...commonStyles.font16White,
              fontWeight: '700',
              color: button === 'upcoming' ? Colors.lightPink : Colors.white,
            }}>
            Future
          </Text>
        </View>
        <SizeBox size={15} />
        <View style={styles.border} />
        <SizeBox size={15} />
        {eventData?.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: width,
              marginBottom: height / 5,
              alignSelf: 'center',
            }}
            data={eventData}
            renderItem={renderItem}
          />
        ) : (
          <Text
            style={{
              ...commonStyles.font14Center,
              color: Colors.white,
            }}>
            No data found ..
          </Text>
        )}
        <SizeBox size={15} />
      </SafeAreaView>
    </LinearGradient>
  );
};
export default MyEvents;
