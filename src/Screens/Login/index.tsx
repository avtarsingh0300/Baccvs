import {View, Text, SafeAreaView, TextInput} from 'react-native';
import React from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {CommonBtn, Header, SizeBox} from '../../Utilities/Component/Helpers';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';

const Login = (props: any) => {
  const onBack = () => {
    props.navigation.goBack();
  };
  const onLogin = () => {
    props.navigation.navigate(NavigationStrings.TabRoutes, {
      screen: NavigationStrings.HomeScreen,
    });
  };
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Header onPress={onBack} title="Member access" />
        <SizeBox size={30} />
        <View>
          <View style={styles.inputHolder}>
            <TextInput
              placeholder="Phone number, username, or email"
              placeholderTextColor={Colors.Pink}
              style={styles.input}
            />
          </View>
          <SizeBox size={8} />
          <View style={styles.inputHolder}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.Pink}
              style={styles.input}
            />
          </View>
        </View>
        <SizeBox size={10} />
        <Text
          style={{
            alignSelf: 'flex-end',
            ...commonStyles.font16White,
          }}>
          Forgot password?
        </Text>
        <SizeBox size={10} />
        <CommonBtn onPress={onLogin} title={'Log in'} />
      </SafeAreaView>
    </LinearGradient>
  );
};
export default Login;
