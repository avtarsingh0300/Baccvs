import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
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
import {languages} from '../../Utilities/Constants';

const EditProfile = ({navigation}: any) => {
  const [userBio, setUserBio] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});
  const [zodiacsign, setZodiacsign] = useState('');

  const [musicStyle, setMusicStyle] = useState<any>([]);
  const [selectedMusicTypes, setSelectedMusicTypes] = useState<any>([]);
  const [searchedMusictTypes, setSearchedMusictTypes] = useState('');
  const [filteredMusicStyle, setFilteredMusicStyle] = useState([]);

  const [eventType, setEventType] = useState([]);
  const [selEventType, setsSelEventType] = useState<any>([]);
  const [searchedEventTypes, setSearchedEventTypes] = useState('');
  const [filteredEventType, setFilteredEventType] = useState([]);

  const [languagesel, setLanguagesel] = useState<any>([]);
  const [searchedLanguage, setSearchedLanguage] = useState('');
  const [filteredLanguage, setFilteredLanguage] = useState<any>(
    languages.flatMap(category => category.data.map(lang => lang.name)),
  );

  const [profileimg, setProfileImg] = useState('');
  const [drinkingsel, setDrinkingsel] = useState('');
  const [smokingsel, setSmokingsel] = useState('');
  const [pictures, setPictures] = useState<any>([]);

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

  const updateProfileHandler = () => {
    const formData = new FormData();

    const selectedEventIds = eventType
      .filter((event: any) => selEventType.includes(event.name))
      .map((musicItem: any) => musicItem._id);

    const selectedMusicIds = musicStyle
      .filter((music: any) => selectedMusicTypes.includes(music.name))
      .map((musicItem: any) => musicItem._id);

    formData.append('full_name', userData?.username);
    formData.append('gender', userData?.gender);
    formData.append('height', userData?.height);
    formData.append('age', userData?.age);
    formData.append('zodiac_sign', zodiacsign);
    formData.append('job_title', job);
    formData.append('location', userLocation);
    formData.append('language', JSON.stringify(languagesel));
    formData.append('smoking', smokingsel);
    formData.append('drinking', drinkingsel);
    formData.append('bio', userBio);
    pictures.forEach((image: any, index: any) => {
      formData.append('pictures', {
        uri: image,
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
      });
    });

    formData.append('interests_id', JSON.stringify(userData?.interest_type));
    formData.append('music_type_id', JSON.stringify(selectedMusicIds));
    formData.append('event_type_id', JSON.stringify(selectedEventIds));

    setLoading(true);
    UpdateUserProfile(formData)
      .then(res => {
        console.log(res);

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

  const handleSearchMusic = (text: string) => {
    setSearchedMusictTypes(text);

    if (text.length >= 2) {
      const filtered = musicStyle.filter((item: {name: string}) =>
        item.name.toLowerCase().startsWith(text.toLowerCase()),
      );
      setFilteredMusicStyle(filtered);
    } else {
      setFilteredMusicStyle(musicStyle);
    }
  };

  const handleSearchEvents = (text: string) => {
    setSearchedEventTypes(text);

    if (text.length >= 2) {
      const filtered = eventType.filter((item: {name: string}) =>
        item.name.toLowerCase().startsWith(text.toLowerCase()),
      );
      setFilteredEventType(filtered);
    } else {
      setFilteredEventType(eventType);
    }
  };

  const handleSearchLanguages = (text: string) => {
    setSearchedLanguage(text);

    let allLanguages = languages.flatMap(category =>
      category.data.map(lang => lang.name),
    );

    if (text.length > 0) {
      const filtered = allLanguages.filter(item =>
        item.toLowerCase().startsWith(text.toLowerCase()),
      );
      setFilteredLanguage(filtered);
    } else {
      // Show selected languages first, then remaining ones
      const selectedLanguages = allLanguages.filter((lang: any) =>
        languagesel.includes(lang),
      );
      const unselectedLanguages = allLanguages.filter(
        lang => !languagesel.includes(lang),
      );
      setFilteredLanguage([...selectedLanguages, ...unselectedLanguages]);
    }
  };
  const toggleSelection = (item: any) => {
    setSelectedMusicTypes((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item?.name)) {
        return prevSelectedItems.filter((id: any) => id !== item?.name);
      } else {
        return [...prevSelectedItems, item?.name];
      }
    });
  };

  const toggleSelection2 = (item: any) => {
    setsSelEventType((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item?.name)) {
        return prevSelectedItems.filter((name: any) => name !== item?.name);
      } else {
        return [...prevSelectedItems, item?.name];
      }
    });
  };

  const toggleLanguage = (item: any) => {
    setLanguagesel((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((name: any) => name !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const removeImg = (indexToRemove: any) => {
    const updatedPictures = pictures.filter(
      (_: any, index: any) => index !== indexToRemove,
    );
    setPictures(updatedPictures);
  };

  const getImageSource = (item: any) => {
    if (item.includes('file://') || item.startsWith('/')) {
      return {uri: item};
    }

    return {uri: item};
  };

  const getEventsTypes = () => {
    getEventTypes()
      .then((res: any) => {
        setMusicStyle(res?.musictype);
        setFilteredMusicStyle(res?.musictype);

        setEventType(res?.eventtype);
        setFilteredEventType(res?.eventtype);
      })
      .catch(err => {
        showError(err?.message), console.log(err);
      });
  };

  const getUserData = async () => {
    setLoading(true);
    getUserProfile()
      .then((res: any) => {
        setUserData(res?.user);
        setSelectedMusicTypes(res?.user?.music_type);
        setsSelEventType(res?.user?.event_type);
        setLanguagesel(res?.user?.language);
        setZodiacsign(res?.user?.zodiac_sign);
        setJob(res?.user?.job_title);
        setUserBio(res?.user?.bio);
        setDrinkingsel(res?.user?.drinking);
        setSmokingsel(res?.user?.smoking);
        setUserLocation(res?.user?.location);
        const modifyData = res?.user?.pictures.map((i: any) => {
          return IMAGE_URL + i.url;
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

  useEffect(() => {
    setLoading(true);
    getUserData();
    getEventsTypes();
  }, []);

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
                    : IMAGE_URL + userData?.pictures[0].url,
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
            <View style={{width: '90%'}}>
              <CommonInput
                multiline={true}
                placeholder="Introduce yourself"
                value={userBio}
                onChangeText={text => setUserBio(text)}
                styless={{undefined}}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Music Type</Text>
          <SizeBox size={2} />
          <Text style={styles.selecttxt}>Select music type</Text>
          <SizeBox size={5} />

          <TextInput
            value={searchedMusictTypes}
            onChangeText={handleSearchMusic}
            placeholder="Search Music Types"
            style={{
              backgroundColor: 'white',
              width: '90%',
              alignSelf: 'center',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
              marginVertical: 10,
              color: Colors.backgroundNew,
            }}
          />

          <View style={{width: '100%'}}>
            <FlatList
              data={filteredMusicStyle}
              renderItem={({item}: any) => (
                <View style={styles.langcon}>
                  <TouchableOpacity
                    onPress={() => toggleSelection(item)}
                    style={[
                      styles.itHolder,
                      {
                        backgroundColor: selectedMusicTypes.includes(item?.name)
                          ? Colors.lightPink
                          : Colors.backgroundNew,
                      },
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {selectedMusicTypes.includes(item?.name) ? (
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
          <TextInput
            value={searchedEventTypes}
            onChangeText={handleSearchEvents}
            placeholder="Search Events Types"
            style={{
              backgroundColor: 'white',
              width: '90%',
              alignSelf: 'center',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
              marginVertical: 10,
              color: Colors.backgroundNew,
            }}
          />
          <View style={{width: '100%'}}>
            <FlatList
              data={filteredEventType}
              renderItem={({item}: any) => (
                <View style={styles.langcon}>
                  <TouchableOpacity
                    onPress={() => toggleSelection2(item)}
                    style={[
                      styles.itHolder,
                      {
                        backgroundColor: selEventType.includes(item?.name)
                          ? Colors.lightPink
                          : Colors.backgroundNew,
                      },
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {selEventType.includes(item?.name) ? (
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

          <TextInput
            value={searchedLanguage}
            onChangeText={handleSearchLanguages}
            placeholder="Search Language here"
            style={{
              backgroundColor: 'white',
              width: '90%',
              alignSelf: 'center',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
              marginVertical: 10,
              color: Colors.backgroundNew,
              fontSize: 14,
            }}
          />

          <View style={{width: '100%'}}>
            <FlatList
              data={filteredLanguage.slice(0, 9)}
              renderItem={({item}: any) => {
                return (
                  <View style={[styles.langcon, {width: '33%'}]}>
                    <TouchableOpacity
                      onPress={() => toggleLanguage(item)}
                      style={[
                        styles.itHolder,
                        {
                          backgroundColor: languagesel.includes(item)
                            ? Colors.lightPink
                            : Colors.backgroundNew,
                          width: '100%',
                        },
                      ]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {languagesel.includes(item) ? (
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
                          {item}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              numColumns={3}
            />
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
                onPress={updateProfileHandler}>
                <Text style={styles.text}>Update</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EditProfile;
