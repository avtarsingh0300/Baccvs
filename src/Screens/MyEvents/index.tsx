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
} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {height, width} from '../../Utilities/Styles/responsiveSize';
import ImagePath from '../../Utilities/Constants/ImagePath';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {getMyEvent} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';

const MyEvents = ({navigation}: any) => {
  const [button, setButton] = useState('missed');
  const [loading, SetLoading] = useState(false);
  const [eventData, SetEventData] = useState([]);

  const handleButton = (value: any) => {
    if (value === 'missed') {
      setButton('missed');
      getMyEvents('missed');
    } else if (value === 'ongoing') {
      setButton('ongoing');
      getMyEvents('ongoing');
    } else if (value === 'upcoming') {
      setButton('upcoming');
      getMyEvents('upcoming');
    }
  };

  useEffect(() => {
    getMyEvents('ongoing');
  }, []);

  const getMyEvents = (status: any) => {
    console.log(status);
    SetLoading(true);
    getMyEvent(status)
      .then(res => {
        SetLoading(false);
        SetEventData(res?.events), console.log(res?.events);
      })
      .catch(err => {
        SetLoading(false), showError(err?.message);
        console.log(err);
      });
  };
  const onbackPress = () => {
    navigation.goBack();
  };

  const onEventDetails = (item: any) => {
    navigation.navigate(NavigationStrings.EventDetails, {eventId: item?.id});
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onEventDetails(item)}>
      <View>
        <View style={styles.listContainer}>
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
                {` `}
              </Text>
                <VectorIcon groupName='MaterialCommunityIcons' name='delete' size={20} style={{marginRight:15}}/>
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
            <TouchableOpacity style={styles.liktxtcon}>
              <Text style={styles.likestxt}>{item.like_count} Likes </Text>
              <Image source={ImagePath.likes} style={styles.likeimg} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <SizeBox size={14} />
        <View style={{paddingHorizontal: 15}}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
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
                {item?.regular_price} €
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
