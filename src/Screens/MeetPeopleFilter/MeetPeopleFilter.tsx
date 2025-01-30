import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropComponentNew, { Item } from '../../Utilities/Component/DropComponentNew';
import { showError, SizeBox } from '../../Utilities/Component/Helpers';
import { getMusicTypeList, soloFilterData, teamFilterData } from '../../Utilities/Constants/auth';
import ImagePath from '../../Utilities/Constants/ImagePath';
import { Colors } from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';

export type MusicData = MusicType[];

export interface MusicType {
  __v: number;
  _id: string;
  category_id: string;
  createdAt: string;
  image: string;
  name: string;
  status: number;
}

const languageData: Item[] = [
  {_id: '0', label: 'English', value: 'English', name: 'English'},
  {_id: '1', label: 'Spanish', value: 'Spanish', name: 'Spanish'},
  {_id: '2', label: 'France', value: 'France', name: 'France'},
];

const InterestData: Item[] = [
  {
    _id: '0',
    label: 'Spontaneous meeting',
    value: 'Spontaneous meeting',
    name: 'Spontaneous meeting',
  },
  {
    _id: '1',
    label: 'Virtual meetings',
    value: 'Virtual meetings',
    name: 'Virtual meetings',
  },
  {
    _id: '2',
    label: 'Cultural experiences',
    value: 'Cultural experiences',
    name: 'Cultural experiences',
  },
  {_id: '3', label: 'Parties', value: 'Parties', name: 'Parties'},
  {_id: '4', label: 'Nightclubs', value: 'Nightclubs', name: 'Nightclubs'},
  {_id: '5', label: 'Dining', value: 'Dining', name: 'Dining'},
  {_id: '6', label: 'Activities', value: 'Activities', name: 'Activities'},
];

const AstroSignData = [
  {_id: '0', label: 'Aries', value: 'Aries', name: 'Aries'},
  {_id: '1', label: 'Taurus', value: 'Taurus', name: 'Taurus'},
  {_id: '2', label: 'Gemini', value: 'Gemini', name: 'Gemini'},
  {_id: '3', label: 'Cancer', value: 'Cancer', name: 'Cancer'},
  {_id: '4', label: 'Leo', value: 'Leo', name: 'Leo'},
  {_id: '5', label: 'Virgo', value: 'Virgo', name: 'Virgo'},
  {_id: '6', label: 'Libra', value: 'Libra', name: 'Libra'},
  {_id: '7', label: 'Scorpio', value: 'Scorpio', name: 'Scorpio'},
  {_id: '8', label: 'Sagitarrius', value: 'Sagitarrius', name: 'Sagitarrius'},
  {_id: '9', label: 'Capricorn', value: 'Capricorn', name: 'Capricorn'},
  {_id: '10', label: 'Aquarius', value: 'Aquarius', name: 'Aquarius'},
  {_id: '11', label: 'Pisces', value: 'Pisces', name: 'Pisces'},
];

