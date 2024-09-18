import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import { SizeBox } from '../../Utilities/Component/Helpers'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import ImagePath from '../../Utilities/Constants/ImagePath'
import commonStyles from '../../Utilities/Styles/commonStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavigationStrings from '../../Utilities/Constants/NavigationStrings'

const NightEvents = ({navigation}:any) => {
    const onbackPress = () => {
        navigation.goBack();
      };
      const onContinue = () => {
        navigation.navigate(NavigationStrings.AgoraSales);
      };
      const renderNightClub = ({ item }) => (
          <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <TouchableOpacity style={styles.flatcontainer} onPress={onContinue} >
              <Text style={styles.eventTicket}>
              280/300
              </Text>
              <Text style={{...commonStyles.font14Regular,color:Colors.lightPink }}>
              Tickets sold
              </Text>
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
      <SizeBox size={10} />
        <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingRight: 30 }}>
          <VectorIcon
            groupName={'Ionicons'}
            name={'chevron-back'}
            size={25}
            onPress={onbackPress}
          />
          <Text style={styles.liketxt}>Events</Text>
          <View />
        </View>
          <SizeBox size={15}/>
          <Text style={styles.liketxt}>Select event</Text>
          <SizeBox size={10}/>
          <TouchableOpacity style={styles.Agorabtn}>
            <Text style={styles.liketxt}>Agora (ongoing)</Text>
          </TouchableOpacity>
          <SizeBox size={10}/>
          <ImageBackground source={ImagePath.ProfileImg} borderRadius={5}style={styles.backimg}>
            <VectorIcon groupName='Feather' name='play-circle' size={60}/>
          </ImageBackground>
          <SizeBox size={15}/>
          <TouchableOpacity style={styles.editeventbtn}>
            <Text style={styles.liketxt}>Edit event</Text>
          </TouchableOpacity>
          <SizeBox size={15}/>
          <FlatList
            data={[{id:1},
              {id:2},
              {id:3},
              {id:4},
              {id:5},
              {id:6},
            ]}
            renderItem={renderNightClub}
            numColumns={2}
            style={{alignSelf:"center"}}
            keyExtractor={item => item.id.toString()}
            />
            </KeyboardAwareScrollView>
        </SafeAreaView>
        </LinearGradient>
  )
}

export default NightEvents