import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  ImageStyle,
  ActivityIndicator,
} from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import VectorIcon from './vectorIcons';
import Modal from 'react-native-modal';
import styles from './style';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../Styles/responsiveSize';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../Styles/colors';
import commonStyles from '../Styles/commonStyles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CountryPicker, {
  CountryCode,
  Country,
} from 'react-native-country-picker-modal';
import { FlatList } from 'react-native';
import ImagePath from '../Constants/ImagePath';
import NavigationStrings from '../Constants/NavigationStrings';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

export const dummydata = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

interface PhonePickerProps {
  visible: boolean;
  onSelect: (country: Country) => void;
  onClose: () => void;
  countryCode: CountryCode;
  onPress: () => void;
}
interface ImageComponentProps {
  style?: StyleProp<ImageStyle>;
  source: FastImageProps['source'];
  resizeMode?: 'contain' | 'cover';
}

const showError = (message: any) => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
  });
};

const showSuccess = (message: any) => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
  });
};

const showNotification = (message: any) => {
  showMessage({
    backgroundColor: Colors.Pink,
    color: Colors.white,
    message,
    style: {
      borderRadius: 25,
      marginHorizontal: 40,
      marginVertical: 5,
      paddingVertical: 10,
    },
    textStyle: {
      padding: 10,
      margin: 10,
    },
  });
};
export { showError, showSuccess, showNotification };

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

export function Header({ onPress, title }: HeaderProps) {
  return (
    <View style={styles.headerRow}>
      <VectorIcon
        groupName={'Ionicons'}
        name={'chevron-back'}
        size={25}
        onPress={onPress}
      />
      <Text style={styles.headerTxt}>{title}</Text>
      <View />
    </View>
  );
}

export function SizeBox({ size }: SizeBoxProps) {
  return <View style={{ marginVertical: moderateScaleVertical(size) }} />;
}
export function CommonBtn({ onPress, title }: CommonBtnProps) {
  return (
    <LinearGradient
      colors={[Colors.btnLinear1, Colors.btnLinear2]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
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

export function ProgressHeader({ onPress, value }: ProgressHeaderProps) {
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
  onPress,
  countryCode,
}: PhonePickerProps) {
  return (
    <TouchableOpacity style={styles.picVw} onPress={onPress}>
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
    </TouchableOpacity>
  );
}

export function CommonInput({
  placeholder,
  multiline = false,
  keyboardType = 'default',
  value,
  onChangeText,
  secureTextEntry
}: CommonInputProps) {
  return (
    <View
      style={[
        styles.inputHolder,
        {
          height: multiline
            ? moderateScaleVertical(120)
            : moderateScaleVertical(50),
        },
      ]}>
      <TextInput
        multiline={multiline}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={Colors.greyTxt}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
export function CommonInputBtn({ title, onPress }: CommonBtnProps) {
  return (
    <TouchableOpacity
      style={styles.inputHolder}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={styles.input}>{title}</Text>
    </TouchableOpacity>
  );
}
export function Drawer({ onClose, isVisible, onBackdropPress }: DrawerProps) {
  const navigation = useNavigation();

  return (
    <Modal
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      onBackdropPress={onBackdropPress}
      avoidKeyboard={true}
      style={{ flex: 1, margin: 0 }}
      isVisible={isVisible}
      backdropOpacity={0.8}>
      <LinearGradient
        colors={[Colors.Linear, Colors.LinearBlack]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.3, y: 0.9 }}
        style={styles.drawerCon}>
        <VectorIcon
          groupName="Fontisto"
          name="close-a"
          size={20}
          onPress={onClose}
          color={Colors.white}
        />
        <ImageComponent
          source={ImagePath.ProfileImg}
          style={[styles.profileimg, { alignSelf: 'center' }]}
        />
        <SizeBox size={5} />
        <Text
          style={{
            ...commonStyles.font14Center,
            color: Colors.white,
          }}>
          Kathrin Down
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={[
            {
              id: 1,
              name: 'Profile',
              img: ImagePath.userprofile,
            },
            { id: 2, name: 'Invites', group: 'Feather', vector: 'mail' },
            { id: 3, name: 'People likes', img: ImagePath.likes },
            {
              id: 4,
              name: 'Events',
              group: 'MaterialIcons',
              vector: 'event',
            },
            { id: 5, name: 'Tickets', img: ImagePath.priceTag },
            { id: 6, name: 'Upgrade', img: ImagePath.upload },
            {
              id: 7,
              name: NavigationStrings.Settings,
              group: 'Ionicons',
              vector: 'settings-outline',
            },
            { id: 8, name: 'Blocked', img: ImagePath.block },
            { id: 9, name: 'Feedback', img: ImagePath.feedback },
            { id: 10, name: 'Referral Code', img: ImagePath.links },
            { id: 11, name: 'Banking infos', img: ImagePath.bankInfo },
            { id: 12, name: 'Scan', vector: 'qrcode', group: 'AntDesign' },
            {
              id: 13,
              name: 'Logout',
              group: 'MaterialCommunityIcons',
              vector: 'logout',
            },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.name);

                onClose();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: moderateScaleVertical(12),
              }}>
              {item.img ? (
                <ImageComponent
                  source={item.img}
                  resizeMode="contain"
                  style={{
                    width: moderateScale(25),
                    height: moderateScaleVertical(25),
                  }}
                />
              ) : (
                <VectorIcon
                  groupName={item.group ? item.group : 'AntDesign'}
                  name={item.vector ? item.vector : 'user'}
                  size={25}
                />
              )}
              <Text
                style={{
                  ...commonStyles.font20White,
                  paddingLeft: moderateScale(20),
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </LinearGradient>
    </Modal>
  );
}
export function Loadingcomponent({ isVisible }: LoaderProps) {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.loader}>
        <ActivityIndicator size={'large'} color={Colors.Pink} />
      </View>
    </Modal>
  );
}
