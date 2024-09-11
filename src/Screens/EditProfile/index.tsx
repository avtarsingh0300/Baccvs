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
} from '../../Utilities/Component/Helpers';

import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  getEventTypes,
  getUserProfile,
  UpdateUserProfile,
} from '../../Utilities/Constants/auth';
import languages from '../../Utilities/Constants';
import ImagePicker from 'react-native-image-crop-picker';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const EditProfile = ({navigation}: any) => {
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
  const onBack = () => {
    navigation.goBack();
  };

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
      console.log(image);
      setProfileImg(image.path);
    });
  };

  const getUserData = async () => {
    getUserProfile()
      .then(res => {
        console.log(res, 'res in getUserProfile');
        setUserData(res?.user);
        setZodiacsign(res?.user?.zodiac_sign);
        setJob(res?.user?.job_title);
        setUserBio(res?.user?.bio);
        setDrinkingsel(res?.user?.drinking);
        setSmokingsel(res?.user?.smoking);
        setUserLocation(res?.user?.location);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        showError(err?.message);
        console.log(err, 'err in getUserProfile');
      });
  };

  const updateProfileHandler = () => {
    const formData = {
      full_name: Name,
      gender: selectedGender,
      height: userHeight,
      age: userAge,
      zodiac_sign: zodiacsign,
      job_title: job,
      location: userLocation,
      language: selectedLang,
      smoking: selectedSmoke,
      drinking: selectedDrink,
      bio: userBio,
    };
    setLoading(true);
    UpdateUserProfile(formData)
      .then(res => {
        // console.log(res, "res in UpdateUserProfile");
        getUserData();
        onBack();
      })
      .catch(err => {
        setLoading(false);
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
          <Header title="Profile Edit" onPress={() => navigation.goBack()} />
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

          <SizeBox size={10} />
          <Text style={styles.label}>{userData?.username}'s Bio</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <View style={{width: '90%'}}>
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
          <View style={styles.Btnmain}>
            <LinearGradient
              colors={[Colors.lightpink2, Colors.lightpink2]}
              style={styles.btn}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.text}>Update</Text>
              </TouchableOpacity>
            </LinearGradient>

            <Text
              onPress={() => navigation.goBack()}
              style={[styles.text, {color: Colors.white}]}>
              cancel
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EditProfile;
