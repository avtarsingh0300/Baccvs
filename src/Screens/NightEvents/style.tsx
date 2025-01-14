import { StyleSheet } from "react-native";
import { Colors } from "../../Utilities/Styles/colors";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { height, moderateScale, moderateScaleVertical } from "../../Utilities/Styles/responsiveSize";

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
      Agorabtn:{
        width:moderateScale(288),
        height:moderateScaleVertical(37),
        borderWidth:1,
        borderColor:Colors.grey,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center"
      },
      backimg:{
        width:"100%",
        height:height/4.3,
        alignItems:"center",
        justifyContent:"center"
    },
    editeventbtn:{
        width:moderateScale(227),
        height:moderateScaleVertical(37),
        borderWidth:1,
        borderColor:Colors.grey,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
    },
    flatcontainer:{
        width:moderateScale(145),
        height:moderateScaleVertical(111),
        backgroundColor:Colors.btnback,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,
    },
    eventTicket:{
        fontSize:22,
        fontWeight:"600", 
        color: Colors.white,
        fontFamily:fontFamily.regular
     }
})
 export default styles;