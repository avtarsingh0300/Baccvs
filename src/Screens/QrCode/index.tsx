import { SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import styles from './style'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import { SizeBox } from '../../Utilities/Component/Helpers'
import VectorIcon from '../../Utilities/Component/vectorIcons'
const QrCode = () => {
  return (
    <LinearGradient
    colors={[Colors.LinearBlack, Colors.Linear]}
    start={{x: 0, y: 0}}
    end={{x: 1.3, y: 0.9}}
    style={styles.LinearConatiner}>
    <SafeAreaView>
    <SizeBox size={10}/>
                <View style={styles.referalcontainer}>
                    <VectorIcon groupName='SimpleLineIcons' name='arrow-left' size={22} onPress={()=>navigation.goBack()}/>
                    <Text style={styles.referraltxt}>My Tickets</Text>
                    <View></View>
                </View>
        </SafeAreaView>
        </LinearGradient>
  )
}

export default QrCode

