import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {Loadingcomponent, SizeBox} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../Utilities/Styles/responsiveSize';
import ImagePath from '../../Utilities/Constants/ImagePath';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {getMemberDetails, getUserProfile} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';

const index = ({navigation, route}: any) => {
  const [otherUserData, setOtherUserData] = useState<any>({});
  const [userData, setUserData] = useState<any>({});
  const [loader, setLoader] = useState(false);
  //   console.log(route?.params, 'route');

  useEffect(() => {
    setLoader(true);
    getUserDataHandler();
  }, []);

  const getUserDataHandler = () => {
    const formData = {
      id: route?.params?.data,
    };
    getMemberDetails(formData)
      .then((res: any) => {
        // console.log(res, 'res in getMemberDetails');
        setOtherUserData(res?.user);
        getUserData();
      })
      .catch((err: any) => {
        setLoader(false);
        console.log(err, 'err in getMemberDetails');
      });
  };

  const getUserData = async () => {
    getUserProfile()
      .then(res => {
        setLoader(false);
        // console.log(res, 'res in getUserProfile');
        setUserData(res?.user);
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err in getUserProfile');
      });
  };

  console.log(otherUserData, 'otherUserData');

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={{flex: 1, paddingHorizontal: 20}}>
      <Loadingcomponent isVisible={loader} />
      <SizeBox size={20} />
      <Text style={styles.congratulationsText}>Congratulations !</Text>
      <SizeBox size={10} />
      <Text style={styles.congratulationsText}>You matched !</Text>
      <SizeBox size={30} />
      <Text style={styles.likeText}>
        You and {otherUserData?.username} have liked each other.
      </Text>
      <SizeBox size={30} />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image
          source={
            userData?.pictures?.length > 0
              ? {uri: IMAGE_URL + userData?.pictures[0]}
              : ImagePath.ProfileImg
          }
          style={styles.img}
        />
        <Image
          source={ImagePath.fire}
          tintColor={Colors.Pink}
          style={{width: 40, height: 40}}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.img, {borderWidth: 0}]}
          onPress={() => {
            navigation.navigate(NavigationStrings.DatingUserProfile, {
              id: otherUserData?.id,
            });
          }}>
          <Image
            source={
              otherUserData?.pictures?.length > 0
                ? {uri: IMAGE_URL + otherUserData?.pictures[0]}
                : ImagePath.ProfileImg
            }
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
      <SizeBox size={50} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.btn, {borderColor: Colors.Pink}]}>
        <Text style={[styles.btnText, {color: Colors.Pink}]}>Chat now</Text>
      </TouchableOpacity>
      <SizeBox size={20} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.btn]}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={[styles.btnText]}>Keep swiping</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default index;

const styles = StyleSheet.create({
  congratulationsText: {
    ...commonStyles.font10Bold,
    color: Colors.Pink,
    fontSize: textScale(38),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  likeText: {
    ...commonStyles.font16WhiteBold,
    textAlign: 'center',
  },
  img: {
    width: moderateScale(103),
    height: moderateScaleVertical(138),
    borderWidth: 1,
    borderColor: Colors.Pink,
    borderRadius: 10,
  },
  btn: {
    width: '85%',
    paddingVertical: moderateScaleVertical(12),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
  },
  btnText: {
    ...commonStyles.font20White,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    textAlign: 'center',
  },
});
