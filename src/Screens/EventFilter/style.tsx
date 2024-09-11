import {StyleSheet} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import fontFamily from '../../Utilities/Styles/fontFamily';
import commonStyles from '../../Utilities/Styles/commonStyles';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  moneyVw: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  select: {
    backgroundColor: Colors.slider,
    height: 3,
    alignSelf: 'center',
    borderRadius: 5,
  },
  unsel: {
    backgroundColor: Colors.lightPink,
    height: 3,
    alignSelf: 'center',
    borderRadius: 5,
  },
  marker: {
    height: moderateScaleVertical(15),
    width: moderateScale(15),
    alignSelf: 'center',
    borderWidth: 0,
    backgroundColor: Colors.slider,
  },
  flex: {
    flexDirection: 'row',
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center"
  },
  boxcontainer: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    width: '90%',
    marginLeft: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  flexout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:15
  },
  // flatbox: {
  //   // paddingHorizontal: 10,
  //   // borderWidth: 1,
  //   // borderColor: Colors.white,
  //   // borderRadius: 8,
  //   // width: '90%',
  //   // marginLeft: 10,
  //   // alignSelf: 'center',
  //   paddingVertical: moderateScaleVertical(10),
  // },
  flatcon: {
    borderWidth:1,
    backgroundColor:Colors.lightPink,
    width:"35%",
    justifyContent:"center",
    alignItems:"center",
    height:moderateScaleVertical(28),
    borderRadius:2
  },
  flatcontainer: {
    borderWidth:1,
    backgroundColor:Colors.lightPink,
    width:moderateScale(81),
    justifyContent:"center",
    alignItems:"center",
    height:moderateScaleVertical(28),
    borderRadius:2
  },
  flatcon2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScaleVertical(5),
    backgroundColor: Colors.lightPink,
    marginTop: moderateScaleVertical(5),
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
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
  musicFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horzVw: {
    paddingHorizontal: 5,
    paddingVertical: 4,
    backgroundColor: Colors.slider,
    borderRadius: 15,
    marginHorizontal: moderateScale(2),
    marginVertical: moderateScaleVertical(5),
  },
  inputcon: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(8),
  },
  searchflex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langItem: {
    padding: 2,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    margin: 2,
    flexDirection: 'row',
  },
  langItemText: {
    color: Colors.greyTxt,
    fontFamily: fontFamily.time_regular,
    paddingBottom: 2,
    paddingHorizontal: 2,
    fontWeight: '400',
    fontSize: textScale(10),
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
  Btnmain: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom:10
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
  eventCon: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent:"space-between",
    width: '100%',
  },
  eventtxt: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: fontFamily.regular,
  },
});

export default styles;
