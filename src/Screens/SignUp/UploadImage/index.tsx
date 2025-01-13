import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../Utilities/Styles/colors';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import {
  CommonBtn,
  Loadingcomponent,
  ProgressHeader,
  SizeBox,
  showError,
  showSuccess,
} from '../../../Utilities/Component/Helpers';
import VectorIcon from '../../../Utilities/Component/vectorIcons';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';
import ImagePicker from 'react-native-image-crop-picker';
import {registerUser, setDataHandler} from '../../../Utilities/Constants/auth';
import {saveUserData} from '../../../Redux/Action/auth';
import moment from 'moment';
import {getFCMToken} from '../../../Utilities/Helpers';

const UploadImage = (props: any) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(props.route.params.data);

  const onBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    console.log(props.route.params.data, 'props.route.params.data');

    setData(props.route.params.data);
  }, [props.route.params.data]);

  const onComplete = async () => {
    if (selectedImages.length === 0) {
      setLoader(false);
      return showError('Select image!');
    }
    const pictures = selectedImages.map((n: any) => n.uri);

    const fcmToken = await getFCMToken();
    if (!fcmToken) {
      setLoader(false);
      return showError('Unable to retrieve FCM token.');
    }

    const formadata = new FormData();
    formadata.append('full_name', data.full_name);
    formadata.append('email', data.email);
    formadata.append('dob', data.dob);
    formadata.append('username', data.username);
    formadata.append('gender', data.gender);
    formadata.append('bio', data.bio);
    formadata.append('language', data.language);
    formadata.append('password', data.password);
    formadata.append('phone_number', data.phone_number);
    formadata.append('type', 'user');
    formadata.append('dtoken', fcmToken);
    pictures.forEach((image, index) => {
      formadata.append('pictures', {
        uri: image,
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
      });
    });

    pictures.forEach((image, index) => {
      formadata.append('videos', {
        uri: image.path,
        name: `video${image.id}.mp4`,
        type: image?.mime,
      });
    });

    const formadata2 = new FormData();
    formadata2.append('full_name', data.fullName);
    formadata2.append('email', data.email);
    formadata2.append('dob', moment(data.date).format('YYYY-MM-DD'));
    formadata2.append('username', data?.username ? data?.username : '');
    formadata2.append('gender', data.gender);
    formadata2.append('bio', data.bio);
    formadata2.append('language', data.language);
    formadata2.append('password', data.password);
    formadata2.append('phone_number', data.phoneNumber);
    formadata2.append('type', data?.selectedProfession);
    formadata2.append('business_name', data?.businessName);
    formadata2.append('business_address', data?.businessAddress);
    formadata2.append('website', data?.websiteOptional);
    formadata2.append('social_links', data?.socialMedia);
    formadata2.append('social_description', data?.servicesDescription);
    formadata2.append('dtoken', fcmToken);

    pictures.forEach((image, index) => {
      formadata2.append('pictures', {
        uri: image,
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
      });
    });

    pictures.forEach((image, index) => {
      formadata2.append('videos', {
        uri: image.path,
        name: `video${image.id}.mp4`,
        type: image?.mime,
      });
    });

    console.log(props.route.params.key === 'profess' ? formadata2 : formadata);
    setLoader(true);
    registerUser(props.route.params.key === 'profess' ? formadata2 : formadata)
      .then(res => {
        setLoader(false), console.log(res);
        showSuccess('User create successfully!!'),
          props.navigation.navigate(NavigationStrings.TabRoutes);
        setTimeout(() => {
          setDataHandler(res);
          saveUserData(res);
        }, 1000);
      })
      .catch(err => {
        setLoader(false), showError(err?.message);
      });
  };

  const addImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // console.log(image, 'image');
      setSelectedImages((prevImages): any => [
        ...prevImages,
        {id: prevImages.length, uri: image.path},
      ]);
    });
  };

  const removeImg = (id: any) => {
    setSelectedImages(prevImages =>
      prevImages.filter((image: any) => image.id !== id),
    );
  };

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <ProgressHeader onPress={onBack} value={5} />
        <SizeBox size={15} />
        <Text style={{...commonStyles.font18W700Center}}>Add photos</Text>
        <SizeBox size={10} />
        <Text style={styles.imgTxt}>
          Add at least 3 pictures or videos to complete your profile. Any
          profile that doesn’t represent the user can be banned.
        </Text>
        <SizeBox size={10} />
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={selectedImages}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image
                source={{uri: item.uri}}
                style={{width: '100%', height: '100%'}}
              />
              <TouchableOpacity
                onPress={() => removeImg(item.id)}
                style={{position: 'absolute'}}>
                <VectorIcon
                  groupName="AntDesign"
                  name="closecircle"
                  size={20}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item: any) => item.id.toString()}
        />
        <SizeBox size={10} />
        <TouchableOpacity onPress={addImg} style={styles.imageContainer}>
          <LinearGradient
            colors={[Colors.Linear, Colors.lightPink]}
            start={{x: 0.4, y: 1.1}}
            end={{x: 1.3, y: 0.2}}
            style={styles.btnLinear}>
            <VectorIcon groupName="AntDesign" name="plus" size={20} />
          </LinearGradient>
        </TouchableOpacity>
        <SizeBox size={10} />
        <CommonBtn onPress={onComplete} title={'Complete'} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UploadImage;
