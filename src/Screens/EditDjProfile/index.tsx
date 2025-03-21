import {
    SafeAreaView,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {Colors} from '../../Utilities/Styles/colors';
  import LinearGradient from 'react-native-linear-gradient';
  import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
  import {styles} from './style';
  import {
    CommonInput,
    Header,
    Loadingcomponent,
    SizeBox,
    showError,
    showSuccess,
  } from '../../Utilities/Component/Helpers';
  
  import VectorIcon from '../../Utilities/Component/vectorIcons';
  import ImagePath from '../../Utilities/Constants/ImagePath';
  import {
    getEventTypes,
    getUserProfile,
    UpdateUserProfile,
  } from '../../Utilities/Constants/auth';
  
  import ImagePicker from 'react-native-image-crop-picker';
  import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import commonStyles from '../../Utilities/Styles/commonStyles';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
  
  const EditDjProfile = ({navigation}: any) => {
    const [userBio, setUserBio] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [job, setJob] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<object>({});
    const [zodiacsign, setZodiacsign] = useState('');
  
    const [musicStyle, setMusicStyle] = useState([]);
    const [selMusic, setSelMusic] = useState([]);
  
    const [eventType, setEventType] = useState([]);
    const [selEventType, setsSelEventType] = useState([]);
  
    const [profileimg, setProfileImg] = useState('');
    const [drinkingsel, setDrinkingsel] = useState('');
    const [smokingsel, setSmokingsel] = useState('');
    const [languagesel, setLanguagesel] = useState('');
    const [pictures, setPictures] = useState([]);
    const onBack = () => {
      navigation.goBack();
    };

    const onContinue = ()=>{
      navigation.navigate(NavigationStrings.SetPriceScreen)
    }
  
    useEffect(() => {
      setLoading(true);
      getUserData();
      getEventsTypes();
    }, []);
  
    const getEventsTypes = () => {
      getEventTypes()
        .then(res => {
          setMusicStyle(res?.musictype);
          setEventType(res?.eventtype);
        })
        .catch(err => {
          showError(err?.message), console.log(err);
        });
    };
    const addImg = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image.path);
        const newPictures = [...pictures, image.path];
        setPictures(newPictures);
  
        setProfileImg(image.path);
      });
    };
  
    const addImgs = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image, 'image');
        const newPictures = [...pictures, image?.sourceURL];
        setPictures(newPictures);
      });
    };
    const getUserData = async () => {
      setLoading(true);
      getUserProfile()
        .then(res => {
          console.log(res?.user?.pictures, 'res in getUserProfile');
          setUserData(res?.user);
          setZodiacsign(res?.user?.zodiac_sign);
          setJob(res?.user?.job_title);
          setUserBio(res?.user?.bio);
          setDrinkingsel(res?.user?.drinking);
          setSmokingsel(res?.user?.smoking);
          setUserLocation(res?.user?.location);
          const modifyData = res?.user?.pictures.map(i => {
            return IMAGE_URL + i;
          });
          // console.log(modifyData, 'modifyData');
          setPictures(modifyData);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          showError(err?.message);
          console.log(err, 'err in getUserProfile');
        });
    };
  
    const updateProfileHandler = () => {
      const formData = new FormData();
  
      formData.append('full_name', userData?.username);
      formData.append('gender', userData?.gender);
      formData.append('height', userData?.height);
      formData.append('age', userData?.age);
      formData.append('zodiac_sign', zodiacsign);
      formData.append('job_title', job);
      formData.append('location', userLocation);
      formData.append('language', languagesel);
      formData.append('smoking', smokingsel);
      formData.append('drinking', drinkingsel);
      formData.append('bio', userBio);
      pictures.forEach((image, index) => {
        formData.append('pictures', {
          uri: image,
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
        });
      });
  
      formData.append('interests_id', userData?.interest_type);
      formData.append(
        'music_type_id',
        selMusic.length > 0 ? selMusic : userData?.music_type,
      );
      formData.append(
        'event_type_id',
        selEventType.length > 0 ? selEventType : userData?.event_type,
      );
      setLoading(true);
      UpdateUserProfile(formData)
        .then(res => {
          setLoading(true);
          getUserData();
          showSuccess('Profile updated!!');
        })
        .catch(err => {
          setLoading(true);
          showError(err?.message);
          console.log(err, 'err in UpdateUserProfile');
        });
    };
  
    const toggleSelection = (item: any) => {
      setSelMusic((prevSelectedItems: any) => {
        if (prevSelectedItems.includes(item?._id)) {
          return prevSelectedItems.filter((id: any) => id !== item?._id);
        } else {
          return [...prevSelectedItems, item?._id];
        }
      });
    };
  
    const toggleSelection2 = (item: any) => {
      setsSelEventType((prevSelectedItems: any) => {
        if (prevSelectedItems.includes(item?._id)) {
          return prevSelectedItems.filter((name: any) => name !== item?._id);
        } else {
          return [...prevSelectedItems, item?._id];
        }
      });
    };
    const removeImg = (indexToRemove: any) => {
      const updatedPictures = pictures.filter(
        (_, index) => index !== indexToRemove,
      );
      setPictures(updatedPictures);
    };
    const getImageSource = (item: any) => {
      console.log(item);
  
      if (item.includes('file://') || item.startsWith('/')) {
        return {uri: item};
      }
  
      return {uri: item};
    };
    return (
      <LinearGradient
        colors={[Colors.backgroundNew, Colors.backgroundNew]}
        start={{x: 0, y: 0}}
        end={{x: 1.3, y: 0.9}}
        style={{flex: 1}}>
        <SafeAreaView>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <Loadingcomponent isVisible={loading} />
            <View style={{paddingHorizontal: 15}}></View>
            <Header title="Dj Profile Edit" onPress={() => navigation.goBack()} />
            <SizeBox size={10} />
            <Text style={styles.profiletxt}>Profile picture </Text>
            <SizeBox size={15} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={addImg}
              style={{alignItems: 'center', width: '43%', alignSelf: 'center'}}>
              {userData?.pictures?.length > 0 ? (
                <Image
                  source={{
                    uri: profileimg
                      ? profileimg
                      : IMAGE_URL + userData?.pictures[0],
                  }}
                  style={styles.editedimg}
                />
              ) : (
                <>
                  {profileimg ? (
                    <Image
                      source={{
                        uri: profileimg,
                      }}
                      style={styles.editedimg}
                    />
                  ) : (
                    <Image
                      source={ImagePath.ProfileImg}
                      style={styles.editedimg}
                    />
                  )}
                </>
              )}
              <VectorIcon
                groupName="Feather"
                name="edit"
                size={20}
                style={styles.editvci}
              />
            </TouchableOpacity>
            <SizeBox size={10} />
            <Text style={styles.profiletxt}>Pictures & Videos </Text>
            <SizeBox size={2} />
            <FlatList
              numColumns={3}
              style={{paddingHorizontal: 15}}
              data={[...pictures, 'add']}
              renderItem={({item, index}) => (
                <View>
                  {item === 'add' ? (
                    <TouchableOpacity
                      style={[
                        styles.socialimg,
                        {
                          borderWidth: 1,
                          borderColor: Colors.white,
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      ]}
                      onPress={addImgs}>
                      <VectorIcon
                        groupName="MaterialCommunityIcons"
                        name="pencil-outline"
                        size={19}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  ) : (
                    <>
                      <Image
                        source={getImageSource(item)}
                        style={styles.socialimg}
                      />
                      <VectorIcon
                        groupName="MaterialIcons"
                        name="cancel"
                        size={18}
                        color={Colors.white}
                        style={styles.cross}
                        onPress={() => removeImg(index)}
                      />
                    </>
                  )}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <SizeBox size={10} />
            <Text style={styles.label}>{userData?.username}'s Bio</Text>
            <SizeBox size={5} />
            <View style={styles.inputContainer}>
              <View style={{width: '100%'}}>
                <CommonInput
                  multiline={true}
                  placeholder="Introduce yourself"
                  value={userBio}
                  onChangeText={(e: string) => setUserBio(e)}
                  styless={{undefined}}
                />
              </View>
            </View>
            <SizeBox size={10} />
            <TouchableOpacity activeOpacity={0.7} style={styles.pricebtn} onPress={onContinue}>
            <Text style={{...commonStyles.font16Regular}}>Set Dj set price</Text>
            <VectorIcon groupName='MaterialIcons' name='arrow-forward-ios' size={15}/>
            </TouchableOpacity>
            <SizeBox size={15} />
            <Text style={styles.label}>Music Type</Text>
            <SizeBox size={2} />
            <Text style={styles.selecttxt}>Select music type</Text>
            <SizeBox size={5} />
  
            <View style={{width: '100%'}}>
              <FlatList
                data={musicStyle}
                renderItem={({item}) => (
                  <View style={styles.langcon}>
                    <TouchableOpacity
                      onPress={() => toggleSelection(item)}
                      style={[
                        styles.itHolder,
                        {
                          backgroundColor: selMusic.includes(item?._id)
                            ? Colors.lightPink
                            : Colors.backgroundNew,
                        },
                      ]}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {selMusic.includes(item?._id) ? (
                          <VectorIcon
                            groupName="AntDesign"
                            name="check"
                            color={Colors.white}
                            size={15}
                            style={{alignSlef: 'centre'}}
                          />
                        ) : null}
  
                        <Text style={[styles.inpt]}>
                          {` `}
                          {item?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                numColumns={2}
              />
  
              <SizeBox size={10} />
            </View>
  
            <Text style={styles.label}>Event Type</Text>
            <SizeBox size={2} />
            <Text style={styles.selecttxt}>Select event type</Text>
            <SizeBox size={5} />
  
            <View style={{width: '100%'}}>
              <FlatList
                data={eventType}
                renderItem={({item}) => (
                  <View style={styles.langcon}>
                    <TouchableOpacity
                      onPress={() => toggleSelection2(item)}
                      style={[
                        styles.itHolder,
                        {
                          backgroundColor: selEventType.includes(item?._id)
                            ? Colors.lightPink
                            : Colors.backgroundNew,
                        },
                      ]}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {selEventType.includes(item?._id) ? (
                          <VectorIcon
                            groupName="AntDesign"
                            name="check"
                            color={Colors.white}
                            size={15}
                            style={{alignSlef: 'centre'}}
                          />
                        ) : null}
  
                        <Text style={[styles.inpt]}>
                          {` `}
                          {item?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                numColumns={2}
              />
            </View>
            <SizeBox size={10} />
            <Text style={styles.label}>Languages</Text>
            <SizeBox size={5} />
            <View>
              <View style={styles.langcon}>
                <TouchableOpacity
                  style={[
                    styles.iptHolder,
                    {
                      backgroundColor:
                        languagesel == 'English'
                          ? Colors.lightPink
                          : Colors.backgroundNew,
                    },
                  ]}
                  onPress={() => setLanguagesel('English')}>
                  <Text style={styles.inpt}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setLanguagesel('Spanish')}
                  style={[
                    styles.iptHolder,
                    {
                      backgroundColor:
                        languagesel == 'Spanish'
                          ? Colors.lightPink
                          : Colors.backgroundNew,
                    },
                  ]}>
                  <Text style={styles.inpt}>Spanish</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setLanguagesel('French')}
                  style={[
                    styles.iptHolder,
                    {
                      backgroundColor:
                        languagesel == 'French'
                          ? Colors.lightPink
                          : Colors.backgroundNew,
                    },
                  ]}>
                  <Text style={styles.inpt}>French</Text>
                </TouchableOpacity>
              </View>
            </View>
            <SizeBox size={10} />
            <Text style={styles.label}>Zodiac Sign</Text>
            <SizeBox size={5} />
            <View style={styles.inputContainer}>
              <View style={{width: '90%'}}>
                <CommonInput
                  placeholder="Add your zodiac sign "
                  value={zodiacsign}
                  onChangeText={(e: string) => setZodiacsign(e)}
                  styless={{undefined}}
                />
              </View>
            </View>
            <SizeBox size={10} />
            <Text style={styles.label}>Job title</Text>
            <SizeBox size={5} />
            <View style={styles.inputContainer}>
              <View style={{width: '90%'}}>
                <CommonInput
                  placeholder="Job title"
                  value={job}
                  onChangeText={(e: string) => setJob(e)}
                  styless={{undefined}}
                />
              </View>
            </View>
  
            <SizeBox size={10} />
            <Text style={styles.label}>Location</Text>
            <SizeBox size={5} />
            <View style={styles.inputContainer}>
              <View style={{width: '90%'}}>
                <CommonInput
                  placeholder="Add your area"
                  value={userLocation}
                  onChangeText={(e: string) => setUserLocation(e)}
                  styless={{undefined}}
                />
              </View>
            </View>
            <SizeBox size={10} />
            <Text style={styles.label}>Drinking</Text>
            <SizeBox size={5} />
            <View style={styles.iptContainer}>
              <TouchableOpacity
                style={[
                  styles.inptHolder,
                  {
                    backgroundColor:
                      drinkingsel == 'Prefer not to say'
                        ? Colors.lightPink
                        : Colors.backgroundNew,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setDrinkingsel('Prefer not to say')}>
                <Text style={styles.inpt}>Prefer not to say</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.inputHolder,
                  {
                    backgroundColor:
                      drinkingsel == 'Yes'
                        ? Colors.lightPink
                        : Colors.backgroundNew,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setDrinkingsel('Yes')}>
                <Text style={styles.inpt}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.inputHolder,
                  {
                    backgroundColor:
                      drinkingsel == 'No'
                        ? Colors.lightPink
                        : Colors.backgroundNew,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setDrinkingsel('No')}>
                <Text style={styles.inpt}>No</Text>
              </TouchableOpacity>
            </View>
            <SizeBox size={10} />
            <Text style={styles.label}>Smoking</Text>
            <SizeBox size={5} />
            <View style={styles.iptContainer}>
              <TouchableOpacity
                style={[
                  styles.inptHolder,
                  {
                    backgroundColor:
                      smokingsel == 'Prefer not to say'
                        ? Colors.lightPink
                        : Colors.backgroundNew,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setSmokingsel('Prefer not to say')}>
                <Text style={styles.inpt}>Prefer not to say</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.inputHolder,
                  {
                    backgroundColor:
                      smokingsel == 'Yes'
                        ? Colors.lightPink
                        : Colors.backgroundNew,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setSmokingsel('Yes')}>
                <Text style={styles.inpt}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.inputHolder,
                  {
                    backgroundColor:
                      smokingsel == 'No'
                        ? Colors.lightPink
                        : Colors.backgroundNew,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setSmokingsel('No')}>
                <Text style={styles.inpt}>No</Text>
              </TouchableOpacity>
            </View>
            <SizeBox size={10} />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  };
  
  export default EditDjProfile;
  