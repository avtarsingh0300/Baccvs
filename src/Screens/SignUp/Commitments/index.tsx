import {SafeAreaView, Text, TextInput, View} from 'react-native';
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

const Commitments = (props: any) => {
  const onBack = () => {
    props.navigation.goBack();
  };
  const onContinue = () => {
    props.navigation.navigate(NavigationStrings.RegisterScreen);
  };
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ProgressHeader onPress={onBack} value={1} />
        <SizeBox size={15} />
        <Text style={{...commonStyles.font18W700Center}}>
        Our Commitments
        </Text>
        <SizeBox size={10} />
        <Text style={{...commonStyles.font14Center, color: Colors.greyTxt,textAlign:"center"}}>
          Please write your referral code.
        </Text>
        <SizeBox size={20} />
        <View style={styles.inputHolder}>
          <TextInput
            placeholder="Enter referral code"
            placeholderTextColor={Colors.white}
            style={styles.input}
          />
        </View>
        <SizeBox size={40} />
        <CommonBtn onPress={onContinue} title={'Continue'} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Commitments;
