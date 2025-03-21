import {Platform, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../Utilities/Styles/responsiveSize';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {Colors} from '../../Utilities/Styles/colors';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backBtnContainer: {
    width: 40,
    height: 40,
    zIndex: 200,
    justifyContent: 'center',
    marginLeft: moderateScale(10),
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 300,
    marginTop: moderateScaleVertical(Platform.OS == 'android' ? 20 : 40),
  },
  btnContainer: {
    width: '45%',
    borderRadius: 22,
    flexDirection: 'row',
    backgroundColor: Colors.appColor,
  },
  btn: {
    width: '50%',
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    ...commonStyles.font10Bold,
    fontSize: textScale(14),
  },
  bottomContainer: {
    width: '100%',
    height: moderateScaleVertical(250),
    zIndex: 200,
    position: 'absolute',
    bottom: 2,
    paddingLeft: 10,
  },
  img: {
    width: moderateScale(115),
    height: moderateScaleVertical(177),
    borderRadius: 10,
    marginRight: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  nearbtn: {
    width: 100,
    height: 30,
    backgroundColor: Colors.Linear,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default styles;
