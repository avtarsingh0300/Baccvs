import { StyleSheet } from "react-native";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";
import { moderateScale, moderateScaleVertical } from "../../Utilities/Styles/responsiveSize";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
    marketingtxt:{
        fontFamily:fontFamily.time_regular,
        fontSize:20,
        color:Colors.white,
        fontWeight:"600",
        textAlign:"center"
    },
    button: {
        borderWidth:1,
        borderRadius:2,
        width:moderateScale(83),
        height:moderateScaleVertical(26),
        marginVertical:5,
        justifyContent:"center",
        marginHorizontal:5,
        borderColor:Colors.lightPink,
      },
      sponsoredbtn:{
        borderWidth:1,
        borderRadius:2,
        width:moderateScale(107),
        height:moderateScaleVertical(26),
        marginVertical:5,
        justifyContent:"center",
        marginHorizontal:5,
        borderColor:Colors.lightPink,
      },
      buttonText: {
        color: Colors.white,
        fontSize: 12,
        fontFamily: fontFamily.regular,
        alignSelf:"center",
        fontWeight:"400"
      },
})
export default styles;