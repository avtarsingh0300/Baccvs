import {View, Text, Image, SafeAreaView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {ImageComponent} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: moderateScaleVertical(20),
          }}>
          <ImageComponent
            source={ImagePath.ProfileImg}
            style={{
              height: moderateScaleVertical(56),
              width: moderateScale(58),
              borderRadius: 8,
            }}
          />
          <ImageComponent
            source={ImagePath.AppLogo}
            style={{
              height: moderateScaleVertical(56),
              width: moderateScale(58),
              borderRadius: 8,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* <VectorIcon g /> */}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;
