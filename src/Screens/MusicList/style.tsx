import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';
import commonStyles from '../../Utilities/Styles/commonStyles';

const styles = StyleSheet.create({
  conatiner: {flex: 1},
  inputcontainer: {
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: moderateScaleVertical(55),
    width: '60%',
    alignSelf: 'center',
  },
  input: {
    color: Colors.black,
    fontFamily: fontFamily.regular,
    width: '90%',
  },
  imgbck: {
    width: moderateScale(96),
    height: moderateScaleVertical(114),
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgbcks: {
    width: moderateScale(150),
    height: moderateScaleVertical(150),
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  imgback: {
    width: moderateScale(230),
    height: moderateScaleVertical(140),
    marginHorizontal: 15,
    marginVertical: 10,
  },
  flexview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 17,
  },
  headingtext: {
    color: Colors.lightPink,
    fontFamily: fontFamily.time_regular,
    fontSize: textScale(20),
  },
  textsasha: {
    color: Colors.lightPink,
    fontFamily: fontFamily.time_regular,
    fontSize: textScale(20),
    position: 'absolute',
    bottom: 5,
    width: '100%',
    paddingHorizontal: 10,
  },
  showmore: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.white,
    padding: 5,
  },
  showtext: {
    color: Colors.white,
    fontSize: textScale(12),
  },
  vectoricons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    width: '100%',
    bottom: 5,
  },
  phantom: {
    ...commonStyles.font14,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
  },
  vectortext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textnumber: {
    color: Colors.white,
    fontSize: textScale(12),
  },
  nightclubs: {
    backgroundColor: Colors.Linear,
    width: width,
    alignSelf: 'center',
    marginTop: 20,
  },
  textparis: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 15,
  },
  larc: {
    ...commonStyles.font14,
    fontFamily: fontFamily.time_regular,
    textAlign: 'center',
  },
  searchbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default styles;
