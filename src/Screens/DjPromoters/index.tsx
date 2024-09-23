import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePath from '../../Utilities/Constants/ImagePath'
import commonStyles from '../../Utilities/Styles/commonStyles'
import { SizeBox } from '../../Utilities/Component/Helpers'
import VectorIcon from '../../Utilities/Component/vectorIcons'

const data= [{id:1},{id:2},{id:3},{id:4}];

const DjPromoters = ({navigation}:any) => {
  const renderEvents = ({item,index}: any) => {
    var isLastItem = index === data.length - 1; 
        return(
    <View style={styles.ftcontainer}>
      <Image source={ImagePath.ProfileImg} style={styles.backimg}/>
      <SizeBox size={3}/>
      <View style={{flexDirection:"row"}}>
        <View style={{flexDirection:"row",alignItems:"center",paddingLeft:5}}>
            <VectorIcon groupName='MaterialCommunityIcons' name='calendar-range-outline' size={20} color={Colors.black}/>
            <Text style={styles.datetxt}> Fri 20 Sep  </Text>
        </View>
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <VectorIcon groupName='Ionicons' name='location-outline' size={20} color={Colors.black}/>
            <Text style={styles.datetxt}>75016, Paris</Text>
        </View>
      </View>
      <View style={{paddingLeft:7}}>
      <Text style={{...commonStyles.font16Regular,color:Colors.black}}>Phantom</Text>
      <Text style={{...commonStyles.font14Regular,color:Colors.black}}>Eric Prydz</Text>
      </View>
    </View>
  );
};
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imgouterview}>
    <ImageBackground source={ImagePath.ProfileImg} style={styles.backimage}>
      <Text style={{...commonStyles.font20White,padding:20}}>Dj Profile </Text>
    </ImageBackground>
    </View> 
    <SizeBox size={10}/>
    <View style={styles.container}>
       <Text style={styles.sashatxt}>Sasha, 24</Text>
       <Text style={styles.friendstxt}>Paris, France</Text>
       <SizeBox size={3}/>
       <Text style={styles.friendstxt}>3602 friends • 11 events</Text>
       <SizeBox size={10}/>
       <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.messagebtn}>
          <VectorIcon groupName='Feather' name='message-square' size={20} color={Colors.black}/>
          <Text style={{...commonStyles.font13,color:Colors.black,marginLeft:5}}>Send a message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messagebtn1}>
          <VectorIcon groupName='FontAwesome' name='user-circle-o' size={20} color={Colors.black}/>
          <Text style={{...commonStyles.font13,color:Colors.black,marginLeft:5}}>Add as a friend</Text>
        </TouchableOpacity>
       </View>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16Regular}}>Sasha’s Bio</Text>
        <SizeBox size={3}/>
        <Text style={{...commonStyles.font14Regular}}>DJ Hmida is the “Go TO” party DJ. She plays an eclectic mix of music and enjoys working with her clients to create the perfect atmosphere ...</Text>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16Regular}}>Past events (18)</Text>
        <SizeBox size={5}/>
        <FlatList 
        data={data}
        renderItem={renderEvents}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        />
        <SizeBox size={10}/>
        <TouchableOpacity style={styles.seeallbtn}>
            <Text style={{...commonStyles.font16White}}>See all</Text>
        </TouchableOpacity>
        <SizeBox size={10}/>
    </View>
            </KeyboardAwareScrollView>
            </SafeAreaView> 
            </LinearGradient>
  )
}

export default DjPromoters