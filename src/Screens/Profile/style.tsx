import { StyleSheet } from "react-native";
import { height, moderateScale, moderateScaleVertical, width } from "../../Utilities/Styles/responsiveSize";
import { Colors } from "../../Utilities/Styles/colors";
import fontFamily from "../../Utilities/Styles/fontFamily";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1},
headercontainer:{
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:20
},
imgcontainer:{
    width:"100%",
    height:height/3.5,
    borderRadius:5
},
imgview:{
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:Colors.Pink,
    borderRadius:5
},
ftcontainer:{
    height:moderateScaleVertical(207),
    width:moderateScale(165),
    backgroundColor:Colors.white,
    borderRadius:8,
    marginHorizontal:5,
},
backimg:{
    width:moderateScale(149),
    height:moderateScaleVertical(111),
    alignSelf:"center",
    marginTop:7,
    borderRadius:8
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
button: {
    borderWidth:1,
    borderRadius:2,
    width:moderateScale(100),
    height:moderateScaleVertical(26),
    marginVertical:5,
    justifyContent:"center",
    marginHorizontal:5,
    borderColor:Colors.lightPink,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: fontFamily.regular,
    alignSelf:"center",
    fontWeight:"400"
  },
  collabs:{
    width:moderateScale(100),
    height:moderateScaleVertical(100),
    borderRadius:5,
  },
  imagecon:{
    borderWidth:1,
    borderColor:Colors.lightPink,
    width:moderateScale(100),
    height:moderateScaleVertical(100),
    borderRadius:5,
    marginHorizontal:5
  },
  avicitxt:{
    fontSize:10,
    fontWeight:"700",
    fontFamily:fontFamily.regular,
    color:Colors.white,
    textAlign:"center",
    paddingTop:5
  }
})
export default styles;