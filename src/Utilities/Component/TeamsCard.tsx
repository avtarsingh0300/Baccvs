import React from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../Styles/responsiveSize';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../Styles/colors';
import {IMAGE_URL} from '../Constants/Urls';
import ImagePath from '../Constants/ImagePath';
import NavigationStrings from '../Constants/NavigationStrings';
import VectorIcon from './vectorIcons';
import commonStyles from '../Styles/commonStyles';
import {SizeBox} from './Helpers';

interface TeamsCardCardProps {
  index: number;
  disLikeUserProfileHanlder: (item: object) => void;
  likeUserProfileHanlder: (type: string, item: object) => void;
  swipe: Animated.ValueXY;
  [key: string]: any; // To handle any additional props
  item: any;
  isFirst: boolean;
}

const TeamsCard: React.FC<TeamsCardCardProps> = ({
  index,
  swipe,
  item,
  isFirst,
  disLikeUserProfileHanlder,
  likeUserProfileHanlder,
  ...rest
}) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  const navigation = useNavigation();

  // console.log(item, 'item');
  if (item?.status == 0) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {zIndex: 100},
        isFirst && {transform: [...swipe.getTranslateTransform(), {rotate}]},
      ]}
      {...rest}>
      <ImageBackground
        source={ImagePath.Rectangle_new}
        style={styles.nameHeader}
        resizeMode="contain">
        <Text style={{...commonStyles.font12Bold, color: Colors.white}}>
          {item?.name}
        </Text>
      </ImageBackground>
      {item?.members?.length > 2 ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: height / 3,
            width: width,
          }}>
          {item?.members?.map((i: any) => (
            <ImageBackground
              borderRadius={10}
              source={
                i?.picture
                  ? {uri: IMAGE_URL + i?.picture}
                  : ImagePath.ProfileImg
              }
              style={styles.imgbck}>
              <Text
                style={{
                  ...commonStyles.font12Bold,
                  color: Colors.white,
                  fontWeight: '600',
                  margin: 10,
                }}>
                {i?.fullName}
              </Text>
            </ImageBackground>
          ))}
        </View>
      ) : (
        <View
          style={{
            width: width,
          }}>
          {item?.members?.map((i: any) => (
            <ImageBackground
              borderRadius={10}
              source={{uri: IMAGE_URL + i?.picture}}
              style={{
                width: width / 1.05,
                height: moderateScaleVertical(200),
                marginTop: moderateScaleVertical(10),
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  ...commonStyles.font12Bold,
                  color: Colors.white,
                  fontWeight: '600',
                  margin: 10,
                  position: 'absolute',
                  bottom: moderateScaleVertical(10),
                }}>
                {i?.fullName}
              </Text>
            </ImageBackground>
          ))}
        </View>
      )}
      <SizeBox size={15} />
      <View
        style={[
          styles.invw,
          {
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
          },
        ]}>
        <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
          <Image source={ImagePath.sent} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.bottomBtn}
          onPress={() => disLikeUserProfileHanlder(item)}>
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
          onPress={() => likeUserProfileHanlder('superlike', item)}>
          <VectorIcon
            groupName={
              !item?.superlike?.isSuperliked
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
          onPress={() => likeUserProfileHanlder('like', item)}>
          <VectorIcon
            groupName="FontAwesome"
            name={!item?.likeStatus?.like ? 'heart-o' : 'heart'}
            color={Colors.green}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate(NavigationStrings.GrroupDeatils, {
              data: item,
            });
          }}
          style={[styles.bottomBtn, {backgroundColor: Colors.tranparent}]}>
          <Image
            source={ImagePath.openSheet}
            style={{height: 40, width: 40}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default TeamsCard;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 1.4,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: Colors.backgroundNew,
  },
  nameHeader: {
    height: moderateScaleVertical(30),
    width: moderateScale(258),
    marginBottom: moderateScaleVertical(10),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundNew,
  },
  imgbck: {
    width: moderateScale(140),
    height: moderateScaleVertical(190),
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScaleVertical(10),
  },
  bottomBtn: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#252131',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  bar: {
    width: 59,
    height: 1,
    marginRight: 10,
  },
  invw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
