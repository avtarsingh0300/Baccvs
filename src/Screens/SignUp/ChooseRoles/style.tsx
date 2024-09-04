import { StyleSheet } from "react-native";
import { Colors } from "../../../Utilities/Styles/colors";
import fontFamily from "../../../Utilities/Styles/fontFamily";
import { textScale } from "../../../Utilities/Styles/responsiveSize";

const styles= StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 15},
    input: {
      color: Colors.Pink,
      fontFamily: fontFamily.regular,
      padding: 3,
      fontWeight: '700',
      fontSize: textScale(12),
      width: '100%',
      textAlign: 'center',
    },
    inputHolder: {
      padding: 12,
      borderWidth:1,
      borderColor: Colors.white,
      borderRadius: 8,
      alignItems: 'center',
    },
    professionalbtn:{
        borderWidth:0.25,
        borderColor:Colors.white,
        width:"80%",
        padding:17,
        alignSelf:"center",
        borderRadius:5,
        paddingHorizontal:20
    },
    loremtxt:{
        fontSize:15,
        fontFamily:fontFamily.regular,
        fontWeight:"400",
        color:Colors.white
    },
    professiontxt:{
        fontSize:20,
        fontWeight:"400",
        fontFamily:fontFamily.regular,
        color:Colors.white
    }
})
export default styles;