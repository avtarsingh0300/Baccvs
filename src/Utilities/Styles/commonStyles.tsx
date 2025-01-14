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
    fontWeight: '700',
    fontFamily: fontFamily.time_regular,
    color: Colors.white,
  },
  font16White: {
    fontSize: textScale(16),
    fontWeight: '600',
    color: Colors.white,
    fontFamily: fontFamily.regular,
  },
  font16WhiteBold: {
    fontSize: textScale(16),
    fontWeight: '700',
    color: Colors.white,
    fontFamily: fontFamily.bold,
  },
  font20White: {
    fontSize: textScale(20),
    fontWeight: '700',
    color: Colors.white,
  },
  font20W400: {
    fontSize: textScale(20),
    fontWeight: '400',
    color: Colors.LinearBlack,
    fontFamily: fontFamily.regular,
  },
  font24W400: {
    fontSize: textScale(24),
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
  font18White: {
    fontSize: textScale(18),
    fontWeight: '400',
    color: Colors.white,
    fontFamily: fontFamily.regular,
  },
  font14Center: {
    fontSize: textScale(11),
    fontWeight: '700',
    color: Colors.white,
    fontFamily: fontFamily.time_regular,
    alignSelf: 'center',
  },
  font14: {
    fontSize: textScale(16),
    fontWeight: '700',
    color: Colors.white,
  },
  font14Bold: {
    fontSize: textScale(14),
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: Colors.white,
  },
  font14Regular: {
    fontSize: textScale(14),
    fontWeight: '400',
    color: Colors.white,
  },
  font12: {
    fontSize: textScale(12),
    fontWeight: '400',
    color: Colors.white,
  },
  font13: {
    fontSize: textScale(12),
    fontWeight: '400',
    color: Colors.white,
  },
  font12Regular: {
    fontSize: textScale(12),
    fontWeight: '700',
    fontFamily: fontFamily.time_regular,
    color: Colors.white,
  },
  font12Bold: {
    fontSize: textScale(12),
    fontWeight: '700',
    color: Colors.white,
    fontFamily: fontFamily.bold,
  },
  Heading20font: {
    fontSize: textScale(20),
    fontWeight: '500',
    fontFamily: fontFamily.time_regular,
    color: Colors.white,
    textAlign: 'center',
  },
  font10Regular: {
    fontSize: textScale(10),
    fontWeight: '500',
    fontFamily: fontFamily.time_regular,
  },
  font10Bold: {
    fontSize: textScale(10),
    fontWeight: '500',
    fontFamily: fontFamily.time_bold,
  },
  font12Regualar2: {
    fontSize: textScale(12),
    fontWeight: '600',
    fontFamily: fontFamily.regular,
  },
});
