import { Platform, StyleSheet } from "react-native";
import { height, moderateScale, moderateScaleVertical } from "../../Utilities/Styles/responsiveSize";
import commonStyles from "../../Utilities/Styles/commonStyles";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Colors } from "../../Utilities/Styles/colors";

export const styles = StyleSheet.create({
    LinearConatiner: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: moderateScaleVertical(15),
        width: "100%",
        paddingHorizontal: moderateScale(20)
    },
    headerTxt: {
        ...commonStyles.font20White,
        textAlign: 'center',
        fontFamily: fontFamily.regular,
        marginLeft: moderateScale(35)
    },
    secondHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: moderateScaleVertical(44),
        paddingHorizontal: moderateScale(20),
        borderRadius: 5,
    },
    timeText: {
        ...commonStyles.font12Bold,
    },
    ticketContainer: {
        paddingVertical: moderateScaleVertical(5),
        paddingHorizontal: moderateScale(15),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#6DFF3A",
        flexDirection: "row",
    },
    ticketPrice: {
        ...commonStyles.font16Regular,
        fontWeight: "400",
        color: "#6DFF3A",
    },
    distanceText: {
        ...commonStyles.font14,
        color: Colors.white
    },
    bottomBar: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        alignSelf: "center",
        paddingHorizontal: moderateScale(20),
        height: moderateScaleVertical(60),
        top: Platform.OS == "android" ? height / 1.32 : height / 1.38,
        alignItems: "center"
    },
    bottomBarText: {
        ...commonStyles.font14
    },
    sheetContent: {
        height: "100%",
        width: "100%",
        backgroundColor: "#35116F",
        // opacity: 0.5
    },
    itemContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(20),
        marginVertical: moderateScaleVertical(5),
        alignItems: "center"
    }
})