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
  CommonBtn,
  CommonInput,
  CommonInputBtn,
  Header,
  Loadingcomponent,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import {
  height,
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import Modal from 'react-native-modal';
import fontFamily from '../../Utilities/Styles/fontFamily';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  getUserProfile,
  UpdateUserProfile,
} from '../../Utilities/Constants/auth';
import languages from '../../Utilities/Constants';

const EditProfile = ({navigation}: any) => {
  const [Name, setName] = useState('');
  const [userHeight, setUserHeight] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [sign, setSign] = useState('');
  const [job, setJob] = useState('');
  const [selectedDrink, setSelectDrink] = useState('');
  const [selectedSmoke, setSelectSmoke] = useState('');
  const [selectedGender, setSelectGender] = useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisibleLang, setModalVisibleLang] = useState<boolean>(false);
  const [modalVisibleDrink, setModalVisibleDrink] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState([]);
  const [userData, setUserData] = useState<object>({});
  const [modalVisibleSmoking, setModalVisibleSmoking] =
    useState<boolean>(false);
  const genders = ['Male', 'Female', 'Other'];
  const lang = ['English', 'Arabic', 'French', 'Dutch'];
  const drinkList = ['Yes', 'No', 'Prefer not to say'];
  const onBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  const getUserData = async () => {
    getUserProfile()
      .then(res => {
        // console.log(res, "res in getUserProfile");
        setUserData(res);
        setName(res?.full_name);
        setUserHeight(res?.height);
        setUserAge(res?.age?.toString());
        setSign(res?.zodiac_sign);
        setJob(res?.job_title);
        setSelectDrink(res?.drinking);
        setSelectDrink(res?.drinking);
        setSelectSmoke(res?.smoking);
        setUserBio(res?.bio);
        setSelectedLang(res?.language);
        setSelectGender(res?.gender);
        setUserLocation(res?.location);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err, 'err in getUserProfile');
      });
  };

  const selectModalHandler = (item: any) => {
    if (modalVisibleLang) {
      const filterData = selectedLang?.filter((i: any) => i == item?.name);
      if (filterData?.length > 0) {
        const filterData2 = selectedLang?.filter((i: any) => i != item?.name);
        setSelectedLang(filterData2);
      } else {
        setSelectedLang([...selectedLang, item?.name]);
      }
    } else {
      // setSelectedGender(item);
      // setModalVisible(false);
      // setModalLanguageVisible(false);
    }
  };

  const updateProfileHandler = () => {
    const formData = {
      full_name: Name,
      gender: selectedGender,
      height: userHeight,
      age: userAge,
      zodiac_sign: sign,
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
          <Header title="Profile Edit" onPress={() => navigation.goBack()} />
         <SizeBox size={10}/>
         <Text style={styles.profiletxt}>Profile picture </Text>
         <SizeBox size={15}/>
         <View style={{alignItems:"center",width:"43%",alignSelf:"center"}}>
          <Image source={ImagePath.ProfileImg} style={styles.editedimg}/>
          <VectorIcon groupName='Feather' name='edit' size={20} style={styles.editvci}/>
         </View>
         <SizeBox size={10}/>
         <Text style={styles.profiletxt}>Pictures & Videos </Text>
         <SizeBox size={10} />
          <Text style={styles.label}>Music Type</Text>
         <SizeBox size={2} />
          <Text style={styles.selecttxt}>Select music type</Text>
          <SizeBox size={5}/>
          <View>
          <View style={{width:"100%"}}>
          <View style={styles.langcon}>
            <TouchableOpacity style={styles.itHolder}>
              <Text style={styles.inpt}>
              Disco / Funk / Soul
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itHolder}>
              <Text style={styles.inpt}>
              EDM / Dance music
              </Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={10}/>
          <View style={styles.langcon}>
            <TouchableOpacity style={styles.itHolder}>
              <Text style={styles.inpt}>
              Underground
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itHolder}>
              <Text style={styles.inpt}>
              Underground
              </Text>
            </TouchableOpacity>
          </View>
          </View>
         <SizeBox size={10} />
          <View style={styles.langcon}>
            <TouchableOpacity style={styles.iptHolder}>
              <Text style={styles.inpt}>
              House
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iptHold}>
              <Text style={styles.inpt}>
              Tech-House
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iptHold}>
              <Text style={styles.inpt}>
              Commercial
              </Text>
            </TouchableOpacity>
          </View>
          </View>
          <SizeBox size={10}/>
          <Text style={styles.label}>Event Type</Text>
         <SizeBox size={2} />
          <Text style={styles.selecttxt}>Select event type</Text>
          <SizeBox size={5}/>
          <View>
          <View>
          <View style={styles.langcon}>
            <TouchableOpacity style={styles.iptHolder}>
              <Text style={styles.inpt}>
              Private
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iptHolder}>
              <Text style={styles.inpt}>
              Corporate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iptHold}>
              <Text style={styles.inpt}>
              Small events
              </Text>
            </TouchableOpacity>
          </View>
          </View>
         <SizeBox size={10} />
          <View style={styles.langcon}>
            <TouchableOpacity style={styles.iptHolder}>
              <Text style={styles.inpt}>
              Festivals
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iptHolder}>
              <Text style={styles.inpt}>
              Bars
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iptHold}>
              <Text style={styles.inpt}>
              Nightclubs
              </Text>
            </TouchableOpacity>
          </View>
          </View>
          <SizeBox size={10}/>
          <Text style={styles.label}>Languages</Text>
          <SizeBox size={5} />
          <View>
          <View style={styles.langcon}>
            <TouchableOpacity style={styles.iptHolder}>
              <Text style={styles.inpt}>
             English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iptHolder}>
              <Text style={styles.inpt}>
             Spanish
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iptHolder}>
              <Text style={styles.inpt}>
             French
              </Text>
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
                onChangeText={(e: string) => setJob(e?.trim())}
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
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Drinking</Text>
          <SizeBox size={5} />
          <View style={styles.iptContainer}> 
            <TouchableOpacity style={styles.inptHolder} activeOpacity={0.8}>
                <Text style={styles.inpt}>Prefer not to say</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.inputHolder} activeOpacity={0.8}>
                <Text style={styles.inpt}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputHolder}activeOpacity={0.8} >
                <Text style={styles.inpt}>No</Text>
              </TouchableOpacity>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Smoking</Text>
          <SizeBox size={5} />
          <View style={styles.iptContainer}>
            <TouchableOpacity style={styles.inptHolder} activeOpacity={0.8}>
                <Text style={styles.inpt}>Prefer not to say</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.inputHolder} activeOpacity={0.8}>
                <Text style={styles.inpt}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inputHolder} activeOpacity={0.8} >
                <Text style={styles.inpt}>No</Text>
              </TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: moderateScaleVertical(30),
            }}>
            </View>
        </KeyboardAwareScrollView>
        <Modal
          isVisible={
            modalVisible ||
            modalVisibleLang ||
            modalVisibleDrink ||
            modalVisibleSmoking
          }
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          onBackdropPress={() => {
            setModalVisible(false);
            setModalVisibleLang(false);
            setModalVisibleDrink(false);
            setModalVisibleSmoking(false);
          }}
          backdropOpacity={0.5}
          animationIn="slideInUp"
          animationOut="flipOutY"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View
            style={{
              minHeight: height / 5,
              maxHeight: height / 3,
              width: '95%',
              alignSelf: 'center',
            }}>
            <View style={styles.modalContainer}>
              <FlatList
                data={
                  modalVisible
                    ? genders
                    : modalVisibleLang
                    ? languages
                    : drinkList
                }
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({item, index}) => {
                  const lengthFlag = modalVisible
                    ? genders?.length
                    : modalVisibleLang
                    ? languages?.length
                    : drinkList?.length;
                  const filterData = selectedLang?.filter(
                    (i: any) => i == item?.name,
                  );
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        if (modalVisible) {
                          setSelectGender(item);
                        } else if (modalVisibleDrink) {
                          setSelectDrink(item);
                        } else if (modalVisibleSmoking) {
                          setSelectSmoke(item);
                        } else {
                          selectModalHandler(item);
                        }
                      }}
                      style={[
                        {
                          borderBottomWidth: lengthFlag - 1 == index ? 0 : 1,
                        },
                        styles.mondaInvw,
                      ]}>
                      <Text
                        style={{
                          color: Colors.white,
                          padding: 5,
                          fontWeight: '600',
                          fontFamily: fontFamily.time_regular,
                        }}>
                        {item?.name ? item?.name : item}
                      </Text>
                      <VectorIcon
                        groupName="MaterialCommunityIcons"
                        name={
                          (
                            modalVisible
                              ? selectedGender == item
                              : modalVisibleDrink
                              ? selectedDrink == item
                              : modalVisibleSmoking
                              ? selectedSmoke == item
                              : filterData[0] == item?.name
                          )
                            ? 'radiobox-marked'
                            : 'radiobox-blank'
                        }
                        size={18}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EditProfile;
