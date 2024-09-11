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
  LinearConatiner: {flex: 1, paddingHorizontal: 20, backgroundColor: '#000D1A'},
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
    // borderWidth: 1,
    borderBottomWidth: 0.4,
    borderRadius: 5,
    borderColor: Colors.inputborder,
    marginLeft: moderateScale(14),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    height: moderateScaleVertical(21),
    // alignItems: 'center',
  },
  listContainer: {
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(40),
    height: height / 3.8,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(10),
  },
  tag: {
    width: moderateScale(19),
    height: moderateScaleVertical(17),
  },
  ontxt: {
    fontSize: 12,
    color: Colors.lightgreen,
    fontFamily: fontFamily.time_regular,
    fontWeight: '700',
  },
  backimg: {
    width: '100%',
    height: height / 3.5,
    // justifyContent: 'flex-end',
  },
  flexinner: {
    paddingHorizontal: 15,
    paddingVertical: moderateScaleVertical(19),
    flexDirection: 'row',
    top: -45,
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
    borderWidth: 0.6,
    padding: 5,
    borderColor: Colors.lightpink2,
    alignSelf: 'center',
    borderRadius: 2,
    paddingHorizontal: moderateScale(10),
  },
  musictxt: {
    color: Colors.white,
    fontSize: textScale(12),
    fontWeight: '400',
    fontFamily: fontFamily.regular,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  date: {
    color: Colors.white,
    fontFamily: fontFamily.regular,
    fontWeight: '500',
    fontSize: textScale(18),
  },
  optionContainer: {
    width: '100%',
    paddingVertical: moderateScaleVertical(10),
    borderRadius: 10,
    borderBottomWidth: 1,
    backgroundColor: Colors.backgroundNew,
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
  likestxt: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    fontWeight: '600',
    color: Colors.white,
    alignSelf: 'center',
  },
  liktxtcon: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  likeimg: {
    width: moderateScale(25),
    height: moderateScaleVertical(25),
    resizeMode: 'contain',
  },
});

export default styles;
