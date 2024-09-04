import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../Utilities/Styles/colors';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import {
  CommonBtn,
  CommonInput,
  CommonInputBtn,
  ProgressHeader,
  showError,
  SizeBox,
} from '../../../Utilities/Component/Helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useScroll from '../../../Utilities/Component/hooks/useScroll';
import fontFamily from '../../../Utilities/Styles/fontFamily';
import VectorIcon from '../../../Utilities/Component/vectorIcons';
import Modal from 'react-native-modal';
import { height } from '../../../Utilities/Styles/responsiveSize';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import languages from '../../../Utilities/Constants';

const RegisterScreen = (props: any) => {
  const scrollConfig = useScroll();
  const [h, setH] = useState(0);
  const { focusAction, scrollRef } = scrollConfig;
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedLang, setSelectedLang] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalLanguageVisible, setModalLanguageVisible] =
    useState<boolean>(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const genders = ['Male', 'Female', 'Other'];
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const onBack = () => {
    props.navigation.goBack();
  };
  const onContinue = () => {
    if (
      fullName?.length == 0 &&
      email?.length == 0 &&
      userConfirmPassword?.length == 0 &&
      userName?.length == 0 &&
      userBio?.length == 0 &&
      userPassword?.length == 0 &&
      selectedGender?.length == 0 &&
      selectedLang?.length == 0
    ) {
      return showError('All field are mandatory');
    }
    if (userPassword != userConfirmPassword) {
      return showError('Password and confirm password should be same');
    }
    const data = {
      full_name: fullName,
      email: email,
      dob: moment(date).format('YYYY-MM-DD'),
      username: userName,
      gender: selectedGender,
      bio: userBio,
      language: selectedLang,
      password: userPassword,
      phone_number: props.route.params.phone,
    };
    props.navigation.navigate(NavigationStrings.UploadImage, { data: data });
  };

  const selectModalHandler = (item: any) => {
    if (modalLanguageVisible) {
      const filterData = selectedLang?.filter((i: any) => i == item?.name);
      if (filterData?.length > 0) {
        const filterData2 = selectedLang?.filter((i: any) => i != item?.name);
        setSelectedLang(filterData2);
      } else {
        setSelectedLang([...selectedLang, item?.name]);
      }
    } else {
      setSelectedGender(item);
      setModalVisible(false);
      setModalLanguageVisible(false);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.9 }}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ProgressHeader onPress={onBack} value={4} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={{ flexGrow: 1, marginBottom: 50 }}
          onLayout={e => setH(e.nativeEvent.layout.height)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={ref => (scrollRef.current = ref)}>
          <SizeBox size={15} />
          <Text style={{ ...commonStyles.font20W400,color:Colors.white,fontFamily:fontFamily.time_regular,textAlign:"center" }}>Personalize your profile</Text>
          <SizeBox size={10} />
          <Text
            style={{
              ...commonStyles.font14Center,
              color: Colors.greyTxt,
              textAlign: 'center',
              width: '60%',
            }}>
            Please fill out the form carefully to complete your registration.
          </Text>
          <SizeBox size={10} />
          <Text style={{...commonStyles.font12,color:Colors.greyTxt,paddingLeft:20}}>Full name</Text>
          <SizeBox size={5}/>
          <CommonInput
            placeholder="Fullname"
            value={fullName}
            onChangeText={(e: string) => setFullName(e)}
          />
          <SizeBox size={10} />
          <Text style={{...commonStyles.font12,color:Colors.greyTxt,paddingLeft:20}}>Email Address</Text>
          <SizeBox size={5}/>
          <CommonInput
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={(e: string) => setEmail(e?.trim())}
          />
          <SizeBox size={10} />
          <Text style={{...commonStyles.font12,color:Colors.greyTxt,paddingLeft:20}}>Date of Birth</Text>
          <SizeBox size={5}/>
          <CommonInputBtn
            title={date ? moment(date).format('YYYY-MM-DD') : 'Date of Birth'}
            onPress={() => setOpen(true)}
          />
          <SizeBox size={10} />
          <Text style={{...commonStyles.font12,color:Colors.greyTxt,paddingLeft:20}}>Connect your instagram</Text>
          <SizeBox size={5}/>
          <CommonInput
            placeholder="@johndoe"
            value={userName}
            onChangeText={(e: string) => setUserName(e)}
          />
          <SizeBox size={10} />
          <Text
            style={{
              color: Colors.lightPink,
              fontFamily: fontFamily.time_regular,
            }}>
            Please use an instagram account that is most representative of your
            online identity as it will be used for verification purposes.
          </Text>
          <SizeBox size={15} />
              <Text style={{...commonStyles.font12,color:Colors.greyTxt,paddingLeft:20}}>Select your gender</Text>
              <SizeBox size={5}/>
          <View>
            <CommonInputBtn
              title={
                selectedGender?.length > 0
                ? selectedGender
                : 'Select your gender'
              }
              onPress={() => setModalVisible(true)}
            />
            <Modal
              isVisible={modalVisible || modalLanguageVisible}
              style={{
                justifyContent: 'flex-end',
                margin: 0,
              }}
              onBackdropPress={() => {
                setModalVisible(false);
                setModalLanguageVisible(false);
              }}
              backdropOpacity={0.5}
              animationIn="slideInUp"
              animationOut="flipOutY"
              animationInTiming={600}
              animationOutTiming={600}
              backdropTransitionInTiming={600}
              backdropTransitionOutTiming={600}>
              <View
                style={{ height: height / 5, width: '95%', alignSelf: 'center' }}>
                <View style={styles.modalContainer}>
                  <FlatList
                    data={modalLanguageVisible ? languages : genders}
                    renderItem={({ item, index }) => {
                      const filterData = selectedLang?.filter(
                        (i: any) => i == item?.name,
                      );
                      console.log(
                        (selectedGender || filterData[0]) ==
                        (item?.name ? item?.name : item),
                        '(selectedGender || filterData[0]) == (item?.name ? item?.name : item)',
                      );
                      return (
                        <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          selectModalHandler(item);
                        }}
                        style={[
                          {
                            borderBottomWidth:
                            index ==
                            (modalLanguageVisible
                              ? languages?.length - 1
                              : genders?.length - 1)
                              ? 0
                              : 1,
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
                            {modalLanguageVisible ? item?.name : item}
                          </Text>
                          <VectorIcon
                            groupName="MaterialCommunityIcons"
                            name={
                              (selectedGender || filterData[0]) ==
                              (item?.name ? item?.name : item)
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
          </View>
          <SizeBox size={10} />
          <Text style={styles.biotxt}>Bio</Text>
          <SizeBox size={5} />
          <CommonInput
            multiline={true}
            placeholder="Write a little bio to make people know you better."
            value={userBio}
            onChangeText={(e: string) => setUserBio(e)}
          />
          <SizeBox size={10} />
          <Text style={{...commonStyles.font12,color:Colors.greyTxt,paddingLeft:20}}>Languages </Text>
          <SizeBox size={5}/>
          {selectedLang?.length > 0 ? (
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setModalLanguageVisible(true)}
            style={styles.langContainer}>
              {selectedLang?.map(item => (
                <TouchableOpacity
                style={styles.langItem}
                activeOpacity={0.8}
                onPress={() => {
                  const filterData2 = selectedLang?.filter(
                    (i: any) => i != item,
                  );
                  setSelectedLang(filterData2);
                }}>
                  <Text style={styles.langItemText}>{item} &#x2715;</Text>
                </TouchableOpacity>
              ))}
            </TouchableOpacity>
          ) : (
            <CommonInputBtn
            title="Languages"
            onPress={() => setModalLanguageVisible(true)}
            />
          )}
          <SizeBox size={10} />
          <CommonInput
            placeholder="Password"
            value={userPassword}
            onChangeText={(e: string) => setUserPassword(e?.trim())}
            secureTextEntry={true}
          />
          <SizeBox size={10} />
          <CommonInput
            placeholder="Confirm password"
            value={userConfirmPassword}
            onChangeText={(e: string) => setUserConfirmPassword(e?.trim())}
          />
          <SizeBox size={20} />
          <CommonBtn onPress={onContinue} title={'Continue'} />
          <SizeBox size={20} />
        </KeyboardAwareScrollView>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          maximumDate={new Date()}
          mode="date"
          onCancel={() => {
            setOpen(false);
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterScreen;
