import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './style'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import { SizeBox } from '../../Utilities/Component/Helpers'

const ReferralCode = () => {

    const renderItem1 = () => (
        <View style={{flexDirection:"row",marginVertical:10}}>
            <Text style={styles.WjhU87Hj}>WjhU87Hj</Text>
            <VectorIcon groupName='Ionicons' name='copy-outline' size={20}/>
        </View>
    );
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={10}/>
    <View style={styles.referalcontainer}>
        <VectorIcon groupName='SimpleLineIcons' name='arrow-left' size={22}/>
      <Text style={styles.referraltxt}>ReferralCode</Text>
        <VectorIcon groupName='Entypo' name='dots-three-horizontal' size={22}/>
    </View>
    <SizeBox size={20}/>
    <TouchableOpacity>
            <LinearGradient
             start={{x:1,y:-0.6}}
             end={{x:1,y:0.9}}
              colors={[Colors.LinearBlack, Colors.lightPink]}
              style={styles.linear}>
              <Text style={styles.cancelbtn}>Generate Referral Code</Text>
            </LinearGradient>
          </TouchableOpacity>
          <SizeBox size={20}/>
          <Text style={styles.historytxt}>Referral code history</Text>
          <SizeBox size={10}/>
          <FlatList
              data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
              renderItem={renderItem1}
              style={{alignSelf: 'center'}}
              
              />
    </SafeAreaView>
    </LinearGradient>
  )
}

export default ReferralCode
