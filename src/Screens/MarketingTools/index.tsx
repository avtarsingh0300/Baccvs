import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import commonStyles from '../../Utilities/Styles/commonStyles'
import { SizeBox } from '../../Utilities/Component/Helpers'
import fontFamily from '../../Utilities/Styles/fontFamily'
import { moderateScale } from '../../Utilities/Styles/responsiveSize'

const buttonData = Array(5).fill({ label: 'Top Banner' });
const Data = Array(6).fill({ label: 'Event promotion' });
const Data1 = Array(6).fill({ label: '#Techno' });
const MarketingTools = () => {
    const [selectedItem,setSelectedItem] =useState();
    const renderButton = ({ item }) => (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
      );
    const renderSponsored = ({ item }) => (
        <View style={{alignSelf:"center"}}>
        <TouchableOpacity style={styles.sponsoredbtn}>
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
        </View>
      );
    const renderTags = ({ item }) => (
        <View style={{alignSelf:"center"}}>
        <TouchableOpacity style={[styles.button,{backgroundColor:Colors.lightPink}]}>
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
        </View>
      );
  return (
    <LinearGradient
    colors={[Colors.backgroundNew, Colors.backgroundNew]}
    start={{x: 0, y: 0}}
    end={{x: 1.3, y: 0.9}}
    style={styles.LinearConatiner}>
    <SafeAreaView>
        <View>
            <SizeBox size={10}/>
            <Text style={styles.marketingtxt}>
            Marketing tools
            </Text>
            <SizeBox size={7}/>
            <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular,textAlign:"center"}}>
            Select Event
            </Text>
            <SizeBox size={12}/>
            <Text style={{...commonStyles.font16WhiteBold}}>
            Sponsored spots
            </Text>
            <SizeBox size={8}/>
            <Text style={{...commonStyles.font14Regular,paddingLeft:15}}>
            Priority placement
            </Text>
            <SizeBox size={8} />
          <FlatList
            data={buttonData}
            renderItem={renderButton}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={{paddingLeft:15}}
          />
          <SizeBox size={10}/>
            <Text style={{...commonStyles.font14Regular,paddingLeft:15}}>
            Sponsored event card
            </Text>
            <SizeBox size={8}/>
          <FlatList
            data={Data}
            renderItem={renderSponsored}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            style={{paddingLeft:15}}
          />
          <SizeBox size={10}/>
            <View style={{flexDirection:"row",alignItems:'center'}}>
                <Text style={{...commonStyles.font14Regular,paddingLeft:15}}>
            Duration
            </Text>
            <TouchableOpacity style={[styles.button ,{marginLeft:8}]}>
          <Text style={styles.buttonText}>For how long?</Text>
        </TouchableOpacity>
        <View/>
            </View>
          <SizeBox size={10}/>
            <View style={{flexDirection:"row",alignItems:'center'}}>
            <Text style={{...commonStyles.font14Regular,paddingLeft:15}}>
           Tags
            </Text>
            <TouchableOpacity style={[styles.button,{width:moderateScale(135),marginLeft:30}]}>
          <Text style={styles.buttonText}>Select or add tags</Text>
        </TouchableOpacity>
            </View>
          <SizeBox size={10}/>
          <FlatList
            data={Data1}
            renderItem={renderTags}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={{paddingLeft:15}}
          />
          
        </View>
        </SafeAreaView>
        </LinearGradient>
  )
}

export default MarketingTools