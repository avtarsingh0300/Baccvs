import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  CommonBtn,
  Header,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {getBlockedUser, unBlockUser} from '../../Utilities/Constants/auth';
import {useSelector} from 'react-redux';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const BlockAccount = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const [blockedlist, setBlockedlist] = useState([]);
  const userid = useSelector((data: object) => data?.auth?.userData?.user?.id);
  const onbackPress = () => {
    navigation.goBack();
  };
  useEffect(() => {
    getBlockedUserList();
  }, []);

  const getBlockedUserList = () => {
    setLoader(true);
    getBlockedUser(userid)
      .then(res => {
        setLoader(false);
        setBlockedlist(res?.blockedUsers);
      })
      .catch(err => {
        showError(err?.message);
        setLoader(false);
        console.log(err);
      });
  };
  const onBlockuser = (id: string) => {
    const data = {
      userId: userid,
      unblockUserId: id,
    };
    unBlockUser(data)
      .then(res => {
        getBlockedUserList();
      })
      .catch(err => {
        showError(err?.message);
        setLoader(false);
        console.log(err);
      });
  };
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <Header title="Blocked Accounts" onPress={onbackPress} />
        <SizeBox size={15} />
        {blockedlist?.length > 0 ? (
          <FlatList
            data={blockedlist}
            renderItem={({item}) => (
              <View style={styles.flatvw}>
                <View style={styles.innervw}>
                  {item?.image_url ? (
                    <Image
                      source={{uri: IMAGE_URL + item?.image_url}}
                      style={{
                        borderRadius: 5,
                        width: moderateScale(52),
                        height: moderateScaleVertical(62),
                      }}
                    />
                  ) : (
                    <Image
                      source={ImagePath.ProfileImg}
                      style={{
                        borderRadius: 5,
                        width: moderateScale(52),
                        height: moderateScaleVertical(62),
                      }}
                    />
                  )}
                  <Text
                    style={{
                      ...commonStyles.font16Regular,
                      color: Colors.white,
                      paddingLeft: 8,
                    }}>
                    {item?.username}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => onBlockuser(item?.id)}>
                  <LinearGradient
                    colors={[Colors.LinearBlack, Colors.Pink]}
                    style={styles.btn}>
                    <Text
                      style={{
                        ...commonStyles.font12Regular,
                        color: Colors.white,
                      }}>
                      Unblock
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              ...commonStyles.font16Regular,
              color: Colors.white,
              paddingLeft: 8,
            }}>
            No blocked account...
          </Text>
        )}
        <SizeBox size={20} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BlockAccount;
