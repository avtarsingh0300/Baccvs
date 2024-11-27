import { StyleSheet } from "react-native";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";
import { moderateScale, moderateScaleVertical } from "../../Utilities/Styles/responsiveSize";

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
    iconcontainer:{
        height:moderateScale(40),
        width:moderateScaleVertical(40),
        borderWidth:1,
        borderRadius:10,
        borderColor:Colors.white,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center"
    },
    txticonbtn:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",paddingHorizontal:40
    },
    eventtxt:{
        fontSize:10,
        fontWeight:"700",
        fontFamily:fontFamily.time_regular,
        color:Colors.white,
        textAlign:"center",
        paddingTop:10
    },
    button: {
        borderWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: Colors.greyTxt,
        borderRadius: 2,
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
        width:moderateScale(80),
        paddingVertical:10
      },
      buttonText: {
        color: Colors.white,
        fontSize: 12,
        fontFamily: fontFamily.regular,
        alignSelf:"center",
        fontWeight:"400"
      },
      solumtxt:{
        fontSize:20,
        fontFamily:fontFamily.time_regular,
        fontWeight:"600",
        color:Colors.white,
        width:"80%"
      },
})

export default styles;