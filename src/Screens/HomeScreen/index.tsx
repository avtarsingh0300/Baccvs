import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  Drawer,
  ImageComponent,
  SizeBox,
  dummydata,
} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  height,
  moderateScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import fontFamily from '../../Utilities/Styles/fontFamily';
import commonStyles from '../../Utilities/Styles/commonStyles';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
const HomeScreen = ({navigation}: any) => {
  const [location, setLocation] = useState(null);
  const swiper: any = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [modalVisible, SetModalVisible] = useState(false);
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
  const showDrawer = () => {
    SetModalVisible(!modalVisible);
  };
  const onFilter = () => {
    navigation.navigate(NavigationStrings.EventFilter);
  };
  const onNoti = () => {
    navigation.navigate(NavigationStrings.Notification);
  };
  const onEventDetails = () => {
    navigation.navigate(NavigationStrings.EventDetails);
  };
  const onMapPress = () => {
    navigation.navigate(NavigationStrings.MapScreen);
  };

  const renderItem = () => (
    <TouchableOpacity activeOpacity={0.8} onPress={onEventDetails}>
      <View>
        <View style={styles.listContainer}>
          <View style={styles.backContainer}>
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
                {` `}FREE
              </Text>
            </View>
            <Text
              style={{
                ...commonStyles.font16Regular,
                color: Colors.Pink,
              }}>
              One life
            </Text>
            <Text style={styles.ontxt}>
              Ongoing{` `}
              <Text
                style={{
                  color: Colors.white,
                }}>
                - 05h00
              </Text>
            </Text>
          </View>
          <ImageBackground source={ImagePath.ProfileImg} style={styles.backimg}>
            <View style={styles.flexinner}>
              <ImageComponent
                source={ImagePath.ProfileImg}
                style={styles.shortimg}
              />
              <ImageComponent
                source={ImagePath.ProfileImg}
                style={[
                  styles.extraimg,
                  {
                    marginLeft: 5,
                  },
                ]}
              />
              <ImageComponent
                source={ImagePath.ProfileImg}
                style={[
                  styles.extraimg,
                  {
                    right: 10,
                  },
                ]}
              />
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  alignSelf: 'flex-end',
                  color: Colors.white,
                }}>
                +8
              </Text>
            </View>
          </ImageBackground>
        </View>
        <SizeBox size={14} />
        <View style={styles.music}>
          <Text style={styles.musictxt}>Progressive</Text>
        </View>
        <View style={styles.backContainer}>
          <View style={styles.flex}>
            <VectorIcon groupName="Feather" name="users" size={15} />
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.red,
              }}>
              {` `}3 spots left
            </Text>
          </View>
          <Text
            style={{
              ...commonStyles.font14Center,
              color: Colors.white,
            }}>
            Party - Afterparty
          </Text>
          <View style={styles.flex}>
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.white,
              }}>
              2 km{` `}
            </Text>
            <VectorIcon groupName="Feather" name="map-pin" size={15} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={showDrawer}>
            <ImageComponent
              source={ImagePath.ProfileImg}
              style={styles.profileimg}
            />
          </TouchableOpacity>
          <ImageComponent
            source={ImagePath.AppLogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.rowvw}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="map-marker-radius-outline"
              size={25}
              onPress={onMapPress}
              style={{right: moderateScale(25)}}
            />
            <VectorIcon
              groupName="Fontisto"
              name="bell"
              onPress={onNoti}
              size={25}
              style={{right: moderateScale(12)}}
            />
            <TouchableOpacity onPress={onFilter}>
              <ImageComponent
                source={ImagePath.filterIcon}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
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
                        setValue(item.date), console.log(item.date);
                      }}>
                      <LinearGradient
                        colors={[
                          isActive ? Colors.Pink : Colors.calenderback,
                          isActive ? Colors.LinearBlack : Colors.calenderback,
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
        <LinearGradient
          colors={[Colors.Linear, Colors.LinearBlack]}
          style={styles.datevw}>
          <Text style={styles.date}>
            {moment(value).format('DD MMMM YYYY')} (18)
          </Text>
          <TouchableOpacity style={styles.allBtn}>
            <Text style={{color: Colors.red, ...commonStyles.font12Regular}}>
              All
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            width: width,
            alignSelf: 'center',
            marginBottom:
              Platform.OS === 'android' ? height / 3.5 : height / 3.6,
          }}
          data={dummydata}
          renderItem={renderItem}
        />
        <Drawer
          isVisible={modalVisible}
          onBackdropPress={showDrawer}
          onClose={showDrawer}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;
