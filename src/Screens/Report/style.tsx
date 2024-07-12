import {StyleSheet} from 'react-native';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {moderateScale} from '../../Utilities/Styles/responsiveSize';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  headerTxt: {
    ...commonStyles.font20White,

    fontFamily: fontFamily.regular,
    marginLeft: moderateScale(8),
  },
  headervw: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innertxt: {
    fontSize: 14,
    color: Colors.greyTxt,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    width: '100%',
    alignSelf: 'center',
  },
});

export default styles;
