import {StyleSheet} from 'react-native';
import {
  moderateScaleVertical,
  textScale,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  inputHolder: {
    borderWidth: 1,
    borderColor: Colors.inputborder,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',

    padding: 8,
  },
  input: {
    color: Colors.Pink,
    fontFamily: fontFamily.regular,
    padding: 5,
    fontWeight: '700',
    fontSize: textScale(12),
  },
});

export default styles;
