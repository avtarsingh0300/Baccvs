import {StyleSheet} from 'react-native';

import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  innertxt: {
    fontSize: 14,
    color: Colors.greyTxt,
    fontFamily: fontFamily.regular,

    alignSelf: 'center',
  },
});

export default styles;
