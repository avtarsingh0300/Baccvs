import {StyleSheet} from 'react-native';
import { Colors } from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';
import { width } from '../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  header: {
    fontSize: 16,
    fontFamily:fontFamily.time_regular,
    fontWeight:"700",
    color:Colors.white
  },
  inputContainer: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  saveButtonText: {
    color:Colors.grey,
    fontSize:14,
    fontFamily:fontFamily.regular,
    fontWeight:"400", 
    paddingRight:10 
  },
  rowContainer: {
    borderWidth: 1,
    borderColor:Colors.greyTxt,
    borderRadius: 8,
    color:Colors.white,
    height:36,
    width:"70%",
    flexDirection:"row",
    justifyContent:"flex-end",
    alignItems:"center"
  },
  input:{
    width:"80%",
    height:40,
    color:Colors.btnLinear2
  },
  varifiedtxt:{
    fontSize:10,
    color:Colors.btnLinear2,
    fontFamily:fontFamily.time_regular,
    fontWeight:"400",
  },
  confirmbtn:{
    borderWidth: 1,
    borderColor:Colors.greyTxt,
    alignSelf:"center",
    padding:10,
    borderRadius:8,
  },
  label:{
    fontSize:12,
    color:Colors.btnLinear2,
    fontFamily:fontFamily.time_regular,
    fontWeight:"600",
  },
  accountdetail:{
    fontSize:10,
    fontFamily:fontFamily.time_regular,
    fontWeight:"400",
    color:Colors.greyTxt,
    width:"100%"
  }
});

export default styles;
