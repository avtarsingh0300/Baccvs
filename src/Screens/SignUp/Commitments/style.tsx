import {StyleSheet} from 'react-native';
import {Colors} from '../../../Utilities/Styles/colors';
import fontFamily from '../../../Utilities/Styles/fontFamily';
import {textScale} from '../../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 15},
  input: {
    color: Colors.Pink,
    fontFamily: fontFamily.regular,
    padding: 3,
    fontWeight: '700',
    fontSize: textScale(12),
    width: '100%',
    textAlign: 'center',
  },
  inputHolder: {
    padding: 12,
    borderWidth:1,
    borderColor: Colors.white,
    borderRadius: 8,
    alignItems: 'center',
  },
  valuetxt:{
    fontSize:12,
    fontWeight:"700",
    fontFamily:fontFamily.bold,
    color:Colors.white,
    width:"80%",
    lineHeight:16
  },
  respecttxt:{
    fontSize:14,
    fontWeight:"800",
    fontFamily:fontFamily.regular,
    color:Colors.white,
    paddingLeft:37
  },

});
export default styles;
