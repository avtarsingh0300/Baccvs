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
    import NavigationStrings from '../../Utilities/Constants/NavigationStrings'
import CircularProgressBar from '../../Utilities/Component/hooks/CircularProgressBar'
    
    const AgoraAttendance = ({navigation}:any) => {
      
      const onContinue = () => {
        navigation.navigate(NavigationStrings.AgoraAttendance);
      };
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
            <Text style={{...commonStyles.font20White,textAlign:'center'}}>Agora Attendance</Text>
            <SizeBox size={20}/>
            <Text style={{...commonStyles.font16Regular,paddingLeft:15}}>Attendance</Text>
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
              <Text style={styles.ticketsqt}>124/280</Text>
              <Text style={styles.ticketsqt}>156</Text>
          </View>
              <View style={styles.bottomline}/>
              <SizeBox size={20}/>
          </LinearGradient>
          </View>
          <SizeBox size={10}/>
            <Text style={{...commonStyles.font16Regular,paddingLeft:15}}>Profil Type</Text>
          <SizeBox size={10}/>
          <View >
      <CircularProgressBar progress={60} size={190} strokeWidth={12}/>
    </View>
          <SizeBox size={20}/>
            <Text style={{...commonStyles.font16Regular,paddingLeft:15}}>People (124)</Text>
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

export default AgoraAttendance