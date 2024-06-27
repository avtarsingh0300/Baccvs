import {StyleSheet} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';

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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
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
  },
  flatbox: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    width: '90%',
    marginLeft: 10,
    alignSelf: 'center',
    paddingVertical: moderateScaleVertical(10),
  },
  flatcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScaleVertical(5),
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
});

export default styles;
