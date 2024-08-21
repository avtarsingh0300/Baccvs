import {View, Text, SafeAreaView} from 'react-native';
import React, {useState} from 'react';

import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const Scanner = ({navigation}: any) => {
  return (
    <LinearGradient
      colors={[Colors.Linear, Colors.LinearBlack, Colors.LinearBlack]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView></SafeAreaView>
    </LinearGradient>
  );
};

export default Scanner;
