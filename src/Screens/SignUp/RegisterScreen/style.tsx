import { StyleSheet } from 'react-native';
import fontFamily from '../../../Utilities/Styles/fontFamily';

import { textScale } from '../../../Utilities/Styles/responsiveSize';
import { Colors } from '../../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  LinearConatiner: { flex: 1, paddingHorizontal: 15 },
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
  langContainer: {
    padding: 15,
    paddingLeft: 18,
    borderWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  langItem: {
    padding: 7,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    margin: 5
  },
  langItemText: {
    color: Colors.greyTxt,
    fontFamily: fontFamily.time_regular,
    padding: 0,
    fontWeight: '400',
    fontSize: textScale(14),
  }
});

export default styles;
