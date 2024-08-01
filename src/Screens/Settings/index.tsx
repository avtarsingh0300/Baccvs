import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {Header, SizeBox} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {clearUserData} from '../../Utilities/Constants/auth';
import store from '../../Redux/store';
import types from '../../Redux/types';

const Settings = ({navigation}: any) => {
  const onGoback = () => {
    navigation.goBack();
  };
  const onAccount = () => {
    navigation.navigate(NavigationStrings.AccountInfo);
  };
  const onChange = () => {
    navigation.navigate(NavigationStrings.ChangePass);
  };
  const onDeactive = () => {
    navigation.navigate(NavigationStrings.DeactiveScreen);
  };
  const onBlocked = () => {
    navigation.navigate(NavigationStrings.BlockedAccount);
  };
  const onLogout = () => {
    navigation.navigate(NavigationStrings.WelcomScreen);
    setTimeout(async () => {
      await clearUserData();
      const {dispatch} = store;
      dispatch({
        type: types?.CLEAR_REDUX_STATE,
        payload: {},
      });
    }, 1000);
  };

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Header onPress={onGoback} title="Settings" />
        <SizeBox size={20} />
        {/* <Text style={styles.headingTxt}>
          See information about your account, download an archive of your data,
          or learn about your account deactivation options.
        </Text> */}
        {/* <SizeBox size={20} /> */}
        <TouchableOpacity onPress={onAccount}>
          <View style={styles.flex}>
            <VectorIcon groupName="Feather" name="user" size={28} />
            <Text style={{...commonStyles.font16White}}>
              Account information
            </Text>
            <VectorIcon
              groupName="SimpleLineIcons"
              name="arrow-right"
              size={15}
            />
          </View>
          <SizeBox size={5} />
          <Text style={styles.innertxt}>
            See your account information like your phone number and email
            address
          </Text>
        </TouchableOpacity>
        <SizeBox size={20} />
        <TouchableOpacity onPress={onChange}>
          <View style={styles.flex}>
            <VectorIcon groupName="SimpleLineIcons" name="lock" size={28} />
            <Text style={{...commonStyles.font16White}}>
              Change your password
            </Text>
            <VectorIcon
              groupName="SimpleLineIcons"
              name="arrow-right"
              size={15}
            />
          </View>
          <SizeBox size={5} />
          <Text style={styles.innertxt}>Change your password at any time</Text>
        </TouchableOpacity>
        <SizeBox size={20} />

        <TouchableOpacity onPress={onBlocked}>
          <View style={styles.flex}>
            <VectorIcon
              groupName="MaterialIcons"
              name="block-flipped"
              size={28}
            />
            <Text style={{...commonStyles.font16White}}>Blocked accounts</Text>
            <VectorIcon
              groupName="SimpleLineIcons"
              name="arrow-right"
              size={15}
            />
          </View>
          <SizeBox size={5} />
          <Text style={styles.innertxt}>Manage your blocked accounts.</Text>
        </TouchableOpacity>
        <SizeBox size={20} />
        <TouchableOpacity onPress={onDeactive}>
          <View style={styles.flex}>
            <VectorIcon groupName="MaterialIcons" name="logout" size={28} />
            <Text style={{...commonStyles.font16White}}>
              Deactivate your account
            </Text>
            <VectorIcon
              groupName="SimpleLineIcons"
              name="arrow-right"
              size={15}
            />
          </View>
          <SizeBox size={5} />
          <Text style={styles.innertxt}>
            Find out how you can deactivate your account
          </Text>
        </TouchableOpacity>
        <SizeBox size={20} />
        <Text
          onPress={onLogout}
          style={{...commonStyles.font16White, alignSelf: 'center'}}>
          Logout
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
