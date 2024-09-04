import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
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
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import ImagePath from '../../Utilities/Constants/ImagePath';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {getMyEvent} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

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
  const renderItem = ({item}: any) => (
    <View>
      <View style={styles.listContainer}>
        <SizeBox size={5} />
        <View style={styles.buttonGroup}>
          <Text
            style={{
              ...commonStyles.font14Center,
              color: Colors.red,
            }}>
            Ongoing
          </Text>
          <Text
            style={{
              ...commonStyles.font14Center,
            }}>
            Agora
          </Text>
          <Text
            style={{
              ...commonStyles.font14Center,
              color: Colors.red,
            }}>
            Host
          </Text>
        </View>

        <SizeBox size={5} />
        <ImageBackground
          source={{uri: IMAGE_URL + item?.thumbnail_urls[0]}}
          borderRadius={5}
          style={styles.backimg}>
          <View style={styles.icon}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="dots-vertical"
              size={25}
            />
          </View>
          <View style={styles.positionVw}>
            <View style={styles.flexinner}>
              {item?.members[0]?.imageUrl ? (
                <ImageComponent
                  source={{uri: IMAGE_URL + item?.members[0]?.imageUrl}}
                  style={styles.shortimg}
                />
              ) : null}
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
              {item.members.length > 3 ? (
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    alignSelf: 'flex-end',
                    color: Colors.white,
                  }}>
                  +{item.members.length - 3}
                </Text>
              ) : null}
            </View>
            <View style={styles.priceVw}>
              <ImageComponent
                source={ImagePath.priceTag}
                resizeMode="contain"
                style={{
                  width: moderateScale(15),
                  height: moderateScaleVertical(15),
                }}
              />
              <Text
                style={{
                  ...commonStyles.font14,
                  fontFamily: fontFamily.time_regular,
                  color: Colors.white,
                }}>
                {` `}Free
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
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
