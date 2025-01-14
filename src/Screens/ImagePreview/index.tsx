// ImagePreview;
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  moderateScaleVertical,
  moderateScale,
  textScale,
  height,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {Colors} from '../../Utilities/Styles/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import fontFamily from '../../Utilities/Styles/fontFamily';
import LinearGradient from 'react-native-linear-gradient';
import {
  getMemberDetails,
  getUserMediaDetails,
  likeUserPhoto,
} from '../../Utilities/Constants/auth';

const ImagePreview = ({navigation, route}: any) => {
  const routeData = route?.params;
  const refComRBSheet: any = useRef();
  const [commentvalue, setCommentValue] = useState('');
  const [commentid, setCommentId] = useState('');
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    getUserMediaData();
  }, []);

  const getUserMediaData = () => {
    console.log(routeData?.image?.id, 'routeData?.image?.id22');
    const formData = {
      mediaId: routeData?.image?.id,
    };
    // console.log(formData, 'formData');
    getUserMediaDetails(formData)
      .then(res => {
        console.log(res, 'res in getUserMediaDetails');
      })
      .catch(err => {
        console.log(err, 'err in getUserMediaDetails');
      });
  };

  const likeUserHandler = () => {
    const formData = {
      mediaId: routeData?.image?.id,
    };
    // console.log(formData, 'formData');
    likeUserPhoto(formData)
      .then(res => {
        console.log(res, 'res in likeUserPhoto');
      })
      .catch(err => {
        console.log(err, 'err in likeUserPhoto');
      });
  };

  const getUserData = async () => {
    setLoader(true);
    const data = {
      id: routeData?.id,
    };

    getMemberDetails(data)
      .then((res: any) => {
        setLoader(false);
        setUserData(res?.user);
        console.log(res);
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err in getMemberDetails');
      });
  };

  const comItem = ({item, index}: any) => (
    <View style={styles.itemContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {item?.user?.image ? (
          <Image
            source={{uri: IMAGE_URL + item?.user?.image}}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              borderColor: Colors.Pink,
              width: 40,
              height: 47,
            }}
          />
        ) : (
          <Image
            source={ImagePath.followProfile}
            style={{borderWidth: 1, borderRadius: 8, borderColor: Colors.Pink}}
          />
        )}
        <View>
          <Text style={[styles.distanceText, {marginLeft: 10, fontSize: 12}]}>
            {item?.user?.name}
          </Text>
          <Text
            numberOfLines={2}
            style={[styles.cmttxt, {marginLeft: 10, width: width / 1.9}]}>
            {item?.description}
          </Text>
        </View>
      </View>
      {/* {item?.userId === user?.user?.id && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <VectorIcon
            groupName="Octicons"
            name="pencil"
            size={15}
            color={Colors.white}
            style={{marginHorizontal: 15}}
            // onPress={() => onEditPress(item)}
          />

          <VectorIcon
            groupName="MaterialCommunityIcons"
            name="delete"
            size={20}
            // onPress={() => onDeletePress(item?.id)}
          />
        </View>
      )} */}
    </View>
  );

  console.log(routeData?.image?.id, 'routeData?.image');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{padding: 7}}
          onPress={() => navigation.goBack()}>
          <Image source={ImagePath.Arrow_Left_2} />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={{...commonStyles.font12Regular}}>
            {routeData?.data?.username}
          </Text>
          <SizeBox size={2} />
          {routeData?.data?.pictures?.length > 0 && (
            <Image
              style={styles.smallIcon}
              source={{uri: IMAGE_URL + routeData?.data?.pictures[0]?.url}}
            />
          )}
        </View>
        <VectorIcon
          groupName="Entypo"
          name="dots-three-horizontal"
          size={30}
          color={Colors.white}
        />
      </View>
      <ImageBackground
        style={{flex: 1}}
        source={{uri: IMAGE_URL + routeData?.image?.url}}>
        <View style={styles.likeConatiner}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text style={styles.likeText}>190 Likes </Text>
            <VectorIcon
              groupName="FontAwesome"
              //   name={!item?.isLiked ? 'heart-o' : 'heart'}
              name={'heart-o'}
              color={Colors.green}
              size={24}
            />
          </View>
          <SizeBox size={10} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text style={styles.likeText}>23 Comments </Text>
            <VectorIcon
              groupName="AntDesign"
              name="message1"
              color={Colors.white}
              size={24}
              onPress={() => {
                refComRBSheet.current.open();
              }}
            />
          </View>
        </View>
      </ImageBackground>
      <RBSheet
        ref={refComRBSheet}
        closeOnPressMask={true}
        height={height / 1.7}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            width: '90%',
            bottom: height / 30,
            alignSelf: 'center',
          },
          container: {
            borderRadius: 10,
          },
        }}>
        <LinearGradient
          colors={[Colors.backgroundNew, Colors.backgroundNew]}
          start={{x: 0, y: 0}}
          end={{x: 1.3, y: 0.9}}
          style={styles.sheetContent}>
          <VectorIcon
            groupName="Fontisto"
            name="close-a"
            size={15}
            color={Colors.white}
            style={{alignSelf: 'flex-end', top: 10, right: 10}}
            onPress={() => refComRBSheet.current.close()}
          />
          <Text
            style={[
              styles.timeText,
              {
                fontSize: textScale(16),
                textAlign: 'center',
                marginTop: 10,
              },
            ]}>
            Comments
          </Text>
          {/* <FlatList
            data={eventData?.comments}
            keyExtractor={item => item?.id?.toString()}
            renderItem={comItem}
          /> */}
          <SizeBox size={10} />
          <View
            style={{
              backgroundColor: Colors.white,
              width: '90%',
              minHeight: 40,
              alignSelf: 'center',
              borderRadius: 5,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Type here"
              multiline
              value={commentvalue}
              onChangeText={(text: string) => {
                setCommentValue(text);
                text.length == 0 && setCommentId('');
              }}
              style={{
                width: '90%',
                paddingVertical: 5,
                color: Colors.black,
                fontFamily: fontFamily.regular,
              }}
            />
            <VectorIcon
              groupName="Ionicons"
              name="send-outline"
              //   onPress={onSendComments}
              size={20}
              color={Colors.lightPink}
            />
          </View>
          <SizeBox size={5} />
        </LinearGradient>
      </RBSheet>
    </View>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingVertical: moderateScaleVertical(20),
    paddingHorizontal: moderateScale(20),
    backgroundColor: '#000D1A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallIcon: {
    width: moderateScale(38),
    height: moderateScaleVertical(50),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Pink,
  },
  likeText: {
    ...commonStyles.font10Regular,
    fontWeight: '600',
    color: Colors.white,
  },
  likeConatiner: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: moderateScaleVertical(40),
    right: moderateScale(15),
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(5),
    alignItems: 'center',
  },
  cmtinpt: {
    padding: 8,
    borderRadius: 25,
    borderWidth: 1,
    width: '80%',
    marginLeft: moderateScale(15),
    backgroundColor: Colors.lightPink,
    opacity: 0.9,
    color: Colors.white,
    fontSize: textScale(10),
    fontFamily: fontFamily.regular,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: moderateScaleVertical(30),
  },
  cmttxt: {
    fontSize: textScale(12),
    fontFamily: fontFamily.time_regular,
    color: Colors.white,
  },
  sheetContent: {
    height: '100%',
    width: '100%',
  },
  timeText: {
    ...commonStyles.font12Bold,
  },
  distanceText: {
    ...commonStyles.font14,
    color: Colors.white,
    fontFamily: fontFamily.regular,
    fontWeight: '700',
  },
});
