import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import fontFamily from '../../Utilities/Styles/fontFamily';
import { SizeBox } from '../../Utilities/Component/Helpers';
import { CostExplorer } from 'aws-sdk';


const forgot = () => {

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
   <View style={{justifyContent:"center",alignItems:"center"}}>
    <SizeBox size={25}/>
    <Text style={styles.recoverytxt}>
    Password recovery link
    </Text>
    <SizeBox size={10}/>
    <Text style={styles.passwordtxt}>Enter an email to send you a password recovery link.</Text>
    <SizeBox size={20}/>
    <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="black"
      />
    <SizeBox size={15}/>
    <View style={styles.sendbtn}>
    <Text style={styles.senttxt}>Send Email</Text>
    </View>
    </View>        
      </SafeAreaView>
    </LinearGradient>
  );
};

export default forgot;

const styles = StyleSheet.create({
  LinearConatiner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recoverytxt:{
    fontSize:18,
    fontWeight:"400",
    fontFamily:fontFamily.regular,
    color:Colors.white
},
passwordtxt:{
  fontSize:13,
  fontWeight:"400",
  fontFamily:fontFamily.regular,
  color:Colors.greyTxt,
  
},
senttxt:{
  fontSize:13,
  fontWeight:"400",
  fontFamily:fontFamily.regular,
  color:Colors.white,
},
sendbtn:{
  width:"90%",
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:Colors.Linear,
  height:35,
  borderRadius:4
},
input: {
  backgroundColor:Colors.white,
  borderRadius: 8,
  width:"80%",
 paddingHorizontal:15,
 height:40,
 color:Colors.black
},
});
