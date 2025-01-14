import {StyleSheet} from 'react-native';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  moderateScaleVertical,
  moderateScale,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';

export const styles = StyleSheet.create({
  LinearConatiner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    height: moderateScaleVertical(100),
    width: '100%',
    paddingHorizontal: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...commonStyles.font16WhiteBold,
  },
  cardContainer: {
    width: '80%',
    alignSelf: 'center',
    paddingVertical: moderateScaleVertical(14),
    paddingHorizontal: moderateScale(20),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    ...commonStyles.font14Bold,
    color: Colors.white,
  },
  btn: {
    width: '80%',
    paddingVertical: moderateScaleVertical(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#330542',
  },
  btnText: {
    ...commonStyles.font12Bold,
    color: Colors.white,
  },
  option: {
    width: '90%',
    flexDirection: 'row',
    paddingVertical: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  textInputStyle: {
    ...commonStyles.font14Regular,
    color: Colors.white,
    height: moderateScaleVertical(56),
    width: '90%',
    alignSelf: 'center',
    paddingLeft: moderateScale(16),
    paddingVertical: moderateScaleVertical(12),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#637394',
  },
  textInputStyle2: {
    ...commonStyles.font14Regular,
    color: Colors.white,
    height: moderateScaleVertical(56),
    width: '32.5%',
    paddingVertical: moderateScaleVertical(12),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#637394',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  linerStyle: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInBtn: {
    width: '90%',
    height: moderateScaleVertical(56),
    borderRadius: 8,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderView: {
    width: '90%',
    height: 1,
    backgroundColor: '#858FA3',
    alignSelf: 'flex-end',
  },
  backGroundLiner: {
    width: '95%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
