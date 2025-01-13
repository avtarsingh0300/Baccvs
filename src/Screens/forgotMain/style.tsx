import { StyleSheet } from "react-native";
import { moderateScale, moderateScaleVertical, textScale, width } from "../../Utilities/Styles/responsiveSize";
import { Colors } from "../../Utilities/Styles/colors";
import fontFamily from "../../Utilities/Styles/fontFamily";

const styles = StyleSheet.create({
    LinearConatiner: {
        flex: 1,
        paddingHorizontal: 20,
      },
      recoverytxt: {
        fontSize: 18,
        fontWeight: '400',
        fontFamily: fontFamily.regular,
        color: Colors.white,
      },
      passwordtxt: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: fontFamily.regular,
        color: Colors.greyTxt,
      },
      senttxt: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: fontFamily.regular,
        color: Colors.white,
      },
      sendbtn: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Linear,
        height: 35,
        borderRadius: 4,
      },
      input: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        width: '80%',
        paddingHorizontal: 15,
        height: 40,
        color: Colors.black,
      },
      otpContainer: {
        width: '80%',
        alignSelf: 'center',
      },
      cell: {
        width: moderateScale(56),
        height: moderateScale(56),
        marginVertical: moderateScaleVertical(40),
        fontFamily: fontFamily.time_regular,
        lineHeight: width * 0.14,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginRight: 4,
        backgroundColor: Colors.LinearBlack,
        borderRadius: 8,
        overflow: 'hidden',
        color: Colors.Pink,
        fontSize: textScale(16),
      },
})
export default styles;