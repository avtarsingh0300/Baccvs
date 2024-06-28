import {Platform, StyleSheet} from 'react-native';

import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: moderateScaleVertical(20),
  },
  header: {
    width: '100%',
    paddingVertical: moderateScaleVertical(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(30),
  },
  profileImage: {
    width: moderateScale(86),
    height: moderateScaleVertical(91),
    alignSelf: 'center',
    marginVertical: moderateScaleVertical(10),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  followInfoContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(10),
  },
  followText: {
    ...commonStyles.font14,
    fontWeight: '400',
    color: Colors.Pink,
    marginBottom: 5,
  },
  followInner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(20),
  },
  statusContainer: {
    width: '50%',
    alignSelf: 'center',
  },
  statusText: {
    ...commonStyles.font12,
    textAlign: 'center',
    marginVertical: moderateScaleVertical(20),
  },
  row: {
    width: '90%',
    paddingVertical: moderateScaleVertical(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  rowText: {
    ...commonStyles.font14,
  },
  postContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(20),
  },
  postImage: {
    width: moderateScale(103),
    height: moderateScaleVertical(138),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.Pink,
    marginBottom: moderateScaleVertical(20),
  },
  listContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: moderateScaleVertical(10),
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScaleVertical(10),
    paddingHorizontal: 15,
  },
  tag: {
    width: moderateScale(15),
    height: moderateScaleVertical(15),
  },
  ontxt: {
    fontSize: 12,
    color: Colors.red,
    fontFamily: fontFamily.time_regular,
    fontWeight: '600',
  },
  backimg: {
    width: '100%',
    height: height / 4,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  flexinner: {
    paddingHorizontal: 15,
    paddingVertical: moderateScaleVertical(19),
    flexDirection: 'row',
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
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  music: {
    borderWidth: 1,
    padding: 5,
    borderColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 20,
    paddingHorizontal: moderateScale(10),
    backgroundColor: Colors.white,
    marginHorizontal: 4,
  },
  musictxt: {
    color: '#21005D',
    fontSize: textScale(8),
    fontFamily: fontFamily.time_bold,
  },

  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  date: {
    color: Colors.white,
    fontFamily: fontFamily.regular,
    fontWeight: '500',
    fontSize: textScale(13),
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    ...commonStyles.font14,
    fontWeight: '600',
  },
});
