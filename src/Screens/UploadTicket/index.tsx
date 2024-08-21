import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import { SizeBox } from '../../Utilities/Component/Helpers'
import VectorIcon from '../../Utilities/Component/vectorIcons'

const UploadTicket = () => {
    const[upload,setUpload]= useState(false);
  return (
    <LinearGradient
            colors={[Colors.LinearBlack, Colors.Linear]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.3, y: 0.9 }}
            style={styles.LinearConatiner}
        >
            <SizeBox size={10}/>
      <Text style={styles.uploadticket}>Upload your ticket</Text>
            <SizeBox size={10}/>
    <Text style={styles.select}>Select the original file. You can choose which tickets to sell next.</Text>
            <SizeBox size={10}/>
            <View style={styles.vectortext}>
                <VectorIcon groupName='MaterialIcons' name='add-link' size={25}/>
    <Text style={styles.upload}>Upload your ticket</Text>
    </View>
            <SizeBox size={10}/>
            <View style={styles.vectortext}>
                <VectorIcon groupName='AntDesign' name='plus' size={25}/>
    <Text style={styles.upload}>Add another file</Text>
    </View>
            <SizeBox size={10}/>
    <Text style={styles.upload}>Get help</Text>

    <TouchableOpacity onPress={()=>setUpload(!upload)} style={styles.sytbtn}>
                <Text style={styles.sell}>Next</Text>
            </TouchableOpacity>
    </LinearGradient>
  )
}

export default UploadTicket

