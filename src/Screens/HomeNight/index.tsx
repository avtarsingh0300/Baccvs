import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import ImagePath from '../../Utilities/Constants/ImagePath';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {SizeBox} from '../../Utilities/Component/Helpers';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';

const HomeNight = ({navigation}: any) => {
  const nightclubNames = {
    1: 'Nighclub Analytics',
    2: 'Events',
    3: 'Dj’s & Promoters',
    4: 'Feedback & Reviews',
    5: 'Marketing tools',
    6: 'Promote ',
    7: 'Bookings',
  };
  const handlePress = id => {
    if (id === 5) {
      navigation.navigate(NavigationStrings.MarketingTools);
    } else if (id === 4) {
      navigation.navigate(NavigationStrings.FeedbackScreen);
    } else if (id === 6) {
      navigation.navigate(NavigationStrings.PromoteScreen);
    } else if (id === 2) {
      navigation.navigate(NavigationStrings.NightEvents);
    }
  };

  const renderNightClub = ({item}) => {
    const name = nightclubNames[item.id] || 'Nightclub';
    return (
      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <TouchableOpacity
          style={styles.flatcontainer}
          onPress={() => handlePress(item.id)}>
          <Text
            style={{...commonStyles.font14Regular, color: Colors.lightPink}}>
            {name}
          </Text>
        </TouchableOpacity>
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
        <View style={styles.phantomcon}>
          <Image source={ImagePath.ProfileImg} style={styles.editedimg} />
          <Text style={{...commonStyles.font20White}}>The Phantom</Text>
          <VectorIcon
            groupName="Fontisto"
            name="bell"
            size={25}
            color={Colors.white}
          />
        </View>
        <SizeBox size={10} />
        <FlatList
          data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}]}
          renderItem={renderNightClub}
          numColumns={2}
          style={{alignSelf: 'center'}}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeNight;
