import {StyleSheet} from 'react-native';
import {textScale} from './responsiveSize';
import fontFamily from './fontFamily';
import {Colors} from './colors';

export const hitSlopProp = {
  top: 25,
  right: 25,
  left: 40,
  bottom: 40,
};
export default StyleSheet.create({
  font16Regular: {
    fontSize: textScale(16),
    fontWeight: '400',
    fontFamily: fontFamily.time_regular,
  },
  font16White: {
    fontSize: textScale(16),
    fontWeight: '400',
    color: Colors.white,
    fontFamily: fontFamily.regular,
  },
  font20White: {
    fontSize: textScale(20),
    fontWeight: '700',
    color: Colors.white,
  },
  font20W400: {
    fontSize: textScale(18),
    fontWeight: '400',
    color: Colors.white,
    fontFamily: fontFamily.regular,
  },
  font18W700Center: {
    fontSize: textScale(18),
    fontWeight: '600',
    color: Colors.white,
    fontFamily: fontFamily.time_bold,
    alignSelf: 'center',
  },
  font14Center: {
    fontSize: textScale(14),
    fontWeight: '400',
    color: Colors.white,
    fontFamily: fontFamily.time_regular,
    alignSelf: 'center',
  },
});
