import { Platform, StyleSheet } from 'react-native';
import {
    height,
    moderateScale,
    moderateScaleVertical,
    textScale,
} from '../../Utilities/Styles/responsiveSize';
import { Colors } from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';

export const styles = StyleSheet.create({
    container: {
        paddingBottom: moderateScaleVertical(20)
    },
    header: {
        width: "100%",
        paddingVertical: moderateScaleVertical(10),
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(30),
    },
    inputContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingVertical: moderateScaleVertical(10),
        alignItems: "center",
    },
    iptContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight:35,
        
    },
    profiletxt:{
        fontSize:16,
        fontWeight:"400",
        fontFamily:fontFamily.regular,
        color:Colors.greyTxt,
        paddingLeft:40
    },
    input: {
        height: moderateScaleVertical(30),
        paddingLeft: moderateScale(10),
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 8,
        ...commonStyles.font12,
        fontWeight: "400",
    },
    label: {
        ...commonStyles.font14,
        color: Colors.white,
        fontWeight: "400",
        marginLeft: moderateScale(38),
    },
    modalContainer: {
        padding: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.inputborder,
        borderRadius: 8,
        backgroundColor: Colors.LinearBlack,
    },
    mondaInvw: {
        padding: 5,
        borderColor: Colors.Pink,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    biotxt: {
        fontSize: textScale(20),
        fontFamily: fontFamily.time_bold,
        textAlign: 'center',
        color: Colors.white,
    },
    langContainer: {
        padding: 7,
        paddingLeft: 18,
        borderWidth: 1,
        borderLeftWidth: 1,
        borderColor: Colors.white,
        borderRadius: 8,
        flexWrap: "wrap",
        flexDirection: "row"
    },
    langItem: {
        padding: 7,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 8,
        margin: 5
    },
    langItemText: {
        color: Colors.greyTxt,
        fontFamily: fontFamily.time_regular,
        padding: 0,
        fontWeight: '400',
        fontSize: textScale(14),
    },
    editedimg:{
        width:moderateScale(139),
        height:moderateScaleVertical(156),
        borderRadius:5,
    },
    editvci:{
        position:"absolute",
        top:-10,
        right:0,
    },
    selecttxt:{
        font:10,
        fontWeight:"300",
        fontFamily:fontFamily.regular,
        color:Colors.greyTxt,
        paddingLeft:36
    },
    inputHolder: {
        padding: 10,
        borderWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: Colors.greyTxt,
        borderRadius: 2,
        alignItems:"center"
      },
    inptHolder: {
        padding: 10,
        borderWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: Colors.greyTxt,
        borderRadius: 2,
        alignItems:"center",
        width:moderateScale(134)
      },
    iptHolder: {
        padding: 10,
        borderWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: Colors.greyTxt,
        borderRadius: 2,
        // width:moderateScale(91)
      },
    iptHold: {
        padding: 10,
        borderWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: Colors.greyTxt,
        borderRadius: 2,
        width:moderateScale(98),
      },
    itHolder: {
        padding: 10,
        borderWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: Colors.greyTxt,
        borderRadius: 2,
        width:"50%",
        marginHorizontal:5
      },
      inpt: {
        color: Colors.greyTxt,
        fontFamily: fontFamily.time_regular,
        padding: 0,
        fontWeight: '400',
        fontSize: textScale(14),
        width: '100%',
        textAlign:"center"
      },
      langcon:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:35
    }
});

