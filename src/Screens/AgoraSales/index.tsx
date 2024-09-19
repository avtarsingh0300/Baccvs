import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import { SizeBox } from '../../Utilities/Component/Helpers'
import commonStyles from '../../Utilities/Styles/commonStyles'
import fontFamily from '../../Utilities/Styles/fontFamily'
import ImagePath from '../../Utilities/Constants/ImagePath'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HalfCircularProgressBar from '../../Utilities/Component/HalfProgressBar'
import NavigationStrings from '../../Utilities/Constants/NavigationStrings'

const AgoraSales = ({navigation}:any) => {
  const onContinue = () => {
    navigation.navigate(NavigationStrings.AgoraAttendance);
  };
  const renderItem2 = ({item})=>(
    <View style={styles.earlytxt}>
      <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>Early tickets (2351)</Text>
            <Text style={{...commonStyles.font16White,fontFamily:fontFamily.time_regular}}>28,212€</Text>
    </View>
  );
  const renderFollower = ({item}: any) => (
    <View style={styles.ftcontainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={ImagePath.ProfileImg} borderRadius={5}
          style={{width: 55, height: 62,}}
        />
        <Text style={styles.alextxt}> Alex D.</Text>
      </View>
      <TouchableOpacity style={styles.followingbtn}>
        <Text style={styles.followtxt}>29€</Text>
      </TouchableOpacity>
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
        <Text style={{...commonStyles.font20White,textAlign:'center'}}>Agora Sales</Text>
        <SizeBox size={20}/>
        <Text style={{...commonStyles.font16Regular,paddingLeft:15}}>Tickets</Text>
        <SizeBox size={10}/>
        <View style={styles.outerview}>
        <LinearGradient
      colors={["#B69CFF", "#6D5E99"]}
      start={{ x: 1.5, y: 0 }}
      end={{ x: 0, y: 2 }}
      style={styles.outerview}
      >
          <Text style={styles.remaintxt}>Remaining</Text>
      <View style={{flexDirection:'row',justifyContent:"space-between",paddingHorizontal:20}}>
          <Text style={styles.ticketsqt}>280/300</Text>
          <Text style={styles.ticketsqt}>20</Text>
      </View>
          <View style={styles.bottomline}/>
          <SizeBox size={20}/>
          <HalfCircularProgressBar progress={20} />
      </LinearGradient>
      </View>
      <SizeBox size={10}/>
      <FlatList
      data={[{id:1},{id:2},{id:3},{id:4}]}
      renderItem={renderItem2}
      keyExtractor={(item, index) => index.toString()}
      />
      <SizeBox size={20}/>
        <Text style={{...commonStyles.font16Regular,paddingLeft:15}}>Customers</Text>
        <SizeBox size={10} />
          <FlatList
            data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}]}
            renderItem={renderFollower}
          />
          <SizeBox size={10}/>
          <TouchableOpacity style={styles.showbtn}onPress={onContinue}>
            <Text style={{...commonStyles.font14Regular,fontFamily:fontFamily.time_regular}}>Show more</Text>
          </TouchableOpacity>
          <SizeBox size={5}/>
          </KeyboardAwareScrollView>
        </SafeAreaView>
        </LinearGradient>
  )
}

export default AgoraSales