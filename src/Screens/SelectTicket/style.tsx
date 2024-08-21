import { StyleSheet } from "react-native";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";
import { moderateScale, moderateScaleVertical, width } from "../../Utilities/Styles/responsiveSize";
import { RadioButton } from "react-native-paper";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
    myticketstext:{
        fontSize:20,
        fontWeight:"700",
        fontFamily:fontFamily.regular,
        color:Colors.white,
        alignSelf:"center"
      },
      searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
      },
      searchIcon: {
        padding: 10,
      },
      input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        color:Colors.black,
        borderRadius: 10,
      },
      item:{
        width:width,
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:7
      },
      profileimgs: {
        height: moderateScaleVertical(56),
        width: moderateScale(58),
        borderRadius: 8,
        borderWidth:1,
        borderColor:Colors.Linear,
        marginTop:4
      },
      title:{
        fontSize:16,
        fontWeight:"700",
        fontFamily:fontFamily.regular,
        color:Colors.white
      }, 
      date:{
        fontSize:16,
        fontWeight:"400",
        fontFamily:fontFamily.time_regular,
        color:Colors.green,
      },
      sytbtn:{
        borderWidth:1,
        borderColor:Colors.lightPink,
        height:moderateScaleVertical(50),
        width:"60%",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:8,
        alignSelf:"center"
      },
      sell:{
        fontSize:20,
        fontWeight:"400",
        color:Colors.grey,
        fontFamily:fontFamily.bold,
      },
      Radiobtn:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:11
    }
})

export default styles