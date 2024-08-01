import {Platform, StyleSheet} from 'react-native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';
import commonStyles from '../../Utilities/Styles/commonStyles';
const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScaleVertical(20),
  },
  profileimg: {
    height: moderateScaleVertical(56),
    width: moderateScale(58),
    borderRadius: 8,
  },
  logo: {
    height: moderateScaleVertical(56),
    width: moderateScale(58),
    borderRadius: 8,
  },
  rowvw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  datevw: {
    padding: moderateScaleVertical(10),
    paddingLeft: 30,
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScaleVertical(10),
  },
  allBtn: {
    paddingVertical: moderateScale(3),
    paddingHorizontal: moderateScale(25),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,
    borderColor: Colors.white,
    marginLeft: moderateScale(14),
  },
  listContainer: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(40),
    height: height / 3.5,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScaleVertical(10),
    paddingHorizontal: 15,
  },
  tag: {
    width: moderateScale(15),
    height: moderateScaleVertical(15),
  },
  ontxt: {
    fontSize: 12,
    color: Colors.red,
    fontFamily: fontFamily.time_regular,
    fontWeight: '600',
  },
  backimg: {
    width: '100%',
    height: height / 4,
    top: moderateScaleVertical(15),
    justifyContent: 'flex-end',
  },
  flexinner: {
    paddingHorizontal: 15,
    paddingVertical: moderateScaleVertical(19),
    flexDirection: 'row',
  },
  shortimg: {
    width: moderateScale(56),
    height: moderateScaleVertical(76),
    borderRadius: 8,
  },
  extraimg: {
    alignSelf: 'flex-end',
    width: moderateScale(32),
    height: moderateScaleVertical(32),
    borderRadius: 8,
  },
  music: {
    borderWidth: 1,
    padding: 5,
    borderColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 20,
    paddingHorizontal: moderateScale(10),
  },
  musictxt: {
    color: Colors.white,
    fontSize: textScale(8),
    fontFamily: fontFamily.time_bold,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  date: {
    color: Colors.white,
    fontFamily: fontFamily.regular,
    fontWeight: '500',
    fontSize: textScale(13),
  },
  optionContainer: {
    width: '35%',
    paddingVertical: moderateScaleVertical(5),
    borderRadius: 10,
    backgroundColor: Colors.black,
    marginTop: moderateScaleVertical(Platform.OS == 'ios' ? 150 : 80),
    alignSelf: 'flex-end',
    marginRight: moderateScale(55),
  },
  option: {
    width: '100%',
    paddingVertical: moderateScaleVertical(10),
    borderBottomWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    ...commonStyles.font14,
    fontWeight: '600',
  },
});

export default styles;
