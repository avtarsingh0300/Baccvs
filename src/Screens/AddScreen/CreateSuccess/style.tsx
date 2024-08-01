import {StyleSheet} from 'react-native';
import {Colors} from '../../../Utilities/Styles/colors';
import {
  height,
  moderateScaleVertical,
  width,
} from '../../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1},

  flatbox: {
    paddingHorizontal: 10,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    width: '95%',
    marginLeft: 10,
    alignSelf: 'center',
    paddingVertical: moderateScaleVertical(10),
  },

  camerarow: {
    // alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: moderateScaleVertical(10),
    alignItems: 'center',
  },
  imageContainer: {
    height: 129,
    width: 92,
    marginLeft: 10,
    alignSelf: 'center',

    borderRadius: 8,

    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScaleVertical(10),
  },
  dahesvw: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    width: width,
    alignSelf: 'center',
  },
  imageContainer2: {
    backgroundColor: Colors.dashBordervw,
    borderWidth: 4,
    height: height / 6,
    width: '30%',
    marginLeft: 10,
    alignSelf: 'center',
    borderStyle: 'dashed',
    borderRadius: 8,
    borderColor: Colors.dashBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScaleVertical(10),
  },
  innerCon: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: Colors.white,
  },
  btnLinear: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mondaInvw: {
    padding: 5,
    borderColor: Colors.Pink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContainer: {
    padding: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.inputborder,
    borderRadius: 8,
    backgroundColor: Colors.LinearBlack,
  },
});

export default styles;
