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
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
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
import TinderCard from 'react-tinder-card';

const MeetPeople = ({navigation}) => {
  const [button, setButton] = useState('online');
  const [currentImage, setCurrentImage] = useState({});
  const [loader, setLoader] = useState(false);
  const swiper = useRef(null);
  const [userData, setUserData] = useState([]);
  const [groupData, setGroupData] = useState([]);
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
        console.log(JSON.stringify(res), 'res in getAllUsers');
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

  const onSwipe = direction => {
    console.log('You swiped: ' + direction);
  };

  const dummy = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
  ];

  console.log(currentImage?.pictures, 'currentImage');

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
              <>
                {userData?.map((i, index) => (
                  // console.log(i, 'iii'),
                  <TinderCard
                    onSwipe={onSwipe}
                    key={index}
                    swipeRequirementType="position"
                    swipeThreshold={0.8}
                    preventSwipe={['right', 'left']}>
                    <ImageBackground
                      borderRadius={10}
                      source={{uri: IMAGE_URL + i?.pictures[0]}}
                      // source={ImagePath.ProfileImg}
                      style={{
                        width: width * 0.9,
                        height: height / 1.4,
                        alignSelf: 'center',
                        marginBottom: 20,
                      }}>
                      <View
                        style={{
                          alignSelf: 'center',
                          flexDirection: 'row',
                          marginTop: moderateScaleVertical(20),
                        }}>
                        <View
                          style={{
                            ...styles.bar,
                            backgroundColor: Colors.white,
                          }}
                        />
                        <View
                          style={{
                            ...styles.bar,
                            backgroundColor: Colors.Pink,
                          }}
                        />
                        <View
                          style={{
                            ...styles.bar,
                            backgroundColor: Colors.white,
                          }}
                        />
                        <View
                          style={{
                            ...styles.bar,
                            backgroundColor: Colors.white,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          ...commonStyles.font14,
                          color: Colors.white,
                          fontWeight: '600',
                          paddingHorizontal: 23,
                          paddingVertical: 20,
                        }}>
                        {currentImage?.username}, {currentImage?.age}
                      </Text>
                      <View
                        style={[
                          styles.invw,
                          {
                            position: 'absolute',
                            bottom: 20,
                            alignSelf: 'center',
                          },
                        ]}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styles.bottomBtn}>
                          <Image source={ImagePath.sent} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styles.bottomBtn}>
                          <VectorIcon
                            groupName="Entypo"
                            name="cross"
                            color={Colors.red}
                            size={20}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styles.bottomBtn}>
                          <Image source={ImagePath.FireLike} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styles.bottomBtn}>
                          <VectorIcon
                            groupName="Feather"
                            name="heart"
                            color={Colors.green}
                            size={20}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() =>
                            navigation.navigate(
                              NavigationStrings.OtherProfiles,
                              // {
                              //   id: currentImage?._id,
                              // },
                            )
                          }
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
                    </ImageBackground>
                  </TinderCard>
                ))}
              </>
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
            {activeIndexModal == 0 ? (
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
                    navigation.navigate(NavigationStrings.CreateGroup);
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
                    navigation.navigate(NavigationStrings.MyGroups);
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
          </LinearGradient>
        </Modal>
        <Loadingcomponent isVisible={loader} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MeetPeople;
