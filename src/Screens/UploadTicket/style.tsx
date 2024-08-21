import {StyleSheet} from 'react-native';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';
import {
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  uploadticket: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: fontFamily.time_bold,
    color: Colors.white,
    textAlign: 'center',
  },
  upload: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: fontFamily.time_bold,
    color: Colors.white,
    paddingLeft: 20,
  },
  selecttxt: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fontFamily.time_regular,
    color: Colors.txtsel,
    textAlign: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  sytbtn: {
    borderWidth: 1,
    borderColor: Colors.grey,
    height: moderateScaleVertical(50),
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
  },
  sell: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.grey,
    fontFamily: fontFamily.bold,
  },
  flexvw: {
    flexDirection: 'row',
    marginLeft: 20,
  },
});

export default styles;
