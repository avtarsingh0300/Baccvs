import { StyleSheet } from "react-native";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";
import { moderateScale, moderateScaleVertical } from "../../Utilities/Styles/responsiveSize";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
    phantomtxt:{
        fontSize:20,
        fontWeight:"600",
        fontFamily:fontFamily.time_regular,
        color:Colors.white,
        textAlign:"center"
    },
    buttons:{
        width:moderateScale(89),
        height:moderateScaleVertical(61),
        borderWidth:1,
        borderRadius:6,
        borderColor:Colors.grey,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:5,
        marginHorizontal:5
    },
    buttonText: {
        fontSize:14,
        fontWeight:"400",
        fontFamily:fontFamily.time_regular,
        color:Colors.white,
      },
      thisyearbtn:{
        width:moderateScale(133),
        height:moderateScaleVertical(26),
        borderWidth:1,
        borderRadius:6,
        borderColor:Colors.grey,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center"
      },
      earlytxt:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:20,
        marginVertical:5,
    }
})
export default styles;