const MeetPeopleFilter = ({navigation}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDistance, setSelectedDistance] = useState([1]);

  const [musicStyle, setMusicStyle] = useState<Item[]>([]);
  const [selectedMusicTypes, setSelectedMusicTypes] = useState<Item[]>([]);

  const [selectedAge, setselectedAge] = useState([1, 25]);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [selectCap, setSelectCap] = useState('2');
  const [loading, setLoading] = useState(false);

  const [interestedIn, setInterestedIn] = useState('Everyone');
  const [smoking, setSmoking] = useState('Sometimes');
  const [drinking, setDrinking] = useState('Sometimes');
  const [selectedLanguage, setSelectedLanguage] = useState<Item[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Item[]>([]);
  const [selectedAstroSigns, setSelectedAstroSigns] = useState<Item[]>([]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Interested IN
  const toggleSelectionInterest = (item: any) => {
    setInterestedIn(item);
  };

  // Smoking
  const toggleSmoking = (option: string) => {
    setSmoking(option);
  };

  // Drinking
  const toggleDrinking = (option: string) => {
    setDrinking(option);
  };

  // Music Type
  const handleMusicTypeSelection = (selectedValues: string[]) => {
    const matchingMusicTypes = musicStyle.filter(music =>
      selectedValues.includes(music._id),
    );
    setSelectedMusicTypes(matchingMusicTypes);
  };
  const toggleMusicType = (item: any) => {
    if (selectedMusicTypes.some(lang => lang._id === item._id)) {
      const updatedItems = selectedMusicTypes.filter(
        music => music._id !== item._id,
      );

      setSelectedMusicTypes(updatedItems);
    } else {
      setSelectedMusicTypes([...selectedMusicTypes, item]);
    }
  };

  // Languages
  const handleLanguageSelection = (selectedValues: string[]) => {
    const matchingLangs = languageData.filter(lang =>
      selectedValues.includes(lang._id),
    );
    setSelectedLanguage(matchingLangs);
  };
  const toggleLanguages = (item: Item) => {
    if (selectedLanguage.some(lang => lang._id === item._id)) {
      const updatedItems = selectedLanguage.filter(
        lang => lang._id !== item._id,
      );

      setSelectedLanguage(updatedItems);
    } else {
      setSelectedLanguage([...selectedLanguage, item]);
    }
  };

  // Interestes
  const handleInterestSelection = (selectedValues: string[]) => {
    const matchingInterest = InterestData.filter(lang =>
      selectedValues.includes(lang._id),
    );
    setSelectedInterests(matchingInterest);
  };
  const toggleInterest = (item: Item) => {
    if (selectedInterests.some(interest => interest._id === item._id)) {
      const updatedItems = selectedInterests.filter(
        lang => lang._id !== item._id,
      );
      setSelectedInterests(updatedItems);
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  // Astro Signs
  const handleAstroSelection = (selectedValues: string[]) => {
    const matchingAstroSigns = AstroSignData.filter(lang =>
      selectedValues.includes(lang._id),
    );
    setSelectedAstroSigns(matchingAstroSigns);
  };
  const toggleAstroSigns = (item: Item) => {
    if (selectedAstroSigns.some(interest => interest._id === item._id)) {
      const updatedItems = selectedAstroSigns.filter(
        lang => lang._id !== item._id,
      );

      setSelectedAstroSigns(updatedItems);
    } else {
      setSelectedAstroSigns([...selectedAstroSigns, item]);
    }
  };

  const soloFilterHandler = () => {
    if (activeIndex == 0) {
      const data = {
        userLatitude: lat.toString(),
        userLongitude: lon.toString(),
        max_distance: selectedDistance[0],
        gender: interestedIn,
        min_age: selectedAge[0],
        max_age: selectedAge[1],
        smoking: smoking,
        drinking: drinking,
        zodiac_sign: '',
        music_type: musicStyle[0]?._id,
        language: selectedLanguage,
      };
      // console.log(data, 'data');
      soloFilterData(data)
        .then((res: any) => {
          console.log(res, 'res in soloFilterData');
          setUserData(res?.data);
          navigation.goBack();
        })
        .catch(err => {
          console.log(err, 'err in soloFilterData');
        });
    } else {
      const data = {
        music_type: musicStyle[0]?._id,
        language: selectedLanguage,
        capacity: '2',
      };
      teamFilterData(data)
        .then((res: any) => {
          console.log(JSON.stringify(res), 'res in teamFilterData');
          setGroupData(res?.groups);
          navigation.goBack();
        })
        .catch(err => {
          console.log(err, 'err in teamFilterData');
          navigation.goBack();

        });
    }
  };

  const onRestHandler = () => {
    setselectedAge([0, 25]);
    setSelectedDistance([1]);
    setSmoking('Sometimes');
    setDrinking('Sometimes');
    setInterestedIn('Everyone');
    setSelectedLanguage([languageData[0]]);
  };

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

  useEffect(() => {
    getMusicTypeList()
      .then((res: any) => {
        if (res) {
          setMusicStyle(
            res.map((item: MusicType) => ({
              _id: item._id,
              label: item.name,
              name: item.name,
              value: item.name,
            })),
          );
        }
      })
      .catch(err => {
        showError(err?.message);
        console.log(err);
      });
  }, []);

  return (
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
              onPress={() => navigation.goBack()}>
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
                        selectCap == '2' ? Colors.lightPink : Colors.tranparent,
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
                        selectCap == '3' ? Colors.lightPink : Colors.tranparent,
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
                        selectCap == '4' ? Colors.lightPink : Colors.tranparent,
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
              <View style={{paddingLeft: 10}}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  Interested in
                </Text>
                <SizeBox size={5} />
                <FlatList
                  key={2}
                  data={['Everyone', 'Male', 'Female']}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3}
                  renderItem={({item, index}: any) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcontainer,
                        {
                          backgroundColor:
                            interestedIn === item
                              ? Colors.lightPink
                              : Colors.tranparent,
                          borderWidth: 1,
                          borderColor:
                            interestedIn === item
                              ? Colors.tranparent
                              : Colors.darkPink,
                        },
                      ]}
                      onPress={() => toggleSelectionInterest(item)}>
                      <Text
                        style={{
                          ...commonStyles.font12Regular,
                          color: Colors.white,
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
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

              <View style={{paddingLeft: 15}}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  Smoking
                </Text>
                <SizeBox size={5} />

                <FlatList
                  key={2}
                  data={['Yes', 'No', 'Sometimes']}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3}
                  renderItem={({item, index}: any) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcontainer,
                        {
                          backgroundColor:
                            smoking === item
                              ? Colors.lightPink
                              : Colors.tranparent,
                          borderWidth: 1,
                          borderColor:
                            smoking === item
                              ? Colors.tranparent
                              : Colors.darkPink,
                        },
                      ]}
                      onPress={() => toggleSmoking(item)}>
                      <Text
                        style={{
                          ...commonStyles.font12Regular,
                          color: Colors.white,
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              <SizeBox size={15} />
              <View style={{paddingLeft: 15}}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  Drinking
                </Text>
                <SizeBox size={5} />

                <FlatList
                  key={2}
                  data={['Yes', 'No', 'Sometimes']}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3}
                  renderItem={({item, index}: any) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcontainer,
                        {
                          backgroundColor:
                            drinking === item
                              ? Colors.lightPink
                              : Colors.tranparent,
                          borderWidth: 1,
                          borderColor:
                            drinking === item
                              ? Colors.tranparent
                              : Colors.darkPink,
                        },
                      ]}
                      onPress={() => toggleDrinking(item)}>
                      <Text
                        style={{
                          ...commonStyles.font12Regular,
                          color: Colors.white,
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </>
          )}
          <SizeBox size={10} />
          <View style={{paddingHorizontal: 10, zIndex: -100}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20,
              }}>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                }}>
                Music type
              </Text>
              <View
                style={{
                  zIndex: 10000, // High zIndex to ensure it appears on top
                  position: 'relative', // Ensure it doesn't get clipped
                  flex: 1,
                }}>
                <DropComponentNew
                  items={musicStyle}
                  onValueChange={handleMusicTypeSelection}
                  isActive={activeDropdown === 'dropdown1'}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="dropdown1"
                  placeholderText="Select Music Type"
                />
              </View>
            </View>
            <SizeBox size={10} />
            <FlatList
              data={musicStyle}
              numColumns={2}
              renderItem={({item}: {item: Item}) => (
                <TouchableOpacity
                  style={[
                    styles.flatcon,
                    {
                      zIndex: -100,
                      backgroundColor: selectedMusicTypes?.some(
                        selected => selected._id === item?._id,
                      )
                        ? Colors.lightPink
                        : Colors.tranparent,
                      borderWidth: 1,
                      borderColor: selectedMusicTypes?.some(
                        selected => selected._id === item?._id,
                      )
                        ? Colors.tranparent
                        : Colors.darkPink,
                    },
                  ]}
                  onPress={() => toggleMusicType(item)}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <SizeBox size={10} />

          <View style={{paddingHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20,
              }}>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                }}>
                Interests
              </Text>
              <View
                style={{
                  zIndex: 10000, // High zIndex to ensure it appears on top
                  position: 'relative', // Ensure it doesn't get clipped
                  flex: 1,
                }}>
                <DropComponentNew
                  items={InterestData}
                  onValueChange={handleInterestSelection}
                  isActive={activeDropdown === 'dropdown2'}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="dropdown2"
                  placeholderText="Select Interests"
                />
              </View>
            </View>
            <SizeBox size={10} />
            <FlatList
              data={InterestData}
              numColumns={2}
              renderItem={({item}: any) => (
                <TouchableOpacity
                  style={[
                    styles.flatcon,
                    {
                      zIndex: -100,
                      backgroundColor: selectedInterests?.some(
                        selected => selected._id === item?._id,
                      )
                        ? Colors.lightPink
                        : Colors.tranparent,
                      borderWidth: 1,
                      borderColor: selectedInterests?.some(
                        selected => selected._id === item?._id,
                      )
                        ? Colors.tranparent
                        : Colors.darkPink,
                    },
                  ]}
                  onPress={() => toggleInterest(item)}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <SizeBox size={10} />
          <View style={{paddingHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20,
              }}>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                }}>
                Languages
              </Text>
              <View
                style={{
                  zIndex: 10000, // High zIndex to ensure it appears on top
                  position: 'relative', // Ensure it doesn't get clipped
                  flex: 1,
                }}>
                <DropComponentNew
                  items={languageData}
                  onValueChange={handleLanguageSelection}
                  isActive={activeDropdown === 'dropdown3'}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="dropdown3"
                  placeholderText="Select Language"
                />
              </View>
            </View>
            <SizeBox size={10} />
            <FlatList
              data={languageData}
              numColumns={2}
              renderItem={({item}: any) => (
                <TouchableOpacity
                  style={[
                    styles.flatcon,
                    {
                      backgroundColor: selectedLanguage?.some(
                        selected => selected._id === item?._id,
                      )
                        ? Colors.lightPink
                        : Colors.tranparent,
                      borderWidth: 1,
                      borderColor: selectedLanguage?.some(
                        selected => selected._id === item?._id,
                      )
                        ? Colors.tranparent
                        : Colors.darkPink,
                    },
                  ]}
                  onPress={() => toggleLanguages(item)}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <SizeBox size={10} />

          {activeIndex == 0 && (
            <View style={{paddingHorizontal: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 20,
                }}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  Astro Signs
                </Text>
                <View
                  style={{
                    zIndex: 10000, // High zIndex to ensure it appears on top
                    position: 'relative', // Ensure it doesn't get clipped
                    flex: 1,
                  }}>
                  <DropComponentNew
                    items={AstroSignData}
                    onValueChange={handleAstroSelection}
                    isActive={activeDropdown === 'dropdown4'}
                    setActiveDropdown={setActiveDropdown}
                    dropdownKey="dropdown4"
                    placeholderText="Select Astro Signs"
                  />
                </View>
              </View>
              <SizeBox size={10} />
              <FlatList
                data={AstroSignData}
                numColumns={3}
                renderItem={({item}: any) => (
                  <TouchableOpacity
                    style={[
                      styles.flatcon,
                      {
                        zIndex: -100,
                        backgroundColor: selectedAstroSigns?.some(
                          selected => selected._id === item?._id,
                        )
                          ? Colors.lightPink
                          : Colors.tranparent,
                        borderWidth: 1,
                        borderColor: selectedAstroSigns?.some(
                          selected => selected._id === item?._id,
                        )
                          ? Colors.tranparent
                          : Colors.darkPink,
                      },
                    ]}
                    onPress={() => toggleAstroSigns(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <SizeBox size={10} />
          <View style={styles.row}>
            <View />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => soloFilterHandler()}>
              <Text style={{...commonStyles.font16Regular, color: Colors.Pink}}>
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
  );
};

export default MeetPeopleFilter;

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

  flatcon: {
    borderWidth: 1,
    backgroundColor: Colors.lightPink,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScaleVertical(28),
    borderRadius: 2,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  flatcontainer: {
    borderWidth: 1,
    backgroundColor: Colors.darkPink,
    justifyContent: 'center',
    width: '30%',
    alignItems: 'center',
    height: moderateScaleVertical(28),
    borderRadius: 2,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
