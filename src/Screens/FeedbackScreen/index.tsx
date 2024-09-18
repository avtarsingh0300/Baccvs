import {View, Text, SafeAreaView, FlatList, ScrollView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {SizeBox} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {Image} from 'react-native';
const FeedbackScreen = ({navigation}: any) => {
  const onbackPress = () => {
    navigation.goBack();
  };

  const renderFeedback = ({item, index}: any) => {
    const isLastItem = index === data.length - 1;

    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Image source={ImagePath.ProfileImg} style={styles.feedbackimg} />
          <View style={{paddingLeft: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 70,
              }}>
              <Text style={{...commonStyles.font12Regular}}>Julie C.</Text>
              <Text style={{...commonStyles.font12Regular}}>
                4.5 ⭐⭐⭐⭐⭐
              </Text>
              <Text style={{...commonStyles.font12Regular}}>22/07/24</Text>
            </View>
            <Text style={{...commonStyles.font12Regular, width: '80%'}}>
              "Great event, well organized and the venue was perfect!"
            </Text>
          </View>
        </View>
        <VectorIcon
          groupName="MaterialCommunityIcons"
          name="share-outline"
          size={25}
          color={Colors.Pink}
          style={styles.sharevci}
        />
        {!isLastItem && (
          <View style={{borderBottomWidth: 1, borderColor: Colors.grey}}></View>
        )}
        <SizeBox size={5} />
      </View>
    );
  };

  const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}];

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView>
          <SizeBox size={10} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 30,
            }}>
            <VectorIcon
              groupName={'Ionicons'}
              name={'chevron-back'}
              size={25}
              onPress={onbackPress}
            />
            <Text style={styles.liketxt}>Feedback & Reviews</Text>
            <View />
          </View>
          <Text style={styles.liketxt}>(152)</Text>
          <SizeBox size={10} />

          <Text style={{...commonStyles.font16Regular}}>
            Overall Rating  4.2 ⭐
          </Text>
          <SizeBox size={10} />
          <View>
            <Text style={{...commonStyles.font16Regular}}>
              Event Organization: ⭐⭐⭐⭐☆
            </Text>
            <Text style={{...commonStyles.font16Regular}}>
              Venue: ⭐⭐⭐⭐⭐
            </Text>
            <Text style={{...commonStyles.font16Regular}}>
              Entertainment: ⭐⭐⭐☆☆
            </Text>
            <Text style={{...commonStyles.font16Regular}}>
              Ambiance: ⭐⭐⭐⭐⭐
            </Text>
            <Text style={{...commonStyles.font16Regular}}>
              Networking Opportunities: ⭐⭐⭐☆☆
            </Text>
            <Text style={{...commonStyles.font16Regular}}>
              Value for Money: ⭐⭐⭐⭐☆
            </Text>
          </View>
          <SizeBox size={20} />
          <Text style={{...commonStyles.font16Regular}}>Reviews</Text>
          <SizeBox size={10} />
          <FlatList
            data={data}
            renderItem={renderFeedback}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FeedbackScreen;
