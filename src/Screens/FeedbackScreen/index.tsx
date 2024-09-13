import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import { SizeBox } from '../../Utilities/Component/Helpers'
import commonStyles from '../../Utilities/Styles/commonStyles'

const FeedbackScreen = ({navigation}:any) => {
    const onbackPress = () => {
        navigation.goBack();
      };
  return (
    <LinearGradient
    colors={[Colors.backgroundNew, Colors.backgroundNew]}
    start={{x: 0, y: 0}}
    end={{x: 1.3, y: 0.9}}
    style={styles.LinearConatiner}>
    <SafeAreaView>
        <SizeBox size={10}/>
        <View style={{flexDirection:'row',justifyContent:"space-between",paddingRight:30}}>
        <VectorIcon
              groupName={'Ionicons'}
              name={'chevron-back'}
              size={25}
              onPress={onbackPress}
            />
            <Text style={styles.liketxt}>Feedback & Reviews</Text>
            <View/>
          </View>
          <Text style={styles.liketxt}>(152)</Text>
          <SizeBox size={10}/>
          <Text style={{...commonStyles.font16Regular}}>
          Overall Rating     4.2 ⭐
          </Text>
          <SizeBox size={10}/>
          <View>
            <Text style={{...commonStyles.font16Regular}}>Event Organization: ⭐⭐⭐⭐☆</Text>
            <Text style={{...commonStyles.font16Regular}}>Venue: ⭐⭐⭐⭐⭐</Text>
            <Text style={{...commonStyles.font16Regular}}>Entertainment: ⭐⭐⭐☆☆</Text>
            <Text style={{...commonStyles.font16Regular}}>Ambiance: ⭐⭐⭐⭐⭐</Text>
            <Text style={{...commonStyles.font16Regular}}>Networking Opportunities: ⭐⭐⭐☆☆</Text>
            <Text style={{...commonStyles.font16Regular}}>Value for Money: ⭐⭐⭐⭐☆</Text>
          </View>
        </SafeAreaView>
        </LinearGradient>
  )
}

export default FeedbackScreen