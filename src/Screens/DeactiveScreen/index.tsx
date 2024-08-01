import {Alert, Text} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  CommonBtn,
  Header,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';

import {clearUserData, userDelete} from '../../Utilities/Constants/auth';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import types from '../../Redux/types';
import store from '../../Redux/store';

const DeactivateScreen = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const onbackPress = () => {
    navigation.goBack();
  };

  const onYesPress = () => {
    setLoader(true);

    userDelete()
      .then(res => {
        setLoader(false);

        navigation.navigate(NavigationStrings.WelcomScreen);
        setTimeout(async () => {
          await clearUserData();
          const {dispatch} = store;
          dispatch({
            type: types?.CLEAR_REDUX_STATE,
            payload: {},
          });
        }, 1000);
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err');
        showError(err.message);
      });
  };
  const showAlert = () => {
    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account?',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => onYesPress(),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <Header title="Deactivate account" onPress={onbackPress} />
        <SizeBox size={20} />
        <Text style={styles.innertxt}>
          Deactivate your account will closed it permanently. If you want yo get
          back in the Baccvs community in the future, you’ll need a new referral
          code.
        </Text>
        <SizeBox size={20} />
        <CommonBtn title="Deactivate account" onPress={showAlert} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DeactivateScreen;
