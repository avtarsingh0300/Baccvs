import {View, Text, SafeAreaView, FlatList, TextInput} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  ImageComponent,
  SizeBox,
  dummydata,
} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import ImagePath from '../../Utilities/Constants/ImagePath';
import VectorIcon from '../../Utilities/Component/vectorIcons';

const AddPeople = ({navigation}: any) => {
  const onBack = () => {
    navigation.goBack();
  };

  const renderItem = () => (
    <View style={styles.flatcon}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <ImageComponent source={ImagePath.ProfileImg} style={styles.userImg} />
        <View>
          <Text
            style={{
              ...commonStyles.font10Bold,
              color: Colors.white,
              paddingLeft: 15,
            }}>
            Hamaza butt
          </Text>
        </View>
      </View>
      <VectorIcon groupName="Fontisto" name="radio-btn-passive" size={20} />
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={10} />
        <View style={styles.headinngVw}>
          <VectorIcon
            groupName={'Ionicons'}
            name={'chevron-back'}
            size={25}
            onPress={onBack}
          />
          <Text style={{...commonStyles.Heading20font}}>Add people</Text>
          <Text
            style={{
              ...commonStyles.font12Regular,
              color: Colors.white,
            }}>
            Done
          </Text>
        </View>

        <SizeBox size={10} />
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.white}
            style={styles.input}
          />
          <VectorIcon
            groupName="Ionicons"
            name="search"
            size={28}
            color={Colors.white}
          />
        </View>
        <SizeBox size={10} />
        <FlatList data={dummydata} renderItem={renderItem} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddPeople;
