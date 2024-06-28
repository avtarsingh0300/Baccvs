import {View, Text, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {Header, SizeBox} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {moderateScale} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';

const Settings = (props: any) => {
  const onGoback = () => {
    props.navigation.goBack();
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
        <Text style={styles.headingTxt}>
          See information about your account, download an archive of your data,
          or learn about your account deactivation options.
        </Text>
        <SizeBox size={20} />
        <View>
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
        </View>
        <SizeBox size={20} />
        <View>
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
        </View>
        <SizeBox size={20} />
        <View>
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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
