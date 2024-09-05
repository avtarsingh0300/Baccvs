import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import { SizeBox } from '../../Utilities/Component/Helpers'
import styles from './style'
import { FlatList } from 'react-native-gesture-handler'
import ImagePath from '../../Utilities/Constants/ImagePath'
import fontFamily from '../../Utilities/Styles/fontFamily'

const FollowingScreen = ({navigation}:any) => {
const[colors,setColors] = useState("");

    const onbackPress = () => {
        navigation.goBack();
      };
      const renderFollower = ({item}) => (
        <View style={styles.ftcontainer}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
            <Image source={ImagePath.followProfile} style={{width:55,height:62}}/>
            <Text style={styles.alextxt}>   Alex D.</Text>
            </View>
            <TouchableOpacity style={styles.followingbtn}>
                <Text style={styles.followtxt}>
                    Following
                </Text>
            </TouchableOpacity>
        </View>
      )
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SizeBox size={10} />
    <VectorIcon
      groupName={'Ionicons'}
      name={'chevron-back'}
      size={25}
      onPress={onbackPress}
    />
  <View style={styles.folowingCon}>
        <TouchableOpacity >
        <Text style={[styles.folowertxt,{
          color: colors==0?Colors.btnLinear2:Colors.white}]} onPress={()=> setColors(0)}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        >
        <Text style={[styles.folowertxt,{
          color: colors==1?Colors.btnLinear2:Colors.white}]} onPress={()=> setColors(1)}>Following</Text>
        </TouchableOpacity>
      </View>
      <SizeBox size={20}/>
      <FlatList
      data={[{id:1},{id:1},{id:1},{id:1},{id:1},{id:1}]}
      renderItem={renderFollower}
      />
  </ScrollView>
  </SafeAreaView>
  </LinearGradient>
  )
}

export default FollowingScreen