import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {Loadingcomponent, SizeBox} from '../../Utilities/Component/Helpers';
import {TouchableWithoutFeedback} from 'react-native';
import {height, width} from '../../Utilities/Styles/responsiveSize';
import {
  disLikeUser,
  getAllMeetGroups,
  getAllUsers,
  likeUser,
} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import ImagePath from '../../Utilities/Constants/ImagePath';

const MeetPeople = ({navigation}) => {
  const [button, setButton] = useState('online');
  const [currentImage, setCurrentImage] = useState({});
  const [loader, setLoader] = useState(false);
  const swiper = useRef(null);
  const [userData, setUserData] = useState([]);
  const [groupData, setGroupData] = useState();
  const user = useSelector((data: object) => data?.auth?.userData);
  const [showModal, setShowModal] = useState(false);
  const [activeIndexModal, setActiveIndexModal] = useState(0);
  // console.log(user, 'user');

  useEffect(() => {
    if (button == 'online') {
      setLoader(true);
      getAllUserHandler();
    } else {
      setLoader(true);
      getAllMeetGroupsHandler();
    }
  }, [button]);

  const getAllUserHandler = () => {
    getAllUsers()
      .then(res => {
        // console.log(res, 'res in getAllUsers');
        setUserData(res?.data);
        if (userData?.length == 0) {
          setCurrentImage(res?.data[0]);
        } else {
          const filterData = res?.data?.filter(
            x => currentImage?._id == x?._id,
          );
          setCurrentImage(filterData[0]);
        }
        setLoader(false);
      })
      .catch(err => {
        console.log(err, 'err in getAllUsers');
        setLoader(false);
      });
  };

  const getAllMeetGroupsHandler = () => {
    getAllMeetGroups()
      .then(res => {
        // console.log(res, 'res in getAllMeetGroups');
        setGroupData(res?.data);
        setLoader(false);
      })
      .catch(err => {
        console.log(err, 'err in getAllMeetGroups');
        setLoader(false);
      });
  };

  const likeUserProfileHanlder = (type: string) => {
    const data = {
      userId: user?.user?.id,
      likedUserId: currentImage?._id,
      type: type,
    };
    console.log(type, 'type');
    likeUser(data)
      .then(res => {
        console.log(res, 'res in likeUserProfileHanlder');
        getAllUserHandler();
      })
      .catch(err => {
        console.log(err, 'err in likeUserProfileHanlder');
        setLoader(false);
      });
  };

  const disLikeUserProfileHanlder = (type: string) => {
    const data = {
      userId: user?.user?.id,
      likedUserId: currentImage?._id,
      type: type,
    };
    console.log(type, 'type');
    disLikeUser(data)
      .then(res => {
        console.log(res, 'res in disLikeUser');
        getAllUserHandler();
      })
      .catch(err => {
        console.log(err, 'err in disLikeUser');
        setLoader(false);
      });
  };

  const flatListRef = useRef();

  const handleScrollEnd = event => {
    // Get the offsetX position
    const offsetX = event.nativeEvent.contentOffset.x;

    // Calculate the width of each item including margin
    const itemWidth = width * 0.2 + 10;

    // Calculate the index of the item closest to the center
    const index = Math.round(offsetX / itemWidth);

    // Ensure the index stays within the bounds of the images array
    const validIndex = Math.min(Math.max(index, 0), userData?.length - 1);

    // Set the current image based on the valid index
    setCurrentImage(userData[validIndex]);
  };

  // console.log(currentImage, 'currentImage');
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={10} />
        <View style={styles.heading}>
          <VectorIcon
            groupName="Feather"
            name="menu"
            size={25}
            color={Colors.tranparent}
            style={{paddingLeft: 15}}
          />
          <Text style={{...commonStyles.font20White, alignSelf: 'center'}}>
            Meet people
          </Text>
          <View style={styles.invw}>
            <VectorIcon
              groupName="FontAwesome"
              name="sliders"
              size={20}
              color={Colors.white}
              onPress={() => {
                setShowModal(true);
                setActiveIndexModal(1);
              }}
            />
            <VectorIcon
              groupName="Feather"
              name="menu"
              size={25}
              color={Colors.white}
              style={{paddingLeft: 10}}
              onPress={() => {
                setShowModal(true);
                setActiveIndexModal(0);
              }}
            />
          </View>
        </View>
        <SizeBox size={10} />
        <View style={styles.buttonbox}>
          <Text
            onPress={() => setButton('online')}
            style={{
              ...commonStyles.font16Regular,
              color: button == 'online' ? Colors.Pink : Colors.Linear,
            }}>
            Discover
          </Text>
          <Text
            onPress={() => setButton('group')}
            style={{
              ...commonStyles.font16Regular,
              color: button == 'group' ? Colors.Pink : Colors.white,
            }}>
            Groups
          </Text>
        </View>
        <SizeBox size={10} />
        {button == 'group' ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={groupData}
            style={{alignSelf: 'center', marginBottom: 100}}
            renderItem={({item}) => (
              <ImageBackground
                borderRadius={10}
                source={{uri: IMAGE_URL + item?.image[0]}}
                style={styles.imgbck}>
                <Text
                  style={{
                    ...commonStyles.font14,
                    color: Colors.white,
                    fontWeight: '600',
                    padding: 10,
                  }}>
                  {item?.name}
                </Text>
              </ImageBackground>
            )}
            numColumns={2}
          />
        ) : (
          <>
            {currentImage?.pictures ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate(NavigationStrings.OtherProfiles, {
                    id: currentImage?._id,
                  })
                }>
                <ImageBackground
                  borderRadius={10}
                  source={{uri: IMAGE_URL + currentImage?.pictures[0]}}
                  style={{
                    width: width * 0.8,
                    height: height / 1.9,
                    alignSelf: 'center',
                    marginBottom: 20,
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font14,
                      color: Colors.white,
                      fontWeight: '600',
                      padding: 15,
                    }}>
                    {currentImage?.username}, {currentImage?.age}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <ImageBackground
                borderRadius={10}
                source={ImagePath.ProfileImg}
                style={{
                  width: width * 0.8,
                  height: height / 1.9,
                  alignSelf: 'center',
                  marginBottom: 20,
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    ...commonStyles.font14,
                    color: Colors.white,
                    fontWeight: '600',
                    padding: 15,
                  }}>
                  {currentImage?.username}, {currentImage?.age}
                </Text>
              </ImageBackground>
            )}
            <View style={styles.main}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.fire}
                onPress={() => {
                  disLikeUserProfileHanlder(
                    currentImage?.isLiked ? 'like' : 'superlike',
                  );
                }}>
                <VectorIcon
                  groupName="Entypo"
                  name="cross"
                  size={30}
                  color={Colors.red}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.heart}
                onPress={() => {
                  likeUserProfileHanlder('like');
                }}>
                <VectorIcon
                  groupName="Fontisto"
                  name={currentImage?.isLiked ? 'heart' : 'heart-alt'}
                  size={28}
                  color={Colors.green}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.fire}
                onPress={() => {
                  likeUserProfileHanlder('superlike');
                }}>
                <VectorIcon
                  groupName={
                    currentImage?.isSuperliked
                      ? 'Fontisto'
                      : 'MaterialCommunityIcons'
                  }
                  name={'fire'}
                  size={29}
                  color={Colors.Linear}
                />
              </TouchableOpacity>
            </View>
            <SizeBox size={8} />
            <FlatList
              data={userData}
              horizontal
              ref={flatListRef}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                // console.log(item, 'item'),
                <TouchableWithoutFeedback onPress={() => setCurrentImage(item)}>
                  {item?.pictures[0] ? (
                    <Image
                      source={{uri: `${IMAGE_URL}${item?.pictures[0]}`}}
                      style={{
                        width: 51,
                        height: 67,
                        marginLeft: 10,
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <Image
                      source={ImagePath.ProfileImg}
                      style={{
                        width: 51,
                        height: 67,
                        marginLeft: 10,
                        borderRadius: 10,
                      }}
                    />
                  )}
                </TouchableWithoutFeedback>
              )}
              onMomentumScrollEnd={handleScrollEnd}
              snapToInterval={width * 0.2 + 10}
              decelerationRate="fast"
            />
          </>
        )}
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
          <View
            style={[
              styles.optionContainer,
              {width: activeIndexModal == 0 ? '45%' : '60%'},
            ]}>
            {activeIndexModal == 0 ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.option}
                  onPress={() => {
                    navigation.navigate(NavigationStrings.CreateGroup);
                    setShowModal(false);
                  }}>
                  <Text style={styles.optionText}>New group</Text>
                  <VectorIcon
                    groupName="FontAwesome"
                    name="question-circle-o"
                    size={18}
                    color={Colors.Pink}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(NavigationStrings.MyGroups);
                    setShowModal(false);
                  }}
                  activeOpacity={0.8}
                  style={[styles.option, {borderBottomWidth: 0}]}>
                  <Text style={styles.optionText}>My groups</Text>
                  <VectorIcon
                    groupName="FontAwesome"
                    name="question-circle-o"
                    size={18}
                    color={Colors.Pink}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.option}
                  onPress={() => {
                    // navigation.navigate(NavigationStrings.EditProfile);
                    // setShowModal(false);
                  }}>
                  <Text style={styles.optionText}>Group capacity 2-4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.option}
                  onPress={() => {
                    // navigation.navigate(NavigationStrings.EditProfile);
                    // setShowModal(false);
                  }}>
                  <Text style={styles.optionText}>Gender : M-F-Mixed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.option}
                  onPress={() => {
                    // navigation.navigate(NavigationStrings.EditProfile);
                    // setShowModal(false);
                  }}>
                  <Text style={styles.optionText}>Age range</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.option}
                  onPress={() => {
                    // navigation.navigate(NavigationStrings.EditProfile);
                    // setShowModal(false);
                  }}>
                  <Text style={styles.optionText}>Distance</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.option}
                  onPress={() => {
                    // navigation.navigate(NavigationStrings.EditProfile);
                    // setShowModal(false);
                  }}>
                  <Text style={styles.optionText}>Languages</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={}
                  activeOpacity={0.8}
                  style={[styles.option, {borderBottomWidth: 0}]}>
                  <Text style={styles.optionText}>New groups</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Modal>
        <Loadingcomponent isVisible={loader} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MeetPeople;
