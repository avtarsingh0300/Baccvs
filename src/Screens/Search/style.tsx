import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';

const styles = StyleSheet.create({
  conatiner: {flex: 1, paddingHorizontal: moderateScale(15)},
  inputcontainer: {
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: moderateScaleVertical(55),
  },
  input: {
    color: Colors.black,
    fontFamily: fontFamily.regular,
    width: '90%',
  },
  imgbck: {
    width: moderateScale(80),
    height: moderateScaleVertical(100),
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
