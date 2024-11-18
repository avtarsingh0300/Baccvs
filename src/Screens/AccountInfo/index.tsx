import {View, Text, TouchableOpacity, TextInput, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  Header,
  Loadingcomponent,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  getUserProfileStatus,
  updateUserAccountDetails,
} from '../../Utilities/Constants/auth';
import moment from 'moment';

const AccountInfo = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isPrivateEnabled, setIsPrivateEnabled] = useState(false);
  const [isSocialEnabled, setIsSocialEnabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    setLoader(true);
    getUserData();
  }, []);

  const getUserData = () => {
    getUserProfileStatus()
      .then((res: any) => {
        setLoader(false);
        setUserData(res?.updatedUser);
        setEmail(res?.updatedUser?.email);
        setPhone(res?.updatedUser?.phone_number);
        setPhone(res?.updatedUser?.phone_number);
        setIsSocialEnabled(res?.updatedUser?.social);
        setIsPrivateEnabled(res?.updatedUser?.accountprivacy);
        // console.log(res, 'res in getUserProfileStatus');
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err in getUserProfileStatus');
      });
  };

  const updateDetailsHandler = (Privacy: boolean, social: boolean) => {
    const data = {
      phone_number: phone,
      email: email,
      social: social,
      accountprivacy: Privacy,
    };
    updateUserAccountDetails(data)
      .then(res => {
        getUserData();
        // console.log(res, 'res in updateUserAccountDetails');
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err in updateUserAccountDetails');
      });
  };

  const onGoback = () => {
    navigation.goBack();
  };

  const togglePrivateSwitch = () => {
    setIsPrivateEnabled(!isPrivateEnabled);
    updateDetailsHandler(!isPrivateEnabled, isSocialEnabled);
  };

  const toggleSocialSwitch = () => {
    setIsSocialEnabled(!isSocialEnabled);
    updateDetailsHandler(isPrivateEnabled, !isSocialEnabled);
  };

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <Loadingcomponent isVisible={loader} />
      <SafeAreaView>
        <Header onPress={onGoback} title="Personal details" />
        <SizeBox size={10} />
        <Text style={styles.header}>
          {userData?.full_name}, {moment(userData?.dob).format('ll')}
        </Text>
        <SizeBox size={10} />
        <View style={styles.inputContainer}>
          <Text style={styles.header}>E-mail :</Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setLoader(true);
                updateDetailsHandler(isPrivateEnabled, isSocialEnabled);
              }}>
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SizeBox size={10} />

        <View style={styles.inputContainer}>
          <Text style={styles.header}>Phn. No. :</Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, {width: '100%', paddingLeft: 15}]}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              editable={false}
            />
            {/* <TouchableOpacity>
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <SizeBox size={15} />
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{...commonStyles.font16Regular}}>
            Identity confirmation{' '}
          </Text>
          <Text style={styles.varifiedtxt}>Not verified</Text>
          <View />
        </View>
        <SizeBox size={15} />
        <TouchableOpacity style={styles.confirmbtn} activeOpacity={0.7}>
          <Text
            style={{...commonStyles.font14Regular, color: Colors.btnLinear2}}>
            Confirm Id
          </Text>
        </TouchableOpacity>
        <SizeBox size={15} /> */}
        <Text style={{...commonStyles.font16Regular}}>Privacy</Text>
        <SizeBox size={10} />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={styles.label}>
            {isPrivateEnabled ? 'Private Account' : 'Public Account'}
          </Text>
          <Switch
            trackColor={{false: Colors.greyTxt, true: Colors.Pink}}
            thumbColor={isPrivateEnabled ? Colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={togglePrivateSwitch}
            value={isPrivateEnabled}
          />
        </View>
        <SizeBox size={5} />
        <Text style={styles.accountdetail}>
          When your account is public, your profile and posts can be seen by
          anyone in the Baccvs community.
        </Text>
        <SizeBox size={5} />
        <Text style={styles.accountdetail}>
          When your account is private, only the followers you approve can see
          what you share, including your photos or videos.
        </Text>
        <SizeBox size={15} />

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={styles.label}>
            {isSocialEnabled ? 'Social & Dating' : 'Social & Dating'}
          </Text>
          <Switch
            trackColor={{false: Colors.greyTxt, true: Colors.Pink}}
            thumbColor={isSocialEnabled ? Colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSocialSwitch}
            value={isSocialEnabled}
          />
        </View>
        <SizeBox size={5} />
        <Text style={styles.accountdetail}>
          When you activate Social & Dating, your profile will appear in the
          “Meet people” section. People can like your profile or send you a
          “Crush” to show interest.
        </Text>
        <SizeBox size={5} />
        <Text style={styles.accountdetail}>
          When you turn off Social & Dating, your profile will not appear in the
          “Meet people” section.
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AccountInfo;
