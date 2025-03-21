import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';

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
    borderWidth: 1,
    borderColor: Colors.Linear,
  },
  profileimgs: {
    height: moderateScaleVertical(56),
    width: moderateScale(58),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Linear,
    marginTop: 4,
  },
  myticketstext: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: fontFamily.time_regular,
    color: Colors.white,
  },
  tickets: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: fontFamily.time_regular,
    color: Colors.Pink,
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: fontFamily.time_regular,
  },
  date: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: fontFamily.time_regular,
    color: Colors.white,
  },
  date1: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fontFamily.time_regular,
    color: Colors.green,
    paddingHorizontal: 50,
  },
  item: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: fontFamily.regular,
    color: Colors.white,
  },
  price: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fontFamily.time_regular,
    color: Colors.green,
    marginVertical: 10,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    color: Colors.black,
    borderRadius: 10,
  },
  sell: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.grey,
    fontFamily: fontFamily.bold,
  },
  sytbtn: {
    borderWidth: 1,
    borderColor: Colors.lightPink,
    height: moderateScaleVertical(50),
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
  },
  linear: {
    width: 81,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelbtn: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.white,
  },
  radiobtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 11,
  },
  buybtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.grey,
    width: moderateScaleVertical(77),
    height: moderateScale(27),
  },
  modalView: {
    width: '90%',
    backgroundColor: Colors.lightPink,
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.white,
    paddingHorizontal: 20,
    fontFamily: fontFamily.time_regular,
  },
  modalButtonText: {
    color: Colors.green,
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fontFamily.time_regular,
    paddingVertical: 10,
  },
  modalbtnText: {
    color: Colors.white,
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fontFamily.time_regular,
    paddingVertical: 10,
  },
  brdbotm: {
    borderBottomWidth: 1.5,
    borderColor: Colors.black,
    width: width / 1.3,
  },
});

export default styles;
