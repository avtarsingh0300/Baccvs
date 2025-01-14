import { StyleSheet } from "react-native";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";
import { height, moderateScale, moderateScaleVertical, textScale, width } from "../../Utilities/Styles/responsiveSize";
import commonStyles from "../../Utilities/Styles/commonStyles";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1},
edittxt:{
    fontSize:20,
    fontFamily:fontFamily.time_regular,
    color:Colors.white,
    textAlign:"center",
    fontWeight:"600"
},
bannertxt:{
    fontSize:16,
    fontFamily:fontFamily.time_regular,
    fontWeight:"600",
    color:Colors.lightPink,
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
label: {
    ...commonStyles.font14,
    color: Colors.white,
    fontWeight: '700',
    marginLeft: moderateScale(20),
  },
  selecttxt: {
    fontSize: 12,
    fontWeight: '300',
    fontFamily: fontFamily.regular,
    color: Colors.greyTxt,
    paddingLeft: 20,
  },
  langcon: {
    flexDirection: 'row',
    paddingHorizontal: 15,
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
    padding: 10,
    borderWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: Colors.greyTxt,
    borderRadius: 2,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    width:moderateScale(80)
  },
  buttonText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: fontFamily.regular,
    alignSelf:"center",
    fontWeight:"400"
  },
   allevents:{
    width:width/1.1,
    backgroundColor:Colors.white,
    height:moderateScaleVertical(40),
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:2
   },
   eventimg:{
    width:moderateScale(80),
    height:moderateScaleVertical(80),
    borderRadius:15
},
managebtn:{
    borderBottomWidth:1,
    borderColor:Colors.white,
    width:moderateScale(60)
},
bottomline:{
    borderBottomWidth:1,
    borderColor:Colors.white,
    width:"100%",
    alignSelf:"center"
}
})
export default styles;