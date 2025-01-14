import { StyleSheet } from "react-native";
import { moderateScale, moderateScaleVertical } from "../../Utilities/Styles/responsiveSize";
import { Colors } from "../../Utilities/Styles/colors";

const styles = StyleSheet.create({
    LinearConatiner: {
        flex: 1,
        paddingHorizontal: 15,
      },
      buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
      },
      eventbtn:{
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }    
})
export default styles;