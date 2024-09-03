import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {Loadingcomponent, SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {getUserForLike, getUserLikes} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const PeopleLikes = () => {
  const [colors, setColors] = useState(0);
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    userLikesYou();
  }, [colors]);

  const userLikesYou = () => {
    if (colors != 1) {
      getUserLikes()
        .then(res => {
          console.log(res, 'res in getUserLikes');
          setUserData(res?.data);
        })
        .catch(err => {
          console.log(err, 'err in getUserLikes');
        });
    } else {
      getUserForLike()
        .then(res => {
          console.log(res, 'res in getUserLikes');
          setUserData(res?.data);
        })
        .catch(err => {
          console.log(err, 'err in getUserLikes');
        });
    }
  };

  const renderData = ({item}: any) => (
    <ImageBackground
      source={{uri: IMAGE_URL + item?.likedUserId?.pictures[0]}}
      style={styles.imgbacks}
      borderRadius={10}>
      <SizeBox size={3} />
      <Text style={styles.kingson}>{item?.likedUserId?.username}</Text>
    </ImageBackground>
  );
  const renderData1 = ({item}: any) => (
    // console.log(item, 'item'),
    <ImageBackground
      source={
        item?.userId?.pictures?.length > 0
          ? {uri: IMAGE_URL + item?.userId?.pictures[0]}
          : ImagePath.ProfileImg
      }
      style={styles.imgbacks}
      borderRadius={10}>
      <SizeBox size={3} />
      <Text style={styles.kingson}>{item?.userId?.username}</Text>
    </ImageBackground>
  );
  const renderItem = ({item}: any) => (
    <ImageBackground
      source={
        item?.likedUserId?.pictures?.length > 0
          ? {uri: IMAGE_URL + item?.likedUserId?.pictures[0]}
          : ImagePath.ProfileImg
      }
      style={styles.imgback}
      borderRadius={10}>
      <SizeBox size={3} />
      <Text style={styles.leilani}>
        {item?.likedUserId?.username}, {item?.likedUserId?.age}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: -1,
        }}>
        <ImageBackground
          source={ImagePath.blurpic}
          style={styles.blurimg}
          borderBottomRightRadius={10}
          borderBottomLeftRadius={10}>
          <VectorIcon
            groupName="Entypo"
            name="cross"
            size={25}
            color={Colors.white}
          />
          <View style={styles.line}></View>
          <VectorIcon
            groupName="Foundation"
            name="heart"
            size={20}
            color={Colors.green}
          />
        </ImageBackground>
      </View>
    </ImageBackground>
  );
  const renderItem1 = ({item}: any) => (
    <ImageBackground
      source={
        item?.likedUserId?.pictures?.length > 0
          ? {uri: IMAGE_URL + item?.likedUserId?.pictures[0]}
          : ImagePath.ProfileImg
      }
      style={styles.imgbacks}
      borderRadius={10}
      blurRadius={30}>
      <SizeBox size={3} />
    </ImageBackground>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SizeBox size={10} />
          <Text style={styles.liketxt}>Likes</Text>
          <SizeBox size={10} />
          <View style={styles.likesbtn}>
            <Text
              onPress={() => setColors(0)}
              style={[
                styles.likestxt,
                {color: colors === 0 ? Colors.lightPink : Colors.white},
              ]}>
              Likes you
            </Text>
            <Text
              onPress={() => setColors(1)}
              style={[
                styles.likestxt,
                {color: colors === 1 ? Colors.lightPink : Colors.white},
              ]}>
              You liked
            </Text>
          </View>
          {colors === 1 ? (
            <>
              <SizeBox size={10} />
              <View style={{flexDirection: 'row'}}>
                <VectorIcon
                  groupName="MaterialIcons"
                  name="local-fire-department"
                  size={25}
                  color={Colors.white}
                />
                <Text style={styles.crushtxt}>Yours Crushs</Text>
              </View>
              {userData?.crush?.length > 0 ? (
                <FlatList
                  data={userData?.crush}
                  renderItem={renderData}
                  horizontal
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <>
                  <SizeBox size={10} />
                  <Text style={styles.crushtxt}>No data found ..</Text>
                  <SizeBox size={5} />
                </>
              )}
              <SizeBox size={10} />
              <View style={{flexDirection: 'row'}}>
                <VectorIcon
                  groupName="Fontisto"
                  name="heart-alt"
                  size={20}
                  color={Colors.white}
                />
                <Text style={styles.crushtxt}>Other likes</Text>
              </View>

              {userData?.otherLike?.length > 0 ? (
                <FlatList
                  data={userData?.otherLike}
                  renderItem={renderData1}
                  numColumns={2}
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <>
                  <SizeBox size={10} />
                  <Text style={styles.crushtxt}>No data found ..</Text>
                  <SizeBox size={5} />
                </>
              )}
            </>
          ) : (
            <View>
              <View style={{flexDirection: 'row', paddingTop: 15}}>
                <VectorIcon
                  groupName="MaterialIcons"
                  name="local-fire-department"
                  size={25}
                  color={Colors.white}
                />
                <Text style={styles.crushtxt}>Crushs</Text>
                <Text style={styles.crushtxt}>({userData?.crush?.length})</Text>
              </View>
              {userData?.crush?.length > 0 ? (
                <FlatList
                  data={userData?.crush}
                  renderItem={renderItem}
                  horizontal
                  keyExtractor={(item, index) => index?.toString()}
                />
              ) : (
                <>
                  <SizeBox size={10} />
                  <Text style={styles.crushtxt}>No data found ..</Text>
                  <SizeBox size={5} />
                </>
              )}
              <SizeBox size={10} />
              <View style={{flexDirection: 'row'}}>
                <VectorIcon
                  groupName="Fontisto"
                  name="heart-alt"
                  size={20}
                  color={Colors.white}
                />
                <Text style={styles.crushtxt}>Up Next</Text>
                <Text style={styles.crushtxt}>(32)</Text>
              </View>
              <SizeBox size={5} />
              <Text style={styles.subscribetxt}>
                Subscribe to see everyone who likes you
              </Text>
              {userData?.otherLike?.length > 0 ? (
                <FlatList
                  data={userData?.otherLike}
                  renderItem={renderItem1}
                  numColumns={2}
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <>
                  <SizeBox size={10} />
                  <Text style={styles.crushtxt}>No data found ..</Text>
                  <SizeBox size={5} />
                </>
              )}
            </View>
          )}
        </ScrollView>
        <Loadingcomponent isVisible={loader} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PeopleLikes;
