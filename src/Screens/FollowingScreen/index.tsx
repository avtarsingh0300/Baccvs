import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {
  Loadingcomponent,
  showError,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import styles from './style';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  followUser,
  getUserFollower,
  getUserFollowing,
  unFollowUser,
} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {useSelector} from 'react-redux';

const FollowingScreen = ({navigation}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [userFollowing, setUserFollowing] = useState<any>([]);
  const [userFollower, setUserFollower] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((data: any) => data?.auth?.userData);

  const onbackPress = () => {
    navigation.goBack();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      if (activeIndex == 1) {
        getUserFollowingListHandler();
      } else {
        getUserFollowerListHandler();
      }
    }, 1000);
  };

  useEffect(() => {
    if (activeIndex == 1) {
      setLoader(true);
      getUserFollowingListHandler();
    } else {
      setLoader(true);
      getUserFollowerListHandler();
    }
  }, [activeIndex]);

  const getUserFollowingListHandler = () => {
    getUserFollowing()
      .then((res: any) => {
        // console.log(res, 'res in getUserFollowing');
        setUserFollowing(res?.following);
        setLoader(false);
        setRefreshing(false);
      })
      .catch(err => {
        setLoader(false);
        setRefreshing(false);
        console.log(err, 'err in getUserFollowing');
      });
  };

  const getUserFollowerListHandler = () => {
    getUserFollower()
      .then((res: any) => {
        // console.log(res, 'res in getUserFollower');
        setUserFollower(res?.followers);
        setRefreshing(false);
        setLoader(false);
      })
      .catch(err => {
        console.log(err, 'err in getUserFollower');
        setLoader(false);
        setRefreshing(false);
      });
  };

  const onFollow = async (userData: any) => {
    setLoader(true);
    const data = {
      userId: user?.user?.id,
      targetUserId: userData?.id,
    };
    // console.log(data, 'data');
    followUser(data)
      .then(res => {
        getUserFollowerListHandler();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        setRefreshing(false);
        console.log(err, 'err in getMemberDetails');
      });
  };

  const onUnfollow = async (userData: any) => {
    setLoader(true);
    const data = {
      userId: user?.user?.id,
      targetUserId: userData?.id,
    };
    unFollowUser(data)
      .then(res => {
        if (activeIndex == 0) {
          getUserFollowerListHandler();
        } else {
          getUserFollowingListHandler();
        }
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        setRefreshing(false);
        console.log(err, 'err in getMemberDetails');
      });
  };

  const renderFollower = ({item}: any) => (
    <View style={styles.ftcontainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            item?.image?.length > 0
              ? {uri: IMAGE_URL + item?.image}
              : ImagePath.followProfile
          }
          style={{width: 55, height: 62, borderRadius: 5}}
        />
        <Text style={styles.alextxt}> {item?.username}</Text>
      </View>
      {activeIndex == 1 ? (
        <TouchableOpacity
          style={styles.followingbtn}
          activeOpacity={0.8}
          onPress={() => {
            onUnfollow(item);
          }}>
          <Text style={styles.followtxt}>Unfollow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.followingbtn}
          activeOpacity={0.8}
          onPress={() => {
            if (item?.isFollowing) {
              onUnfollow(item);
            } else {
              onFollow(item);
            }
          }}>
          <Text style={styles.followtxt}>
            {item?.isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <Loadingcomponent isVisible={loader} />
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.appColor]}
              progressBackgroundColor={Colors.white}
              tintColor={Colors.appColor}
            />
          }>
          <SizeBox size={10} />
          <VectorIcon
            groupName={'Ionicons'}
            name={'chevron-back'}
            size={25}
            onPress={onbackPress}
          />
          <View style={styles.folowingCon}>
            <TouchableOpacity>
              <Text
                style={[
                  styles.folowertxt,
                  {
                    color: activeIndex == 0 ? Colors.Pink : Colors.white,
                  },
                ]}
                onPress={() => setActiveIndex(0)}>
                Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={[
                  styles.folowertxt,
                  {
                    color: activeIndex == 1 ? Colors.Pink : Colors.white,
                  },
                ]}
                onPress={() => setActiveIndex(1)}>
                Following
              </Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={20} />
          <FlatList
            data={activeIndex == 1 ? userFollowing : userFollower}
            renderItem={renderFollower}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FollowingScreen;
