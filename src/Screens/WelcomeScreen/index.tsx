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
  const onRoleClick = () => {
    props.navigation.navigate(NavigationStrings.ChooseRoles);
  };
  const onForget = () => {
    props.navigation.navigate(NavigationStrings.forgot);
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
          <TouchableOpacity onPress={onRoleClick} style={styles.buttons}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: Colors.black,
                  },
                ]}>
                Apply for membership
              </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onMemberPress} style={styles.button}>
              <Text
                style={[
                  {
                    color: Colors.white,
                  },
                  styles.btnText,
                ]}>
                Member access
              </Text>
          </TouchableOpacity>
          <Text style={styles.forgetTxt} onPress={onForget}>Forgot password?</Text>
          <Text style={styles.signTxt}>
            By signing up you accept our Terms of use and Privacy Policy
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;
