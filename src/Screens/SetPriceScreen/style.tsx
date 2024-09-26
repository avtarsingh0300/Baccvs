import { StyleSheet } from "react-native";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";
import { moderateScale, moderateScaleVertical, width } from "../../Utilities/Styles/responsiveSize";

const styles =  StyleSheet.create({
container:{
    fontSize:24,
    fontWeight:"700",
    fontFamily:fontFamily.regular,
    color:Colors.white
},
pricebtn:{
    width:"90%",
    height:moderateScaleVertical(43),
    borderWidth:0.25,
    borderRadius:2,
    borderColor:Colors.grey,
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    paddingHorizontal:8
  },
  eurtxt:{
    fontSize:12,
    fontWeight:"300",
    fontFamily:fontFamily.regular,
    color:Colors.black
  },
  eurcontainer:{
    width:moderateScale(31),
    height:moderateScaleVertical(25),
    backgroundColor:"#CEDFE1",
    borderRadius:4,
    alignItems:"center",
    justifyContent:"center"
  },
  textInput: {
    height: 80,
    width:"95%",
    borderColor: '#ccc',
    borderWidth: 0.25,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
})

export default styles;