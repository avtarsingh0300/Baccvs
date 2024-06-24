import {StyleSheet} from 'react-native';
import fontFamily from '../../../Utilities/Styles/fontFamily';

import {textScale} from '../../../Utilities/Styles/responsiveSize';
import {Colors} from '../../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 15},
  modalContainer: {
    padding: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.inputborder,
    borderRadius: 8,
    backgroundColor: Colors.LinearBlack,
  },
  mondaInvw: {
    padding: 5,
    borderColor: Colors.Pink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  biotxt: {
    fontSize: textScale(20),
    fontFamily: fontFamily.time_bold,
    textAlign: 'center',
    color: Colors.white,
  },
});

export default styles;
