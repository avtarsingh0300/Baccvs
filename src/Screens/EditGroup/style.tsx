import {StyleSheet} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import fontFamily from '../../Utilities/Styles/fontFamily';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  userImg: {
    width: moderateScale(55),
    height: moderateScaleVertical(55),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.Pink,
  },

  flatcon: {
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  inputcontainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScaleVertical(40),
  },

  headinngVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgvw: {
    height: moderateScaleVertical(91),
    width: moderateScale(86),
    borderWidth: 1,
    borderColor: Colors.Pink,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainuserimg: {
    width: '97%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputvw: {
    minHeight: moderateScaleVertical(150),
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
  },
});

export default styles;
