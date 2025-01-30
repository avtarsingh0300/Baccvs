import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {moderateScale, moderateScaleVertical} from '../Styles/responsiveSize';
import {Image} from 'react-native';
import ImagePath from '../Constants/ImagePath';
import commonStyles from '../Styles/commonStyles';
import {Colors} from '../Styles/colors';
import {IMAGE_URL} from '../Constants/Urls';
import VectorIcon from './vectorIcons';
import {SizeBox} from './Helpers';

const ProfileImagePreview = ({showModal, setShowModal, data, image}: any) => {

  console.log(data, 'SSS');
  
  return (
    <Modal
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationIn="slideInUp"
      animationOut="slideOutLeft"
      onBackdropPress={() => setShowModal(false)}
      avoidKeyboard={true}
      style={{flex: 1, margin: 0, justifyContent: 'flex-start'}}
      isVisible={showModal}
      backdropOpacity={1}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{padding: 7}}
            onPress={() => setShowModal(false)}>
            <Image source={ImagePath.Arrow_Left_2} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={{...commonStyles.font12Regular}}>
              {data?.username}
            </Text>
            <SizeBox size={2} />
            {data?.pictures?.length > 0 && (
              <Image
                style={styles.smallIcon}
                source={{uri: IMAGE_URL + data?.pictures[0]?.url}}
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
        <ImageBackground style={{flex: 1}} source={{uri: IMAGE_URL + image}}>
          <View style={styles.likeConatiner}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text style={styles.likeText}>190 Likes </Text>
              <Image source={ImagePath.likes} style={{width: 24, height: 24}} />
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
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default ProfileImagePreview;

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
});
