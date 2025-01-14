import { StyleSheet } from "react-native";
import commonStyles from "../../Utilities/Styles/commonStyles";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";
import { moderateScale, moderateScaleVertical, width } from "../../Utilities/Styles/responsiveSize";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
    promotetxt:{
        ...commonStyles.font20White,
        textAlign:"center",
        fontFamily:fontFamily.time_regular,
        fontWeight:"600"
    },
    customtxt:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:40
    },
    letterstxt:{
        fontSize:10,
        fontFamily:fontFamily.time_regular,
        fontWeight:"300",
        color:Colors.greyTxt,
        alignSelf:"center"
    },
    textInput:{
        borderWidth:1,
        borderColor:Colors.grey,
        width:moderateScale(262),
        borderRadius:10
    },
    choosedatebtn:{
        width:moderateScale(143),
        height:moderateScaleVertical(28),
        borderWidth:1,
        borderColor:Colors.grey,
        borderRadius:10,
        alignItems:"center",
        alignSelf:"center",
        justifyContent:"center"
    },
    parisbtn:{
        borderWidth:1,
        borderColor:Colors.grey,
        borderRadius:10,
        width:moderateScale(64),
        height:moderateScaleVertical(26),
        justifyContent:"center",
        alignItems:"center"
    },
    parisbtn2:{
        borderWidth:1,
        borderColor:Colors.grey,
        borderRadius:10,
        width:moderateScale(100),
        height:moderateScaleVertical(26),
        justifyContent:"center",
        alignItems:"center",
        marginLeft:15
    },
    button: {
        borderWidth:1,
        borderRadius:10,
        width:moderateScale(83),
        height:moderateScaleVertical(26),
        marginVertical:5,
        justifyContent:"center",
        marginHorizontal:5,
        borderColor:Colors.grey,
      },
    button1: {
        borderWidth:1,
        borderRadius:10,
        marginVertical:5,
        justifyContent:"center",
        marginHorizontal:5,
        borderColor:Colors.grey,
        padding:5
      },
      buttonText: {
        color: Colors.white,
        fontSize: 12,
        fontFamily: fontFamily.regular,
        alignSelf:"center",
        fontWeight:"400"
      },
      addtagsbtn:{
        borderWidth:1,
        borderColor:Colors.grey,
        width:moderateScale(158),
        height:moderateScaleVertical(32),
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
        borderRadius:10
    },
    marker: {
        height: moderateScaleVertical(15),
        width: moderateScale(15),
        alignSelf: 'center',
        borderWidth: 0,
        backgroundColor: Colors.slider,
      },
      flexout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:15
      },
      select: {
        backgroundColor: Colors.slider,
        height: 3,
        alignSelf: 'center',
        borderRadius: 5,
      },
      unsel: {
        backgroundColor: Colors.lightPink,
        height: 3,
        alignSelf: 'center',
        borderRadius: 5,
      },
})

export default styles;