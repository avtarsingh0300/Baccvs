import {StyleSheet} from 'react-native';
import {Colors} from '../../../Utilities/Styles/colors';
import fontFamily from '../../../Utilities/Styles/fontFamily';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 15},
  basictxt: {
    color: Colors.white,
    fontFamily: fontFamily.time_regular,
    fontSize: 14,
    fontWeight: '400',
  },
  itemvw: {
    paddingLeft: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.greyTxt,
    borderRadius: 2,
  },
});
export default styles;
