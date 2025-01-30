import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  conatiner: {flex: 1, paddingHorizontal: moderateScale(15)},
  buttongroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
  },
  inputcontainer: {
    paddingHorizontal: 15,
    backgroundColor: Colors.Linear,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: moderateScaleVertical(40),
  },
  input: {
    color: Colors.white,
    fontFamily: fontFamily.regular,
    width: '90%',
  },
  acbtn: {
    width: moderateScale(81),
    height: moderateScaleVertical(26),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntxt: {
    fontFamily: fontFamily.regular,
    color: Colors.white,
    fontSize: moderateScale(10),
  },
  seebtn: {
    borderWidth: 1,
    borderColor: Colors.white,
    width: moderateScale(72),
    height: moderateScaleVertical(25),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  userimg: {
    width: moderateScale(55),
    height: moderateScaleVertical(55),
    borderRadius: 20,
  },
  heading: {
    fontFamily: fontFamily.regular,
    color: Colors.white,
    fontSize: moderateScale(12),
    width: width / 1.5,
    paddingLeft: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(13),
    width: '100%',
  },
  reddot: {
    backgroundColor: Colors.red,
    borderRadius: 10,
    position: 'absolute',
    right: -10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    // alignSelf: 'center',
  },
  dottxt: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: Colors.white,
  },
});

export default styles;
