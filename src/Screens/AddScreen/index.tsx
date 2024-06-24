import {View, Text} from 'react-native';
import React from 'react';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {height} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const AddScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={{flex: 1}}>
      <Text
        style={{
          ...commonStyles.font14Center,
          alignSelf: 'center',
          marginTop: height / 2,
        }}>
        Under constrution .....
      </Text>
    </LinearGradient>
  );
};

export default AddScreen;
