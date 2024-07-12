import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  ImageComponent,
  SizeBox,
  dummydata,
} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {textScale} from '../../Utilities/Styles/responsiveSize';
import fontFamily from '../../Utilities/Styles/fontFamily';

const Notification = () => {
  const renderItem = () => (
    <View style={styles.flatcon}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <ImageComponent source={ImagePath.ProfileImg} style={styles.userImg} />
        <View>
          <Text
            style={{
              ...commonStyles.font10Bold,
              color: Colors.white,
              paddingLeft: 15,
            }}>
            BonnieD
            <Text
              style={{
                fontSize: textScale(9),
                fontFamily: fontFamily.time_regular,
              }}>
              {` `}started following you.
            </Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.follbtn}>
        <Text
          style={{
            ...commonStyles.font10Bold,
            color: Colors.white,
          }}>
          Follow back
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={5} />

        <Text style={{...commonStyles.Heading20font}}>Notifications</Text>
        <SizeBox size={10} />
        <View style={{flexDirection: 'row'}}>
          <ImageComponent
            source={ImagePath.ProfileImg}
            style={styles.userImg}
          />
          <View>
            <Text
              style={{
                ...commonStyles.font10Regular,
                color: Colors.white,
                paddingLeft: 15,
              }}>
              Follow requests
            </Text>
            <Text style={styles.numreq}>Sonikm +91 others</Text>
          </View>
        </View>
        <SizeBox size={10} />
        <View style={styles.border} />
        <FlatList data={dummydata} renderItem={renderItem} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Notification;
