import { StyleSheet } from "react-native";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";
import { moderateScaleVertical } from "../../Utilities/Styles/responsiveSize";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
    referraltxt:{
        fontSize:20,
        fontWeight:"500",
        fontFamily:fontFamily.regular,
        color:Colors.white
    },
    referalcontainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:10
    },
    cancelbtn:{
        fontSize:20,
        fontWeight:"400",
        color:Colors.white,
        fontFamily:fontFamily.bold
      },
      linear:{
        height:34,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
      },
      historytxt:{
        fontSize:14,
        fontWeight:"700",
        fontFamily:fontFamily.bold,
        color:Colors.white,
        textAlign:"center"
      },
      WjhU87Hj:{
        fontSize:13,
        fontWeight:"600",
        fontFamily:fontFamily.bold,
        color:Colors.white,
        marginHorizontal:20
      }
})

export default styles