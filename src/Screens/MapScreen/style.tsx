import { StyleSheet } from 'react-native';
import { moderateScale, moderateScaleVertical } from '../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backBtnContainer: {
    width: 40,
    height: 40,
    zIndex: 200,
    justifyContent: "center",
    marginLeft: moderateScale(10),
    alignItems: "center",
    marginTop: moderateScaleVertical(10)
  }
});

export default styles;
