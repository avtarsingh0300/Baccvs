import {StyleSheet} from 'react-native';
import {moderateScaleVertical} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';

const styles = StyleSheet.create({
  LinearConatiner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    borderRadius: 10,
  },
  btn: {
    width: '80%',
    paddingVertical: moderateScaleVertical(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#330542',
  },
  btnText: {
    ...commonStyles.font16Regular,
    color: Colors.white,
  },
});

export default styles;
