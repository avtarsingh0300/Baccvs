import {StyleSheet} from 'react-native';
import {Colors} from '../../../Utilities/Styles/colors';
import fontFamily from '../../../Utilities/Styles/fontFamily';
import {textScale} from '../../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 15},
  input: {
    color: Colors.white,
    fontFamily: fontFamily.time_regular,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    fontSize: textScale(12),
  },
  inputHolder: {
    height: 45,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.white,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    width: '65%',
  },
});
export default styles;
