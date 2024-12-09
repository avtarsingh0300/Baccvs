import { StyleSheet } from "react-native";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";
import { height, moderateScale, moderateScaleVertical, textScale, width } from "../../Utilities/Styles/responsiveSize";

const styles = StyleSheet.create({
    conatiner: {flex: 1,paddingHorizontal:10},
    searchtxt:{
        fontSize:20,
        fontWeight:"500",
        fontFamily:fontFamily.regular,
        color:Colors.white,
        textAlign:"center"
    },
    imgbck: {
        width: moderateScale(96),
        height: moderateScaleVertical(117),
        borderRadius: 17,
        marginHorizontal: 15,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:"center"
      },
      button: {
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: 'transparent', 
      },
      selectedButton: {
        backgroundColor: Colors.btnLinear2, 
      },
      text: {
        color: Colors.white,
        fontSize: 12,
        fontWeight:"700",
        fontFamily:fontFamily.regular
      },
      selectedText: {
        color: Colors.white, 
      },
      Buttonscon:{
        flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 16,
      },
      listContainer: {
        justifyContent: 'center',
        paddingHorizontal: moderateScale(10),
        marginTop: moderateScaleVertical(40),
        height: height / 3.8,
      },
      backContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: moderateScaleVertical(10),
      },
      tag: {
        width: moderateScale(19),
        height: moderateScaleVertical(17),
      },
      ontxt: {
        fontSize: 12,
        color: Colors.lightgreen,
        fontFamily: fontFamily.time_regular,
        fontWeight: '700',
      },
      backimg: {
        width: '100%',
        height: height / 3.5,
      },
      flexinner: {
        paddingHorizontal: 15,
        paddingVertical: moderateScaleVertical(19),
        flexDirection: 'row',
        top: -45,
      },
      shortimg: {
        width: moderateScale(56),
        height: moderateScaleVertical(76),
        borderRadius: 8,
      },
      extraimg: {
        alignSelf: 'flex-end',
        width: moderateScale(32),
        height: moderateScaleVertical(32),
        borderRadius: 8,
      },
      music: {
        borderWidth: 0.6,
        padding: 5,
        borderColor: Colors.lightpink2,
        alignSelf: 'center',
        borderRadius: 2,
        paddingHorizontal: moderateScale(10),
      },
      musictxt: {
        color: Colors.white,
        fontSize: textScale(12),
        fontWeight: '400',
        fontFamily: fontFamily.regular,
      },
      flex: {flexDirection: 'row', alignItems: 'center'},
      date: {
        color: Colors.white,
        fontFamily: fontFamily.regular,
        fontWeight: '500',
        fontSize: textScale(18),
      },
      datevw: {
        padding: moderateScaleVertical(10),
        paddingLeft: 30,
        width: width,
        marginTop: moderateScaleVertical(10),
      },
      allBtn: {
        borderBottomWidth: 0.4,
        borderRadius: 5,
        borderColor: Colors.inputborder,
        marginLeft: moderateScale(14),
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        height: moderateScaleVertical(21),
      },
      likestxt: {
        fontSize: 10,
        fontFamily: fontFamily.regular,
        fontWeight: '600',
        color: Colors.white,
        alignSelf: 'center',
      },
      liktxtcon: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        right: 15,
      },
      likeimg: {
        width: moderateScale(25),
        height: moderateScaleVertical(25),
        resizeMode: 'contain',
      },
})
export default styles;