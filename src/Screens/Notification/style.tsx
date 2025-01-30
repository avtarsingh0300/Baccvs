import {StyleSheet} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import commonStyles from '../../Utilities/Styles/commonStyles';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 0},
  userImg: {
    width: moderateScale(28),
    height: moderateScaleVertical(35),
    borderRadius: 8,
  },
  numreq: {
    ...commonStyles.font10Regular,
    color: Colors.greyTxt,
    paddingLeft: 10,
    paddingTop: 10,
  },
  border: {
    borderWidth: 0.5,
    borderColor: Colors.greyTxt,
    width: width,
    alignSelf: 'center',
  },
  follbtn: {
    borderWidth: 1,
    padding: 1,
    borderColor: Colors.white,
    width: '25%',
    height: moderateScaleVertical(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  flatcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

export default styles;
