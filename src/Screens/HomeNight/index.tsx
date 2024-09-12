import { View, Text, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import ImagePath from '../../Utilities/Constants/ImagePath'
import commonStyles from '../../Utilities/Styles/commonStyles'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import { SizeBox } from '../../Utilities/Component/Helpers'

const HomeNight = () => {
    const renderNightClub = ({ item }) => (
        <View style={{marginHorizontal:10,marginVertical:10}}>
          <TouchableOpacity style={styles.flatcontainer}>
          <Text style={{...commonStyles.font14Regular,
                            color: Colors.lightPink,}}>
                              Nighclub
</Text>
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
            <View style={styles.phantomcon}>
                <Image source={ImagePath.ProfileImg} style={styles.editedimg}/>
                <Text style={{...commonStyles.font20White}}>The Phantom</Text>
                <VectorIcon groupName='Fontisto' name='bell' size={25} color={Colors.white}/>
            </View>
            <SizeBox size={10}/>
            <FlatList
            data={[{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},{id:1},]}
            renderItem={renderNightClub}
            numColumns={2}
            style={{alignSelf:"center"}}
            keyExtractor={item => item.id.toString()}
            />
            </SafeAreaView>
            </LinearGradient>
  )
}

export default HomeNight