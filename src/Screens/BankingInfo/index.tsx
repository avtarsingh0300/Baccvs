import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {SizeBox} from '../../Utilities/Component/Helpers';

const BankingInfo = ({navigation}: any) => {
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{padding: 5}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={ImagePath.Arrow_Left_2} />
            </TouchableOpacity>
            <Text
              style={{
                ...commonStyles.font20White,
                marginLeft: moderateScale(20),
              }}>
              Banking information
            </Text>
            <View style={{width: '10%'}} />
          </View>
          <Text style={styles.title}>Payment methods</Text>
          <SizeBox size={15} />
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.label}>Josh Rua 08/26</Text>
              <Text style={styles.label}>**** 2388</Text>
            </View>
            <Text style={styles.label}>08/26</Text>
          </View>
          <SizeBox size={15} />
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.label}>Arthur Gem</Text>
              <Text style={styles.label}>**** 2388</Text>
            </View>
            <Text style={styles.label}>11/28</Text>
          </View>
          <SizeBox size={25} />
          <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
            <Text style={styles.btnText}>Add payment method</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BankingInfo;

const styles = StyleSheet.create({
  LinearConatiner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    height: moderateScaleVertical(100),
    width: '100%',
    paddingHorizontal: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...commonStyles.font16WhiteBold,
  },
  cardContainer: {
    width: '80%',
    alignSelf: 'center',
    paddingVertical: moderateScaleVertical(14),
    paddingHorizontal: moderateScale(20),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    ...commonStyles.font14Bold,
    color: Colors.white,
  },
  btn: {
    width: '65%',
    paddingVertical: moderateScaleVertical(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.lightPink,
    borderRadius: 15,
  },
  btnText: {
    ...commonStyles.font16Regular,
    color: Colors.lightPink,
  },
});
