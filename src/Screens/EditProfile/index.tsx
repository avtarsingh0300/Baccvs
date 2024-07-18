import { SafeAreaView, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './style';
import {
  CommonBtn,
  CommonInput,
  CommonInputBtn,
  Header,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import {
  height,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import Modal from 'react-native-modal';
import fontFamily from '../../Utilities/Styles/fontFamily';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import { getUserProfile } from '../../Utilities/Constants/auth';
import languages from '../../Utilities/Constants';

const EditProfile = ({ navigation }: any) => {
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
  const [modalVisibleLang, setModalVisibleLang] = useState<boolean>(false);
  const [modalVisibleDrink, setModalVisibleDrink] = useState<boolean>(false);
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
    getUserData();
  }, []);

  const getUserData = async () => {
    getUserProfile().then(res => {
      console.log(res, "res in getUserProfile");
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
      setSelectGender(res?.gender);
      setUserLocation(res?.location);
    }).catch(err => {
      console.log(err, "err in getUserProfile");
    })
  };


  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.9 }}
      style={{ flex: 1 }}>
      <SafeAreaView>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <Header title="Edit profile" onPress={() => navigation.goBack()} />
          <SizeBox size={10} />
          <Text style={styles.label}>Name</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <VectorIcon
              groupName="MaterialIcons"
              name="drive-file-rename-outline"
              color={Colors.white}
              size={21}
            />
            <View style={{ width: '90%' }}>
              <CommonInput
                value={Name}
                onChangeText={(e: string) => setName(e.trim())}
                placeholder="Name" />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Gender</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="gender-male-female"
              color={Colors.white}
              size={21}
            />
            <View style={{ width: '90%' }}>
              <CommonInputBtn
                title={selectedGender?.length > 0 ? selectedGender : "Gender"}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Height</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <Image source={ImagePath.line_height} tintColor={Colors.white} />
            <View style={{ width: '90%' }}>
              <CommonInput
                placeholder="Height"
                keyboardType="number-pad"
                value={userHeight}
                onChangeText={(e: string) => setUserHeight(e?.trim())}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Age</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="cupcake"
              color={Colors.white}
              size={21}
            />
            <View style={{ width: '90%' }}>
              <CommonInput
                placeholder="Age"
                keyboardType="number-pad"
                value={userAge}
                onChangeText={(e: string) => setUserAge(e?.trim())}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Zodiac sign</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="zodiac-cancer"
              color={Colors.white}
              size={21}
            />
            <View style={{ width: '90%' }}>
              <CommonInput
                placeholder="Zodiac sign"
                value={sign}
                onChangeText={(e: string) => setSign(e?.trim())}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Job title</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <VectorIcon
              groupName="MaterialIcons"
              name="work-outline"
              color={Colors.white}
              size={21}
            />
            <View style={{ width: '90%' }}>
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
            <VectorIcon
              groupName="Ionicons"
              name="location-outline"
              color={Colors.white}
              size={21}
            />
            <View style={{ width: '90%' }}>
              <CommonInput
                placeholder="Add your area"
                value={userLocation}
                onChangeText={(e: string) => setUserLocation(e)}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Languages</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <VectorIcon
              groupName="Entypo"
              name="language"
              color={Colors.white}
              size={21}
            />
            <View style={{ width: '90%' }}>
              <CommonInputBtn
                title="Select all languages you speak"
                onPress={() => setModalVisibleLang(true)}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Drink</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="glass-cocktail"
              color={Colors.white}
              size={21}
            />
            <View style={{ width: '90%' }}>
              <CommonInputBtn
                title={selectedDrink?.length > 0 ? selectedDrink : "Drink"}
                onPress={() => setModalVisibleDrink(true)}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Smoking</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <VectorIcon
              groupName="MaterialCommunityIcons"
              name="cigar"
              color={Colors.white}
              size={21}
            />
            <View style={{ width: '90%' }}>
              <CommonInputBtn
                title={selectedSmoke?.length > 0 ? selectedSmoke : "Smoking"}
                onPress={() => setModalVisibleSmoking(true)}
              />
            </View>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Bio</Text>
          <SizeBox size={5} />
          <View style={styles.inputContainer}>
            <View style={{ width: '10%' }} />
            <View style={{ width: '90%' }}>
              <CommonInput
                placeholder="Bio"
                multiline={true}
                value={userBio}
                onChangeText={(e: string) => setUserBio(e)}
              />
            </View>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: moderateScaleVertical(30),
            }}>
            <CommonBtn onPress={onBack} title="Edit Profile" />
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
                  modalVisible ? genders : modalVisibleLang ? languages : drinkList
                }
                keyExtractor={(item, index) => index?.toString()}
                renderItem={({ item, index }) => {
                  const lengthFlag = modalVisible
                    ? genders?.length
                    : modalVisibleLang
                      ? lang?.length
                      : drinkList?.length;
                  return (
                    <View
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
                        name={(modalVisible ? selectedGender == item : modalVisibleDrink ? selectedDrink == item : selectedSmoke == item) ? "radiobox-marked" : "radiobox-blank"}
                        size={18}
                      />
                    </View>
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
