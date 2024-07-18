import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import { styles } from './style';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import FastImage from 'react-native-fast-image';
import { ImageComponent, dummydata } from '../../Utilities/Component/Helpers';
import Modal from 'react-native-modal';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import { getUserProfile } from '../../Utilities/Constants/auth';

const UserProfile = ({ navigation }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({})

  const imageArrya = [
    ImagePath.ProfileImg,
    ImagePath.ProfileImg,
    ImagePath.ProfileImg,
    ImagePath.ProfileImg,
    ImagePath.ProfileImg,
    ImagePath.ProfileImg,
  ];
  const onSocialpart = () => {
    setShowModal(false);
    navigation.navigate(NavigationStrings.SocialPart);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    getUserProfile().then(res => {
      console.log(res, "res in getUserProfile");
      setUserData(res);
    }).catch(err => {
      console.log(err, "err in getUserProfile");
    })
  };

  const renderItem = ({ item, index }) => (
    <View>
      <View style={styles.listContainer}>
        <ImageBackground
          source={{ uri: item }}
          borderRadius={5}
          style={styles.backimg}>
          <View style={styles.flexinner}>
            <ImageComponent
              source={ImagePath.ProfileImg}
              style={styles.shortimg}
            />
            <ImageComponent
              source={ImagePath.ProfileImg}
              style={[
                styles.extraimg,
                {
                  marginLeft: 5,
                },
              ]}
            />
            <ImageComponent
              source={ImagePath.ProfileImg}
              style={[
                styles.extraimg,
                {
                  right: 10,
                },
              ]}
            />
            <Text
              style={{
                ...commonStyles.font16Regular,
                alignSelf: 'flex-end',
                color: Colors.white,
              }}>
              +8
            </Text>
          </View>
        </ImageBackground>
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <View style={styles.music}>
            <Text style={styles.musictxt}>Progressive</Text>
          </View>
          <View style={styles.music}>
            <Text style={styles.musictxt}>Progressive</Text>
          </View>
          <View style={styles.music}>
            <Text style={styles.musictxt}>Progressive</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.9 }}
      style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={{ width: '10%' }} />
            <Text style={{ ...commonStyles.Heading20font, color: Colors.Pink }}>
              {userData?.full_name?.charAt(0).toUpperCase() + userData?.full_name?.slice(1)}
            </Text>
            <VectorIcon
              groupName="Entypo"
              name="dots-three-horizontal"
              size={30}
              color={Colors.white}
              onPress={() => setShowModal(true)}
            />
          </View>
          <Image source={ImagePath.ProfileImg} style={styles.profileImage} />
          <View style={styles.followInfoContainer}>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Events</Text>
              <Text style={[styles.followText, { color: Colors.white }]}>{userData?.event_count}</Text>
            </View>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Followers</Text>
              <Text style={[styles.followText, { color: Colors.white }]}>
                {userData?.followers}
              </Text>
            </View>
            <View style={styles.followInner}>
              <Text style={styles.followText}>Following</Text>
              <Text style={[styles.followText, { color: Colors.white }]}>
                {userData?.following}
              </Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {userData?.bio}
            </Text>
          </View>
          <View style={styles.row}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="cupcake"
              size={20}
              color={Colors.Pink}
            />
            <Text style={styles.rowText}>{userData?.age}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: '#7D67EE',
              }}
            />
            <Image source={ImagePath.line_height} />
            <Text style={styles.rowText}>{userData?.height}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: '#7D67EE',
              }}
            />
            <VectorIcon
              groupName="SimpleLineIcons"
              name="location-pin"
              size={20}
              color={Colors.Pink}
            />
            <Text style={styles.rowText}>Eiffel Tower</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: '#7D67EE',
              }}
            />
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="zodiac-leo"
              size={20}
              color={Colors.Pink}
            />
            <Text style={styles.rowText}>{userData?.zodiac_sign}</Text>
            <View
              style={{
                height: moderateScaleVertical(25),
                paddingHorizontal: 0.5,
                backgroundColor: '#7D67EE',
              }}
            />
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="glass-cocktail"
              size={20}
              color={Colors.Pink}
            />
          </View>
          <View style={styles.postContainer}>
            {userData?.thumbnail_urls?.map((i, index) => (
              <FastImage source={{ uri: i }} key={index} style={styles.postImage} />
            ))}
          </View>
          <View style={styles.row}>
            <View style={{ width: '10%' }} />
            <Text style={{ ...commonStyles.font16White }}>See more</Text>
            <VectorIcon
              groupName="Feather"
              name="edit"
              color={Colors.white}
              size={22}
            />
          </View>
          <Text
            style={{
              ...commonStyles.font13,
              fontWeight: '700',
              marginLeft: moderateScale(31),
            }}>
            Past events (1/11)
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              width: width,
              alignSelf: 'center',
            }}
            data={userData?.video_urls}
            renderItem={renderItem}
          />
        </ScrollView>
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() => setShowModal(false)}
          avoidKeyboard={true}
          style={{ flex: 1, margin: 0, justifyContent: 'flex-start' }}
          isVisible={showModal}
          backdropOpacity={0.2}>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.option}
              onPress={() => {
                navigation.navigate(NavigationStrings.EditProfile);
                setShowModal(false);
              }}>
              <Text style={styles.optionText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSocialpart}
              activeOpacity={0.8}
              style={styles.option}>
              <Text style={styles.optionText}>Edit Social part</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.option, { borderBottomWidth: 0 }]}>
              <Text style={styles.optionText}>Turn profile to public</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UserProfile;
