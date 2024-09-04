import {Platform, StyleSheet} from 'react-native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../Utilities/Styles/responsiveSize';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';

export const styles = StyleSheet.create({
  LinearConatiner: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(15),
    width: '100%',
    paddingHorizontal: moderateScale(20),
    // backgroundColor: Colors.LinearBlack,
  },
  headerTxt: {
    ...commonStyles.font20White,
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    marginLeft: moderateScale(35),
  },
  secondHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScaleVertical(44),
    paddingHorizontal: moderateScale(20),
  },
  timeText: {
    ...commonStyles.font12Bold,
  },

  likebtn: {justifyContent: 'center', alignItems: 'center'},
  ticketContainer: {
    paddingVertical: moderateScaleVertical(5),
    paddingHorizontal: moderateScale(15),
    borderWidth: 1,
    height: moderateScaleVertical(36),
    borderRadius: 10,
    borderColor: Colors.white,
    backgroundColor: Colors.LinearBlack,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketPrice: {
    ...commonStyles.font16Regular,
    fontWeight: '400',
    color: Colors.white,
  },
  distanceText: {
    ...commonStyles.font14,
    color: Colors.white,
    fontFamily: fontFamily.regular,
    fontWeight: '700',
  },
  bottomBar: {
    height: moderateScaleVertical(200),

    // width: '90%',
    // alignSelf: 'center',

    borderRadius: 8,
    backgroundColor: Colors.LinearBlack,
    // position: 'absolute',
    // bottom: Platform.OS === 'android' ? height / 30 : height / 10,
    // flexDirection: 'row',

    alignItems: 'center',
    //   width:
    paddingHorizontal: 10,
  },
  bottomBarText: {
    fontSize: textScale(8),
    color: Colors.white,
    fontFamily: fontFamily.regular,
    fontWeight: '700',
    top: 2,
  },
  profileimg: {
    width: moderateScale(56),
    height: moderateScaleVertical(70),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lightPink,
  },
  sheetContent: {
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(5),
    alignItems: 'center',
  },
  cmtinpt: {
    padding: 8,
    borderRadius: 25,
    borderWidth: 1,
    width: '80%',
    marginLeft: moderateScale(15),
    backgroundColor: Colors.lightPink,
    opacity: 0.9,
    color: Colors.white,
    fontSize: textScale(10),
    fontFamily: fontFamily.regular,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: moderateScaleVertical(30),
  },
  cmttxt: {
    fontSize: textScale(8),
    fontFamily: fontFamily.regular,
    color: Colors.white,
  },
  onelife: {
    fontSize: textScale(16),
    textAlign: 'center',
    marginTop: 10,
    color: Colors.green,
  },
  allBtn: {
    paddingVertical: moderateScale(3),
    paddingHorizontal: moderateScale(10),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.white,
    marginLeft: moderateScale(14),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  abview: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? height / 8 : height / 6.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '90%',
    alignSelf: 'center',
  },
});
