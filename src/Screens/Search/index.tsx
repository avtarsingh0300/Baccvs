import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import styles from './style';
import {ImageComponent, SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {getSearchData} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const Search = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    searchHandler();
  }, [searchText]);

  const searchHandler = () => {
    const formData = {
      query: searchText,
    };
    getSearchData(formData)
      .then(res => {
        // console.log(res, 'res in search');
        setSearchData(res);
      })
      .catch(err => {
        console.log(err, 'err in search');
      });
  };

  const onContinue = () => {
    navigation.navigate(NavigationStrings.HomeNight);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate(NavigationStrings.MusicList)}>
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

  const renderData = () => (
    <ImageBackground
      source={ImagePath.ProfileImg}
      style={styles.imgback}
      borderRadius={5}>
      <SizeBox size={3} />
      <Text style={styles.phantom} >
        Le Phantom
      </Text>
      <View style={styles.vectoricons}>
        <VectorIcon
          groupName="Fontisto"
          name="heart-alt"
          color={Colors.green}
          size={25}
        />
        <View style={styles.vectortext}>
          <VectorIcon
            groupName="AntDesign"
            name="star"
            color={Colors.yellow}
            size={15}
          />
          <Text style={styles.textnumber}>{`  `}4,7</Text>
        </View>
      </View>
    </ImageBackground>
  );

  const renderDataBars = ({item}: any) => (
    <TouchableOpacity activeOpacity={0.8}>
      <ImageBackground
        source={
          item?.pictures?.length > 0
            ? {uri: IMAGE_URL + item?.pictures[0]}
            : ImagePath.ProfileImg
        }
        style={styles.imgback}
        borderRadius={5}>
        <SizeBox size={3} />
        <Text style={styles.larc}>Bar</Text>
        <View style={styles.vectoricons}>
          <VectorIcon
            groupName="Fontisto"
            name="heart-alt"
            color={Colors.green}
            size={25}
          />
          <View style={styles.vectortext}>
            <VectorIcon
              groupName="AntDesign"
              name="star"
              color={Colors.yellow}
              size={15}
            />
            <Text style={styles.textnumber}>{`  `}4,7</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  const renderDataUser = ({item}: any) => (
    <TouchableOpacity activeOpacity={0.8}>
      <ImageBackground
        source={
          item?.pictures?.length > 0
            ? {uri: IMAGE_URL + item?.pictures[0]}
            : ImagePath.ProfileImg
        }
        style={styles.imgback}
        borderRadius={5}>
        <SizeBox size={3} />
        <Text style={styles.larc}>{item?.username}</Text>
        {/* <View style={styles.vectoricons}>
          <VectorIcon
            groupName="Fontisto"
            name="heart-alt"
            color={Colors.green}
            size={25}
          />
          <View style={styles.vectortext}>
            <VectorIcon
              groupName="AntDesign"
              name="star"
              color={Colors.yellow}
              size={15}
            />
            <Text style={styles.textnumber}>{`  `}4,7</Text>
          </View>
        </View> */}
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderDataDj = () => (
    <View>
      <ImageBackground
        source={ImagePath.ProfileImg}
        style={styles.imgbcks}
        borderRadius={5}>
        <SizeBox size={3} />
        <View style={styles.vectortext}>
          <VectorIcon
            groupName="AntDesign"
            name="star"
            color={Colors.yellow}
            size={15}
          />
          <Text style={styles.textnumber}>{`  `}4,7</Text>
        </View>
        <Text style={styles.textsasha}>Sasha, 24</Text>
      </ImageBackground>
      <View style={styles.container}>
        <Text style={{color: Colors.white}}>Disco / Funk / Soul ...</Text>
        <View style={styles.textparis}>
          <VectorIcon
            groupName="Octicons"
            name="location"
            color={Colors.white}
            size={15}
          />
          <Text style={{color: Colors.white}}>{` `}Paris, France</Text>
        </View>
        <Text style={{color: Colors.white}}> 300€ (1h30 Dj Set)</Text>
      </View>
    </View>
  );

  const renderPrivate = () => (
    <ImageBackground
      source={ImagePath.ProfileImg}
      style={styles.imgback}
      borderRadius={5}>
      <SizeBox size={3} />
      <View style={styles.vectoricons}>
        <VectorIcon
          groupName="Fontisto"
          name="heart-alt"
          color={Colors.green}
          size={25}
        />
        <View style={styles.vectortext}>
          <VectorIcon
            groupName="AntDesign"
            name="star"
            color={Colors.yellow}
            size={15}
          />
          <Text style={styles.textnumber}>{`  `}4,7</Text>
        </View>
      </View>
    </ImageBackground>
  );

  const renderOrganiser = ({item, index}: any) => (
    <ImageBackground
      source={{uri: IMAGE_URL + item?.pictures[0]}}
      borderRadius={5}
      style={styles.imgback}>
      <SizeBox size={3} />
      <View style={styles.vectoricons}>
        <VectorIcon
          groupName="Fontisto"
          name="heart-alt"
          color={Colors.green}
          size={25}
        />
        <View style={styles.vectortext}>
          <VectorIcon
            groupName="AntDesign"
            name="star"
            color={Colors.yellow}
            size={15}
          />
          <Text style={styles.textnumber}>{`  `}4,7</Text>
        </View>
      </View>
    </ImageBackground>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.conatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchbar}>
            <View />
            <Text style={{...commonStyles.font20White, alignSelf: 'center'}}>
              Search
            </Text>
            <TouchableOpacity activeOpacity={0.8}>
              <ImageComponent
                source={ImagePath.filterIcon}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <SizeBox size={10} />
          <View style={styles.inputcontainer}>
            <TextInput
              placeholder="Search User or party name , group"
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
          <View style={styles.flexview}>
            <Text style={styles.headingtext}>Music style</Text>
            <TouchableOpacity
              style={styles.showmore}
              onPress={() => navigation.navigate(NavigationStrings.MusicList)}>
              <Text style={styles.showtext}>Show more</Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={2} />
          <FlatList
            data={searchData?.musicstyle}
            renderItem={renderItem}
            horizontal
            style={{alignSelf: 'center'}}
            keyExtractor={(item, index) => index?.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
          <SizeBox size={7} />
          {/* <View style={styles.nightclubs}>
            <View style={styles.flexview}>
              <Text style={styles.headingtext}>Nightclubs</Text>
              <TouchableOpacity
                style={styles.showmore}
                // onPress={onContinue}
                onPress={() => navigation.navigate(NavigationStrings.SeeMore)}>
                <Text style={styles.showtext}>Show more</Text>
              </TouchableOpacity>
            </View>
            <SizeBox size={2} />
            <FlatList
              data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
              renderItem={renderData}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{alignSelf: 'center'}}
              keyExtractor={(item, index) => index?.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View> */}
          {/* <SizeBox size={15} />
          <View style={styles.flexview}>
            <Text style={styles.headingtext}>Book a dj</Text>
            <TouchableOpacity
              style={styles.showmore}
              onPress={() => navigation.navigate(NavigationStrings.SeeMore)}>
              <Text style={styles.showtext}>Show more</Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={2} />
          <FlatList
            data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
            renderItem={renderDataDj}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{alignSelf: 'center'}}
            keyExtractor={(item, index) => index?.toString()}
            showsVerticalScrollIndicator={false}
          />
          <SizeBox size={7} />
          <View style={styles.nightclubs}>
            <View style={styles.flexview}>
              <Text style={styles.headingtext}>Private parties</Text>
              <TouchableOpacity
                style={styles.showmore}
                onPress={() => navigation.navigate(NavigationStrings.SeeMore)}>
                <Text style={styles.showtext}>Show more</Text>
              </TouchableOpacity>
            </View>
            <SizeBox size={2} />
            <FlatList
              data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
              renderItem={renderPrivate}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{alignSelf: 'center'}}
              keyExtractor={(item, index) => index?.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <SizeBox size={15} />
          <View style={styles.flexview}>
            <Text style={styles.headingtext}>Bars</Text>
            <TouchableOpacity
              style={styles.showmore}
              onPress={() => navigation.navigate(NavigationStrings.SeeMore)}>
              <Text style={styles.showtext}>Show more</Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={2} />
          <FlatList
            data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
            renderItem={renderDataBars}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, index) => index?.toString()}
            showsVerticalScrollIndicator={false}
            style={{alignSelf: 'center'}}
          /> */}
          {searchData?.events?.length > 0 && <SizeBox size={7} />}
          <View style={styles.nightclubs}>
            {searchData?.events?.length > 0 && (
              <View style={styles.flexview}>
                <Text style={styles.headingtext} onPress={onContinue}>Event Organisers</Text>
                <TouchableOpacity
                  style={styles.showmore}
                  onPress={() =>
                    navigation.navigate(NavigationStrings.SeeMore)
                  }>
                  <Text style={styles.showtext}>Show more</Text>
                </TouchableOpacity>
              </View>
            )}
            {searchData?.events?.length > 0 && <SizeBox size={2} />}
            <FlatList
              data={searchData?.events}
              renderItem={renderOrganiser}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{alignSelf: 'center'}}
              keyExtractor={(item, index) => index?.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {searchData?.events?.length > 0 && <SizeBox size={15} />}
          {searchData?.users?.length > 0 && (
            <View style={styles.flexview}>
              <Text style={styles.headingtext}>Users</Text>
              <TouchableOpacity
                style={styles.showmore}
                onPress={() => navigation.navigate(NavigationStrings.SeeMore)}>
                <Text style={styles.showtext}>Show more</Text>
              </TouchableOpacity>
            </View>
          )}
          {searchData?.users?.length > 0 && <SizeBox size={2} />}
          <FlatList
            data={searchData?.users}
            renderItem={renderDataUser}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item, index) => index?.toString()}
            showsVerticalScrollIndicator={false}
            style={{alignSelf: 'center'}}
          />
          <SizeBox size={15} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Search;
