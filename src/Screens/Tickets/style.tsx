import { StyleSheet } from "react-native";
import { moderateScale, moderateScaleVertical, width } from "../../Utilities/Styles/responsiveSize";
import { Colors } from "../../Utilities/Styles/colors";
import fontFamily from "../../Utilities/Styles/fontFamily";


const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScaleVertical(20),
  },
  profileimg: {
    height: moderateScaleVertical(56),
    width: moderateScale(58),
    borderRadius: 8,
    borderWidth:1,
    borderColor:Colors.Linear
  },
  profileimgs: {
    height: moderateScaleVertical(56),
    width: moderateScale(58),
    borderRadius: 8,
    borderWidth:1,
    borderColor:Colors.Linear,
    marginTop:4
  },
  myticketstext:{
    fontSize:20,
    fontWeight:"500",
    fontFamily:fontFamily.time_regular,
    color:Colors.white
  },
  tickets:{
    fontSize:17,
    fontWeight:"400",
    fontFamily:fontFamily.time_regular,
    color:Colors.Pink
  },
  text:{
    fontSize:17,
    fontWeight:"400",
    fontFamily:fontFamily.time_regular
  },
  date:{
    fontSize:16,
    fontWeight:"400",
    fontFamily:fontFamily.time_regular,
    color:Colors.green,
  },
  date1:{
    fontSize:16,
    fontWeight:"400",
    fontFamily:fontFamily.time_regular,
    color:Colors.green,
    paddingHorizontal:50,
  },
  item:{
    width:width,
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:7
  },
  title:{
    fontSize:16,
    fontWeight:"700",
    fontFamily:fontFamily.regular,
    color:Colors.white
  },
  price:{
    fontSize:16,
    fontWeight:"400",
    fontFamily:fontFamily.time_regular,
    color:Colors.green,
    marginVertical:10
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
  sell:{
    fontSize:20,
    fontWeight:"400",
    color:Colors.grey,
    fontFamily:fontFamily.bold,
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
  }
})

export default styles