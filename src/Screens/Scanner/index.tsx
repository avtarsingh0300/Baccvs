import {View, Text, SafeAreaView, Alert, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import styles from './styles';
import {height, width} from '../../Utilities/Styles/responsiveSize';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {CommonBtn} from '../../Utilities/Component/Helpers';
import fontFamily from '../../Utilities/Styles/fontFamily';

const Scanner = ({navigation}: any) => {
  const onSuccess = e => {
    Alert.alert(`QR Code: ${e.data}`);
    // Handle the scanned data here
  };
  const onScan = () => {
    navigation.goBack();
  };
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: fontFamily.bold,
            fontWeight: '500',
            color: Colors.white,
            fontSize: 30,
          }}>
          Scan your code
        </Text>
        <ImageBackground
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            width: width / 1.2,
            height: height / 1.8,
          }}
          resizeMode="contain"
          source={ImagePath.scanner}>
          <QRCodeScanner
            onRead={onSuccess}
            cameraStyle={{
              width: width / 1.5,
              height: 250,
              alignSelf: 'center',
            }}
            containerStyle={{alignSelf: 'center'}}
            flashMode={RNCamera.Constants.FlashMode.auto}
          />
        </ImageBackground>
        <View style={{paddingHorizontal: 40}}>
          <CommonBtn title="Scan Now" onPress={onScan} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Scanner;
