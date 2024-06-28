import {StyleSheet} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  headingTxt: {
    fontSize: 14,
    color: Colors.greyTxt,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    fontWeight: '600',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innertxt: {
    fontSize: 14,
    color: Colors.greyTxt,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    width: '70%',
    alignSelf: 'center',
  },
});

export default styles;
