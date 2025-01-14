import {StyleSheet} from 'react-native';
import {Colors} from '../../../Utilities/Styles/colors';
import fontFamily from '../../../Utilities/Styles/fontFamily';
import {textScale} from '../../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 15},
enabletxt:{
    fontSize:14,
    fontWeight:"400",
    lineHeight:16,
    fontFamily:fontFamily.time_regular,
     color: Colors.greyTxt,
     textAlign:"center",
     width:"66%",
     alignSelf:"center"
    },
    

});
export default styles;
