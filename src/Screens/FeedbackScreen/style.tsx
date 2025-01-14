import { StyleSheet } from "react-native";
import { Colors } from "../../Utilities/Styles/colors";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { moderateScale, moderateScaleVertical } from "../../Utilities/Styles/responsiveSize";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
    liketxt: {
        fontSize: 20,
        fontWeight: '700',
        alignItems: 'center',
        textAlign: 'center',
        color: Colors.white,
        fontFamily: fontFamily.regular,
        paddingLeft: 15,
      },
      feedbackimg:{
        width:moderateScale(40),
        height:moderateScaleVertical(46),
        borderWidth:1,
        borderRadius:5,
        borderColor:Colors.lightPink,
      },
      sharevci:{
        alignSelf:"flex-end",
        paddingHorizontal:20,
        bottom:10
      }
})

export default styles;