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
import React, {useMemo, useRef, useState} from 'react';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
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
} from '../../Utilities/Component/Helpers';
import {ImageBackground} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import styles from './style';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import MapView, {Marker} from 'react-native-maps';

const AddScreen = ({navigation}: any) => {
  const swiper: any = useRef();

  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [modalVisible, SetModalVisible] = useState(false);
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
            <Text
              style={{...commonStyles.font12Regualar2, color: Colors.green}}>
              Event Name
            </Text>
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
              initialRegion={initialRegion}>
              <Marker
                coordinate={{latitude: 37.78825, longitude: -122.4324}}
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
            <TouchableOpacity style={styles.cardBtn}>
              <VectorIcon
                groupName="SimpleLineIcons"
                name="screen-smartphone"
                size={20}
                color={Colors.Pink}
              />
              <Text
                style={{...commonStyles.font12Regualar2, color: Colors.white}}>
                {`  `}+33 (___) ___ _____
              </Text>
            </TouchableOpacity>
            <SizeBox size={10} />
            <TouchableOpacity style={styles.cardBtn}>
              <VectorIcon
                groupName="Feather"
                name="users"
                size={20}
                color={Colors.Pink}
              />
              <Text
                style={{...commonStyles.font12Regualar2, color: Colors.white}}>
                {`  `}Number of people allowed
              </Text>
            </TouchableOpacity>
            <SizeBox size={10} />
            <TouchableOpacity style={styles.cardBtn}>
              <VectorIcon
                groupName="Feather"
                name="speaker"
                size={25}
                color={Colors.Pink}
              />
              <Text
                style={{...commonStyles.font12Regualar2, color: Colors.white}}>
                {`  `}Music Style
              </Text>
            </TouchableOpacity>
            <SizeBox size={10} />
            <TouchableOpacity style={styles.cardBtn}>
              <Image
                resizeMode="contain"
                source={ImagePath.priceTag}
                style={{
                  tintColor: Colors.Pink,
                  width: moderateScale(22),
                  height: moderateScaleVertical(22),
                }}
              />
              <Text
                style={{...commonStyles.font12Regualar2, color: Colors.white}}>
                {`  `}Free / Chargeable
              </Text>
            </TouchableOpacity>
            <SizeBox size={10} />
            <TouchableOpacity style={styles.cardBtn}>
              <ImageComponent
                resizeMode="contain"
                source={ImagePath.lang}
                style={{
                  width: moderateScale(22),
                  height: moderateScaleVertical(22),
                }}
              />
              <Text
                style={{...commonStyles.font12Regualar2, color: Colors.white}}>
                {`  `}Languages
              </Text>
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
                data={dummydata}
                renderItem={({item}) => (
                  <View style={styles.flatcon}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      event
                    </Text>
                    <View style={styles.tickvw}>
                      <VectorIcon
                        groupName="MaterialCommunityIcons"
                        name="check-outline"
                        color={Colors.Pink}
                        size={15}
                        style={{bottom: 5, alignSlef: 'centre'}}
                      />
                    </View>
                  </View>
                )}
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
                data={dummydata}
                renderItem={({item}) => (
                  <View style={styles.flatcon}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      event
                    </Text>
                    <View style={styles.tickvw}>
                      <VectorIcon
                        groupName="MaterialCommunityIcons"
                        name="check-outline"
                        color={Colors.Pink}
                        size={15}
                        style={{bottom: 5, alignSlef: 'centre'}}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
            <SizeBox size={10} />
            <View style={styles.flatbox}>
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
            </View>
            <SizeBox size={10} />
            <View style={styles.flatbox}>
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
            </View>
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
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddScreen;
