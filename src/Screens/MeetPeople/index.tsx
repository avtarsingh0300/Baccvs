import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {Loadingcomponent, SizeBox} from '../../Utilities/Component/Helpers';
import {height, moderateScale} from '../../Utilities/Styles/responsiveSize';
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
import MeetPeopleCard from '../../Utilities/Component/MeetPeopleCard';

const MeetPeople = ({navigation}) => {
  const [button, setButton] = useState('online');
  const [currentImage, setCurrentImage] = useState({});
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const user = useSelector((data: object) => data?.auth?.userData);
  const [showModal, setShowModal] = useState(false);
  const [activeIndexModal, setActiveIndexModal] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  // console.log(user, 'user');

  const swipe = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

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
        // console.log(JSON.stringify(res), 'res in getAllUsers');
        setUserData([]);
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
      // type: type,
    };
    // console.log(type, 'type');
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

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      if (dx < -20) {
        //  setTextFlag(false);
      }
      if (dx > 20) {
        //  setTextFlag(false);
      }
      // console.log('dx:' + dx + ' dy:' + dy);
      if (dx > 45) {
        swipe.setValue({x: dx, y: dy});
      } else if (dx < -90) {
        swipe.setValue({x: dx, y: dy});
      } else {
        if (dy < -200) {
          swipe.setValue({x: dx, y: dy});
        }
      }
    },

    onPanResponderRelease: (_, {dx, dy}) => {
      // console.log('dx:' + dx + ' dy:' + dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (direction == 1) {
        //  setTextFlag(true);
        if (dx < 200 && dy < -450) {
          //  getPropertiesDetailsHnadler();
          console.log('swipe up');
        } else {
          if (dx > 200) {
            console.log('Right Swipe');
          }
        }
      } else {
        //  setTextFlag(true);
        if (dx < 200 && dy < -450) {
          //  getPropertiesDetailsHnadler();
        } else {
          if (dx < -200) {
            console.log('left swipe');
          }
        }
      }

      if (isActionActive) {
        //  setTextFlag(false);
        // if (dx > 0 && dy > 0) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(() => {
          removeCard(); // Remove the card after the animation completes
        });
        // handleNext();
        // }
      } else {
        // setTextFlag(true);
        // if (dx < -200 && dy < -150 && dx > 200 && dy < -200) {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
        // }
      }
    },
  });

  const handleNext = () => {
    if (imageIndex < userData?.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  const removeCard = useCallback(() => {
    // setData(prepState => prepState.slice(1));
    if (userData.length > 1) {
      setUserData(prevState => prevState.slice(1)); // Remove the first card from the list
      swipe.setValue({x: 0, y: 0}); // Reset swipe position
    } else {
      // console.log('working');
    }
  }, [swipe, userData]);

  useEffect(() => {
    if (userData?.length == 0) {
      console.log('working');
    }
  }, [userData, swipe]);

  const handelSelection = useCallback(
    (direction: any) => {
      Animated.timing(swipe, {
        toValue: {x: direction * 500, y: 0},
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
    },
    [removeCard],
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={10} />
        <View style={styles.heading}>
          <View style={styles.invw}>
            <VectorIcon
              groupName="FontAwesome"
              name="angle-left"
              size={25}
              color={Colors.tranparent}
              style={{paddingLeft: 15}}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                ...commonStyles.font20White,
                alignSelf: 'center',
                marginLeft: 20,
              }}>
              Meet people
            </Text>
          </View>
          <View style={styles.invw}>
            <VectorIcon
              groupName="FontAwesome"
              name="sliders"
              size={20}
              color={Colors.white}
              onPress={() => {
                // setShowModal(true);
                // setActiveIndexModal(1);
                navigation.navigate(NavigationStrings.MeetPeopleFilter);
              }}
            />
            <VectorIcon
              groupName="Feather"
              name="menu"
              size={25}
              color={Colors.white}
              style={{marginLeft: 10}}
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
              color: button == 'online' ? Colors.Pink : Colors.white,
            }}>
            Discover
          </Text>
          <Text
            onPress={() => setButton('group')}
            style={{
              ...commonStyles.font16Regular,
              color: button == 'group' ? Colors.Pink : Colors.white,
              marginLeft: moderateScale(25),
            }}>
            Teams
          </Text>
        </View>
        <SizeBox size={10} />
        {button == 'group' ? (
          <>
            <ImageBackground
              source={ImagePath.Rectangle_new}
              style={styles.nameHeader}
              resizeMode="contain">
              <Text style={{...commonStyles.font12Bold, color: Colors.white}}>
                Team name
              </Text>
            </ImageBackground>
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              data={groupData.slice(0, 4)}
              style={{alignSelf: 'center', marginBottom: 100}}
              renderItem={({item}) => (
                <ImageBackground
                  borderRadius={10}
                  source={{uri: IMAGE_URL + item?.image[0]}}
                  style={styles.imgbck}>
                  <Text
                    style={{
                      ...commonStyles.font12Bold,
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
            <View style={[styles.invw, {alignSelf: 'center'}]}>
              <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
                <Image source={ImagePath.sent} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
                <VectorIcon
                  groupName="Entypo"
                  name="cross"
                  color={Colors.red}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
                <Image source={ImagePath.FireLike} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
                <VectorIcon
                  groupName="Feather"
                  name="heart"
                  color={Colors.green}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate(NavigationStrings.GrroupDeatils);
                }}
                style={[
                  styles.bottomBtn,
                  {backgroundColor: Colors.tranparent},
                ]}>
                <Image
                  source={ImagePath.openSheet}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {currentImage?.pictures ? (
              <View style={{flex: 1}}>
                {userData
                  ?.slice(0) // Prevent mutation by creating a copy
                  ?.map((item, index: number) => {
                    const isFirst: boolean = index === 0;
                    const dragHandlers = isFirst
                      ? panResponser?.panHandlers
                      : {};
                    console.log(index, 'index');
                    return (
                      <MeetPeopleCard
                        isFirst={isFirst}
                        item={item}
                        key={index}
                        index={index}
                        // setImageIndex={setImageIndex}
                        // setLoader={setLoader}
                        // handleNext={handleNext}
                        likeUserProfileHanlder={likeUserProfileHanlder}
                        disLikeUserProfileHanlder={disLikeUserProfileHanlder}
                        // rotate={rotate}
                        swipe={swipe}
                        {...dragHandlers}
                      />
                    );
                  })
                  .reverse()}
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: height / 3.5,
                }}>
                <Text style={commonStyles.font18White}>No Data Found...</Text>
              </View>
            )}
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
          <LinearGradient
            colors={[Colors.backgroundNew, Colors.backgroundNew]}
            start={{x: 0, y: 0}}
            end={{x: 1.3, y: 0.9}}
            style={[
              styles.optionContainer,
              {width: activeIndexModal == 0 ? '55%' : '60%'},
            ]}>
            {activeIndexModal == 0 && (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.option}
                  onPress={() => {
                    navigation.navigate(NavigationStrings.CreateGroup);
                    setShowModal(false);
                  }}>
                  <Text style={styles.optionText}>New team</Text>
                  <VectorIcon
                    groupName="FontAwesome"
                    name="question-circle-o"
                    size={18}
                    color={Colors.Pink}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.option}
                  onPress={() => {
                    navigation.navigate(NavigationStrings.MyGroups, {
                      name: 'Select team',
                    });
                    setShowModal(false);
                  }}>
                  <Text style={styles.optionText}>Select group</Text>
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
                  style={[styles.option, {borderBottomWidth: 1}]}>
                  <Text style={styles.optionText}>My groups</Text>
                  <VectorIcon
                    groupName="FontAwesome"
                    name="question-circle-o"
                    size={18}
                    color={Colors.Pink}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(NavigationStrings.EditSocialProfile);
                    setShowModal(false);
                  }}
                  activeOpacity={0.8}
                  style={[styles.option, {borderBottomWidth: 0}]}>
                  <Text style={styles.optionText}>Edit social part</Text>
                  <VectorIcon
                    groupName="FontAwesome"
                    name="question-circle-o"
                    size={18}
                    color={Colors.Pink}
                  />
                </TouchableOpacity>
              </>
            )}
          </LinearGradient>
        </Modal>
        <Loadingcomponent isVisible={loader} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MeetPeople;
