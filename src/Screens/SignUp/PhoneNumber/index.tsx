import {SafeAreaView, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../Utilities/Styles/colors';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import {
  CommonBtn,
  PhonePicker,
  ProgressHeader,
  showError,
  SizeBox,
} from '../../../Utilities/Component/Helpers';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';
import {otpSend} from '../../../Utilities/Constants/auth';

const PhoneNumber = (props: any) => {
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [phoneno, setPhoneno] = useState('');
  const [countryVisible, setCountryVisible] = useState(false);

  const onBack = () => {
    props.navigation.goBack();
  };
  const onSelect = (country: any) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const onContnue = () => {
    const formData = {
      phone_number: `+${callingCode}${phoneno}`,
      query: 'signup',
    };
    otpSend(formData)
      .then(res => {
        props.navigation.navigate(NavigationStrings.OtpVerification, {
          phonenum: `+${callingCode}${phoneno}`,
          callingCode: callingCode,
        });
      })
      .catch(err => {
        showError(err?.message);
      });
  };
  const openPicker = () => {
    setCountryVisible(!countryVisible);
  };
  const handleChange = (value: any) => {
    setPhoneno(value);
  };
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ProgressHeader onPress={onBack} value={2} />
        <SizeBox size={15} />
        <Text style={{...commonStyles.font18W700Center}}>Phone number</Text>
        <SizeBox size={10} />
        <Text style={{...commonStyles.font14Center, color: Colors.greyTxt}}>
          Please insert your phone number.
        </Text>
        <SizeBox size={20} />
        <View style={{flexDirection: 'row'}}>
          <PhonePicker
            visible={countryVisible}
            countryCode={countryCode}
            onSelect={onSelect}
            onPress={openPicker}
          />
          <View style={styles.inputHolder}>
            <TextInput
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              placeholderTextColor={Colors.white}
              style={styles.input}
              maxLength={10}
              value={phoneno}
              onChangeText={text => handleChange(text)}
            />
          </View>
        </View>
        <SizeBox size={40} />
        <CommonBtn onPress={onContnue} title={'Continue'} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PhoneNumber;
