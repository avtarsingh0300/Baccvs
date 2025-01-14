import {Image, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../Utilities/Styles/colors';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import {
  CommonBtn,
  ProgressHeader,
  SizeBox,
} from '../../../Utilities/Component/Helpers';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';
import ImagePath from '../../../Utilities/Constants/ImagePath';

const ActivateLocation = (props: any) => {
  const onBack = () => {
    props.navigation.goBack();
  };
  const onContinue = () => {
    props.navigation.navigate(NavigationStrings.RegisterScreen, {
      phone: props?.route?.params?.phone,
    });
  };
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ProgressHeader onPress={onBack} value={5} />
        <SizeBox size={15} />
        <Text style={{...commonStyles.font18W700Center}}>
          Activate your location
        </Text>
        <SizeBox size={5} />
        <Text style={styles.enabletxt}>
          Enable your location to explore nearby events, connect with the
          hottest spots in real-time.
        </Text>
        <SizeBox size={30} />
        <View style={{alignItems: 'center'}}>
          <Image
            source={ImagePath.Activelocation}
            style={{width: 150, height: 150}}
          />
        </View>
        <SizeBox size={40} />
        <CommonBtn onPress={onContinue} title={'Activate my location'} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ActivateLocation;
