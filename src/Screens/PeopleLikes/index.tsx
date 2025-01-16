import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Loadingcomponent, SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {getUserForLike, getUserLikes} from '../../Utilities/Constants/auth';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';

const PeopleLikes = ({navigation}: any) => {
  const [colors, setColors] = useState(0);
  const [userData, setUserData] = useState<any>({});
  const [loader, setLoader] = useState(false);

  // Likes You CRUSH
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(NavigationStrings.DatingUserProfile, {
            id: item?.likedUserId?._id,
          });
        }}>
        <ImageBackground
          source={
            item?.likedUserId?.pictures?.length > 0
              ? {uri: IMAGE_URL + item?.likedUserId?.pictures[0]?.url}
              : ImagePath.ProfileImg
          }
          style={styles.imgback}
          borderRadius={10}>
          <SizeBox size={3} />
          <Text style={styles.leilani}>
            {item?.likedUserId?.full_name}, {item?.likedUserId?.age}
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
              <View
                style={{
                  borderRightWidth: 1,
                  borderColor: Colors.white,
                  width: '50%',
                }}>
                <VectorIcon
                  groupName="Entypo"
                  name="cross"
                  size={25}
                  color={Colors.red}
                />
              </View>
              <VectorIcon
                groupName="Foundation"
                name="heart"
                size={20}
                color={Colors.green}
              />
            </ImageBackground>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  // Likes You LIKES
  const renderItem1 = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(NavigationStrings.DatingUserProfile, {
          id: item?.likedUserId?._id,
        });
      }}>
      <ImageBackground
        source={
          item?.likedUserId?.pictures?.length > 0
            ? {uri: IMAGE_URL + item?.likedUserId?.pictures[0]?.url}
            : ImagePath.ProfileImg
        }
        style={styles.imgbacks}
        borderRadius={10}>
        <SizeBox size={3} />
        <Text style={styles.leilani}>
          {item?.likedUserId?.full_name}, {item?.likedUserId?.age}
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
            <View
              style={{
                borderRightWidth: 1,
                borderColor: Colors.white,
                width: '50%',
              }}>
              <VectorIcon
                groupName="Entypo"
                name="cross"
                size={25}
                color={Colors.red}
              />
            </View>
            <VectorIcon
              groupName="Foundation"
              name="heart"
              size={20}
              color={Colors.green}
            />
          </ImageBackground>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderData = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(NavigationStrings.DatingUserProfile, {
            id: item?.likedUserId?._id,
          });
        }}>
        {/* <ImageBackground
          source={{uri: IMAGE_URL + item?.pictures[0].url}}
          style={styles.imgbacks}
          borderRadius={10}>
          <SizeBox size={3} />
          <Text style={styles.kingson}>{item?.likedUserId?.username}</Text>
        </ImageBackground> */}
      </TouchableOpacity>
    );
  };

  // You Liked LIKES
  const renderData1 = ({item}: any) => (
    // console.log(item, 'item'),
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(NavigationStrings.DatingUserProfile, {
          id: item?.likedUserId,
        });
      }}>
      <ImageBackground
        source={
          item?.userId?.pictures?.length > 0
            ? {uri: IMAGE_URL + item?.userId?.pictures[0]?.url}
            : ImagePath.ProfileImg
        }
        style={styles.imgbacks}
        borderRadius={10}>
        <SizeBox size={3} />
        <Text style={styles.kingson}>{item?.userId?.username}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  // You Liked GROUPS
  const renderItemm = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(NavigationStrings.GrroupDeatils, {
          data: item?._id,
        });
      }}>
      <ImageBackground
        source={
          item?.image
            ? {
                uri: IMAGE_URL + item?.image[0],
              }
            : ImagePath.ProfileImg
        }
        style={styles.imgbacks}
        borderRadius={10}>
        <Text style={styles.leilani}>{item?.name}</Text>
        <SizeBox size={3} />
      </ImageBackground>
    </TouchableOpacity>
  );

  const onbackPress = () => {
    navigation.goBack();
  };

  const userLikesYou = () => {
    setLoader(true);
    if (colors != 1) {
      getUserLikes()
        .then((res: any) => {
          console.log(JSON.stringify(res), 'res in getUserLikes');
          setUserData(res?.data);
          setLoader(false);
        })
        .catch(err => {
          console.log(err, 'err in getUserLikes');
          setLoader(false);
        });
    } else {
      getUserForLike()
        .then((res: any) => {
          console.log(JSON.stringify(res), 'res in getUserForLike');
          setUserData(res?.data);
          setLoader(false);
        })
        .catch(err => {
          console.log(err, 'err in getUserForLike');
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    userLikesYou();
  }, [colors]);

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        {loader ? (
          <Loadingcomponent isVisible={loader} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <SizeBox size={10} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <VectorIcon
                groupName={'Ionicons'}
                name={'chevron-back'}
                size={25}
                onPress={onbackPress}
              />
              <Text style={styles.liketxt}>Likes</Text>
            </View>
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

                  {
                    color: colors === 1 ? Colors.lightPink : Colors.white,
                    paddingLeft: 20,
                  },
                ]}>
                You liked
              </Text>
            </View>
            <SizeBox size={10} />
            {colors === 1 ? (
              <>
                <SizeBox size={10} />
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 15,
                    alignItems: 'center',
                  }}>
                  <VectorIcon
                    groupName="FontAwesome"
                    name="group"
                    size={15}
                    color={Colors.white}
                  />
                  <Text style={styles.crushtxt}>Group likes</Text>
                </View>
                <SizeBox size={10} />
                {userData?.mediaMainDetails?.length > 0 ? (
                  <FlatList
                    data={userData?.mediaMainDetails}
                    renderItem={renderItemm}
                    numColumns={2}
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
                    groupName="MaterialIcons"
                    name="local-fire-department"
                    size={25}
                    color={Colors.white}
                  />
                  <Text style={styles.crushtxt}>Crushs</Text>
                </View>
                {userData?.crush?.length > 0 ? (
                  <FlatList
                    data={userData?.crush}
                    renderItem={renderData}
                    horizontal
                    // style={{alignSelf: 'center'}}
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
                  <Text style={styles.crushtxt}>Likes</Text>
                </View>

                {userData?.otherLike?.length > 0 ? (
                  <FlatList
                    data={userData?.otherLike}
                    renderItem={renderData1}
                    numColumns={2}
                    // style={{alignSelf: 'center'}}
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
                <SizeBox size={10} />
                <View style={{flexDirection: 'row', paddingTop: 15}}>
                  <VectorIcon
                    groupName="MaterialIcons"
                    name="local-fire-department"
                    size={25}
                    color={Colors.white}
                  />
                  <Text style={styles.crushtxt}>Crushs</Text>
                  <Text style={styles.crushtxt}>
                    ({userData?.crush?.length})
                  </Text>
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
                  <Text style={styles.crushtxt}>Likes</Text>
                  <Text style={styles.crushtxt}>
                    ( {userData?.otherLike?.length})
                  </Text>
                </View>
                <SizeBox size={5} />
                {/* <Text style={styles.subscribetxt}>
                Subscribe to see everyone who likes you
              </Text> */}
                {userData?.otherLike?.length > 0 ? (
                  <FlatList
                    data={userData?.otherLike}
                    renderItem={renderItem1}
                    numColumns={2}
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
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PeopleLikes;
