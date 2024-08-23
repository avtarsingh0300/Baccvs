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
    qrbckimg:{
        width:moderateScaleVertical(300),
        height:moderateScale(320),
        alignSelf:"center"
    },
    qrcodeimg:{
        width:moderateScaleVertical(150),
        height:moderateScale(150),
        alignSelf:"center",
        justifyContent:"center"
    },
    agoratxt:{
        fontSize:18,
        fontWeight:"700",
        fontFamily:fontFamily.time_regular,
        color:Colors.white,
    },
    ticketprice:{
        fontSize:14,
        fontWeight:"400",
        fontFamily:fontFamily.time_regular,
        color:Colors.white,
    },
    textscanner:{
        alignItems:"center",
        justifyContent:"center",
        marginVertical:10
    },
    datetxt:{
        fontSize:10,
        fontWeight:"400",
        fontFamily:fontFamily.time_regular,
        color:Colors.green,
        marginHorizontal:7
    },
    timetxt:{
        fontSize:10,
        fontWeight:"400",
        fontFamily:fontFamily.time_regular,
        color:Colors.green,
        marginHorizontal:18
    },
    partyimg:{
        width:moderateScaleVertical(300),
        height:moderateScale(100),
        alignSelf:"center"
    },
    dotext:{
        fontSize:10,
        fontWeight:"400",
        fontFamily:fontFamily.time_regular,
        color:Colors.red,
        textAlign:"center"
    },
    eventtxt:{
        fontSize:10,
        fontWeight:"700",
        fontFamily:fontFamily.time_regular,
        color:Colors.white,
        textAlign:"center",
        paddingTop:10
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
        justifyContent:"space-between"
    }
})

export default styles;