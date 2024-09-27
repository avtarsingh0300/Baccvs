import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Loadingcomponent,
  showError,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  disLikeTeam,
  getEventTypes,
  likeTeam,
  teamsDetails,
} from '../../Utilities/Constants/auth';
import languages from '../../Utilities/Constants';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const GrroupDeatils = ({navigation, route}: any) => {
  const [musicStyle, setMusicStyle] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [loader, setLoader] = useState(false);
  const user = useSelector((data: object) => data?.auth?.userData);

  useEffect(() => {
    setLoader(true);
    getDetails();
  }, []);

  const getDetails = () => {
    const data = {
      groupId: route.params?.data?._id,
    };
    teamsDetails(data)
      .then(res => {
        console.log(JSON.stringify(res), 'res in teamsDetails');
        setTeamData(res?.data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };

  const disLikeTeamHanlder = () => {
    setLoader(true);
    const data = {
      userId: user?.user?.id,
      groupId: teamData?._id,
      // type: type,
    };
    // console.log(type, 'type');
    disLikeTeam(data)
      .then(res => {
        getDetails();
        console.log(res, 'res in disLikeUser');
      })
      .catch(err => {
        console.log(err, 'err in disLikeUser');
        setLoader(false);
      });
  };

  const likeTeameHanlder = (type: string) => {
    setLoader(true);
    const data = {
      userId: user?.user?.id,
      groupId: teamData?._id,
      type: type,
    };
    likeTeam(data)
      .then(res => {
        getDetails();
        console.log(res, 'res in likeUserProfileHanlder');
      })
      .catch(err => {
        console.log(err, 'err in likeUserProfileHanlder');
        setLoader(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundNew,
        // paddingHorizontal: moderateScale(22),
      }}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Loadingcomponent isVisible={loader} />
          <SizeBox size={10} />
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <Image source={ImagePath.Arrow_Left_2} />
            </TouchableOpacity>
            <View style={styles.headerInnerBox}>
              <Text style={styles.headerText}>{teamData?.name}</Text>
            </View>
            <SizeBox size={5} />
          </View>
          <SizeBox size={10} />
          <FlatList
            data={teamData?.members}
            horizontal
            renderItem={({item, index}) => (
              <ImageBackground
                style={[
                  styles.topImages,
                  {marginRight: index == 3 ? 0 : moderateScale(15)},
                ]}
                source={
                  item?.picture
                    ? {uri: `${IMAGE_URL}${item?.picture}`}
                    : ImagePath.ProfileImg
                }
                borderRadius={10}>
                <Text style={styles.nameTopImg}>{item?.fullName}</Text>
              </ImageBackground>
            )}
            contentContainerStyle={{justifyContent: 'center', width: '100%'}}
          />
          <SizeBox size={10} />
          <Text style={[styles.label, {}]}>Pictures & Videos</Text>
          <SizeBox size={10} />
          <Image source={ImagePath.ProfileImg} style={styles.midImage} />
          <SizeBox size={15} />
          <Text style={styles.label}>Who are we?</Text>
          <SizeBox size={6} />
          <Text style={styles.description}>{teamData?.description}</Text>
          <SizeBox size={5} />
          {/* <View style={styles.loactionContainer}>
            <VectorIcon
              groupName="Ionicons"
              name="location-outline"
              size={18}
              color={Colors.white}
            />
            <Text style={{...commonStyles.font14Bold, marginLeft: 10}}>
              The closest is 2 km away
            </Text>
          </View> */}
          <SizeBox size={10} />
          <Text style={styles.label}>Music Type</Text>
          <SizeBox size={10} />
          <FlatList
            data={teamData?.music_type}
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(20),
            }}
            renderItem={({item}) => {
              if (!item) {
                return null;
              }
              return (
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: Colors.white,
                    padding: 5,
                    backgroundColor: Colors.lightPink,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <SizeBox size={10} />
          <Text style={styles.label}>Event Type</Text>
          <SizeBox size={10} />
          <FlatList
            data={musicStyle}
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(20),
            }}
            renderItem={({item}) => {
              if (!item) {
                return null;
              }
              return (
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: Colors.white,
                    padding: 5,
                    backgroundColor: Colors.lightPink,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item?.name}
                  </Text>
                </View>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <SizeBox size={10} />
          <Text style={styles.label}>Languages</Text>
          <SizeBox size={10} />
          <FlatList
            data={teamData?.language}
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(20),
            }}
            renderItem={({item}) => {
              if (!item) {
                return null;
              }
              return (
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: Colors.white,
                    padding: 5,
                    backgroundColor: Colors.lightPink,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <SizeBox size={40} />
        </ScrollView>
        <View
          style={[
            styles.invw,
            {
              alignSelf: 'center',
              position: 'absolute',
              bottom: moderateScaleVertical(20),
            },
          ]}>
          <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
            <Image source={ImagePath.sent} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBtn}
            onPress={() => disLikeTeamHanlder()}>
            <VectorIcon
              groupName="Entypo"
              name="cross"
              color={Colors.red}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBtn}
            onPress={() => likeTeameHanlder('superlike')}>
            <VectorIcon
              groupName={
                !teamData?.superlike?.isSuperliked
                  ? 'SimpleLineIcons'
                  : 'MaterialCommunityIcons'
              }
              name={'fire'}
              color={Colors.lightPink}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBtn}
            onPress={() => likeTeameHanlder('like')}>
            <VectorIcon
              groupName="Feather"
              name={!teamData?.likeStatus?.like ? 'heart-o' : 'heart'}
              color={Colors.green}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.goBack();
            }}
            style={[styles.bottomBtn, {backgroundColor: '#FF813A'}]}>
            <Image
              source={ImagePath.link_backward}
              style={{height: 40, width: 40}}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GrroupDeatils;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(22),
  },
  headerInnerBox: {
    width: '50%',
    paddingVertical: moderateScaleVertical(6),
    borderWidth: 1,
    borderColor: Colors.lightPink,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    ...commonStyles.font16White,
  },
  label: {
    ...commonStyles.font16White,
    marginLeft: moderateScale(20),
  },
  description: {
    ...commonStyles.font14Regular,
    marginHorizontal: moderateScale(20),
  },
  topImages: {
    width: moderateScale(70),
    height: moderateScaleVertical(90),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    marginRight: moderateScale(15),
  },
  nameTopImg: {
    ...commonStyles.font12Bold,
  },
  midImage: {
    width: width,
    height: height / 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  loactionContainer: {
    paddingLeft: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBtn: {
    height: moderateScaleVertical(40),
    width: moderateScale(40),
    borderRadius: 40,
    backgroundColor: '#252131',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  invw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
