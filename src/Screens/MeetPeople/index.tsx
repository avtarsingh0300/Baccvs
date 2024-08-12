import {View, Text, FlatList, ImageBackground, Image} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {SizeBox} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import {TouchableWithoutFeedback} from 'react-native';
import {height, width} from '../../Utilities/Styles/responsiveSize';

const MeetPeople = () => {
  const [button, setButton] = useState('online');
  const [currentImage, setCurrentImage] = useState(ImagePath.ProfileImg);
  const swiper = useRef(null);

  const images = [
    {src: ImagePath.ProfileImg},
    {src: ImagePath.ProfileImg},
    {src: ImagePath.ProfileImg},
    {src: ImagePath.ProfileImg},
    {src: ImagePath.ProfileImg},
    {src: ImagePath.ProfileImg},
    {src: ImagePath.ProfileImg},
    {src: ImagePath.ProfileImg},

    // Add more images as needed
  ];
  const flatListRef = useRef();

  const handleScrollEnd = event => {
    // Get the offsetX position
    const offsetX = event.nativeEvent.contentOffset.x;

    // Calculate the width of each item including margin
    const itemWidth = width * 0.2 + 10;

    // Calculate the index of the item closest to the center
    const index = Math.round(offsetX / itemWidth);

    // Ensure the index stays within the bounds of the images array
    const validIndex = Math.min(Math.max(index, 0), images.length - 1);

    // Set the current image based on the valid index
    setCurrentImage(images[validIndex].src);
  };
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
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
              groupName="FontAwesome6"
              name="sliders"
              size={20}
              color={Colors.white}
            />
            <VectorIcon
              groupName="Feather"
              name="menu"
              size={25}
              color={Colors.white}
              style={{paddingLeft: 10}}
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
            data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}
            style={{alignSelf: 'center', marginBottom: 100}}
            renderItem={({}) => (
              <ImageBackground
                borderRadius={10}
                source={ImagePath.ProfileImg}
                style={styles.imgbck}>
                <Text
                  style={{
                    ...commonStyles.font14,
                    color: Colors.white,
                    fontWeight: '600',
                    padding: 10,
                  }}>
                  Kingson
                </Text>
              </ImageBackground>
            )}
            numColumns={2}
          />
        ) : (
          <>
            {currentImage && (
              <ImageBackground
                borderRadius={10}
                source={currentImage}
                style={{
                  width: width * 0.8,
                  height: height / 1.7,
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
                  Kingson, 24
                </Text>
              </ImageBackground>
            )}

            <View style={styles.main}>
              <View style={styles.fire}>
                <VectorIcon
                  groupName="Entypo"
                  name="cross"
                  size={30}
                  color={Colors.red}
                />
              </View>
              <View style={styles.heart}>
                <VectorIcon
                  groupName="Fontisto"
                  name="heart-alt"
                  size={28}
                  color={Colors.green}
                />
              </View>

              <View style={styles.fire}>
                <VectorIcon
                  groupName="MaterialCommunityIcons"
                  name="fire"
                  size={29}
                  color={Colors.Linear}
                />
              </View>
            </View>
            <SizeBox size={8} />
            <FlatList
              data={images}
              horizontal
              ref={flatListRef}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableWithoutFeedback
                  onPress={() => setCurrentImage(item.src)}>
                  <Image
                    source={item.src}
                    style={{
                      width: 51,
                      height: 67,
                      marginLeft: 10,
                      borderRadius: 10,
                    }}
                  />
                </TouchableWithoutFeedback>
              )}
              onMomentumScrollEnd={handleScrollEnd}
              snapToInterval={width * 0.2 + 10}
              decelerationRate="fast"
            />
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MeetPeople;
