import {StyleSheet} from 'react-native';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  folowingCon: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    width: '100%',
  },
  folowertxt: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
  },
  ftcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  alextxt: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: Colors.white,
    paddingLeft: 10,
  },
  followingbtn: {
    backgroundColor: Colors.btnLinear2,
    borderWidth: 0.5,
    borderColor: Colors.lightPink,
    paddingHorizontal: 8,
    borderRadius: 2,
    paddingVertical: 5,
  },
  followtxt: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: Colors.white,
  },
});
export default styles;
