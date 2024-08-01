import {StyleSheet} from 'react-native';

import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';
import {moderateScaleVertical} from '../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  flatvw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScaleVertical(10),
    alignItems: 'center',
  },
  innervw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default styles;
