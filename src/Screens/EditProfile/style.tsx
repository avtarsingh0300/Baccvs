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
});

