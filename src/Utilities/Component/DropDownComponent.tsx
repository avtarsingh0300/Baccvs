import React from 'react';
import {Text, View, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../Styles/responsiveSize';
import fontFamily from '../Styles/fontFamily';
import {Colors} from '../Styles/colors';
import commonStyles from '../Styles/commonStyles';

interface DropdownItem {
  _id: string;
  [key: string]: any;
}

interface DropDownComponentProps {
  value: string;
  data: any[];
  onChange: (item: DropdownItem) => void;
  name: string;
  placeHolderValue: string;
  selectedHolderStyle?: ViewStyle;
  labelStyle?: TextStyle;
  labelText?: string;
  containerStyles?: ViewStyle;
  optionStyle?: ViewStyle;
  onBlur?: () => void;
  paddingFlag?: boolean;
  selectedText?: TextStyle;
  iconColor?: string;
  renderLeftIcon?: (item: DropdownItem) => React.ReactNode;
  onFocus?: () => void;
}

const DropDownComponent: React.FC<DropDownComponentProps> = ({
  value,
  data,
  onChange,
  name,
  placeHolderValue,
  selectedHolderStyle,
  containerStyles,
  optionStyle,
  onBlur,
  paddingFlag,
  selectedText,
  iconColor,
  renderLeftIcon,
  onFocus,
}) => {
  return (
    <View style={[styles.mainContainer, containerStyles]}>
      {/* {labelText && (
        <Text style={[styles.labelText, labelStyle]}>{labelText}</Text>
      )} */}
      <View
        style={[
          styles.dropdown,
          {backgroundColor: '#F7F8F9'},
          selectedHolderStyle,
        ]}>
        <Dropdown
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: paddingFlag ? moderateScale(15) : 0,
            },
          ]}
          placeholderStyle={[
            styles.placeholderStyle,
            {color: !value ? Colors.greyTxt : Colors.white},
            selectedText,
          ]}
          selectedTextStyle={[
            styles.placeholderStyle,
            {color: Colors.white},
            selectedText,
          ]}
          search={true}
          containerStyle={[
            {
              borderRadius: 8,
              zIndex: 1000,
              backgroundColor: Colors.black,
            },
            optionStyle,
          ]}
          searchPlaceholderTextColor={Colors.white}
          searchPlaceholder="Search"
          inputSearchStyle={{
            borderWidth: 0,
            ...commonStyles.font10Regular,
            color: Colors.white,
          }}
          itemTextStyle={{color: Colors.greyTxt}}
          iconColor={iconColor}
          data={data}
          maxHeight={200}
          activeColor={Colors.black}
          // renderItem={renderLeftIcon}
          labelField={name}
          valueField="_id"
          onFocus={onFocus}
          placeholder={value?.length > 0 ? value : placeHolderValue}
          value={value}
          showsVerticalScrollIndicator={false}
          onChange={onChange}
          selectedTextProps={{numberOfLines: 1}}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // Base container styles
  },
  dropdown: {
    height: moderateScale(40),
    marginTop: moderateScaleVertical(10),
    borderRadius: 8,
    paddingHorizontal: moderateScale(16),
    // borderWidth: 1,
    // borderColor: '#E8ECF4',
  },
  placeholderStyle: {
    fontFamily: fontFamily.regular,
    fontWeight: '500',
    fontSize: textScale(10),
    color: '#8391A1',
  },
  labelText: {
    fontFamily: fontFamily.bold,
    fontWeight: '500',
    fontSize: textScale(15),
    color: '#8391A1',
    marginTop: moderateScaleVertical(10),
    marginLeft: moderateScale(10),
  },
});

export default DropDownComponent;
