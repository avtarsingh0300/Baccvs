import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import VectorIcon from './vectorIcons';

import styles from './style';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../Styles/responsiveSize';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../Styles/colors';
import commonStyles from '../Styles/commonStyles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CountryPicker from 'react-native-country-picker-modal';
export function ImageComponent({style, source, resizeMode}) {
  return (
    <FastImage
      source={source}
      style={style}
      resizeMode={
        resizeMode === 'contain'
          ? FastImage.resizeMode.contain
          : FastImage.resizeMode.cover
      }
    />
  );
}
export function Header({onPress}) {
  return (
    <View style={styles.headerRow}>
      <VectorIcon
        groupName={'Ionicons'}
        name={'chevron-back'}
        size={25}
        onPress={onPress}
      />
      <Text style={styles.headerTxt}>Member access</Text>
      <View />
    </View>
  );
}
export function SizeBox({size}) {
  return <View style={{marginVertical: moderateScaleVertical(size)}} />;
}

export function CommonBtn({onPress, title}) {
  return (
    <LinearGradient
      colors={[Colors.btnLinear1, Colors.btnLinear2]}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        padding: 1,
        borderRadius: 8,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.cbtn}>
        <Text
          style={{
            ...commonStyles.font20W400,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export function ProgressHeader({onPress, value}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <VectorIcon
        groupName={'Ionicons'}
        name={'chevron-back'}
        size={25}
        onPress={onPress}
      />
      <MultiSlider
        markerStyle={{
          height: 0,
          width: 0,
          backgroundColor: Colors.tranparent,
        }}
        values={[value ? value : 0]}
        min={0}
        max={5}
        allowOverlap
        sliderLength={width / 1.3}
        selectedStyle={styles.select}
        unselectedStyle={styles.unsel}
      />
    </View>
  );
}

export function PhonePicker({visible, onSelect, onClose, countryCode}) {
  return (
    <View style={styles.picVw}>
      <CountryPicker
        visible={visible}
        onSelect={onSelect}
        onClose={onClose}
        theme={{
          ...commonStyles.font14Center,
          onBackgroundTextColor: Colors.Pink,
          backgroundColor: Colors.LinearBlack,
        }}
        withCallingCode={true}
        withCallingCodeButton
        withFlagButton={false}
        withFilter
        countryCode={countryCode}
        containerButtonStyle={styles.pickerContainer}
      />
      <VectorIcon groupName={'AntDesign'} name={'down'} size={15} />
    </View>
  );
}
