import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import CircularProgressBar from '../../Utilities/Component/hooks/CircularProgressBar';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';
import { SizeBox } from '../../Utilities/Component/Helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import { moderateScale, moderateScaleVertical } from '../../Utilities/Styles/responsiveSize';

const data = Array(6).fill({ label: 'Events' });
const AnalyticsScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev <= 50 ? prev + 1 : 0));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const renderItems = ({item})=>(
    <TouchableOpacity style={styles.buttons}>
      <Text style={styles.buttonText}>{item.label}</Text>
      <Text style={styles.buttonText}>18</Text>
    </TouchableOpacity>
  );
  const renderItem = ({item})=>(
    <View style={{flexDirection:"row",justifyContent:"space-between",paddingRight:20}}>  
     <View style={{flexDirection:"row",alignItems:"center"}}>
      <VectorIcon groupName='Entypo' name='dot-single' size={40} color='#4A3AFF'/>
      <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>Promoting</Text>
     </View>
     <View style={{flexDirection:"row",alignItems:"center"}}>
      <VectorIcon groupName='Entypo' name='dot-single' size={40}/>
      <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>Djing</Text>
     </View>
     <View/>
   </View>
  );
  const renderItem2 = ({item})=>(
    <View style={styles.earlytxt}>
      <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>Early tickets</Text>
      <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>(2351)</Text>
      <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>28,212€</Text>
    </View>
  );
  const renderImage = ({item})=>(
  <View style={{marginHorizontal:5}}>
    <Image source={ImagePath.ProfileImg} borderRadius={8} style={{width:moderateScale(66),height:moderateScaleVertical(71)}}/>
  </View>
  );
  return (
    <LinearGradient
    colors={[Colors.backgroundNew, Colors.backgroundNew]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1.3, y: 0.9 }}
    style={styles.LinearConatiner}>
    <SafeAreaView>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
    <SizeBox size={5}/>
      <Text style={styles.phantomtxt}>The Phantom analytics</Text>
      <SizeBox size={10}/>
      <FlatList
      data={data}
      renderItem={renderItems}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      style={{alignSelf:"center"}}
      />
      <SizeBox size={20}/>
      <TouchableOpacity style={styles.thisyearbtn}>
        <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>This Year</Text>
      </TouchableOpacity>
      <SizeBox size={10}/>
      <Text style={{...commonStyles.font20White}}>Earnings</Text>
      <SizeBox size={10}/>
    <View >
      <CircularProgressBar progress={60} size={190} strokeWidth={12}/>
    </View>
    <SizeBox size={5}/>
      <FlatList
      data={[{id:1},{id:2}]}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      />
      <SizeBox size={10}/>
      <Text style={{...commonStyles.font20White}}>Tickets</Text>
    <SizeBox size={5}/>
      <FlatList
      data={[{id:1},{id:2},{id:3},{id:4}]}
      renderItem={renderItem2}
      keyExtractor={(item, index) => index.toString()}
      />
      <SizeBox size={10}/>
      <Text style={{...commonStyles.font20White}}>Views</Text>
      <SizeBox size={20}/>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:'space-between',paddingRight:30}}>
        <Text style={{...commonStyles.font20White}}>Accounts reached</Text>
        <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>3,450</Text>
      </View>
      <SizeBox size={5}/>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:'space-between',paddingRight:30}}>
        <Text style={{...commonStyles.font20White}}>New followers</Text>
        <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>245</Text>
      </View>
      <SizeBox size={10}/>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <FlatList
      data={[{id:1},{id:2},{id:3},{id:4},]}
      renderItem={renderImage}
      keyExtractor={(item, index) => index.toString()}
      numColumns={4}
      />
      <VectorIcon groupName='MaterialCommunityIcons' name='arrow-right-drop-circle-outline' size={30} color={Colors.white}/>
    </View>
    </KeyboardAwareScrollView>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default AnalyticsScreen
