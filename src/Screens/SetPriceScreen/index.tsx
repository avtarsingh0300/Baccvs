import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import { SizeBox } from '../../Utilities/Component/Helpers'
import commonStyles from '../../Utilities/Styles/commonStyles'
import VectorIcon from '../../Utilities/Component/vectorIcons'

const SetPriceScreen = ({navigation}:any) => {
  const renderPrice = ({item,index})=>(
    <View style={{ marginTop: index > 0 ? 20 : 0 }}>
    <Text style={{...commonStyles.font20White}}>1h00 package</Text>
    <SizeBox size={5}/>
    <TouchableOpacity activeOpacity={0.7} style={styles.pricebtn} >
      <Text style={{...commonStyles.font14Regular}}>Set price</Text>
      <View style={styles.eurcontainer}>
        <Text style={styles.eurtxt}>EUR</Text>
      </View>
      </TouchableOpacity>
      <SizeBox size={5}/>
      <Text style={[styles.eurtxt,{color:Colors.white,width:"90%"}]}>For an hour, DJs in your category typically charge between 100 and 250 euros.</Text>
      <SizeBox size={10}/>
      <Text style={{...commonStyles.font16Regular}}>Profit after service fees</Text>
      <SizeBox size={10}/>
      <TouchableOpacity activeOpacity={0.7} style={styles.pricebtn} >
        <View></View>
      <View style={styles.eurcontainer}>
        <Text style={styles.eurtxt}>EUR</Text>
      </View>
      </TouchableOpacity>
      <SizeBox size={10}/>
      <Text style={{...commonStyles.font16Regular}}>Detail your DJ services</Text>
      <SizeBox size={10}/>
      <TextInput
  style={styles.textInput}
  placeholder="Write text here..."
  multiline
  numberOfLines={4} 
  textAlignVertical="top" 
/>
</View>
  );
  return (
    <LinearGradient
        colors={[Colors.backgroundNew, Colors.backgroundNew]}
        start={{x: 0, y: 0}}
        end={{x: 1.3, y: 0.9}}
        style={{flex: 1,paddingHorizontal:20}}>
        <SafeAreaView>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.container}>Set Dj set price</Text>
          <SizeBox size={8}/>
         <FlatList
         data={[{id:1},{id:2},{id:3}]}
         renderItem={renderPrice}
         keyExtractor={(item) => item.id.toString()}
         />
          </KeyboardAwareScrollView>
          </SafeAreaView>
          </LinearGradient>
  )
}

export default SetPriceScreen