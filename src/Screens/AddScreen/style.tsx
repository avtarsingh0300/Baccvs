import {StyleSheet} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../Utilities/Styles/responsiveSize';

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
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  timecon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    padding: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.inputborder,
    borderRadius: 8,
    backgroundColor: Colors.LinearBlack,
  },
  mondaInvw: {
    padding: 5,
    borderColor: Colors.Pink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  langContainer: {
    padding: 2,
    paddingLeft: 18,
    borderWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
  langItem: {
    padding: 2,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    margin: 2,
  },
  langItemText: {
    color: Colors.greyTxt,
    fontFamily: fontFamily.time_regular,
    paddingBottom: 2,
    paddingHorizontal: 2,
    fontWeight: '400',
    fontSize: textScale(10),
  },
});

export default styles;
