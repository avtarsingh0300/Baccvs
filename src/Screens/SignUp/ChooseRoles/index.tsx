import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../Utilities/Styles/colors';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import {ProgressHeader, SizeBox} from '../../../Utilities/Component/Helpers';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';

const ChooseRoles = ({navigation}: any) => {
  const onBack = () => {
    navigation.goBack();
  };
  const onContinue = () => {
    navigation.navigate(NavigationStrings.ReferalCode);
  };
  const onProfessionalInfo = () => {
    navigation.navigate(NavigationStrings.ProfessionalInfo);
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
        <Text style={{...commonStyles.font18W700Center}}>SIGN UP</Text>
        <SizeBox size={20} />
        <TouchableOpacity
          style={styles.professionalbtn}
          onPress={onProfessionalInfo}>
          <Text style={styles.professiontxt}>I AM A PROFESSIONAL</Text>
          <SizeBox size={2} />
          <Text style={styles.loremtxt}>
            Lorem ipsum dolor sit amet consectetur. Venenatis luctus turpis arcu
            mauris.{' '}
          </Text>
        </TouchableOpacity>
        <SizeBox size={20} />
        <TouchableOpacity style={styles.professionalbtn} onPress={onContinue}>
          <Text style={styles.professiontxt}>I AM A MEMBER</Text>
          <SizeBox size={2} />
          <Text style={styles.loremtxt}>
            Lorem ipsum dolor sit amet consectetur. Venenatis luctus turpis arcu
            mauris.{' '}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChooseRoles;
