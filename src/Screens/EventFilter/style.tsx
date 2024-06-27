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
  tickvw: {
    height: 15,
    width: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
});

export default styles;
