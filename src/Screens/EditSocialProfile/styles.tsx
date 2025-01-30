import {StyleSheet} from 'react-native';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  height,
  textScale,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';

export const styles = StyleSheet.create({
  LinearConatiner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...commonStyles.font16White,
    color: '#BFC3C6',
  },
  profileImg: {
    width: moderateScale(139),
    height: moderateScaleVertical(156),
    borderRadius: 5,
    alignSelf: 'center',
  },
  userMoreImages: {
    width: moderateScale(103),
    height: moderateScaleVertical(138),
    borderRadius: 5,
    marginRight: moderateScale(20),
    marginTop: moderateScaleVertical(20),
  },
  editBtn: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unsel: {
    backgroundColor: Colors.white,
    height: 3,
    alignSelf: 'center',
    borderRadius: 5,
  },
  selectText: {
    ...commonStyles.font12,
  },
  selectContainer: {
    paddingVertical: 6,
    paddingHorizontal: moderateScale(16),
    borderRadius: 2,
    marginRight: 7,
    borderWidth: 0.5,
    borderColor: Colors.lightPink,
  },
  listContainer: {
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScaleVertical(40),
    height: height / 3.5,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(10),
  },
  flex: {flexDirection: 'row', alignItems: 'center'},
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
  likestxt: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    fontWeight: '600',
    color: Colors.white,
    alignSelf: 'center',
  },
  tag: {
    width: moderateScale(19),
    height: moderateScaleVertical(17),
  },
  ontxt: {
    fontSize: 12,
    color: Colors.lightgreen,
    fontFamily: fontFamily.time_regular,
    fontWeight: '700',
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
  bottomListImg: {
    width: width / 1.1,
    height: moderateScaleVertical(203),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomListMediumImg: {
    width: moderateScale(50),
    height: moderateScaleVertical(67),
    borderWidth: 1,
    borderColor: Colors.Pink,
    borderRadius: 5,
    position: 'absolute',
    left: 12,
    bottom: 9,
  },
  bottomListSmallImg: {
    width: moderateScale(30),
    height: moderateScaleVertical(35),
    borderWidth: 1,
    borderColor: Colors.Pink,
    borderRadius: 5,
    position: 'absolute',
    left: moderateScale(70),
    bottom: 9,
  },
  countText: {
    ...commonStyles.font14,
    fontFamily: fontFamily.bold,
    color: Colors.white,
    position: 'absolute',
    bottom: moderateScaleVertical(15),
    left: moderateScale(110),
  },
  dateText: {
    ...commonStyles.font14,
    marginLeft: moderateScale(7),
  },
});
