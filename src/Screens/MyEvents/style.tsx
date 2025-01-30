import {Platform, StyleSheet} from 'react-native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';
import commonStyles from '../../Utilities/Styles/commonStyles';

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
  listContainer: {
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(10),
    height: height / 3.5,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(20),
  },
  tag: {
    width: moderateScale(19),
    height: moderateScaleVertical(17),
  },
  ontxt: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: fontFamily.time_regular,
    fontWeight: '700',
  },
  backimg: {
    width: '100%',
    height: height / 3.5,
  },
  flexinner: {
    paddingHorizontal: 15,
    paddingVertical: moderateScaleVertical(19),
    flexDirection: 'row',
    top: -45,
  },
  shortimg: {
    width: moderateScale(56),
    height: moderateScaleVertical(76),
    borderRadius: 8,
  },
  extraimg: {
    alignSelf: 'flex-end',
    width: moderateScale(32),
    height: moderateScaleVertical(32),
    borderRadius: 8,
  },
  music: {
    borderWidth: 0.6,
    padding: 5,
    borderColor: Colors.lightpink2,
    alignSelf: 'center',
    borderRadius: 2,
    paddingHorizontal: moderateScale(10),
  },
  musictxt: {
    color: Colors.white,
    fontSize: textScale(12),
    fontWeight: '400',
    fontFamily: fontFamily.regular,
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
  date: {
    color: Colors.white,
    fontFamily: fontFamily.regular,
    fontWeight: '500',
    fontSize: textScale(18),
  },
  optionContainer: {
    width: '35%',
    paddingVertical: moderateScaleVertical(5),
    borderRadius: 10,
    backgroundColor: Colors.black,
    marginTop: moderateScaleVertical(Platform.OS == 'ios' ? 150 : 80),
    alignSelf: 'flex-end',
    marginRight: moderateScale(55),
  },
  option: {
    width: '100%',
    paddingVertical: moderateScaleVertical(10),
    borderBottomWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    ...commonStyles.font14,
    fontWeight: '600',
  },
  likestxt: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    fontWeight: '600',
    color: Colors.white,
    alignSelf: 'center',
  },
  liktxtcon: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  likeimg: {
    width: moderateScale(25),
    height: moderateScaleVertical(25),
    resizeMode: 'contain',
  },
});

export default styles;
