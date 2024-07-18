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
        alignItems: "center"
    },
    input: {
        height: moderateScaleVertical(40),
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
        color: Colors.Pink,
        fontWeight: "400",
        marginLeft: moderateScale(70),
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
    }
});

