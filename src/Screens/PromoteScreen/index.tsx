import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';

const PromoteScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={{flex: 1}}>
      <SafeAreaView>
        <Text style={styles.proomote}>Promote</Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PromoteScreen;
