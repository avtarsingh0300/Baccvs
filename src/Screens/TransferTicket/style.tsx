import { StyleSheet } from "react-native";
import { Colors } from "../../Utilities/Styles/colors";
import fontFamily from "../../Utilities/Styles/fontFamily";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

const styles = StyleSheet.create({
    LinearConatiner: {flex: 1, paddingHorizontal: 20},
    referraltxt:{
        fontSize:20,
        fontWeight:"500",
        fontFamily:fontFamily.regular,
        color:Colors.white
    },
    referalcontainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:10
    },
    input: {
        height: 40,
        backgroundColor:Colors.white,
        borderWidth: 1,
        paddingHorizontal: 15,
        flexDirection:"row",
        alignItems:"center",
        borderRadius:8
      },
      item:{
       flexDirection:"row",
      }
})

export default styles;