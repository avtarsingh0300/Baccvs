import { StyleSheet } from "react-native";
import { Colors } from "../../../Utilities/Styles/colors";
import fontFamily from "../../../Utilities/Styles/fontFamily";
import { moderateScaleVertical, textScale } from "../../../Utilities/Styles/responsiveSize";

const styles= StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 15},
    basictxt:{ 
        color: Colors.white,
        fontFamily:fontFamily.time_regular,
        fontSize:14,
        fontWeight:"400"
    },
    input: {
        width: '90%',
        color: Colors.black,
        fontFamily: fontFamily.regular,
      },
})
export default styles;