import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import DropComponentNew from '../../Utilities/Component/DropComponentNew';
import {SizeBox, showError} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {horoscopeSigns, languages} from '../../Utilities/Constants';
import {getEventTypes} from '../../Utilities/Constants/auth';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {height, width} from '../../Utilities/Styles/responsiveSize';
import styles from './style';

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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItems2, setSelectedItems2] = useState<string[]>([]);
  const [selectedItems3, setSelectedItems3] = useState<string[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<string>();
  const [selectedItemsSign, setSelectedItemsSign] = useState<string[]>([]);
  const [smoking, setSmoking] = useState('');
  const [colors, setColors] = useState(0);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
    if (selectedItems.includes(item._id)) {
      const updatedItems = selectedItems.filter(id => id !== item._id);
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, item._id]);
    }
  };

  const toggleSelection2 = (item: any) => {
    if (selectedItems2.includes(item._id)) {
      const updatedItems = selectedItems2.filter(id => id !== item._id);
      setSelectedItems2(updatedItems);
    } else {
      setSelectedItems2([...selectedItems2, item._id]);
    }
  };

  const toggleSelection3 = (item: any) => {
    if (selectedItems3.includes(item._id)) {
      const updatedItems = selectedItems3.filter(id => id !== item._id);
      setSelectedItems3(updatedItems);
    } else {
      setSelectedItems3([...selectedItems3, item._id]);
    }
  };

  const toggleLanguages = (item: string) => {
    if (selectedLang.includes(item)) {
      const updatedItems = selectedLang.filter((name: string) => name !== item);
      setSelectedLang(updatedItems);
    } else {
      setSelectedLang([...selectedLang, item]);
    }
  };

  const toggleSelectionInterest = (item: any) => {
    setSelectedInterest(item);
  };

  const toggleSmoking = (option: string) => {
    setSmoking(option);
  };

  const toggleSelectionSign = (id: any) => {
    if (selectedItemsSign.includes(id)) {
      const updatedItems = selectedItemsSign.filter((sign: any) => sign !== id);
      setSelectedItemsSign(updatedItems);
    } else {
      setSelectedItemsSign([...selectedItemsSign, id]);
    }
  };

  const onbackPress = () => {
    navigation.goBack();
  };

  const handleSelection = (selectedValues: string[]) => {
    setSelectedItems(selectedValues);
  };

  const handleSelection2 = (selectedValues: string[]) => {
    setSelectedItems2(selectedValues);
  };

  const handleSelection3 = (selectedValues: string[]) => {
    setSelectedItems3(selectedValues);
  };

  const resetButton = () => {
    setSelectedItems([]);
    setSelectedItems2([]);
    setSelectedItems3([]);
    setSelectedInterest('');
    setSmoking('');
    setSelectedLang([]);
    setSelectedValues2([0, 0]);
    setSelected([0, 0]);
    setSelected3([0, 0]);
    setSelectedValues2([0, 0]);
  };

  useEffect(() => {
    getEventsTypes();
  }, []);

  console.log(selectedItemsSign);

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

              <View style={{paddingHorizontal: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 20,
                    zIndex: 10000, // Ensure this parent View has a high zIndex
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font16Regular,
                      color: Colors.white,
                    }}>
                    Event Type
                  </Text>
                  <View
                    style={{
                      zIndex: 10000, // High zIndex to ensure it appears on top
                      position: 'relative', // Ensure it doesn't get clipped
                      flex: 1,
                    }}>
                    <DropComponentNew
                      items={eventType}
                      onValueChange={handleSelection}
                      isActive={activeDropdown === 'dropdown1'}
                      setActiveDropdown={setActiveDropdown}
                      dropdownKey="dropdown1"
                      placeholderText="Select Event Type"
                    />
                  </View>
                </View>
                <SizeBox size={10} />
                <FlatList
                  data={eventType}
                  renderItem={({item}: any) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.flatcon,
                          {
                            backgroundColor:
                              selectedItems.length > 0 &&
                              selectedItems?.includes(item?._id)
                                ? Colors.lightPink
                                : Colors.tranparent,
                            borderWidth: 1,
                            borderColor:
                              selectedItems.length > 0 &&
                              selectedItems?.includes(item?._id)
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
                    );
                  }}
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

              <View style={{paddingHorizontal: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 20,
                    zIndex: 10000, // Ensure this parent View has a high zIndex
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font16Regular,
                      color: Colors.white,
                    }}>
                    Venue type
                  </Text>
                  <View
                    style={{
                      zIndex: 10000,
                      position: 'relative',
                      flex: 1,
                    }}>
                    <DropComponentNew
                      items={venueType}
                      onValueChange={handleSelection2}
                      newStyle={{zIndex: 700}}
                      isActive={activeDropdown === 'dropdown2'}
                      setActiveDropdown={setActiveDropdown}
                      dropdownKey="dropdown2"
                      placeholderText="Select Venue Type"
                    />
                  </View>
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
                            backgroundColor:
                              selectedItems2.length > 0 &&
                              selectedItems2?.includes(item?._id)
                                ? Colors.lightPink
                                : Colors.tranparent,
                            borderWidth: 1,
                            borderColor:
                              selectedItems2.length > 0 &&
                              selectedItems2?.includes(item?._id)
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
                    Music type
                  </Text>
                  <View
                    style={{
                      zIndex: 100, // High zIndex to ensure it appears on top
                      position: 'relative', // Ensure it doesn't get clipped
                      flex: 1,
                    }}>
                    <DropComponentNew
                      items={musicStyle}
                      onValueChange={handleSelection3}
                      isActive={activeDropdown === 'dropdown3'}
                      setActiveDropdown={setActiveDropdown}
                      dropdownKey="dropdown3"
                      placeholderText="Select Music Type"
                    />
                  </View>
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
                          // backgroundColor: selectedItems3?.includes(item?._id)
                          //   ? Colors.darkPink
                          //   : Colors.tranparent,
                          // borderWidth: 1,
                          // borderColor: selectedItems3?.includes(item?._id)
                          //   ? Colors.tranparent
                          //   : Colors.darkPink,
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

              <View style={{paddingHorizontal: 10, zIndex: -1000}}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.Pink,
                    borderRadius: 5,
                    width: '100%',
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

                <FlatList
                  data={selectedLang}
                  numColumns={3} // Adjust the number of columns as needed
                  columnWrapperStyle={{justifyContent: 'flex-start'}}
                  renderItem={({item}: any) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.langTiles,
                          {
                            backgroundColor:
                              selectedLang.length > 0 &&
                              selectedLang?.includes(item)
                                ? Colors.lightPink
                                : Colors.tranparent,
                            borderWidth: 1,
                            borderColor:
                              selectedLang.length > 0 &&
                              selectedLang?.includes(item)
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
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
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
                  data={['Everyone', 'Male', 'Female']}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3}
                  renderItem={({item, index}: any) => (
                    <TouchableOpacity
                      style={[
                        styles.flatcontainer,
                        {
                          backgroundColor:
                            selectedInterest === item
                              ? Colors.lightPink
                              : Colors.tranparent,
                          borderWidth: 1,
                          borderColor:
                            selectedInterest === item
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
                    Music type
                  </Text>
                  <View
                    style={{
                      zIndex: 100, // High zIndex to ensure it appears on top
                      position: 'relative', // Ensure it doesn't get clipped
                      flex: 1,
                    }}>
                    <DropComponentNew
                      items={musicStyle}
                      onValueChange={handleSelection3}
                      isActive={activeDropdown === 'dropdown3'}
                      setActiveDropdown={setActiveDropdown}
                      dropdownKey="dropdown3"
                      placeholderText="Select Music Type"
                    />
                  </View>
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
                          backgroundColor:
                            selectedItems3.length > 0 &&
                            selectedItems3?.includes(item?._id)
                              ? Colors.lightPink
                              : Colors.tranparent,
                          borderWidth: 1,
                          borderColor:
                            selectedItems3.length > 0 &&
                            selectedItems3?.includes(item?._id)
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
              <View style={{paddingHorizontal: 10, zIndex: -1000}}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.Pink,
                    borderRadius: 5,
                    width: '100%',
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

                <FlatList
                  data={selectedLang}
                  numColumns={3} // Adjust the number of columns as needed
                  columnWrapperStyle={{justifyContent: 'flex-start'}}
                  renderItem={({item}: any) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.langTiles,
                          {
                            backgroundColor:
                              selectedLang.length > 0 &&
                              selectedLang?.includes(item)
                                ? Colors.lightPink
                                : Colors.tranparent,
                            borderWidth: 1,
                            borderColor:
                              selectedLang.length > 0 &&
                              selectedLang?.includes(item)
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
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
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
                  renderItem={({item}: any) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.flatcontainer,
                          {
                            backgroundColor: selectedItemsSign?.includes(
                              item?.id,
                            )
                              ? Colors.lightPink
                              : Colors.tranparent,
                            borderWidth: 1,
                            borderColor: selectedItemsSign?.includes(item?.id)
                              ? Colors.tranparent
                              : Colors.darkPink,
                          },
                        ]}
                        activeOpacity={0.8}
                        onPress={() => {
                          toggleSelectionSign(item.id);
                        }}>
                        <Text
                          style={{
                            ...commonStyles.font12Regular,
                            color: Colors.white,
                          }}>
                          {item?.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
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
                            borderBottomWidth: lengthFlag - 1 == index ? 0 : 0,
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
