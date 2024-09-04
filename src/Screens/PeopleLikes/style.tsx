import {StyleSheet} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  liketxt: {
    fontSize: 20,
    fontWeight: '700',
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: fontFamily.regular,
    paddingLeft: 15,
  },
  likestxt: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    fontFamily: fontFamily.regular,
  },
  likesbtn: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  crushtxt: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fontFamily.regular,
    color: Colors.white,
    paddingLeft: 10,
  },
  kingson: {
    fontFamily: fontFamily.regular,
    ...commonStyles.font14,
    position: 'absolute',
    bottom: 10,
    padding: 10,
  },
  leilani: {
    fontFamily: fontFamily.regular,
    ...commonStyles.font14,
    position: 'absolute',
    bottom: 28,
    padding: 10,
  },
  imgback: {
    width: moderateScale(134),
    height: moderateScaleVertical(186),
    marginHorizontal: 7,
    marginVertical: 10,
  },
  imgbacks: {
    width: moderateScale(134),
    height: moderateScaleVertical(186),
    marginHorizontal: 15,
    marginVertical: 10,
  },
  subscribetxt: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: Colors.white,
    paddingLeft: 5,
  },
  blurimg: {
    width: moderateScaleVertical(140),
    height: moderateScale(35),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  line: {
    height: '100%',
    borderWidth: 1,
    borderColor: Colors.white,
  },
});

export default styles;
