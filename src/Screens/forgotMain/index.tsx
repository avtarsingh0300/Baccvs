import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../Utilities/Styles/colors';
import styles from './style';
import { Loadingcomponent, SizeBox } from '../../Utilities/Component/Helpers';
import { CodeField, Cursor ,useBlurOnFulfill,
    useClearByFocusCell,} from 'react-native-confirmation-code-field';

const forgotMain = ({navigation}:any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [value, setValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoader, setIsLoader] = useState(false);
    const ref = useBlurOnFulfill({value, cellCount: 4});
    const [propsOtp = props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
  
    const forgotPasswordHandler = () => {
      if (email?.length > 6) {
        const data = {
          email: email,
        };
        setIsLoader(true);
        forgotPassword(data)
          .then(res => {
            console.log(res, 'res in forgotPassword');
            setIsLoader(false);
            setActiveIndex(1);
          })
          .catch(err => {
            console.log(err, 'err in forgotPassword');
            setIsLoader(false);
            showError(err?.message);
          });
      }
    };
  
    const onContinue = () => {
      if (value.length < 4) {
        return showError('Invalid otp!!');
      }
      const formData = {
        email: email,
        otp: value,
      };
      otpMatch(formData)
        .then((res: any) => {
          // console.log(res, "res in match otp");
          showSuccess(res?.message);
          setActiveIndex(2);
        })
        .catch(err => {
          showError(err?.message);
          console.log(err, 'err in match otp');
        });
    };
  
    const changePassword = () => {
      if (password !== passwordConfirm) {
        return showError('Password and Confirm Password should be same!!');
      }
      if (password.length < 3 || passwordConfirm?.length < 3) {
        return showError('Password must be strong!!');
      }
      if (password === passwordConfirm) {
        const formData = {
          email: email,
          newPassword: password,
        };
        changeForgotPassword(formData)
          .then(res => {
            navigation.navigate(NavigationStrings.LoginScreen);
            console.log(res, 'res in changeForgotPassword');
          })
          .catch(err => {
            console.log(err, 'err in changeForgotPassword');
          });
      }
    };
  return (
    <LinearGradient
    colors={[Colors.LinearBlack, Colors.Linear]}
    start={{x: 0, y: 0}}
    end={{x: 1.3, y: 0.9}}
    style={styles.LinearConatiner}>
    <SafeAreaView>
      <Loadingcomponent isVisible={isLoader} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <SizeBox size={25} />
        <Text style={styles.recoverytxt}>Password recovery link</Text>
        <SizeBox size={10} />
        {activeIndex == 0 ? (
          <Text style={styles.passwordtxt}>
            Enter an email to send you a password recovery link.
          </Text>
        ) : (
          <Text style={styles.passwordtxt}>Enter Code.</Text>
        )}
        <SizeBox size={20} />
        {activeIndex == 0 && (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text?.trim())}
          />
        )}
        {activeIndex == 1 && (
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
        )}
        {activeIndex == 2 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="black"
              value={password}
              onChangeText={text => setPassword(text?.trim())}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="black"
              value={passwordConfirm}
              onChangeText={text => setPasswordConfirm(text?.trim())}
            />
          </>
        )}
        <SizeBox size={15} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sendbtn}
          onPress={() => {
            if (activeIndex == 0) {
              forgotPasswordHandler();
            } else if (activeIndex == 0) {
              onContinue();
            } else {
              changePassword();
            }
          }}>
          {activeIndex == 0 ? (
            <Text style={styles.senttxt}>Send Email</Text>
          ) : (
            <Text style={styles.senttxt}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </LinearGradient>
  )
}

export default forgotMain