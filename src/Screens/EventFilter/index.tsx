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
  const [colors,setColors] = useState(false);
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
            <View/>
          </View>
          <SizeBox size={10} />
          {colors==0?(<><Text
            style={{
              ...commonStyles.font16Regular,
              color: Colors.white,
              textAlign: 'center',
            }}>
            Event and Activity Preferences
          </Text>
          <SizeBox size={20} />
              <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:15}}>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                }}>
                Distance
              </Text>
              <Text
                style={{...commonStyles.font16Regular, color: Colors.white}}>
                0km
              </Text>
              </View>
          <View style={styles.flex}>
            <MultiSlider
              markerStyle={styles.marker}
              min={0}
              max={100}
              onValuesChangeFinish={onValuesChangeFinish}
              allowOverlap
              values={selectedValue} // Wrap the single value in an array
              sliderLength={width / 1.3}
              selectedStyle={styles.select}
              unselectedStyle={styles.unsel}
            />
           
          </View>
          <SizeBox size={10} />
          {/* <View style={styles.flatbox}> */}
          <View style={{paddingLeft:10}}>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                }}>
                Event type
                {/* <Text
                  style={{
                    fontSize: textScale(8),
                    color: Colors.white,
                  }}>
                  {` `}(Up to 3)
                </Text> */}
              </Text>
              <SizeBox size={5}/>
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
                    {/* <View style={styles.tickvw}>
                      {selectedItems.includes(item._id) ? (
                        <VectorIcon
                        groupName="MaterialCommunityIcons"
                        name="check-outline"
                        color={Colors.Pink}
                        size={15}
                        style={{bottom: 5, alignSlef: 'centre'}}
                        />
                        ) : null}
                        </View> */}
                        </TouchableOpacity>
                )}
              />
              </View>
            {/* </View> */}
          
          <SizeBox size={10}/>
          <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>
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
                  Free- 49€
                {/* {selectedValues2.length > 1
                  ? `${selectedValues2[0]} km - ${selectedValues2[1]} km`
                  : `${selectedValues2[0]} km`} */}
              </Text>
              </View>
          <View style={styles.flexout}>
            {/* <VectorIcon
              groupName="Feather"
              name="map-pin"
              size={20}
              color={Colors.Pink}
            /> */}
            {/* <View style={styles.boxcontainer}> */}
            
              
              <View>
                <MultiSlider
                  markerStyle={styles.marker}
                  values={selectedValues2}
                  min={0}
                  max={5}
                  allowOverlap
                  sliderLength={width / 1.3}
                  selectedStyle={styles.select}
                  unselectedStyle={styles.unsel}
                  onValuesChangeFinish={onValuesChangeFinish2}
                />
              </View>
            </View>
          {/* </View> */}
          <SizeBox size={10} />
          {/* <View style={styles.flexout}>
            <ImageComponent
              resizeMode="contain"
              source={ImagePath.Popper}
              style={{
                width: moderateScale(22),
                height: moderateScaleVertical(22),
              }}
            />

          </View> */}
          {/* <SizeBox size={10} /> */}
            <Text
              style={{
                ...commonStyles.font16Regular,
                color: Colors.white,
                paddingLeft:10
              }}>
              Venue type
            </Text>
            <SizeBox size={5}/>
          <View style={styles.flexout}>
            {/* <ImageComponent
              resizeMode="contain"
              source={ImagePath.stair}
              style={{
                width: moderateScale(22),
                height: moderateScaleVertical(22),
              }}
            /> */}

            {/* <View style={styles.flatbox}> */}
              <FlatList
                data={venueType}
                numColumns={2}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[styles.flatcon,{ backgroundColor:selectedItems2.includes(item._id) ? Colors.Linear: Colors.lightPink}]}
                    onPress={() => toggleSelection2(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                    {/* <View style={styles.tickvw}> */}
                      {/* {selectedItems2.includes(item._id) ? (
                        <VectorIcon
                          groupName="MaterialCommunityIcons"
                          name="check-outline"
                          color={Colors.Pink}
                          size={15}
                          style={{bottom: 5, alignSlef: 'centre'}}
                        />
                      ) : null} */}
                    {/* </View> */}
                  </TouchableOpacity>
                )}
              />
            </View>
          {/* </View> */}
          <SizeBox size={10} />
          <View style={{paddingLeft:10}}>
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  color: Colors.white,
                }}>
                Music type
              </Text>
              <SizeBox size={5}/>
          {/* <View style={styles.flexout}> */}
            {/* <ImageComponent
              resizeMode="contain"
              source={ImagePath.Popper}
              style={{
                width: moderateScale(22),
                height: moderateScaleVertical(22),
              }}
            /> */}

            {/* <View style={styles.flatbox}> */}
              <FlatList
                data={musicStyle}
                numColumns={2}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[styles.flatcon,{ backgroundColor:selectedItems3.includes(item._id) ? Colors.Linear: Colors.lightPink}]}
                    onPress={() => toggleSelection3(item)}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      {item?.name}
                    </Text>
                    {/* <View style={styles.tickvw}> */}
                      {/* {selectedItems3.includes(item._id) ? (
                        <VectorIcon
                          groupName="MaterialCommunityIcons"
                          name="check-outline"
                          color={Colors.Pink}
                          size={15}
                          style={{bottom: 5, alignSlef: 'centre'}}
                        />
                      ) : null} */}
                    {/* </View> */}
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
                  paddingLeft:10
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
          {/* </View> */}
          <SizeBox size={15} />
          <View style={styles.Btnmain}>
            <LinearGradient colors={[Colors.lightPink, Colors.lightPink]} style={styles.btn}>
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
          </View></>)
          :
          <>
          <Text
            style={{
              ...commonStyles.font16Regular,
              color: Colors.white,
              paddingLeft:20
            }}>
            Social preferences
          </Text>
          </>}
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
