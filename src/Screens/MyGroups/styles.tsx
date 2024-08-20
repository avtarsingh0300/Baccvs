import {Platform, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1},
  header: {
    paddingHorizontal: moderateScale(22),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexvw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    alignItems: 'center',
  },
  infobtn: {
    borderWidth: 2,
    width: 24,
    height: 24,
    borderRadius: 5,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  img: {
    width: moderateScale(80),
    height: 110,
    marginHorizontal: 5,
    justifyContent: 'flex-end',
  },
  username: {
    ...commonStyles.font12Bold,
    paddingLeft: 10,
    alignSelf: 'flex-start',
    paddingBottom: 10,
  },
  optionContainer: {
    width: '45%',
    paddingVertical: moderateScaleVertical(5),
    borderRadius: 10,
    backgroundColor: Colors.black,
    marginTop: moderateScaleVertical(Platform.OS == 'ios' ? 100 : 45),
    alignSelf: 'flex-end',
    marginRight: moderateScale(25),
    opacity: 0.7,
  },
  option: {
    width: '100%',
    paddingVertical: moderateScaleVertical(10),
    borderBottomWidth: 1,
    borderColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(32),
  },
  optionText: {
    ...commonStyles.font14,
    fontWeight: '600',
    // marginRight: moderateScale(10),
  },
});

export default styles;
