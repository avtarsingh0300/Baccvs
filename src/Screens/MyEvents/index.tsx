import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  ImageComponent,
  SizeBox,
  dummydata,
} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import ImagePath from '../../Utilities/Constants/ImagePath';
import fontFamily from '../../Utilities/Styles/fontFamily';

const MyEvents = ({navigation}: any) => {
  const [button, setButton] = useState('Past');
  const handleButton = (value: any) => {
    if (value === 'Past') {
      setButton('Past');
    } else if (value === 'Today') {
      setButton('Today');
    } else if (value === 'Future') {
      setButton('Future');
    }
  };
  const renderItem = () => (
    <View>
      <View style={styles.listContainer}>
        <SizeBox size={5} />
        <View style={styles.buttonGroup}>
          <Text
            style={{
              ...commonStyles.font14Center,
              color: Colors.red,
            }}>
            Ongoing
          </Text>
          <Text
            style={{
              ...commonStyles.font14Center,
            }}>
            Agora
          </Text>
          <Text
            style={{
              ...commonStyles.font14Center,
              color: Colors.red,
            }}>
            Host
          </Text>
        </View>
        <SizeBox size={5} />
        <ImageBackground
          source={ImagePath.ProfileImg}
          borderRadius={5}
          style={styles.backimg}>
          <View style={styles.icon}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="dots-vertical"
              size={25}
            />
          </View>
          <View style={styles.positionVw}>
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
            <View style={styles.priceVw}>
              <ImageComponent
                source={ImagePath.priceTag}
                resizeMode="contain"
                style={{
                  width: moderateScale(15),
                  height: moderateScaleVertical(15),
                }}
              />
              <Text
                style={{
                  ...commonStyles.font14,
                  fontFamily: fontFamily.time_regular,
                  color: Colors.white,
                }}>
                {` `}Free
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={10} />
        <View style={styles.header}>
          <View />
          <Text style={{...commonStyles.Heading20font}}>My Events</Text>
          <VectorIcon
            groupName="Ionicons"
            name="search"
            size={28}
            color={Colors.white}
          />
        </View>
        <SizeBox size={15} />
        <View style={styles.buttonGroup}>
          <View>
            <Text
              onPress={() => handleButton('Past')}
              style={{
                ...commonStyles.font14Center,
                color: button === 'Past' ? Colors.green : Colors.white,
              }}>
              Past
            </Text>
            <View style={styles.reddot}>
              <Text style={styles.dottxt}>99+</Text>
            </View>
          </View>
          <Text
            onPress={() => handleButton('Today')}
            style={{
              ...commonStyles.font14Center,
              color: button === 'Today' ? Colors.green : Colors.white,
            }}>
            Today
          </Text>
          <Text
            onPress={() => handleButton('Future')}
            style={{
              ...commonStyles.font14Center,
              color: button === 'Future' ? Colors.green : Colors.white,
            }}>
            Future
          </Text>
        </View>
        <SizeBox size={15} />
        <View style={styles.border} />
        <SizeBox size={15} />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            width: width,
            alignSelf: 'center',
          }}
          data={dummydata?.slice(0, 1)}
          renderItem={renderItem}
        />
        <SizeBox size={15} />
      </SafeAreaView>
    </LinearGradient>
  );
};
export default MyEvents;
