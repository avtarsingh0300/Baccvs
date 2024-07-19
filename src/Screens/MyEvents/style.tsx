import {StyleSheet} from 'react-native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  border: {
    borderWidth: 1,
    borderColor: Colors.white,
    width: width,
    alignSelf: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: moderateScaleVertical(10),
    borderRadius: 15,
    height: height / 2,
  },
  backimg: {
    width: '100%',
    height: '96%',
  },
  flexinner: {
    flexDirection: 'row',
  },
  shortimg: {
    width: moderateScale(56),
    height: moderateScaleVertical(76),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightPink,
  },
  extraimg: {
    alignSelf: 'flex-end',
    width: moderateScale(32),
    height: moderateScaleVertical(32),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightPink,
  },
  icon: {
    backgroundColor: Colors.slider,
    width: moderateScale(34),
    height: moderateScaleVertical(34),
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginRight: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(15),
  },
  positionVw: {
    paddingHorizontal: 15,
    paddingVertical: moderateScaleVertical(19),
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    width: '100%',
    bottom: 10,
  },
  priceVw: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  reddot: {
    backgroundColor: Colors.red,
    borderRadius: 10,
    position: 'absolute',
    right: -20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  dottxt: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: Colors.white,
  },
});

export default styles;
