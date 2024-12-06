import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {getSearchData} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import styles from './style';
import ImagePath from '../../Utilities/Constants/ImagePath';

const MusicList = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchText?.length > 0) {
      var filtered = data?.filter(item =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchData(filtered);
    } else {
      searchHandler();
    }
  }, [searchText]);

  const searchHandler = () => {
    const formData = {
      query: searchText,
    };
    getSearchData(formData)
      .then(res => {
        // console.log(res, 'res in search');
        setData(res?.musicstyle);
      })
      .catch(err => {
        console.log(err, 'err in search');
      });
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity activeOpacity={0.8}>
      <ImageBackground
        source={{uri: IMAGE_URL + item?.image}}
        style={styles.imgbck}
        borderRadius={5}>
        <Text
          style={{
            ...commonStyles.font10Regular,
            color: Colors.white,
          }}>
          {item?.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.conatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchbar}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{padding: 5}}
              onPress={() => navigation.goBack()}>
              <Image source={ImagePath.Arrow_Left_2} />
            </TouchableOpacity>
            <Text style={{...commonStyles.font20White, alignSelf: 'center'}}>
              Music style
            </Text>
            <View />
          </View>
          <SizeBox size={10} />
          <View style={styles.inputcontainer}>
            <TextInput
              placeholder="Search music"
              placeholderTextColor={Colors.greyTxt}
              style={styles.input}
              value={searchText}
              autoCapitalize="none"
              onChangeText={(e: string) => setSearchText(e)}
            />
            <VectorIcon
              groupName="Ionicons"
              name="search"
              size={28}
              color={Colors.black}
            />
          </View>
          <SizeBox size={10} />
          <View style={{alignSelf: 'center', width: '95%'}}>
            <FlatList
              data={searchText?.length > 0 ? searchData : data}
              renderItem={renderItem}
              // horizontal
              // style={{alignSelf: 'center'}}
              keyExtractor={(item, index) => index?.toString()}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              numColumns={3}
            />
          </View>
          <SizeBox size={15} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MusicList;
