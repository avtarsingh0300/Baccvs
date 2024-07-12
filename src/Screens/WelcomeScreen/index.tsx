import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {Colors} from '../../Utilities/Styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import {ImageComponent} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';

const WelcomeScreen = (props: any) => {
  const onMemberPress = () => {
    props.navigation.navigate(NavigationStrings.LoginScreen);
  };
  const onApplyMem = () => {
    props.navigation.navigate(NavigationStrings.ReferalCode);
  };
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView style={{justifyContent: 'center', flex: 1}}>
        <Text style={styles.title}>BACCVS</Text>
        <ImageComponent
          source={ImagePath.AppLogo}
          style={{
            height: moderateScale(height / 3),
            marginTop: moderateScaleVertical(40),
          }}
          resizeMode={'contain'}
        />
        <View style={{marginTop: moderateScaleVertical(25)}}>
          <TouchableOpacity onPress={onApplyMem}>
            <LinearGradient
              colors={[Colors.LinearDark, Colors.Linear]}
              start={{x: 0, y: -1}}
              end={{x: 0.1, y: 0.7}}
              style={styles.buttons}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: Colors.Pink,
                  },
                ]}>
                Apply for membership
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={onMemberPress}>
            <LinearGradient
              colors={[Colors.LinearDark, Colors.Linear]}
              start={{x: 1.1, y: 2}}
              end={{x: 0.9, y: 0.3}}
              style={styles.buttons}>
              <Text
                style={[
                  {
                    color: Colors.green,
                  },
                  styles.btnText,
                ]}>
                Member access
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.forgetTxt}>Forgot password?</Text>
          <Text style={styles.signTxt}>
            By signing up you accept our Terms of use and Privacy Policy
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;
