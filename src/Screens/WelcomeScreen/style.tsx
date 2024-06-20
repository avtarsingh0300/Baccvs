import {StyleSheet} from 'react-native';
import {
  moderateScaleVertical,
  textScale,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 15},
  buttons: {
    height: 65,
    borderRadius: 5,
    width: '100%',
    marginVertical: moderateScaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    ...commonStyles.font16Regular,
  },
  forgetTxt: {
    textAlign: 'center',
    marginTop: moderateScaleVertical(10),
    color: Colors.white,
    ...commonStyles.font16Regular,
  },
  signTxt: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: textScale(12),
    width: '80%',
    marginTop: moderateScaleVertical(20),
    alignSelf: 'center',
    fontFamily: fontFamily.time_regular,
  },
  title: {
    color: Colors.white,
    fontSize: textScale(40),
    textAlign: 'center',
    fontFamily: fontFamily.time_bold,
  },
});

export default styles;
