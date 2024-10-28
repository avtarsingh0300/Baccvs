import {Platform, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';
import commonStyles from '../../Utilities/Styles/commonStyles';

const styles = StyleSheet.create({
  conatiner: {flex: 1, paddingHorizontal: moderateScale(15)},
  messageContainer: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.slider,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#39205D',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    fontFamily: fontFamily.time_regular,
    color: Colors.white,
    fontWeight: '600',
  },
  messagesContainer: {
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.white,
    width: '85%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontFamily: fontFamily.time_regular,
    color: Colors.black,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
  optionContainer: {
    width: '45%',
    paddingVertical: moderateScaleVertical(5),
    borderRadius: 10,
    backgroundColor: Colors.Linear,
    marginTop: moderateScaleVertical(Platform.OS == 'ios' ? 100 : 45),
    alignSelf: 'flex-end',
    marginRight: moderateScale(25),
    opacity: 0.9,
  },
  option: {
    width: '100%',
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  option2: {
    width: '100%',
    paddingVertical: moderateScaleVertical(15),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.appColor,
    justifyContent: 'center',
    borderRadius: 30,
  },
  optionText: {
    ...commonStyles.font10Regular,
    fontWeight: '600',
    color: Colors.white,
  },
  optionText2: {
    ...commonStyles.font14,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default styles;
