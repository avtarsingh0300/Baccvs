import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../Styles/colors';
import Geolocation from '@react-native-community/geolocation';
import {
  getMusicTypeList,
  soloFilterData,
  teamFilterData,
} from '../Constants/auth';
import {showError, SizeBox} from './Helpers';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ImagePath from '../Constants/ImagePath';
import commonStyles from '../Styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../Styles/responsiveSize';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

const MeetFilterModal = ({
  showModal,
  setShowModal,
  setUserData,
  setGroupData,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDistance, setSelectedDistance] = useState([1]);
  const [musicStyle, setMusicStyle] = useState([]);
  const [musicType, setMusicType] = useState({});
  const [musicType1, setMusicType1] = useState({});
  const [selectedAge, setselectedAge] = useState([1, 25]);
  const [selectedSmoke, setSelectedSmoke] = useState('Sometimes');
  const [selectedDrink, setSelectedDrink] = useState('Sometimes');
  const [selectedGender, setSelectedGender] = useState('Everyone');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedSign, setSelectedSign] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [selectCap, setSelectCap] = useState('2');
  const [loading, setLoading] = useState(false);
  const [Interest, setInterest] = useState('');

  useEffect(() => {
    getEventsTypes();
  }, []);

  const getEventsTypes = () => {
    getMusicTypeList()
      .then(res => {
        // console.log(res, 'res in ghetkdfjkdbn');
        setMusicStyle(res);
        // setLoader(false);
      })
      .catch(err => {
        // setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };

  const onRestHandler = () => {
    setselectedAge([0, 25]);
    setSelectedDistance([1]);
    setMusicType({});
    setSelectedSmoke('Sometimes');
    setSelectedDrink('Sometimes');
    setSelectedGender('Everyone');
    setSelectedLanguage('English');
    setSelectedSign('');
  };

  //   console.log(showModal);

  const InterestList = [
    'Spontaneous meeting',
    'Virtual meetings',
    'Cultural experiences',
    'Parties',
    'Nightclubs',
    'Dining',
    'Activities',
  ];

  const signData = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagitarrius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else if (Platform.OS === 'ios') {
        // Geolocation.requestAuthorization();
        getLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLoading(true);
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      error => {
        setLoading(false);
        console.log(error.code, error.message);
      },
      {
        timeout: 15000,
      },
    );
  };
  const soloFilterHandler = () => {
    if (activeIndex == 0) {
      const data = {
        userLatitude: lat.toString(),
        userLongitude: lon.toString(),
        max_distance: selectedDistance[0],
        gender: selectedGender,
        min_age: selectedAge[0],
        max_age: selectedAge[1],
        smoking: selectedSmoke,
        drinking: selectedDrink,
        zodiac_sign: selectedSign,
        music_type: musicType?._id,
        language: selectedLanguage,
      };
      // console.log(data, 'data');
      soloFilterData(data)
        .then(res => {
          console.log(res, 'res in soloFilterData');
          setUserData(res?.data);
          setShowModal(false);
        })
        .catch(err => {
          console.log(err, 'err in soloFilterData');
          setShowModal(false);
        });
    } else {
      const data = {
        music_type: musicType?._id,
        language: selectedLanguage,
        capacity: '2',
      };
      teamFilterData(data)
        .then(res => {
          console.log(JSON.stringify(res), 'res in teamFilterData');
          setGroupData(res?.groups);
          setShowModal(false);
        })
        .catch(err => {
          console.log(err, 'err in teamFilterData');
          setShowModal(false);
        });
    }
  };
  const renderItem = ({item}) => (
    <View
      style={[styles.row, {flexWrap: 'wrap', justifyContent: 'space-around'}]}>
      {InterestList.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setInterest(item)}
          style={[
            styles.selectContainer,
            {
              backgroundColor:
                Interest == item ? Colors.lightPink : Colors.backgroundNew,
              marginBottom: 10,
            },
          ]}>
          <Text style={styles.selectText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Modal
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={() => setShowModal(false)}
      avoidKeyboard={true}
      style={{flex: 1, backgroundColor: Colors.backgroundNew}}
      isVisible={showModal}
      backdropOpacity={1}>
      <LinearGradient
        colors={[Colors.backgroundNew, Colors.backgroundNew]}
        start={{x: 0, y: 0}}
        end={{x: 1.3, y: 0.9}}
        style={[styles.optionContainer]}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SizeBox size={15} />
            <View style={styles.header}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backBtn}
                onPress={() => setShowModal(false)}>
                <Image source={ImagePath.Arrow_Left_2} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.topBtn, {marginRight: 0}]}
                  onPress={() => setActiveIndex(0)}>
                  <Text
                    style={{
                      ...commonStyles.font20White,
                      color: activeIndex == 0 ? Colors.lightPink : Colors.white,
                    }}>
                    Solo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.topBtn}
                  onPress={() => setActiveIndex(1)}>
                  <Text
                    style={{
                      ...commonStyles.font20White,
                      color: activeIndex == 1 ? Colors.lightPink : Colors.white,
                    }}>
                    Teams
                  </Text>
                </TouchableOpacity>
              </View>
              <View />
            </View>
            <Text
              style={{
                ...commonStyles.font20White,
                marginLeft: moderateScale(27),
              }}>
              Social preferences
            </Text>
            <SizeBox size={10} />
            {activeIndex == 1 && (
              <>
                <View style={[styles.row, {}]}>
                  <Text style={styles.label}>Team capacity</Text>
                  {/* <View style={{flexDirection: 'row'}}>
                    <Text style={[commonStyles.font12, {marginRight: 5}]}>
                      Open to date everyone
                    </Text>
                    <ToggleSwitch
                      isOn={selectedTeam}
                      onColor={Colors.lightPink}
                      offColor={Colors.white}
                      trackOffStyle={{
                        backgroundColor: Colors.backgroundNew,
                        borderWidth: 1,
                        borderColor: Colors.white,
                      }}
                      size="small"
                      onToggle={() => setSelectedTeam(!selectedTeam)}
                    />
                  </View> */}
                </View>
                <SizeBox size={10} />
                <View
                  style={[
                    styles.row,
                    {
                      marginHorizontal: moderateScale(35),
                      justifyContent: 'flex-start',
                    },
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectCap('2')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectCap == '2'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectCap('3')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectCap == '3'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectCap('4')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectCap == '4'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>4</Text>
                  </TouchableOpacity>
                </View>
                <SizeBox size={12} />
              </>
            )}
            {activeIndex == 0 && (
              <>
                <View style={[styles.row, {}]}>
                  <Text style={styles.label}>Distance</Text>
                  <Text style={commonStyles.font14}>
                    {selectedDistance[0]} km
                  </Text>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <MultiSlider
                    markerStyle={styles.marker}
                    min={0}
                    max={100}
                    onValuesChangeFinish={value => setSelectedDistance(value)}
                    allowOverlap={false}
                    values={selectedDistance} // Wrap the single value in an array
                    sliderLength={width / 1.3}
                    selectedStyle={styles.select}
                    unselectedStyle={styles.unsel}
                  />
                </View>
                <SizeBox size={10} />
                <View style={[styles.row, {}]}>
                  <Text style={styles.label}>Interested in</Text>
                  {/* <View style={{flexDirection: 'row'}}>
              <Text style={[commonStyles.font12, {marginRight: 5}]}>
              Open to date everyone
              </Text>
              <ToggleSwitch
              isOn={selectedIntersted}
              onColor={Colors.lightPink}
              offColor={Colors.white}
              trackOffStyle={{
                backgroundColor: Colors.backgroundNew,
                borderWidth: 1,
                borderColor: Colors.white,
                }}
                size="small"
                onToggle={() => setSelectedIntersted(!selectedIntersted)}
                />
                </View> */}
                </View>
                <SizeBox size={10} />
                <View
                  style={[styles.row, {marginHorizontal: moderateScale(35)}]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedGender('Everyone')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectedGender == 'Everyone'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>Everyone</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedGender('Male')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectedGender == 'Male'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedGender('Female')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectedGender == 'Female'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>Female</Text>
                  </TouchableOpacity>
                </View>
                <SizeBox size={12} />
                <View style={[styles.row, {}]}>
                  <Text style={styles.label}>Age</Text>
                  <Text style={commonStyles.font14}>
                    {selectedAge[0]} - {selectedAge[1]}
                  </Text>
                </View>
                <SizeBox size={5} />
                <View style={{alignSelf: 'center'}}>
                  <MultiSlider
                    markerStyle={styles.marker}
                    min={0}
                    max={40}
                    onValuesChangeFinish={value => setselectedAge(value)}
                    allowOverlap={false}
                    values={selectedAge} // Wrap the single value in an array
                    sliderLength={width / 1.3}
                    selectedStyle={styles.select}
                    unselectedStyle={styles.unsel}
                  />
                </View>
                <SizeBox size={5} />
                <View style={[styles.row, {}]}>
                  <Text style={styles.label}>Smoking</Text>
                </View>
                <SizeBox size={12} />
                <View
                  style={[
                    styles.row,
                    {
                      marginHorizontal: moderateScale(35),
                      justifyContent: 'flex-start',
                    },
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedSmoke('Yes')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectedSmoke == 'Yes'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedSmoke('No')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectedSmoke == 'No'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedSmoke('Sometimes')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectedSmoke == 'Sometimes'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>Sometimes</Text>
                  </TouchableOpacity>
                </View>
                <SizeBox size={15} />
                <View style={[styles.row, {}]}>
                  <Text style={styles.label}>Drinking</Text>
                </View>
                <SizeBox size={7} />
                <View
                  style={[
                    styles.row,
                    {
                      marginHorizontal: moderateScale(35),
                      justifyContent: 'flex-start',
                    },
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedDrink('Yes')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectedDrink == 'Yes'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedDrink('No')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectedDrink == 'No'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedDrink('Sometimes')}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          selectedDrink == 'Sometimes'
                            ? Colors.lightPink
                            : Colors.tranparent,
                      },
                    ]}>
                    <Text style={styles.selectText}>Sometimes</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <SizeBox size={10} />
            <View style={[styles.row, {}]}>
              <Text style={styles.label}>Music Type</Text>
            </View>
            <SizeBox size={7} />
            <View
              style={[
                styles.row,
                {flexWrap: 'wrap', justifyContent: 'space-around'},
              ]}>
              {musicStyle?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setMusicType(item)}
                  style={[
                    styles.selectContainer,
                    {
                      backgroundColor:
                        musicType?.name == item?.name
                          ? Colors.lightPink
                          : Colors.backgroundNew,
                      marginBottom: 10,
                    },
                  ]}>
                  <Text style={styles.selectText}>{item?.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <SizeBox size={10} />
            <View style={[styles.row, {}]}>
              <Text style={styles.label}>Interests</Text>
            </View>
            <SizeBox size={7} />
            <FlatList
              data={[{id: 1}]}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <SizeBox size={10} />
            <View style={[styles.row, {}]}>
              <Text style={styles.label}>Languages</Text>
            </View>
            <SizeBox size={7} />
            <View
              style={[
                styles.row,
                {
                  marginHorizontal: moderateScale(35),
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedLanguage('English')}
                style={[
                  styles.selectContainer,
                  {
                    backgroundColor:
                      selectedLanguage == 'English'
                        ? Colors.lightPink
                        : Colors.tranparent,
                  },
                ]}>
                <Text style={styles.selectText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedLanguage('French')}
                style={[
                  styles.selectContainer,
                  {
                    backgroundColor:
                      selectedLanguage == 'French'
                        ? Colors.lightPink
                        : Colors.tranparent,
                  },
                ]}>
                <Text style={styles.selectText}>French</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedLanguage('Spanish')}
                style={[
                  styles.selectContainer,
                  {
                    backgroundColor:
                      selectedLanguage == 'Spanish'
                        ? Colors.lightPink
                        : Colors.tranparent,
                  },
                ]}>
                <Text style={styles.selectText}>Spanish</Text>
              </TouchableOpacity>
            </View>
            <SizeBox size={10} />
            {activeIndex == 0 && (
              <>
                <View style={[styles.row, {}]}>
                  <Text style={styles.label}>Astro Sign</Text>
                </View>
                <SizeBox size={7} />
                <View
                  style={[
                    styles.row,
                    {flexWrap: 'wrap', justifyContent: 'space-around'},
                  ]}>
                  {signData.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() => setSelectedSign(item)}
                      style={[
                        styles.selectContainer,
                        {
                          backgroundColor:
                            selectedSign == item
                              ? Colors.lightPink
                              : Colors.tranparent,
                          marginBottom: 10,
                        },
                      ]}>
                      <Text style={styles.selectText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
            <SizeBox size={10} />
            <View style={styles.row}>
              <View />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => soloFilterHandler()}>
                <Text
                  style={{...commonStyles.font16Regular, color: Colors.Pink}}>
                  Apply
                </Text>
              </TouchableOpacity>
              <Text style={styles.resetText} onPress={() => onRestHandler()}>
                Reset
              </Text>
            </View>
            <SizeBox size={15} />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
};

export default MeetFilterModal;

const styles = StyleSheet.create({
  optionContainer: {
    flex: 1,
    // width: width,
  },
  //   LinearConatiner: {flex: 1, paddingHorizontal: 20},
  backBtn: {},
  header: {
    // paddingHorizontal: moderateScale(36),
    paddingVertical: moderateScaleVertical(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(10),
  },
  topBtn: {
    width: moderateScale(80),
    marginRight: moderateScale(27),
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: moderateScale(20),
  },
  label: {
    ...commonStyles.font16WhiteBold,
  },
  marker: {
    height: moderateScaleVertical(15),
    width: moderateScale(15),
    alignSelf: 'center',
    borderWidth: 0,
    backgroundColor: Colors.lightPink,
  },
  select: {
    backgroundColor: Colors.lightPink,
    height: 3,
    alignSelf: 'center',
    borderRadius: 5,
  },
  unsel: {
    backgroundColor: Colors.white,
    height: 3,
    alignSelf: 'center',
    borderRadius: 5,
  },
  selectText: {
    ...commonStyles.font12,
  },
  selectContainer: {
    paddingVertical: 6,
    paddingHorizontal: moderateScale(16),
    borderRadius: 2,
    marginRight: 7,
    borderWidth: 0.5,
    borderColor: Colors.lightPink,
  },
  btn: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(12),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  resetText: {
    ...commonStyles.font14,
  },
});
