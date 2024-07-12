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
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.Pink,
  },

  flatcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  inputcontainer: {
    paddingHorizontal: 15,
    backgroundColor: Colors.Linear,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: moderateScaleVertical(55),
  },
  input: {
    color: Colors.black,
    fontFamily: fontFamily.regular,
    width: '90%',
  },
  headinngVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
