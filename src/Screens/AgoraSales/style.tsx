import { StyleSheet } from "react-native";
import { height, moderateScale, moderateScaleVertical, width } from "../../Utilities/Styles/responsiveSize";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
outerview:{
    width:"100%",
    height:height/2.5,
    borderRadius:20
},
ticketsqt:{
    fontSize:22,
    fontWeight:"700",
    fontFamily:fontFamily.regular,
    color:Colors.backgroundNew
},
bottomline:{
    borderBottomWidth:1,
    borderColor:Colors.greyTxt,
    width:width/1.2,
    paddingVertical:5,
    alignSelf:"center"
},
remaintxt:{
    fontSize:18,
    fontFamily:fontFamily.regular,
    fontWeight:"700",
    color:"#FF718B",
    textAlign:'right',
    paddingHorizontal:20
},
earlytxt:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:20,
    marginVertical:3,
},
ftcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  alextxt: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: Colors.white,
    paddingLeft: 10,
  },
  followingbtn: {
    backgroundColor: Colors.lightPink,
    borderRadius: 10,
    width:moderateScale(81),
    height:moderateScaleVertical(26),
    alignItems:"center",
    justifyContent:"center"
  },
  showbtn:{
    width:moderateScale(90),
    height:moderateScaleVertical(26),
    borderWidth:1,
    borderColor:Colors.grey,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:8,
    alignSelf:"center"
  }
})
export default styles;