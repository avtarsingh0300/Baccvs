// OtherProfiles;
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import FastImage from 'react-native-fast-image';
import {
  Header,
  ImageComponent,
  Loadingcomponent,
  SizeBox,
  dummydata,
  showError,
  showSuccess,
} from '../../Utilities/Component/Helpers';
import Modal from 'react-native-modal';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {
  blockUser,
  followUser,
  getMemberDetails,
  getUserProfile,
  reportUser,
  unFollowUser,
} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {styles} from './style';
import {useSelector} from 'react-redux';
import ProfileImagePreview from '../../Utilities/Component/ProfileImagePreview';

const OtherProfiles = ({navigation, route}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [eventCount, setEventCount] = useState<any>('');
  const user = useSelector((data: any) => data?.auth?.userData);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  // console.log(user?.user?.id);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoader(true);
    const data = {
      id: route?.params?.id,
    };

    getMemberDetails(data)
      .then((res: any) => {
        setLoader(false);
        setUserData(res?.user);
        setEventCount(res);
        // console.log(res);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err, 'err in getMemberDetails');
      });
  };
  const getUserData2 = async () => {
    const data = {
      id: route?.params?.id,
    };

    getMemberDetails(data)
      .then((res: any) => {
        setLoader(false);
        setUserData(res?.user);
        setEventCount(res);
        // console.log(res);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err, 'err in getMemberDetails');
      });
  };
  const onFollow = async () => {
    const data = {
      userId: user?.user?.id,
      targetUserId: userData?.id,
    };
    followUser(data)
      .then(res => {
        getUserData2();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err, 'err in getMemberDetails');
      });
  };
  const onUnfollow = async () => {
    const data = {
      userId: user?.user?.id,
      targetUserId: userData?.id,
    };

    unFollowUser(data)
      .then(res => {
        getUserData2();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err, 'err in getMemberDetails');
      });
  };
  const onBlock = async () => {
    const data = {
      userId: user?.user?.id,
      blockUserId: userData?.id,
    };
    blockUser(data)
      .then(res => {
        showSuccess('Accound Blocked!');
        navigation.goBack();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err, 'err in block');
      });
  };
  const onReport = async () => {
    const data = {
      userid: userData?.id,
    };
    console.log(data);
    reportUser(data)
      .then(res => {
        showSuccess('Account reported!');
        navigation.goBack();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err, 'err in report');
      });
  };

  const showBlockUserAlert = () => {
    Alert.alert(
      'Block account',
      'Are you sure you want to block this account?',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Block',
          onPress: () => onBlock(),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };
  const showReportUserAlert = () => {
    Alert.alert(
      'Report account',
      'Are you sure you want to report this account?',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Report',
          onPress: () => onReport(),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };
  const renderItem = ({item, index}: any) => (
    <View>
      <View style={styles.listContainer}>
        <ImageBackground
          source={{uri: IMAGE_URL + item?.pictures[0]}}
          style={styles.backimg}>
          <View style={styles.flexinner}></View>
        </ImageBackground>
      </View>
    </View>
  );

  // console.log(userData, 'userData');

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={{flex: 1}}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <SizeBox size={5} />
          <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
              <VectorIcon
                groupName={'Ionicons'}
                name={'chevron-back'}
                size={25}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.liketxt}>Profile</Text>
            </View>

            <VectorIcon
              groupName="Entypo"
              name="dots-three-horizontal"
              size={30}
              color={Colors.white}
              onPress={() => setShowModal(true)}
            />
          </View>
          <Text
            style={{
              ...commonStyles.font16Regular,
              color: Colors.white,
              textAlign: 'left',
              paddingLeft: 30,
              textTransform: 'capitalize',
            }}>
            {userData?.full_name}
          </Text>
          {userData?.pictures?.length > 0 ? (
            <Image
              source={{uri: IMAGE_URL + userData?.pictures[0]?.url}}
              style={styles.profileImage}
            />
          ) : (
            <Image source={ImagePath.ProfileImg} style={styles.profileImage} />
          )}
          <View style={styles.followInfoContainer}>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Events</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {eventCount?.event_count}
              </Text>
            </View>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Followers</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {userData?.followers_count}
              </Text>
            </View>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Following</Text>
              <Text style={[styles.followText, {color: Colors.white}]}>
                {userData?.following_count}
              </Text>
            </View>
          </View>
          <View style={styles.midButtonContainer}>
            <TouchableOpacity style={styles.midButton} activeOpacity={0.8}>
              <Text style={styles.btnText}>Message</Text>
            </TouchableOpacity>
            <VectorIcon
              groupName="AntDesign"
              name="hearto"
              color={Colors.red}
              size={24}
            />
            {eventCount?.already_follower == false ? (
              <TouchableOpacity
                style={styles.midButton}
                activeOpacity={0.8}
                onPress={onFollow}>
                <Text style={styles.btnText}>Follow</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.midButton}
                activeOpacity={0.8}
                onPress={onUnfollow}>
                <Text style={styles.btnText}>Following</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.row}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="cupcake"
              size={20}
              color={Colors.lightGrey}
            />
            <Text style={styles.rowText}>{userData?.age}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: Colors.lightGrey,
              }}
            />
            <Image
              source={ImagePath.line_height}
              tintColor={Colors.lightGrey}
            />
            <Text style={styles.rowText}>{userData?.height}</Text>
            {/* <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: Colors.lightGrey,
              }}
            />
            <VectorIcon
              groupName="SimpleLineIcons"
              name="location-pin"
              size={20}
              color={Colors.lightGrey}
            />
            <Text style={styles.rowText}>
              {userData?.location ? userData?.location : 'Eiffel Tower'}
            </Text> */}
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: Colors.lightGrey,
              }}
            />
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="zodiac-leo"
              size={20}
              color={Colors.lightGrey}
            />
            <Text style={styles.rowText}>{userData?.zodiac_sign}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: Colors.lightGrey,
              }}
            />
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="glass-cocktail"
              size={20}
              color={Colors.lightGrey}
            />
          </View>
          <View style={styles.postContainer}>
            {userData?.pictures?.map((i: any, index: number) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  // setShowPreview(true);
                  // setSelectedImage(i?.url);
                  navigation.navigate(NavigationStrings.ImagePreview, {
                    data: userData,
                    image: i,
                    id: route?.params?.id,
                  });
                }}>
                <FastImage
                  source={{uri: IMAGE_URL + i?.url}}
                  key={index}
                  style={styles.postImage}
                />
              </TouchableOpacity>
            ))}
          </View>
          {/* <Text style={{...commonStyles.font16White, alignSelf: 'center'}}>
            See more
          </Text> */}

          {userData?.bio ? (
            <>
              <SizeBox size={10} />
              <Text style={[styles.title, {textTransform: 'capitalize'}]}>
                {userData?.full_name}'s Bio
              </Text>
              <Text style={styles.bioText}>{userData?.bio}</Text>
              <SizeBox size={8} />
            </>
          ) : null}

          <SizeBox size={5} />
          {userData?.music_type?.length > 0 ? (
            <>
              <Text style={styles.title}>Music Type</Text>
              <View style={styles.typeContainer}>
                {userData?.music_type?.map((i: any, index: number) => (
                  <View style={styles.type}>
                    <Text style={styles.typeText}>{i}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}

          {userData?.event_type?.length > 0 ? (
            <>
              <Text style={styles.title}>Event Type</Text>
              <View style={styles.typeContainer}>
                {userData?.event_type?.map((i: any, index: number) => (
                  <View style={styles.type}>
                    <Text style={styles.typeText}>{i}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}
          {userData?.language?.length > 0 ? (
            <>
              <Text style={styles.title}>Languages</Text>
              <View style={styles.typeContainer}>
                {userData?.language?.map((i: any, index: number) => (
                  <View style={styles.type}>
                    <Text style={styles.typeText}>{i}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}

          <SizeBox size={10} />
          {eventCount?.past_events ? (
            <>
              <Text style={styles.title}>Past events</Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                  width: width,
                  alignSelf: 'center',
                }}
                data={eventCount?.past_events}
                renderItem={renderItem}
              />
            </>
          ) : null}
        </ScrollView>
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() => setShowModal(false)}
          avoidKeyboard={true}
          style={{flex: 1, margin: 0, justifyContent: 'flex-start'}}
          isVisible={showModal}
          backdropOpacity={0.2}>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.option}
              onPress={() => {
                setShowModal(false);
                showBlockUserAlert();
              }}>
              <Text style={styles.optionText}>Block</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                showReportUserAlert();
              }}
              activeOpacity={0.8}
              style={styles.option}>
              <Text style={styles.optionText}>Report</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <ProfileImagePreview
          setShowModal={setShowPreview}
          // showModal={true}
          data={userData}
          image={selectedImage}
          showModal={showPreview}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OtherProfiles;
