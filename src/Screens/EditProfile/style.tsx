import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: moderateScaleVertical(20),
  },
  header: {
    width: '100%',
    paddingVertical: moderateScaleVertical(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(30),
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  iptContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 35,
  },
  profiletxt: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: Colors.greyTxt,
    paddingLeft: 15,
  },
  input: {
    height: moderateScaleVertical(30),
    paddingLeft: moderateScale(10),
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    ...commonStyles.font12,
    fontWeight: '400',
  },
  label: {
    ...commonStyles.font14,
    color: Colors.white,
    fontWeight: '700',
    marginLeft: moderateScale(15),
  },

  editedimg: {
    width: moderateScale(139),
    height: moderateScaleVertical(156),
    borderRadius: 5,
  },
  editvci: {
    position: 'absolute',
    top: -10,
    right: 0,
  },
  selecttxt: {
    fontSize: 12,
    fontWeight: '300',
    fontFamily: fontFamily.regular,
    color: Colors.greyTxt,
    paddingLeft: 15,
  },
  inputHolder: {
    padding: 10,
    borderWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: Colors.greyTxt,
    borderRadius: 2,
    alignItems: 'center',
  },
  inptHolder: {
    padding: 10,
    borderWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: Colors.greyTxt,
    borderRadius: 2,
    alignItems: 'center',
    width: moderateScale(134),
  },
  iptHolder: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: Colors.greyTxt,
    borderRadius: 2,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // width:moderateScale(91)
  },
  iptHold: {
    padding: 10,
    borderWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: Colors.greyTxt,
    borderRadius: 2,
    width: moderateScale(98),
  },
  itHolder: {
    padding: 10,
    borderWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: Colors.greyTxt,
    borderRadius: 2,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  inpt: {
    color: Colors.white,
    fontFamily: fontFamily.time_regular,
    padding: 0,
    fontWeight: '400',
    fontSize: textScale(12),
    textAlign: 'center',
  },
  langcon: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  Btnmain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 30,
  },
  btn: {
    padding: 1,
    borderRadius: 7,
    width: '30%',
  },
  button: {
    backgroundColor: Colors.backgroundNew,
    borderRadius: 7,
    height: 50,
    justifyContent: 'center',
  },
  text: {
    ...commonStyles.font14Center,
  },
  socialimg: {
    height: 138,
    width: 103,
    margin: 10,
    borderRadius: 10,
  },
  cross: {
    position: 'absolute',
    right: 10,
  },
});
