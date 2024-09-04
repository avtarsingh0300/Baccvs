import {View, Text, SafeAreaView, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  CommonBtn,
  Header,
  Loadingcomponent,
  SizeBox,
  showError,
  showSuccess,
} from '../../Utilities/Component/Helpers';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {login, setDataHandler} from '../../Utilities/Constants/auth';
import {Keyboard} from 'react-native';
import {saveUserData} from '../../Redux/Action/auth';
const Login = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const onBack = () => {
    navigation.goBack();
  };
  const onLogin = () => {
    if (!username) {
      return showError('Please enter username');
    }
    if (!password) {
      return showError('Please enter password');
    }
    setLoader(true);
    const formData = {
      identifier: username,
      password: password,
    };
    console.log(formData);
    login(formData)
      .then(res => {
        setLoader(false);
        console.log(res, 'res');
        navigation.navigate(NavigationStrings.TabRoutes);
        setTimeout(() => {
          setDataHandler(res);
          saveUserData(res);
        }, 1000);
        Keyboard.dismiss();
        showSuccess(res?.message);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err, 'erro');
      });
  };
  const handleChangeUser = (value: any) => {
    setUsername(value);
  };
  const handleChangePass = (value: any) => {
    setPassword(value);
  };
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <Header onPress={onBack} title="Member access" />
        <SizeBox size={30} />
        <View>
          <View style={styles.inputHolder}>
            <TextInput
              placeholder="Phone number, username, or email"
              placeholderTextColor={Colors.Pink}
              style={styles.input}
              value={username}
              autoCapitalize="none"
              onChangeText={text => handleChangeUser(text)}
            />
          </View>
          <SizeBox size={8} />
          <View style={styles.inputHolder}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.Pink}
              style={styles.input}
              value={password}
              autoCapitalize="none"
              onChangeText={text => handleChangePass(text)}
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
