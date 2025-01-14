import {Platform, StyleSheet} from 'react-native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  editedimg: {
    width: moderateScale(56),
    height: moderateScaleVertical(58),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lightPink,
  },
  phantomcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  flatcontainer: {
    width: moderateScale(160),
    height: moderateScaleVertical(111),
    backgroundColor: Colors.btnback,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: moderateScale(10),
  },
  dawerContainer: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScaleVertical(15),
    borderRadius: 7,
    width: '60%',
    position: 'absolute',
    top: Platform.OS == 'android' ? height / 10 : height / 6.4,
    left: width / 14,
    borderWidth: 1,
    borderColor: Colors.lightPink,
  },
});
export default styles;
