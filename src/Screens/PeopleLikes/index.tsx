import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {
  Loadingcomponent,
  showError,
  showSuccess,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  disLikeUser,
  getUserForLike,
  getUserLikes,
  likeUser,
} from '../../Utilities/Constants/auth';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';

const PeopleLikes = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'Likes you' | 'You liked'>(
    'Likes you',
  );
  const [youLikedData, setYouLikedData] = useState<any>([]);
  const [likesYouData, setLikesYouData] = useState<any>([]);

  const user = useSelector((data: any) => data?.auth?.userData?.user);

  const likeUserProfileHanlder = (type: string, item: any) => {
    const data = {
      userId: user.id,
      likedUserId: item?._id,
      type: type,
    };

    likeUser(data)
      .then((res: any) => {
        if (res?.match) {
          navigation.navigate(NavigationStrings.MatchPeople, {
            data: item,
          });
        } else {
          showSuccess(res?.message);
        }
      })
      .catch(err => {
        showError(err?.message);
        console.log(err, 'err in likeUserProfileHanlder');
        setLoader(false);
      });
  };

  const disLikeUserProfileHanlder = (item: any) => {
    const data = {
      userId: user?.id,
      likedUserId: item?._id,
      // type: type,
    };
    // console.log(type, 'type');
    disLikeUser(data)
      .then((res: any) => {
        showSuccess('User removesd from likes section');
      })
      .catch(err => {
        console.log(err, 'err in disLikeUser');
        setLoader(false);
        showError(err?.message);
      });
  };

  // Likes You as CRUSH
  const renderCrushForMe = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(NavigationStrings.DatingUserProfile, {
            id: item?.userId?._id,
          });
        }}>
        <ImageBackground
          source={
            item?.userId?.pictures?.length > 0
              ? {uri: IMAGE_URL + item?.userId?.pictures[0]?.url}
              : ImagePath.ProfileImg
          }
          style={styles.imgback}
          borderRadius={10}>
          <SizeBox size={3} />
          <Text style={styles.leilani}>
            {item?.userId?.full_name}, {item?.userId?.age}
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
                  onPress={() => disLikeUserProfileHanlder(item.userId._id)}
                  groupName="Entypo"
                  name="cross"
                  size={25}
                  color={Colors.red}
                />
              </View>
              <VectorIcon
                onPress={() => likeUserProfileHanlder('superlike', item.userId)}
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

  // Likes You as LIKE
  const renderLikesForMe = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(NavigationStrings.OtherProfiles, {
            id: item?.userId?._id,
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
                  onPress={() => disLikeUserProfileHanlder(item.userId._id)}
                  groupName="Entypo"
                  name="cross"
                  size={25}
                  color={Colors.red}
                />
              </View>
              <VectorIcon
                onPress={() => likeUserProfileHanlder('like', item.userId)}
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

  // You Liked LIKES
  const renderYouLikedUsers = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(NavigationStrings.OtherProfiles, {
            id: item?.likedUserId,
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
          <Text style={styles.kingson}>{item?.likedUserId?.username}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  // You Liked as Crush
  const renderYouLikedasCrush = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(NavigationStrings.OtherProfiles, {
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
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  // You Liked GROUPS
  const renderLikedGroupsByMe = ({item}: any) => (
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

  useEffect(() => {
    const getLikesData = () => {
      setLoader(true);
      getUserLikes()
        .then((res: any) => {
          // console.log('LIKES BY ME', JSON.stringify(res));
          setYouLikedData(res.data);
        })
        .catch(err => {
          console.log(err, 'err in getUserLikes');
          setLoader(false);
        });
      getUserForLike()
        .then((res: any) => {
          // console.log('LIKESFOR ME ', JSON.stringify(res));
          setLikesYouData(res.data);
          setLoader(false);
        })
        .catch(err => {
          console.log(err, 'err in getUserForLike');
          setLoader(false);
        });
    };

    getLikesData();
  }, [selectedTab]);

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
                onPress={() => setSelectedTab('Likes you')}
                style={[
                  styles.likestxt,
                  {
                    color:
                      selectedTab === 'Likes you'
                        ? Colors.lightPink
                        : Colors.white,
                  },
                ]}>
                Likes you
              </Text>
              <Text
                onPress={() => setSelectedTab('You liked')}
                style={[
                  styles.likestxt,

                  {
                    color:
                      selectedTab === 'You liked'
                        ? Colors.lightPink
                        : Colors.white,
                    paddingLeft: 20,
                  },
                ]}>
                You liked
              </Text>
            </View>
            <SizeBox size={10} />
            {selectedTab === 'Likes you' ? (
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
                    ({likesYouData?.crush?.length})
                  </Text>
                </View>
                {likesYouData?.crush?.length > 0 ? (
                  <FlatList
                    data={likesYouData?.crush}
                    renderItem={renderCrushForMe}
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
                    ({likesYouData?.otherLike?.length})
                  </Text>
                </View>
                <SizeBox size={5} />
                {/* <Text style={styles.subscribetxt}>
                Subscribe to see everyone who likes you
              </Text> */}
                {likesYouData?.otherLike?.length > 0 ? (
                  <FlatList
                    data={likesYouData?.otherLike}
                    renderItem={renderLikesForMe}
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
            ) : (
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
                {likesYouData?.mediaMainDetails?.length > 0 ? (
                  <FlatList
                    data={likesYouData?.mediaMainDetails}
                    renderItem={renderLikedGroupsByMe}
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
                {youLikedData?.crush?.length > 0 ? (
                  <FlatList
                    data={youLikedData?.crush}
                    renderItem={renderYouLikedasCrush}
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

                {youLikedData?.otherLike?.length > 0 ? (
                  <FlatList
                    data={youLikedData?.otherLike}
                    renderItem={renderYouLikedUsers}
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
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PeopleLikes;
