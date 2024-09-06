import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {showError, SizeBox} from '../../Utilities/Component/Helpers';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ToggleSwitch from 'toggle-switch-react-native';
import {getMusicTypeList} from '../../Utilities/Constants/auth';

const MeetPeopleFilter = ({navigation}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDistance, setSelectedDistance] = useState([1]);
  const [musicStyle, setMusicStyle] = useState([]);
  const [selectedAge, setselectedAge] = useState([1, 25]);
  const [selectedIntersted, setSelectedIntersted] = useState(false);
  const [selectedSmoke, setSelectedSmoke] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(false);

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

  const signData = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagitarrius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView>
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
                <View style={{flexDirection: 'row'}}>
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
                </View>
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
                  style={[
                    styles.selectContainer,
                    {backgroundColor: Colors.lightPink},
                  ]}>
                  <Text style={styles.selectText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.selectContainer]}>
                  <Text style={styles.selectText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.selectContainer]}>
                  <Text style={styles.selectText}>4</Text>
                </TouchableOpacity>
              </View>
              <SizeBox size={12} />
            </>
          )}
          <View style={[styles.row, {}]}>
            <Text style={styles.label}>Distance</Text>
            <Text style={commonStyles.font14}>{selectedDistance[0]} km</Text>
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
            <View style={{flexDirection: 'row'}}>
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
            </View>
          </View>
          <SizeBox size={10} />
          <View style={[styles.row, {marginHorizontal: moderateScale(35)}]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.selectContainer,
                {backgroundColor: Colors.lightPink},
              ]}>
              <Text style={styles.selectText}>Everyone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer]}>
              <Text style={styles.selectText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer]}>
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
            <View style={{flexDirection: 'row'}}>
              <Text style={[commonStyles.font12, {marginRight: 5}]}>
                Open to date everyone
              </Text>
              <ToggleSwitch
                isOn={selectedSmoke}
                onColor={Colors.lightPink}
                offColor={Colors.white}
                trackOffStyle={{
                  backgroundColor: Colors.backgroundNew,
                  borderWidth: 1,
                  borderColor: Colors.white,
                }}
                size="small"
                onToggle={() => setSelectedSmoke(!selectedSmoke)}
              />
            </View>
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
              style={[
                styles.selectContainer,
                {backgroundColor: Colors.lightPink},
              ]}>
              <Text style={styles.selectText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer]}>
              <Text style={styles.selectText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer]}>
              <Text style={styles.selectText}>Sometimes</Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={15} />
          <View style={[styles.row, {}]}>
            <Text style={styles.label}>Drinking</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[commonStyles.font12, {marginRight: 5}]}>
                Open to date everyone
              </Text>
              <ToggleSwitch
                isOn={selectedDrink}
                onColor={Colors.lightPink}
                offColor={Colors.white}
                trackOffStyle={{
                  backgroundColor: Colors.backgroundNew,
                  borderWidth: 1,
                  borderColor: Colors.white,
                }}
                size="small"
                onToggle={() => setSelectedDrink(!selectedDrink)}
              />
            </View>
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
              style={[
                styles.selectContainer,
                {backgroundColor: Colors.lightPink},
              ]}>
              <Text style={styles.selectText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer]}>
              <Text style={styles.selectText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer]}>
              <Text style={styles.selectText}>Sometimes</Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={15} />
          <View style={[styles.row, {}]}>
            <Text style={styles.label}>Music Type</Text>
          </View>
          <SizeBox size={12} />
          <View
            style={[
              styles.row,
              {flexWrap: 'wrap', justifyContent: 'space-around'},
            ]}>
            {musicStyle?.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={[
                  styles.selectContainer,
                  {
                    backgroundColor:
                      index == 0 ? Colors.lightPink : Colors.backgroundNew,
                    marginBottom: 10,
                  },
                ]}>
                <Text style={styles.selectText}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <SizeBox size={15} />
          <View style={[styles.row, {}]}>
            <Text style={styles.label}>Languages</Text>
          </View>
          <SizeBox size={12} />
          <View
            style={[
              styles.row,
              {
                marginHorizontal: moderateScale(35),
                // justifyContent: 'flex-start',
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.selectContainer,
                {backgroundColor: Colors.lightPink},
              ]}>
              <Text style={styles.selectText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer]}>
              <Text style={styles.selectText}>French</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer]}>
              <Text style={styles.selectText}>Spanish</Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={12} />
          {activeIndex == 0 && (
            <>
              <View style={[styles.row, {}]}>
                <Text style={styles.label}>Astro Sign</Text>
              </View>
              <SizeBox size={12} />
              <View
                style={[
                  styles.row,
                  {flexWrap: 'wrap', justifyContent: 'space-around'},
                ]}>
                {signData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={[
                      styles.selectContainer,
                      {
                        backgroundColor:
                          index == 0 ? Colors.lightPink : Colors.backgroundNew,
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
            <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
              <Text style={{...commonStyles.font16Regular, color: Colors.Pink}}>
                Apply
              </Text>
            </TouchableOpacity>
            <Text style={styles.resetText}>Reset</Text>
          </View>
          <SizeBox size={15} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MeetPeopleFilter;

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  backBtn: {},
  header: {
    paddingHorizontal: moderateScale(36),
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
    paddingHorizontal: moderateScale(20),
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