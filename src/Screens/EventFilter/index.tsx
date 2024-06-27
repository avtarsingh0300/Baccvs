import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {SizeBox} from '../../Utilities/Component/Helpers';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';

const EventFilter = () => {
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VectorIcon
            groupName="Feather"
            name="map-pin"
            size={20}
            color={Colors.Pink}
          />
          <View
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: Colors.white,
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 8,
              width: '90%',
              marginLeft: 10,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
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
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventFilter;
