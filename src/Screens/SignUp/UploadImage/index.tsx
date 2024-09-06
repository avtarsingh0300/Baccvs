import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
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

const UploadImage = (props: any) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(props.route.params.data);
  const onBack = () => {
    props.navigation.goBack();
  };

  const onComplete = () => {
    if (selectedImages.length === 0) {
      return showError('Select image!');
    }
    const pictures = selectedImages.map(n => n.uri);

    setLoader(true);
    const formData = {
      full_name: data.full_name,
      email: data.email,
      dob: data.dob,
      username: data.username,
      gender: data.gender,
      bio: data.bio,
      language: data.language,
      password: data.password,
      phone_number: data.phone_number,
      pictures: pictures,
      videos: pictures,
    };

    const formData2 = {
      full_name: data?.fullName,
      email: data?.email,
      dob: data?.date,
      bio: data?.servicesDescription,
      language: data?.language,
      password: data?.password,
      type: data?.selectedProfession,
      business_name: data?.businessName,
      business_address: data?.businessAddress,
      website: data?.websiteOptional,
      social_links: data?.socialMedia,
      social_description: data?.servicesDescription,
      phone_number: data.phoneNumber,
      pictures: pictures,
      videos: pictures,
    };
    registerUser(props.route.params.key === 'profess' ? formData2 : formData)
      .then(res => {
        setLoader(false),
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
      setSelectedImages(prevImages => [
        ...prevImages,
        {id: prevImages.length, uri: image.path},
      ]);
    });
  };

  const removeImg = (id: any) => {
    setSelectedImages(prevImages =>
      prevImages.filter(image => image.id !== id),
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
          keyExtractor={item => item.id.toString()}
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
