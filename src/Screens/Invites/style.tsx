import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  conatiner: {flex: 1, paddingHorizontal: moderateScale(15)},
  buttongroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
  },
  acbtn: {
    width: moderateScale(81),
    height: moderateScaleVertical(26),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntxt: {
    fontFamily: fontFamily.regular,
    color: Colors.white,
    fontSize: moderateScale(10),
  },
  seebtn: {
    borderWidth: 1,
    borderColor: Colors.white,
    width: moderateScale(72),
    height: moderateScaleVertical(25),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  userimg: {
    width: moderateScale(55),
    height: moderateScaleVertical(62),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  heading: {
    fontFamily: fontFamily.regular,
    color: Colors.white,
    fontSize: moderateScale(12),
    width: width / 2,
    textAlign: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(13),
  },
});

export default styles;
