import {View, Text, SafeAreaView, Switch} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  ImageComponent,
  SizeBox,
  dummydata,
} from '../../Utilities/Component/Helpers';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {FlatList} from 'react-native';
import fontFamily from '../../Utilities/Styles/fontFamily';

const EventFilter = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={5} />

        <Text style={{...commonStyles.Heading20font}}>Event Filters</Text>
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
            <Text style={{...commonStyles.font16Regular, color: Colors.white}}>
              10€
            </Text>
          </View>
          <MultiSlider
            markerStyle={styles.marker}
            values={[1, 4]}
            min={0}
            max={5}
            allowOverlap
            sliderLength={width / 1.7}
            selectedStyle={styles.select}
            unselectedStyle={styles.unsel}
          />
          <View style={styles.moneyVw}>
            <Text style={{...commonStyles.font16Regular, color: Colors.white}}>
              32€
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
            <MultiSlider
              markerStyle={styles.marker}
              values={[1]}
              min={0}
              max={5}
              allowOverlap
              sliderLength={width / 1.7}
              selectedStyle={styles.select}
              unselectedStyle={styles.unsel}
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
        </View>
        <SizeBox size={10} />
        <View style={styles.flexout}>
          <VectorIcon
            groupName="Feather"
            name="speaker"
            size={25}
            color={Colors.Pink}
          />

          <View style={styles.flatbox}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                }}>
                Music style
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Colors.white,
                  fontFamily: fontFamily.time_regular,
                }}>
                Open to all music styles
              </Text>
              {/* <View style={{width: 50, height: 25, borderRadius: 15}}> */}
              <Switch
                trackColor={{false: Colors.white, true: Colors.Pink}}
                thumbColor={isEnabled ? Colors.white : Colors.Pink}
                ios_backgroundColor={Colors.white}
                onValueChange={toggleSwitch}
                value={isEnabled}
                // style={{width: 25, height: 25, borderRadius: 15}}
              />
              {/* </View> */}
            </View>
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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventFilter;
