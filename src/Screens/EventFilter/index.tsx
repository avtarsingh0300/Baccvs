import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  Header,
  ImageComponent,
  SizeBox,
  dummydata,
  showError,
} from '../../Utilities/Component/Helpers';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {FlatList} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {getEventTypes} from '../../Utilities/Constants/auth';

import Modal from 'react-native-modal';
import fontFamily from '../../Utilities/Styles/fontFamily';
import languages from '../../Utilities/Constants';
const EventFilter = ({navigation}: any) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [musicStyle, setMusicStyle] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [venueType, setVenueType] = useState([]);
  const [modalVisibleLang, SetModalVisibleLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState([]);
  const [selectedValue, setSelected] = useState([1, 4]);
  const [selectedValues2, setSelectedValues2] = useState([1, 4]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const [selectedItems3, setSelectedItems3] = useState([]);
  useEffect(() => {
    getEventsTypes();
  }, []);
  const getEventsTypes = () => {
    getEventTypes()
      .then(res => {
        setMusicStyle(res?.musictype);
        setEventType(res?.eventtype);
        setVenueType(res?.venuetype);
        console.log(res, 'ressss');
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
  const onValuesChangeFinish2 = values => {
    setSelectedValues2(values);
  };
  const toggleSelection = (item: any) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(item._id)) {
        return prevSelectedItems.filter(id => id !== item._id);
      } else {
        return [...prevSelectedItems, item._id];
      }
    });
  };

  const toggleSelection2 = (item: any) => {
    setSelectedItems2(prevSelectedItems => {
      if (prevSelectedItems.includes(item._id)) {
        return prevSelectedItems.filter(id => id !== item._id);
      } else {
        return [...prevSelectedItems, item._id];
      }
    });
  };

  const toggleSelection3 = (item: any) => {
    setSelectedItems3(prevSelectedItems => {
      if (prevSelectedItems.includes(item._id)) {
        return prevSelectedItems.filter(id => id !== item._id);
      } else {
        return [...prevSelectedItems, item._id];
      }
    });
  };

  const resetButton = () => {
    setSelectedItems([]);
    setSelectedItems2([]);
    setSelectedItems3([]);
    setSelectedLang([]);
    setSelectedValues2([0, 0]);
    setSelected([0, 0]);
  };

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SizeBox size={5} />

          <Header title="Map filter" onPress={() => navigation.goBack()} />
          <SizeBox size={10} />
          <Text
            style={{
              ...commonStyles.font16Regular,
              color: Colors.green,
              textAlign: 'center',
            }}>
            Event and Activity Preferences
          </Text>
          <SizeBox size={20} />

          <View style={styles.flex}>
            <View style={styles.moneyVw}>
              <Text
                style={{...commonStyles.font16Regular, color: Colors.white}}>
                0
              </Text>
            </View>
            <MultiSlider
              markerStyle={styles.marker}
              min={0}
              max={100}
              onValuesChangeFinish={onValuesChangeFinish}
              allowOverlap
              values={selectedValue} // Wrap the single value in an array
              sliderLength={width / 1.7}
              selectedStyle={styles.select}
              unselectedStyle={styles.unsel}
            />
            <View style={styles.moneyVw}>
              <Text
                style={{...commonStyles.font16Regular, color: Colors.white}}>
                {selectedValue[0]}€
              </Text>
            </View>
          </View>
          <SizeBox size={10} />
          <View style={styles.flexout}>
            <VectorIcon
              groupName="Feather"
              name="map-pin"
              size={20}
              color={Colors.Pink}
            />
            <View style={styles.boxcontainer}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                }}>
                Distance
              </Text>
              <Text
                style={{
                  ...commonStyles.font10Regular,
                  color: Colors.white,
                  position: 'absolute',
                  top: 0,
                  right: 5,
                }}>
                {selectedValues2.length > 1
                  ? `${selectedValues2[0]} km - ${selectedValues2[1]} km`
                  : `${selectedValues2[0]} km`}
              </Text>
              <View>
                <MultiSlider
                  markerStyle={styles.marker}
                  values={selectedValues2}
                  min={0}
                  max={5}
                  allowOverlap
                  sliderLength={width / 1.7}
                  selectedStyle={styles.select}
                  unselectedStyle={styles.unsel}
                  onValuesChangeFinish={onValuesChangeFinish2}
                />
              </View>
            </View>
          </View>
          <SizeBox size={10} />
          <View style={styles.flexout}>
            <ImageComponent
              resizeMode="contain"
              source={ImagePath.Popper}
              style={{
                width: moderateScale(22),
                height: moderateScaleVertical(22),
              }}
            />

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
                data={eventType}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.flatcon}
                    onPress={() => toggleSelection(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                    <View style={styles.tickvw}>
                      {selectedItems.includes(item._id) ? (
                        <VectorIcon
                          groupName="MaterialCommunityIcons"
                          name="check-outline"
                          color={Colors.Pink}
                          size={15}
                          style={{bottom: 5, alignSlef: 'centre'}}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <View style={styles.flexout}>
            <ImageComponent
              resizeMode="contain"
              source={ImagePath.stair}
              style={{
                width: moderateScale(22),
                height: moderateScaleVertical(22),
              }}
            />

            <View style={styles.flatbox}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                }}>
                Venue type
              </Text>
              <FlatList
                data={venueType}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.flatcon}
                    onPress={() => toggleSelection2(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                    <View style={styles.tickvw}>
                      {selectedItems2.includes(item._id) ? (
                        <VectorIcon
                          groupName="MaterialCommunityIcons"
                          name="check-outline"
                          color={Colors.Pink}
                          size={15}
                          style={{bottom: 5, alignSlef: 'centre'}}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <View style={styles.flexout}>
            <ImageComponent
              resizeMode="contain"
              source={ImagePath.Popper}
              style={{
                width: moderateScale(22),
                height: moderateScaleVertical(22),
              }}
            />

            <View style={styles.flatbox}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                }}>
                Music type
                <Text
                  style={{
                    fontSize: textScale(8),
                    color: Colors.white,
                  }}>
                  {` `}(Up to 3)
                </Text>
              </Text>
              <FlatList
                data={musicStyle}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.flatcon}
                    onPress={() => toggleSelection3(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                    <View style={styles.tickvw}>
                      {selectedItems3.includes(item._id) ? (
                        <VectorIcon
                          groupName="MaterialCommunityIcons"
                          name="check-outline"
                          color={Colors.Pink}
                          size={15}
                          style={{bottom: 5, alignSlef: 'centre'}}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          {/* <View style={styles.flexout}>
            <VectorIcon
              groupName="Feather"
              name="speaker"
              size={25}
              color={Colors.Pink}
            />

            <View style={styles.flatbox}>
              <View style={styles.musicFlex}>
                <Text
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.white,
                  }}>
                  Music style
                </Text>
                <Text
                  style={{
                    ...commonStyles.font10Regular,
                    color: Colors.white,
                  }}>
                  Open to all music styles
                </Text>
                <ToggleSwitch
                  isOn={isEnabled}
                  onColor={Colors.Pink}
                  offColor={Colors.lightPink}
                  size="small"
                  onToggle={toggleSwitch}
                />
              </View>
              <View style={styles.inputcon}>
                <View style={styles.searchflex}>
                  <VectorIcon
                    groupName="AntDesign"
                    name="search1"
                    color={Colors.greyTxt}
                    size={15}
                  />
                  <TextInput
                    placeholder="search"
                    placeholderTextColor={Colors.greyTxt}
                    style={{
                      ...commonStyles.font10Regular,
                      paddingHorizontal: 2,
                      paddingVertical: 3,
                      width: '90%',
                      color: Colors.black,
                    }}
                  />
                </View>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dummydata}
                renderItem={({item}) => (
                  <View>
                    <View style={styles.horzVw}>
                      <Text
                        style={{
                          ...commonStyles.font10Regular,
                          color: Colors.white,
                        }}>
                        Electronic
                      </Text>
                    </View>
                    <VectorIcon
                      groupName="AntDesign"
                      name="closesquare"
                      color={Colors.lightPink}
                      size={15}
                      style={{alignSelf: 'center', top: -8}}
                    />
                  </View>
                )}
              />
              <FlatList
                data={dummydata}
                renderItem={({item}) => (
                  <View style={styles.flatcon2}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      Progressive house
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
          </View> */}
          <SizeBox size={10} />
          <View style={styles.flexout}>
            <ImageComponent
              resizeMode="contain"
              source={ImagePath.lang}
              style={{
                width: moderateScale(22),
                height: moderateScaleVertical(22),
              }}
            />

            {/* <View style={styles.flatbox}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                }}>
                Languages
              </Text>

              <View style={styles.inputcon}>
                <View style={styles.searchflex}>
                  <VectorIcon
                    groupName="AntDesign"
                    name="search1"
                    color={Colors.greyTxt}
                    size={15}
                  />
                  <TextInput
                    placeholder="search"
                    placeholderTextColor={Colors.greyTxt}
                    style={{
                      ...commonStyles.font10Regular,
                      paddingHorizontal: 2,
                      paddingVertical: 3,
                      width: '90%',
                      color: Colors.black,
                    }}
                  />
                </View>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dummydata}
                renderItem={({item}) => (
                  <View>
                    <View style={styles.horzVw}>
                      <Text
                        style={{
                          ...commonStyles.font10Regular,
                          color: Colors.white,
                        }}>
                        English
                      </Text>
                    </View>
                    <VectorIcon
                      groupName="AntDesign"
                      name="closesquare"
                      color={Colors.lightPink}
                      size={15}
                      style={{alignSelf: 'center', top: -8}}
                    />
                  </View>
                )}
              />
              <FlatList
                data={dummydata}
                renderItem={({item}) => (
                  <View style={styles.flatcon2}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      Portuguese
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
            </View> */}
            <TouchableOpacity
              style={styles.flatbox}
              activeOpacity={0.5}
              onPress={() => SetModalVisibleLang(true)}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                }}>
                Languages
              </Text>

              <SizeBox size={5} />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={selectedLang}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.langItem}
                    activeOpacity={0.8}
                    onPress={() => {
                      const filterData2 = selectedLang?.filter(
                        (i: any) => i != item,
                      );
                      setSelectedLang(filterData2);
                    }}>
                    <Text style={styles.langItemText}>{item} &#x2715;</Text>
                  </TouchableOpacity>
                )}
              />
            </TouchableOpacity>
          </View>
          <SizeBox size={15} />
          <View style={styles.Btnmain}>
            <LinearGradient colors={['#FC00F2', '#CD3AFF']} style={styles.btn}>
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
