import React, {useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
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

interface MeetPeopleCardProps {
  index: number;
  disLikeUserProfileHanlder: () => void;
  likeUserProfileHanlder: (type: string) => void;
  swipe: Animated.ValueXY;
  [key: string]: any; // To handle any additional props
  item: object;
  isFirst: boolean;
}

const MeetPeopleCard: React.FC<MeetPeopleCardProps> = ({
  index,
  // setImageIndex,
  swipe,
  item,
  isFirst,
  disLikeUserProfileHanlder,
  likeUserProfileHanlder,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  const navigation = useNavigation();

  // console.log(item, 'item');

  return (
    <Animated.View
      style={[
        styles.container,
        {zIndex: 100},
        isFirst && {transform: [...swipe.getTranslateTransform(), {rotate}]},
        // {transform: [...swipe.getTranslateTransform(), {rotate}]},
      ]}
      {...rest}>
      <Swiper
        // showsButtons
        loop={true}
        autoplay
        // autoplayDirection={true}
        autoplayTimeout={2000}
        // scrollEnabled={false}
        height={height / 1.4}
        width={width * 0.9}
        style={{borderRadius: 10}}
        containerStyle={{borderRadius: 10}}
        contentContainerStyle={{borderRadius: 10}}
        index={activeIndex}
        onIndexChanged={index => setActiveIndex(index)}>
        {item?.pictures?.map((i, ind) => (
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => {
            //   navigation.navigate(NavigationStrings.DatingUserProfile, {
            //     id: item?._id,
            //   });
            // }}
            >
            <ImageBackground
              borderRadius={10}
              source={{uri: IMAGE_URL + i}}
              // source={ImagePath.ProfileImg}
              style={{
                width: '100%',
                height: height / 1.4,
                alignSelf: 'center',
                // marginBottom: 20,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginTop: moderateScaleVertical(20),
                }}>
                {item?.pictures?.map((i, ind) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{paddingVertical: 5}}
                    onPress={() => setActiveIndex(ind)}>
                    <View
                      style={{
                        ...styles.bar,
                        backgroundColor:
                          activeIndex === ind ? Colors.Pink : Colors.white,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text
                style={{
                  ...commonStyles.font14,
                  color: Colors.white,
                  fontWeight: '600',
                  paddingHorizontal: 23,
                  paddingVertical: 20,
                }}>
                {item?.username}, {item?.age}
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
                <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
                  <Image source={ImagePath.sent} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.bottomBtn}
                  onPress={() => disLikeUserProfileHanlder()}>
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
                  onPress={() => likeUserProfileHanlder('superlike')}>
                  <VectorIcon
                    groupName={
                      !item?.isSuperliked
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
                  onPress={() => likeUserProfileHanlder('like')}>
                  <VectorIcon
                    groupName="FontAwesome"
                    name={!item?.isLiked ? 'heart-o' : 'heart'}
                    color={Colors.green}
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate(NavigationStrings.DatingUserProfile, {
                      id: item?._id,
                    });
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
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </Swiper>
    </Animated.View>
  );
};

export default MeetPeopleCard;

const styles = StyleSheet.create({
  btn: {
    width: moderateScale(58),
    height: moderateScaleVertical(58),
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: '#FF4242',
    justifyContent: 'center',
    zIndex: 200,
  },
  container: {
    width: width,
    height: height < 800 ? height / 1.1 : height / 1.06,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
