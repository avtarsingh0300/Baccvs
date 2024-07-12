import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import styles from './style';
import {SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import fontFamily from '../../Utilities/Styles/fontFamily';
import ImagePath from '../../Utilities/Constants/ImagePath';

const Search = () => {
  const renderItem = () => (
    <View>
      <ImageBackground source={ImagePath.ProfileImg} style={styles.imgbck}>
        <Text style={{...commonStyles.font14, fontFamily: fontFamily.regular}}>
          House
        </Text>
      </ImageBackground>
    </View>
  );
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.conatiner}>
      <SafeAreaView>
        <Text style={{...commonStyles.font20White, alignSelf: 'center'}}>
          Search
        </Text>
        <SizeBox size={10} />
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Search User or party name , group"
            placeholderTextColor={Colors.greyTxt}
            style={styles.input}
          />
          <VectorIcon
            groupName="Ionicons"
            name="search"
            size={28}
            color={Colors.black}
          />
        </View>
        <SizeBox size={10} />
        <FlatList
          data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
          renderItem={renderItem}
          numColumns={3}
          style={{alignSelf: 'center'}}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Search;
