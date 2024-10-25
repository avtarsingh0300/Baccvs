import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {SizeBox, showError} from '../../Utilities/Component/Helpers';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {FlatList} from 'react-native';
import {getEventTypes} from '../../Utilities/Constants/auth';
import Modal from 'react-native-modal';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {horoscopeSigns, languages} from '../../Utilities/Constants';
import ImagePath from '../../Utilities/Constants/ImagePath';

const EventFilter = ({navigation}: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [musicStyle, setMusicStyle] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [venueType, setVenueType] = useState([]);
  const [modalVisibleLang, SetModalVisibleLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState([]);
  const [selectedValue, setSelected] = useState([0, 0]);
  const [selectedValues2, setSelectedValues2] = useState([0, 0]);
  const [selectedValue3, setSelected3] = useState([0, 0]);
  const [selectedValues4, setSelectedValues4] = useState([0, 0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const [selectedItems3, setSelectedItems3] = useState([]);
  const [selectedItemsSign, setSelectedItemsSign] = useState([]);
  const [eventSearch, setEventSearch] = useState('');
  const [eventSearchData, setEventSearchData] = useState([]);
  const [musicSearch, setMusicSearch] = useState('');
  const [musicSearchData, setMusicSearchData] = useState([]);
  const [venueSearch, setVenueSearch] = useState('');
  const [venueSearchData, setVenueSearchData] = useState([]);
  const [language2, setLanguage2] = useState('');
  const [colors, setColors] = useState(0);

  useEffect(() => {
    getEventsTypes();
  }, []);

  const renderAstro = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.flatcontainer,
        {
          backgroundColor: selectedItemsSign?.includes(item?.id)
            ? Colors.Linear
            : Colors.lightPink,
        },
      ]}
      activeOpacity={0.8}
      onPress={() => {
        toggleSelectionSign(item);
      }}>
      <Text style={{...commonStyles.font12Regular, color: Colors.white}}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );

  const getEventsTypes = () => {
    getEventTypes()
      .then(res => {
        setMusicStyle(res?.musictype);
        setEventType(res?.eventtype);
        setVenueType(res?.venuetype);
        // console.log(res, 'ressss');
      })
      .catch(err => {
        showError(err?.message), console.log(err);
      });
  };

  const selectModalHandler = (item: any) => {
    if (modalVisibleLang) {
      const filterData = selectedLang?.filter((i: any) => i == item?.name);
      if (filterData?.length > 0) {
        const filterData2 = selectedLang?.filter((i: any) => i != item?.name);
        setSelectedLang(filterData2);
      } else {
        setSelectedLang([...selectedLang, item?.name]);
      }
    } else {
    }
  };
  const onValuesChangeFinish = (values: any) => {
    setSelected(values);
  };
  const onValuesChangeFinish2 = (values: any) => {
    setSelectedValues2(values);
  };
  const onValuesChangeFinish3 = (values: any) => {
    setSelected3(values);
  };
  const onValuesChangeFinish4 = (values: any) => {
    setSelectedValues4(values);
  };
  const toggleSelection = (item: any) => {
    setSelectedItems((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item._id)) {
        return prevSelectedItems.filter((id: any) => id !== item._id);
      } else {
        return [...prevSelectedItems, item._id];
      }
    });
  };

  const toggleSelection2 = (item: any) => {
    setSelectedItems2((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item._id)) {
        return prevSelectedItems.filter(id => id !== item._id);
      } else {
        return [...prevSelectedItems, item._id];
      }
    });
  };

  const toggleSelection3 = (item: any) => {
    setSelectedItems3((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item._id)) {
        return prevSelectedItems.filter(id => id !== item._id);
      } else {
        return [...prevSelectedItems, item._id];
      }
    });
  };

  const toggleSelectionSign = (item: any) => {
    setSelectedItemsSign((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item?.id)) {
        return prevSelectedItems.filter((id: any) => id !== item?.id);
      } else {
        return [...prevSelectedItems, item.id];
      }
    });
  };

  const onbackPress = () => {
    navigation.goBack();
  };

  const resetButton = () => {
    setSelectedItems([]);
    setSelectedItems2([]);
    setSelectedItems3([]);
    setSelectedLang([]);
    setSelectedValues2([0, 0]);
    setSelected([0, 0]);
    setSelected3([0, 0]);
    setSelectedValues2([0, 0]);
  };

  useEffect(() => {
    const filteredData = eventType.filter((item: any) =>
      item?.name.toLowerCase().includes(eventSearch.toLowerCase()),
    );
    setEventSearchData(filteredData);
  }, [eventSearch, eventType]);

  useEffect(() => {
    const filteredData = musicStyle.filter((item: any) =>
      item?.name.toLowerCase().includes(musicSearch.toLowerCase()),
    );
    setMusicSearchData(filteredData);
  }, [musicSearch, musicStyle]);

  useEffect(() => {
    const filteredData = venueType.filter((item: any) =>
      item?.name.toLowerCase().includes(venueSearch.toLowerCase()),
    );
    setVenueSearchData(filteredData);
  }, [venueSearch, venueType]);

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SizeBox size={5} />
          <View style={styles.eventCon}>
            <VectorIcon
              groupName={'Ionicons'}
              name={'chevron-back'}
              size={25}
              onPress={onbackPress}
            />
            <TouchableOpacity>
              <Text
                style={[
                  styles.eventtxt,
                  {
                    color: colors == 0 ? Colors.lightPink : Colors.white,
                  },
                ]}
                onPress={() => setColors(0)}>
                Events
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={[
                  styles.eventtxt,
                  {
                    color: colors == 1 ? Colors.lightPink : Colors.white,
                  },
                ]}
                onPress={() => setColors(1)}>
                People
              </Text>
            </TouchableOpacity>
            <View />
          </View>
          <SizeBox size={10} />
          {colors == 0 ? (
            <>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                  textAlign: 'center',
                }}>
                Event and Activity Preferences
              </Text>
              <SizeBox size={20} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  Distance
                </Text>
                <Text
                  style={{...commonStyles.font16Regular, color: Colors.white}}>
                  {selectedValues2[0]} - {selectedValues2[1]} km
                </Text>
              </View>
              <View style={styles.flex}>
                <MultiSlider
                  markerStyle={styles.marker}
                  values={selectedValues2}
                  min={0}
                  max={30}
                  allowOverlap
                  sliderLength={width / 1.3}
                  selectedStyle={styles.select}
                  unselectedStyle={styles.unsel}
                  onValuesChangeFinish={onValuesChangeFinish2}
                />
              </View>
              <SizeBox size={10} />
              <View style={{paddingLeft: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font16Regular,
                      color: Colors.white,
                    }}>
                    Event type
                  </Text>
                  <View
                    style={{
                      width: moderateScale(227),
                      height: moderateScaleVertical(35),
                      borderRadius: 20,
                      backgroundColor: Colors.white,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      placeholder="Enter something here..."
                      value={eventSearch}
                      placeholderTextColor={Colors.greyTxt}
                      onChangeText={(e: string) => {
                        setEventSearch(e);
                      }}
                      style={{
                        ...commonStyles.font10Bold,
                      }}
                    />
                    <Image source={ImagePath.SearchNewGroup} />
                  </View>
                </View>
                <SizeBox size={5} />
                <FlatList
                  data={eventSearch?.length > 0 ? eventSearchData : eventType}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcon,
                        {
                          backgroundColor: selectedItems?.includes(item?._id)
                            ? Colors.Linear
                            : Colors.lightPink,
                        },
                      ]}
                      onPress={() => toggleSelection(item)}>
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  Pricing
                </Text>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  {selectedValue[0]} - {selectedValue[1]}€
                </Text>
              </View>
              <View style={styles.flexout}>
                <View>
                  <MultiSlider
                    markerStyle={styles.marker}
                    min={0}
                    max={100}
                    onValuesChangeFinish={onValuesChangeFinish}
                    allowOverlap
                    values={selectedValue}
                    sliderLength={width / 1.3}
                    selectedStyle={styles.select}
                    unselectedStyle={styles.unsel}
                  />
                </View>
              </View>
              <SizeBox size={10} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                    paddingLeft: 10,
                  }}>
                  Venue type
                </Text>
                <View
                  style={{
                    width: moderateScale(227),
                    height: moderateScaleVertical(35),
                    borderRadius: 20,
                    backgroundColor: Colors.white,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    placeholder="Enter something here..."
                    value={venueSearch}
                    placeholderTextColor={Colors.greyTxt}
                    onChangeText={(e: string) => {
                      setVenueSearch(e);
                    }}
                    style={{
                      ...commonStyles.font10Bold,
                    }}
                  />
                  <Image source={ImagePath.SearchNewGroup} />
                </View>
              </View>
              <SizeBox size={5} />
              <View style={styles.flexout}>
                <FlatList
                  data={venueSearch?.length > 0 ? venueSearchData : venueType}
                  numColumns={2}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcon,
                        {
                          backgroundColor: selectedItems2.includes(item._id)
                            ? Colors.Linear
                            : Colors.lightPink,
                        },
                      ]}
                      onPress={() => toggleSelection2(item)}>
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
              <View style={{paddingLeft: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
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
                      width: moderateScale(227),
                      height: moderateScaleVertical(35),
                      borderRadius: 20,
                      backgroundColor: Colors.white,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      placeholder="Enter something here..."
                      value={musicSearch}
                      placeholderTextColor={Colors.greyTxt}
                      onChangeText={(e: string) => {
                        setMusicSearch(e);
                      }}
                      style={{
                        ...commonStyles.font10Bold,
                      }}
                    />
                    <Image source={ImagePath.SearchNewGroup} />
                  </View>
                </View>
                <SizeBox size={5} />
                <FlatList
                  data={musicSearch?.length > 0 ? musicSearchData : musicStyle}
                  numColumns={2}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcon,
                        {
                          backgroundColor: selectedItems3.includes(item._id)
                            ? Colors.Linear
                            : Colors.lightPink,
                        },
                      ]}
                      onPress={() => toggleSelection3(item)}>
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
              <TouchableOpacity
                style={styles.flatbox}
                activeOpacity={0.5}
                onPress={() => SetModalVisibleLang(true)}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                    paddingLeft: 10,
                  }}>
                  Languages
                </Text>
              </TouchableOpacity>
              <SizeBox size={15} />
              <View style={styles.Btnmain}>
                <LinearGradient
                  colors={[Colors.lightPink, Colors.lightPink]}
                  style={styles.btn}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.text}>Apply</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <Text
                  onPress={resetButton}
                  style={[styles.text, {color: Colors.white}]}>
                  Reset
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                  paddingLeft: 20,
                }}>
                Social preferences
              </Text>
              <SizeBox size={20} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  Distance
                </Text>
                <Text
                  style={{...commonStyles.font16Regular, color: Colors.white}}>
                  {selectedValue3[0]} - {selectedValue3[1]} km
                </Text>
              </View>
              <View style={styles.flex}>
                <MultiSlider
                  markerStyle={styles.marker}
                  values={selectedValue3}
                  min={0}
                  max={100}
                  allowOverlap
                  sliderLength={width / 1.3}
                  selectedStyle={styles.select}
                  unselectedStyle={styles.unsel}
                  onValuesChangeFinish={onValuesChangeFinish3}
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
                  data={[{id: 1}]}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.flatcontainer}
                      onPress={() => toggleSelection(item)}>
                      <Text
                        style={{
                          ...commonStyles.font12Regular,
                          color: Colors.white,
                        }}>
                        Everyone
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <SizeBox size={10} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  {` `}Age
                </Text>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  {selectedValues4[0]} - {selectedValues4[1]}
                </Text>
              </View>
              <View style={styles.flexout}>
                <View>
                  <MultiSlider
                    markerStyle={styles.marker}
                    values={selectedValues4}
                    min={0}
                    max={80}
                    allowOverlap
                    sliderLength={width / 1.3}
                    selectedStyle={styles.select}
                    unselectedStyle={styles.unsel}
                    onValuesChangeFinish={onValuesChangeFinish4}
                  />
                </View>
              </View>
              <SizeBox size={10} />
              <View style={{paddingLeft: 15}}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                  }}>
                  Smoking
                </Text>
                <SizeBox size={5} />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.flatcontainer}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.flatcontainer, {marginHorizontal: 2}]}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      No
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.flatcontainer}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      Sometimes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <SizeBox size={10} />
              <View style={{paddingLeft: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
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
                      width: moderateScale(227),
                      height: moderateScaleVertical(35),
                      borderRadius: 20,
                      backgroundColor: Colors.white,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      placeholder="Enter something here..."
                      value={musicSearch}
                      placeholderTextColor={Colors.greyTxt}
                      onChangeText={(e: string) => {
                        setMusicSearch(e);
                      }}
                      style={{
                        ...commonStyles.font10Bold,
                      }}
                    />
                    <Image source={ImagePath.SearchNewGroup} />
                  </View>
                </View>
                <SizeBox size={5} />
                <FlatList
                  data={musicStyle}
                  numColumns={2}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcon,
                        {
                          backgroundColor: selectedItems3.includes(item?._id)
                            ? Colors.Linear
                            : Colors.lightPink,
                        },
                      ]}
                      onPress={() => toggleSelection3(item)}>
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
              <TouchableOpacity
                style={styles.flatbox}
                activeOpacity={0.5}
                onPress={() => SetModalVisibleLang(true)}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                    paddingLeft: 10,
                  }}>
                  Languages
                </Text>
              </TouchableOpacity>
              <SizeBox size={10} />
              <View>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                    paddingLeft: 15,
                  }}>
                  Astro Sign
                </Text>
                <SizeBox size={5} />
                <FlatList
                  data={horoscopeSigns}
                  renderItem={renderAstro}
                  numColumns={3}
                  style={{paddingLeft: 15}}
                />
              </View>
              <SizeBox size={15} />
              <View style={styles.Btnmain}>
                <LinearGradient
                  colors={[Colors.lightPink, Colors.lightPink]}
                  style={styles.btn}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.text}>Apply</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <Text
                  onPress={resetButton}
                  style={[styles.text, {color: Colors.white}]}>
                  Reset
                </Text>
              </View>
            </>
          )}
          <Modal
            isVisible={modalVisibleLang}
            style={{
              justifyContent: 'flex-end',
              margin: 0,
            }}
            onBackdropPress={() => {
              SetModalVisibleLang(false);
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
                  data={languages}
                  keyExtractor={(item, index) => index?.toString()}
                  renderItem={({item, index}) => {
                    const lengthFlag = languages?.length;

                    const filterData = selectedLang?.filter(
                      (i: any) => i == item?.name,
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
                          {item?.name}
                        </Text>
                        <VectorIcon
                          groupName="MaterialCommunityIcons"
                          name={
                            filterData[0] == item?.name
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
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventFilter;
