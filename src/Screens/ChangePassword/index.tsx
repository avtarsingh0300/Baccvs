import {Text} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  CommonBtn,
  CommonInput,
  Header,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {changePass} from '../../Utilities/Constants/auth';

const ChangePass = ({navigation}: any) => {
  const [currentpass, setCurrentPass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [retypepass, seReTypepass] = useState('');
  const [loader, setLoader] = useState(false);
  const onbackPress = () => {
    navigation.goBack();
  };

  const onChangePas = () => {
    if (currentpass === '' || newpass === '' || retypepass === '') {
      return showError('Please fill all fields');
    }

    if (newpass !== retypepass) {
      return showError('Password and confirm password should be same');
    }
    setLoader(true);
    const formData = {
      oldPassword: currentpass,
      newPassword: newpass,
    };
    changePass(formData)
      .then(res => {
        setLoader(false);
        navigation.goBack();
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err');
        showError(err.message);
      });
  };

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <Header title="Password and security" onPress={onbackPress} />
        <SizeBox size={10} />
        <Text style={{...commonStyles.font16Regular, color: Colors.white}}>
          Change password
        </Text>
        <SizeBox size={10} />
        <CommonInput
          value={currentpass}
          onChangeText={(text: any) => setCurrentPass(text)}
          placeholder="Current password"
        />
        <SizeBox size={10} />
        <CommonInput
          onChangeText={(text: any) => setNewpass(text)}
          value={newpass}
          placeholder="New Password"
        />
        <SizeBox size={10} />
        <CommonInput
          onChangeText={(text: any) => seReTypepass(text)}
          value={retypepass}
          placeholder="Re-type new password"
        />
        <SizeBox size={10} />
        <Text style={{...commonStyles.font16Regular, color: Colors.Pink}}>
          forgot password?
        </Text>
        <SizeBox size={20} />
        <CommonBtn title="Change password" onPress={onChangePas} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChangePass;
