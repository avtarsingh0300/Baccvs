import { StyleSheet } from "react-native";
import { moderateScale, moderateScaleVertical } from "../../Utilities/Styles/responsiveSize";
import { Colors } from "../../Utilities/Styles/colors";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
    editedimg: {
        width: moderateScale(56),
        height: moderateScaleVertical(58),
        borderRadius: 5,
        borderWidth:1,
        borderColor:Colors.lightPink
      },
      phantomcon:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingTop:10
    },
    flatcontainer:{
        width:moderateScale(145),
        height:moderateScaleVertical(111),
        backgroundColor:Colors.btnback,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,
    }
})
export default styles