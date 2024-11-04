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

export default styles;
