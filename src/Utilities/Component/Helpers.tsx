import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  ImageStyle,
} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import VectorIcon from './vectorIcons';

import styles from './style';
import {moderateScaleVertical, width} from '../Styles/responsiveSize';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../Styles/colors';
import commonStyles from '../Styles/commonStyles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CountryPicker, {
  CountryCode,
  Country,
} from 'react-native-country-picker-modal';

export const dummydata = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

interface PhonePickerProps {
  visible: boolean;
  onSelect: (country: Country) => void;
  onClose: () => void;
  countryCode: CountryCode;
}
interface ImageComponentProps {
  style?: StyleProp<ImageStyle>;
  source: FastImageProps['source'];
  resizeMode?: 'contain' | 'cover';
}

export function ImageComponent({
  style,
  source,
  resizeMode = 'cover',
}: ImageComponentProps) {
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

export function Header({onPress}: HeaderProps) {
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

export function SizeBox({size}: SizeBoxProps) {
  return <View style={{marginVertical: moderateScaleVertical(size)}} />;
}
export function CommonBtn({onPress, title}: CommonBtnProps) {
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

export function ProgressHeader({onPress, value}: ProgressHeaderProps) {
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
        values={[value]}
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

export function PhonePicker({
  visible,
  onSelect,
  onClose,
  countryCode,
}: PhonePickerProps) {
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

export function CommonInput({
  placeholder,
  multiline = false,
  keyboardType = 'default',
}: CommonInputProps) {
  return (
    <View
      style={[
        styles.inputHolder,
        {
          height: multiline
            ? moderateScaleVertical(120)
            : moderateScaleVertical(55),
        },
      ]}>
      <TextInput
        multiline={multiline}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={Colors.greyTxt}
        style={styles.input}
      />
    </View>
  );
}
export function CommonInputBtn({title, onPress}: CommonBtnProps) {
  return (
    <TouchableOpacity
      style={styles.inputHolder}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={styles.input}>{title}</Text>
    </TouchableOpacity>
  );
}
