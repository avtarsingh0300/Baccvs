import { StyleSheet } from "react-native";
import { Colors } from "../../Utilities/Styles/colors";
import fontFamily from "../../Utilities/Styles/fontFamily";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
    liketxt: {
        fontSize: 20,
        fontWeight: '700',
        alignItems: 'center',
        textAlign: 'center',
        color: Colors.white,
        fontFamily: fontFamily.regular,
        paddingLeft: 15,
      },
})

export default styles;