import {Keyboard, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../Utilities/Styles/colors';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import {
  CommonBtn,
  ProgressHeader,
  showError,
  showSuccess,
  SizeBox,
} from '../../../Utilities/Component/Helpers';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import fontFamily from '../../../Utilities/Styles/fontFamily';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';
import {otpMatch} from '../../../Utilities/Constants/auth';
const OtpVerification = (props: any) => {
  console.log(props.route.params.phonenum);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [propsOtp = props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const onBack = () => {
    props.navigation.goBack();
  };

  const onContinue = () => {
    const formData = {
      phone_number: props.route.params.phonenum,
      otp: value,
    };
    otpMatch(formData)
      .then(res => {
        // console.log(res, "res in match otp");
        showSuccess(res?.message);
        props.navigation.navigate(NavigationStrings.WelcomScreen);
      })
      .catch(err => {
        showError(err?.message);
        console.log(err, 'err in match otp');
      });
  };
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ProgressHeader onPress={onBack} value={3} />
        <SizeBox size={15} />
        <Text style={{...commonStyles.font18W700Center}}>4 Digit OTP Code</Text>
        <SizeBox size={10} />
        <Text style={{...commonStyles.font14Center, color: Colors.greyTxt}}>
          Please write your four digit verification code.
        </Text>
        <SizeBox size={20} />
        <View style={styles.otpContainer}>
          <CodeField
            ref={ref}
            {...propsOtp}
            value={value}
            autoFocus={true}
            onChangeText={setValue}
            cellCount={4}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            onSubmitEditing={() => {
              value.length == 4 ? console.log('jhvsb') : Keyboard.dismiss();
            }}
            textInputStyle={{
              backgroundColor: Colors.white,
              alignSelf: 'center',
            }}
            renderCell={({index, symbol, isFocused}) => {
              return (
                <Text
                  key={index}
                  style={{
                    ...styles.cell,

                    borderColor: isFocused ? Colors.Pink : Colors.white,
                    borderWidth: isFocused ? 2.3 : 1.3,
                  }}
                  onLayout={() => {
                    getCellOnLayoutHandler(index);
                  }}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              );
            }}
          />
        </View>
        <Text
          style={{
            ...commonStyles.font14,
            alignSelf: 'flex-end',
            fontFamily: fontFamily.regular,
          }}>
          Resend OTP
        </Text>
        <SizeBox size={20} />
        <CommonBtn onPress={onContinue} title={'Continue'} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OtpVerification;
