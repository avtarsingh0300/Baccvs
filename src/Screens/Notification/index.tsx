import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  ImageComponent,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {textScale, width} from '../../Utilities/Styles/responsiveSize';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {getNotification} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const Notification = () => {
  const [loading, setLoader] = useState(false);
  const [dataNoti, setDataNoti] = useState([]);
  useEffect(() => {
    getNoti();
  }, []);
  const getNoti = () => {
    setLoader(true);
    getNotification()
      .then(res => {
        setLoader(false);
        setDataNoti(res?.data);
      })
      .catch(err => {
        setLoader(false);
        showError(err.message);
        console.log(err);
      });
  };
  const renderItem = ({item}: any) => (
    <View style={styles.flatcon}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {item?.image ? (
          <ImageComponent
            source={{uri: IMAGE_URL + item.image}}
            style={styles.userImg}
          />
        ) : (
          <ImageComponent
            source={ImagePath.ProfileImg}
            style={styles.userImg}
          />
        )}
        <View>
          <Text
            style={{
              ...commonStyles.font10Bold,
              color: Colors.white,
              paddingLeft: 15,
              width: width / 1.5,
            }}>
            {item?.subject}
            <Text
              style={{
                fontSize: textScale(9),

                fontFamily: fontFamily.time_regular,
              }}>
              {` `}
              {item?.message}
            </Text>
          </Text>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.follbtn}>
        <Text
          style={{
            ...commonStyles.font10Bold,
            color: Colors.white,
          }}>
          Follow back
        </Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loading} />
        <SizeBox size={5} />
        <Text style={{...commonStyles.Heading20font}}>Notifications</Text>
        <SizeBox size={10} />
        <View style={{flexDirection: 'row'}}>
          {dataNoti[0]?.image ? (
            <ImageComponent
              source={{uri: IMAGE_URL + dataNoti[0]?.image}}
              style={styles.userImg}
            />
          ) : (
            <ImageComponent
              source={ImagePath.ProfileImg}
              style={styles.userImg}
            />
          )}
          <View>
            <Text
              style={{
                ...commonStyles.font10Regular,
                color: Colors.white,
                paddingLeft: 15,
              }}>
              {dataNoti[0]?.subject}
            </Text>
            <Text style={styles.numreq}>
              {' '}
              {dataNoti[0]?.subject} {dataNoti.length}
            </Text>
          </View>
        </View>
        <SizeBox size={10} />
        <View style={styles.border} />
        <FlatList
          data={dataNoti}
          renderItem={renderItem}
          keyExtractor={(item, index) => index?.toString()}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Notification;
