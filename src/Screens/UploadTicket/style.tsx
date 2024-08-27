import {StyleSheet} from 'react-native';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {Colors} from '../../Utilities/Styles/colors';
import {
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';

const styles = StyleSheet.create({
  LinearConatiner: {flex: 1, paddingHorizontal: 20},
  uploadticket: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: fontFamily.time_bold,
    color: Colors.white,
    textAlign: 'center',
  },
  pricetxt: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: fontFamily.time_bold,
    color: Colors.white,
  },
  sytbtn: {
    borderWidth: 1,
    borderColor: Colors.Pink,
    height: moderateScaleVertical(50),
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
  },
  sell: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.white,
    fontFamily: fontFamily.time_regular,
  },
  originalcon:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  ticketimg:{
    width:24,
    height:24,
    tintColor:Colors.white
  },
  earlytxt:{
    fontSize:14,
    fontWeight:"500",
    fontFamily:fontFamily.time_regular,
    color:Colors.white,
    marginHorizontal:15,
    alignSelf:"center"
  },
  pricecontainer:{
    width:77,
    height:35,
    borderWidth:1,
    borderColor:Colors.grey,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center"
  },
  pricetext:{
    fontSize:12,
    fontWeight:"500",
    fontFamily:fontFamily.time_regular,
    color:Colors.white
  }
});

export default styles;
