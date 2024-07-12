import {StyleSheet} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1},
  backimg: {
    height: moderateScaleVertical(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  locbtn: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    padding: 15,
  },
  picker: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: height / 8,
    paddingHorizontal: moderateScale(20),
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
  startbtn: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.white,
    height: 31,
    width: 75,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBtn: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  timecon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },

  flatbox: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    width: '95%',
    marginLeft: 10,
    alignSelf: 'center',
    borderStyle: 'dashed',

    paddingVertical: moderateScaleVertical(10),
  },
  flatcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScaleVertical(5),
  },
  tickvw: {
    height: 15,
    width: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  camerarow: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: moderateScaleVertical(10),
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default styles;
