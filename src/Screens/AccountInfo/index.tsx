import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';

const AccountInfo = () => {
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView></SafeAreaView>
    </LinearGradient>
  );
};

export default AccountInfo;
