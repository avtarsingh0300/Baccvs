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
    props.navigation.navigate(NavigationStrings.ActivateLocation);
  };
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ProgressHeader onPress={onBack} value={4} />
        <SizeBox size={15} />
         <Text style={{...commonStyles.font18W700Center}}>
        Our Commitments
        </Text>
        <SizeBox size={10} />
        <View style={{}}>
        <Text style={styles.respecttxt} >
        1. Respect and Inclusion
        </Text>
        <SizeBox size={5}/>
        <View style={{flexDirection:"row",paddingLeft:8,alignSelf:"center"}}>
          <Text style={{color:Colors.white}}>• </Text>
        <Text style={styles.valuetxt}>
         We value mutual respect and inclusion. Every user, whether a member, DJ, or promoter, must treat others with respect, without discrimination based on origin, gender, sexual orientation, or beliefs.
        </Text>
        </View>
        <SizeBox size={10} />
        <Text style={styles.respecttxt}>
        2. Authenticity and Transparency
        </Text>
        <SizeBox size={5}/>
        <View style={{flexDirection:"row",paddingLeft:8,alignSelf:"center"}}>
          <Text style={{color:Colors.white}}>• </Text>
        <Text style={styles.valuetxt}>
        Authenticity is at the heart of the Baccvs community. All members commit to providing accurate information and interacting honestly. The use of fake profiles or the spread of false information is strictly prohibited.
        </Text>
        </View>
        <SizeBox size={10} />
        <Text style={styles.respecttxt}>
        3. Safety and Trust
        </Text>
        <SizeBox size={5}/>
        <View style={{flexDirection:"row",paddingLeft:8,alignSelf:"center"}}>
          <Text style={{color:Colors.white}}>• </Text>
        <Text style={styles.valuetxt}>
        Your safety is our priority. We are committed to maintain a platform free from harassment or abuse. Reporting and blocking mechanisms are available for users whenever needed.
        </Text>
        </View>
        </View>
        <SizeBox size={40} />
        <CommonBtn onPress={onContinue} title={'Continue'} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Commitments;
