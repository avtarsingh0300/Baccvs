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
import DropComponentNew from '../../Utilities/Component/DropComponentNew';
import {SectionList} from 'react-native';

const EventFilter = ({navigation}: any) => {
  const [musicStyle, setMusicStyle] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [venueType, setVenueType] = useState([]);
  const [modalVisibleLang, SetModalVisibleLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState<any>([]);
  const [selectedValue, setSelected] = useState([0, 0]);
  const [selectedValues2, setSelectedValues2] = useState([0, 0]);
  const [selectedValue3, setSelected3] = useState([0, 0]);
  const [selectedValues4, setSelectedValues4] = useState([0, 0]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const [selectedItems3, setSelectedItems3] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [selectedItemsSign, setSelectedItemsSign] = useState([]);
  const [eventSearch, setEventSearch] = useState('');
  const [eventSearchData, setEventSearchData] = useState([]);
  const [musicSearch, setMusicSearch] = useState('');
  const [musicSearchData, setMusicSearchData] = useState([]);
  const [venueSearch, setVenueSearch] = useState('');
  const [venueSearchData, setVenueSearchData] = useState([]);
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
            ? Colors.darkPink
            : Colors.tranparent,
          borderWidth: 1,
          borderColor: selectedItemsSign?.includes(item?.id)
            ? Colors.tranparent
            : Colors.darkPink,
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
      .then((res: any) => {
        let musicStyleData: any = [];
        res?.MusicStyle?.map((i: any, index: number) => {
          musicStyleData.push({
            label: i?.name,
            value: i?.name,
            _id: i?._id,
            name: i?.name,
          });
        });
        setMusicStyle(musicStyleData);
        let eventTypeData: any = [];
        res?.eventtype?.map((i: any, index: number) => {
          eventTypeData.push({
            label: i?.name,
            value: i?.name,
            _id: i?._id,
            name: i?.name,
          });
        });
        let venuetypeData: any = [];
        res?.venuetype?.map((i: any, index: number) => {
          venuetypeData.push({
            label: i?.name,
            value: i?.name,
            _id: i?._id,
            name: i?.name,
          });
        });
        setEventType(eventTypeData);
        setVenueType(venuetypeData);
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

  const selectModalTitleHandler = (title: string) => {
    if (modalVisibleLang) {
      const filterData = languages
        .filter(i => i.title === title) // Get only the category with the given title
        .flatMap(i => i.data.map(item => item.name)); // Extract and flatten the names

      // console.log(filterData, 'filterData');

      // Update selectedLang by toggling the filtered data
      setSelectedLang((prevSelectedLang: any) => {
        // Check if all `filterData` items are already selected
        const allSelected = filterData.every(item =>
          prevSelectedLang.includes(item),
        );

        if (allSelected) {
          // If all are selected, remove them from the selectedLang array
          return prevSelectedLang.filter(
            (item: any) => !filterData.includes(item),
          );
        } else {
          // If not all are selected, add the remaining items to the array
          const newItems = filterData.filter(
            item => !prevSelectedLang.includes(item),
          );
          return [...prevSelectedLang, ...newItems];
        }
      });
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
    setSelectedItems(item);
  };
  const toggleSelectionInterest = (item: any) => {
    setSelectedInterest(item);
  };

  const toggleSelection2 = (item: any) => {
    setSelectedItems2(item);
  };

  const toggleSelection3 = (item: any) => {
    setSelectedItems3(item);
  };

  const toggleSelectionSign = (item: any) => {
    setSelectedItemsSign(item);
  };

  const onbackPress = () => {
    navigation.goBack();
  };

  const resetButton = () => {
    setSelectedItems([]);
    setSelectedItems2([]);
    setSelectedItems3([]);
    setSelectedInterest([]);
    setSelectedLang([]);
    setSelectedValues2([0, 0]);
    setSelected([0, 0]);
    setSelected3([0, 0]);
    setSelectedValues2([0, 0]);
  };

  // useEffect(() => {
  //   const filteredData = eventType.filter((item: any) =>
  //     item?.name.toLowerCase().includes(eventSearch.toLowerCase()),
  //   );
  //   setEventSearchData(filteredData);
  // }, [eventSearch, eventType]);

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

  const handleSelection = (selectedValues: string[]) => {
    console.log('Selected venue types:', selectedValues);
    toggleSelection(selectedValues);
  };

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
                    color: colors == 0 ? '#7464A3' : Colors.white,
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
                    color: colors == 1 ? '#7464A3' : Colors.white,
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
                  <DropComponentNew
                    items={eventType}
                    onValueChange={handleSelection}
                    newStyle={{zIndex: 900}}
                  />
                  {/* <View
                    style={{
                      width: moderateScale(227),
                      height: moderateScaleVertical(35),
                      borderRadius: 10,
                      backgroundColor: Colors.black,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.darkPink,
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
                        color: Colors.white,
                      }}
                    />
                    <Image source={ImagePath.SearchNewGroup} />
                  </View> */}
                </View>
                <SizeBox size={10} />
                <FlatList
                  data={eventType}
                  renderItem={({item}: any) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcon,
                        {
                          backgroundColor: selectedItems?.includes(item?._id)
                            ? Colors.darkPink
                            : Colors.tranparent,
                          borderWidth: 1,
                          borderColor: selectedItems?.includes(item?._id)
                            ? Colors.tranparent
                            : Colors.darkPink,
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
                {/* <View
                  style={{
                    width: moderateScale(227),
                    height: moderateScaleVertical(35),
                    borderRadius: 10,
                    backgroundColor: Colors.black,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: Colors.darkPink,
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
                      color: Colors.white,
                    }}
                  />
                  <Image source={ImagePath.SearchNewGroup} />
                </View> */}
                <DropComponentNew
                  items={venueType}
                  onValueChange={toggleSelection2}
                  newStyle={{zIndex: 700}}
                />
              </View>
              <SizeBox size={10} />
              <View style={styles.flexout}>
                <FlatList
                  data={venueType}
                  numColumns={2}
                  renderItem={({item}: any) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcon,
                        {
                          backgroundColor: selectedItems2?.includes(item?._id)
                            ? Colors.darkPink
                            : Colors.tranparent,
                          borderWidth: 1,
                          borderColor: selectedItems2?.includes(item?._id)
                            ? Colors.tranparent
                            : Colors.darkPink,
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
                  {/* <View
                    style={{
                      width: moderateScale(227),
                      height: moderateScaleVertical(35),
                      borderRadius: 10,
                      backgroundColor: Colors.black,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.darkPink,
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
                        color: Colors.white,
                      }}
                    />
                    <Image source={ImagePath.SearchNewGroup} />
                  </View> */}
                  <DropComponentNew
                    items={musicStyle}
                    onValueChange={toggleSelection3}
                    newStyle={{zIndex: 500}}
                  />
                </View>
                <SizeBox size={10} />
                <FlatList
                  data={musicStyle}
                  numColumns={2}
                  renderItem={({item}: any) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcon,
                        {
                          width: '45%',
                          backgroundColor: selectedItems3?.includes(item?._id)
                            ? Colors.darkPink
                            : Colors.tranparent,
                          borderWidth: 1,
                          borderColor: selectedItems3?.includes(item?._id)
                            ? Colors.tranparent
                            : Colors.darkPink,
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
                style={{
                  borderWidth: 1,
                  borderColor: Colors.Pink,
                  borderRadius: 5,
                  paddingVertical: 10,
                }}
                activeOpacity={0.5}
                onPress={() => SetModalVisibleLang(true)}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                    paddingLeft: 10,
                  }}>
                  Languages{` `}
                  <Text
                    style={{
                      ...commonStyles.font16Regular,
                      fontSize: 13,
                      color: Colors.white,
                      paddingLeft: 10,
                    }}>
                    (select languages)
                  </Text>
                </Text>
              </TouchableOpacity>
              <SizeBox size={15} />
              <View style={styles.Btnmain}>
                <LinearGradient
                  colors={[Colors.darkPink, Colors.darkPink]}
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
                  key={2}
                  data={[
                    {id: 0, name: 'Everyone'},
                    {id: 1, name: 'Male'},
                    {id: 2, name: 'Female'},
                  ]}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  renderItem={({item, index}: any) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcontainer,
                        {
                          backgroundColor: selectedInterest?.includes(
                            item?.name,
                          )
                            ? Colors.darkPink
                            : Colors.tranparent,
                          borderWidth: 1,
                          borderColor: selectedInterest?.includes(item?.name)
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
                        {item.name}
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
                  {/* <View
                    style={{
                      width: moderateScale(227),
                      height: moderateScaleVertical(35),
                      borderRadius: 10,
                      backgroundColor: Colors.black,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: Colors.darkPink,
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
                        color: Colors.white,
                      }}
                    />
                    <Image source={ImagePath.SearchNewGroup} />
                  </View> */}

                  <DropComponentNew
                    items={musicStyle}
                    onValueChange={toggleSelection3}
                    newStyle={{zIndex: 500}}
                  />
                </View>
                <SizeBox size={5} />
                <FlatList
                  data={musicStyle}
                  numColumns={2}
                  renderItem={({item}: any) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcon,
                        {
                          backgroundColor: selectedItems3?.includes(item?._id)
                            ? Colors.darkPink
                            : Colors.tranparent,
                          borderWidth: 1,
                          borderColor: selectedItems3?.includes(item?._id)
                            ? Colors.tranparent
                            : Colors.darkPink,
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
                style={{
                  borderWidth: 1,
                  borderColor: Colors.Pink,
                  borderRadius: 5,
                  paddingVertical: 10,
                }}
                activeOpacity={0.5}
                onPress={() => SetModalVisibleLang(true)}>
                <Text
                  style={{
                    ...commonStyles.font16Regular,
                    color: Colors.white,
                    paddingLeft: 10,
                  }}>
                  Languages{` `}
                  <Text
                    style={{
                      ...commonStyles.font16Regular,
                      fontSize: 13,
                      color: Colors.white,
                      paddingLeft: 10,
                    }}>
                    (select languages)
                  </Text>
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
                  colors={[Colors.darkPink, Colors.darkPink]}
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
                maxHeight: height / 1.5,
                width: '95%',
                alignSelf: 'center',
              }}>
              <View style={styles.modalContainer}>
                <SectionList
                  sections={languages}
                  keyExtractor={(item, index) => index.toString()}
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
                            width: '85%',
                            alignSelf: 'center',
                            // borderBottomWidth: lengthFlag - 1 == index ? 0 : 1,
                          },
                          styles.mondaInvw,
                        ]}>
                        <Text
                          style={{
                            ...commonStyles.font10Regular,
                            color: Colors.white,
                            padding: 5,
                            fontWeight: '600',
                            fontFamily: fontFamily.time_regular,
                          }}>
                          {item?.name}
                        </Text>
                        <View
                          style={{
                            width: 14,
                            height: 14,
                            backgroundColor: Colors.white,
                            borderRadius: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {filterData[0] == item?.name && (
                            <VectorIcon
                              groupName="FontAwesome"
                              name={'check'}
                              size={10}
                              color={Colors.black}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  renderSectionHeader={({section: {title}}) => {
                    const filterData = languages
                      .filter(i => i.title === title) // Get only the category with the given title
                      .flatMap(i => i.data.map(item => item.name)); // Extract and flatten the names
                    // console.log(title, 'title');
                    var allSelected = filterData.every(item =>
                      selectedLang.includes(item),
                    );
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          selectModalTitleHandler(title);
                        }}
                        style={[
                          {
                            // borderBottomWidth: lengthFlag - 1 == index ? 0 : 1,
                          },
                          styles.mondaInvw,
                        ]}>
                        <Text
                          style={{
                            ...commonStyles.font16White,
                            padding: 5,
                            fontWeight: '600',
                            fontFamily: fontFamily.time_regular,
                          }}>
                          {title}
                        </Text>
                        <View
                          style={{
                            width: 16,
                            height: 16,
                            backgroundColor: Colors.white,
                            borderRadius: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {allSelected && (
                            <VectorIcon
                              groupName="FontAwesome"
                              name={'check'}
                              size={12}
                              color={Colors.black}
                            />
                          )}
                        </View>
                        {/* <VectorIcon
                        groupName="MaterialCommunityIcons"
                        // name={
                        //   filterData[0] == item?.name
                        //     ? 'radiobox-marked'
                        //     : 'radiobox-blank'
                        // }
                        name={'radiobox-blank'}
                        size={18}
                      /> */}
                      </TouchableOpacity>
                    );
                  }}
                />
                {/* <FlatList
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
                            // borderBottomWidth: lengthFlag - 1 == index ? 0 : 1,
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
                /> */}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventFilter;
