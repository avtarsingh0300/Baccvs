import {Platform, StyleSheet} from 'react-native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  imgbck: {
    width: moderateScale(140),
    height: moderateScaleVertical(190),
    alignSelf: 'center',

    justifyContent: 'flex-end',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(10),
  },
  picker: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 8,
    // width: '50%',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // flexWrap: 'wrap-reverse',
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.greyTxt,
    fontFamily: fontFamily.regular,
  },
  itemDate: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: fontFamily.regular,
    color: Colors.greyTxt,
    alignSelf: 'center',
  },

  btn: {
    marginLeft: 5,
    width: moderateScale(52),
    height: moderateScale(55),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: moderateScaleVertical(20),
  },
  image: {
    borderRadius: 5,
    width: 51,
    height: 67,
  },

  selectedImage: {
    width: width / 1.2,
    height: height / 1.6,
    alignSelf: 'center',
  },
  main: {
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    borderRadius: 30,
    backgroundColor: Colors.black,
    width: 57,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    bottom: 6,
  },
  fire: {
    borderRadius: 25,
    backgroundColor: Colors.white,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    width: '45%',
    paddingVertical: moderateScaleVertical(5),
    borderRadius: 10,
    backgroundColor: Colors.black,
    marginTop: moderateScaleVertical(Platform.OS == 'ios' ? 100 : 45),
    alignSelf: 'flex-end',
    marginRight: moderateScale(25),
    opacity: 0.7,
  },
  option: {
    width: '100%',
    paddingVertical: moderateScaleVertical(10),
    borderBottomWidth: 1,
    borderColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(32),
  },
  optionText: {
    ...commonStyles.font14,
    fontWeight: '600',
    // marginRight: moderateScale(10),
  },
});

export default styles;
