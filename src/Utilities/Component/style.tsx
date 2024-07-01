import { Platform, StyleSheet } from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../Styles/responsiveSize';
import commonStyles from '../Styles/commonStyles';
import fontFamily from '../Styles/fontFamily';
import { Colors } from '../Styles/colors';

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(15),
  },
  headerTxt: {
    ...commonStyles.font20White,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
  },
  cbtn: {
    padding: 15,
    backgroundColor: Colors.btnBackground,
    borderRadius: 8,
    alignItems: 'center',
  },
  select: {
    backgroundColor: Colors.Pink,
    height: 5,
    alignSelf: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },
  unsel: {
    backgroundColor: Colors.Linear,
    height: 5,
    alignSelf: 'center',
    borderRadius: 5,
  },
  dim: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  picVw: {
    backgroundColor: Colors.LinearBlack,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    width: '30%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pickerContainer: {
    width: moderateScale(60),
    height: moderateScaleVertical(56),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingRight: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  inputHolder: {
    padding: 15,
    paddingLeft: 18,
    borderWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
  },
  input: {
    color: Colors.greyTxt,
    fontFamily: fontFamily.time_regular,
    padding: 0,
    fontWeight: '400',
    fontSize: textScale(14),
    width: '100%',
  },
  pickerContainer2: {
    marginVertical: 10,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  profileimg: {
    height: moderateScaleVertical(56),
    width: moderateScale(58),
    borderRadius: 8,
  },
  drawerCon: {
    backgroundColor: Colors.white,
    width: '80%',
    height: '100%',
    paddingLeft: moderateScale(20),
    paddingTop: moderateScaleVertical(40),
  },
});

export default styles;
