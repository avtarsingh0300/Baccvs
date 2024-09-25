import { StyleSheet } from "react-native";
import { height, moderateScale, moderateScaleVertical, textScale, width } from "../../Utilities/Styles/responsiveSize";
import { Colors } from "../../Utilities/Styles/colors";
import fontFamily from "../../Utilities/Styles/fontFamily";
import commonStyles from "../../Utilities/Styles/commonStyles";

const styles= StyleSheet.create({
    LinearConatiner:{
        flex:1
    },
    backimage:{
    height:height/1.8,
    width:width,
    borderRadius:4,
    },
    imgouterview:{
        borderBottomWidth:1,
        borderRadius:4,
        borderColor:Colors.lightPink
    },
    container:{
        flex:1,
        paddingHorizontal:20
    },
    sashatxt:{
        fontSize:24,
        fontFamily:fontFamily.regular,
        fontWeight:"700",
        color:Colors.white
    },
    friendstxt:{
        fontSize:13,
        fontFamily:fontFamily.regular,
        fontWeight:"300",
        color:Colors.white
    },
    messagebtn:{
        width:moderateScale(132),
        height:moderateScaleVertical(26),
        backgroundColor:Colors.white,
        borderRadius:2,
        flexDirection:"row",
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center"
    },
    messagebtn1:{
        width:moderateScale(132),
        height:moderateScaleVertical(26),
        backgroundColor:Colors.white,
        borderRadius:2,
        flexDirection:"row",
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:10
    },
    datetxt:{
        fontSize:9,
        fontWeight:"300",
        fontFamily:fontFamily.regular,
        color:Colors.black
    },
    seeallbtn:{
        borderBottomWidth:1,
        borderColor:Colors.white,
        width:moderateScale(48),
        alignSelf:"flex-end",
        marginRight:10
    },
    backimg:{
        width:moderateScale(149),
        height:moderateScaleVertical(111),
        alignSelf:"center",
        marginTop:7,
        borderRadius:8
    },
    ftcontainer:{
        height:moderateScaleVertical(207),
        width:moderateScale(165),
        backgroundColor:Colors.white,
        borderRadius:8,
        marginRight:5,
    },
    basicbtn:{
        width:"100%",
        height:moderateScaleVertical(49),
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
    },
    viview:{
        width:moderateScale(28),
        height:moderateScaleVertical(29),
        backgroundColor:"#CD3AFF",
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center"
    },
    viview1:{
        width:moderateScale(28),
        height:moderateScaleVertical(29),
        backgroundColor:"#1D0F45",
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center"
    },
    viview2:{
        width:moderateScale(28),
        height:moderateScaleVertical(29),
        backgroundColor:"#FF813A",
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center"
    },
    talkbtn:{
        width:"100%",
        height:moderateScaleVertical(35),
        backgroundColor:Colors.white,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:2
    },
    label: {
        ...commonStyles.font14,
        color: Colors.white,
        fontWeight: '700',
      },
      langcon: {
        flexDirection: 'row',
      },
      itHolder: {
        padding: 10,
        borderWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: Colors.greyTxt,
        borderRadius: 2,
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
      },
      inpt: {
        color: Colors.white,
        fontFamily: fontFamily.time_regular,
        padding: 0,
        fontWeight: '400',
        fontSize: textScale(12),
        textAlign: 'center',
      },
      button: {
        padding: 8,
        borderWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: Colors.greyTxt,
        borderRadius: 2,
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
        width:moderateScale(80),
        backgroundColor:Colors.lightPink
      },
      buttonText: {
        color: Colors.white,
        fontSize: 12,
        fontFamily: fontFamily.regular,
        alignSelf:"center",
        fontWeight:"400"
      },
      outerVw:{
        width:moderateScale(220),
        height:moderateScaleVertical(160),
        borderWidth:1,
        borderColor:Colors.white,
        borderRadius:10,
        padding:10,
        marginHorizontal:10
      },
      image:{
        width:moderateScale(36),
        height:moderateScaleVertical(40),
        borderRadius:5
    
      },
      imageview:{
        width:moderateScale(38),
        borderWidth:1,
        borderColor:Colors.lightPink,
        borderRadius:5,
        flexDirection:"row"
      },
      date:{
        fontSize:8,
        fontFamily:fontFamily.regular,
        fontWeight:"300",
        color:Colors.greyTxt
      },
      review:{
        fontSize:14,
        fontFamily:fontFamily.regular,
        fontWeight:"300",
        color:Colors.white,
        width:"90%"
      },
      pasteventimg:{
        width:"100%",
        height:moderateScaleVertical(213)
      }
})
export default styles; 