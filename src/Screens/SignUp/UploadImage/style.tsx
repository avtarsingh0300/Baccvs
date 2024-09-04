import {StyleSheet} from 'react-native';
import fontFamily from '../../../Utilities/Styles/fontFamily';

import {
  height,
  moderateScaleVertical,
  textScale,
} from '../../../Utilities/Styles/responsiveSize';
import {Colors} from '../../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 15},
  imgTxt: {
    fontSize: textScale(12),
    fontFamily: fontFamily.time_regular,
    color: Colors.white,
    textAlign: 'center',
  },
  imageContainer: {
    backgroundColor: Colors.dashBordervw,
    borderWidth: 4,
    height: height / 6,
    width: '30%',
    marginLeft: 10,
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderRadius: 8,
    borderColor: Colors.dashBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScaleVertical(10),
  },
  innerCon: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: Colors.white,
  },
  btnLinear: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
