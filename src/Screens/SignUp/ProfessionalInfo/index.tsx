import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../Utilities/Styles/colors';
import styles from './style';
import {SafeAreaView} from 'react-native';
import {
  CommonBtn,
  CommonInput,
  CommonInputBtn,
  ProgressHeader,
  SizeBox,
  showError,
} from '../../../Utilities/Component/Helpers';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import VectorIcon from '../../../Utilities/Component/vectorIcons';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';

const ProfessionalInfo = (props: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [websiteOptional, setWebsiteOptional] = useState('');
  const [servicesDescription, setServicesDescription] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState('');
  const onBack = () => {
    if (activeIndex == 0) {
      props.navigation.goBack();
    } else if (activeIndex == 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(1);
    }
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const onContinue = () => {
    if (activeIndex == 0) {
      if (!fullName) {
        showError('Enter fullname!');
        return;
      }
      if (!email) {
        showError('Email is required!');
        return;
      }
      if (!date) {
        showError('Enter you  date of birth!');
        return;
      }
      if (!validateEmail(email)) {
        showError('Please enter a valid email address!');
        return;
      }
      if (!password) {
        showError('Enter password !');
        return;
      }
      if (password != confirmPassword) {
        showError('Password and confirm password should be same');
        return;
      }
      setActiveIndex(1);
    } else if (activeIndex == 1) {
      if (!businessName) {
        showError('Enter Business!');
        return;
      }
      if (!selectedProfession) {
        showError('Select you profession!');
        return;
      }
      if (phoneNumber.length < 10) {
        showError('Please enter a valid phonenumber!');
        return;
      }
      if (!password) {
        showError('Enter password!');
        return;
      }
      setActiveIndex(2);
    } else {
      if (!servicesDescription) {
        showError('Enter some description of your Services');
        return;
      }
      const data = {
        fullName,
        email,
        date,
        password,
        businessName,
        selectedProfession,
        businessAddress,
        phoneNumber,
        websiteOptional,
        socialMedia,
        servicesDescription,
      };
      // console.log(data);
      props.navigation.navigate(NavigationStrings.UploadImage, {
        data: data,
        key: 'profess',
      });
      console.log(data);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {activeIndex == 0 && (
            <>
              <ProgressHeader onPress={onBack} value={1} />
              <SizeBox size={15} />
              <Text style={{...commonStyles.font18W700Center}}>
                Sign up as professional
              </Text>
              <SizeBox size={20} />
              <Text style={styles.basictxt}>
                Basic information ({activeIndex + 1}/4)
              </Text>
              <SizeBox size={10} />
              <CommonInput
                placeholder="Fullname"
                value={fullName}
                onChangeText={(e: string) => setFullName(e)}
              />
              <SizeBox size={10} />
              <CommonInput
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                onChangeText={(e: string) => setEmail(e?.trim())}
              />
              <SizeBox size={10} />
              <CommonInputBtn
                title={
                  date ? moment(date).format('YYYY-MM-DD') : 'Date of Birth'
                }
                onPress={() => setOpen(true)}
              />
              <SizeBox size={10} />
              <CommonInput
                placeholder="Enter Password"
                value={password}
                onChangeText={(e: string) => setPassword(e)}
              />
              <SizeBox size={10} />
              <CommonInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={(e: string) => setConfirmPassword(e)}
              />
              <SizeBox size={40} />
            </>
          )}
          {activeIndex == 1 && (
            <>
              <ProgressHeader onPress={onBack} value={2} />
              <SizeBox size={15} />
              <Text style={{...commonStyles.font18W700Center}}>
                Sign up as professional
              </Text>
              <SizeBox size={20} />
              <Text style={styles.basictxt}>
                Professional details ({activeIndex + 1}/4)
              </Text>
              <SizeBox size={10} />

              <CommonInput
                placeholder="Business Name"
                value={businessName}
                onChangeText={(e: string) => setBusinessName(e)}
              />
              <SizeBox size={10} />
              <CommonInputBtn
                title={selectedProfession ? selectedProfession : 'I am a.. '}
                onPress={() => setDropdown(!dropdown)}
              />
              {dropdown ? (
                <>
                  <SizeBox size={3} />
                  <View style={styles.itemvw}>
                    <FlatList
                      data={[
                        {id: 1, name: 'Promoter'},
                        {id: 2, name: 'Event Organizer'},
                        {id: 3, name: 'Nightclub'},
                        {id: 4, name: 'DJ'},
                      ]}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedProfession(
                              item?.name == 'Event Organizer'
                                ? 'Event_Organizer'
                                : item?.name,
                            );
                            setDropdown(!dropdown);
                          }}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 5,
                          }}>
                          <VectorIcon
                            groupName="Fontisto"
                            name={
                              selectedProfession === item?.name
                                ? 'radio-btn-active'
                                : 'radio-btn-passive'
                            }
                            color={Colors.white}
                            size={12}
                          />
                          <Text
                            style={{
                              ...commonStyles.font14Center,
                              color: Colors.greyTxt,
                              paddingLeft: 5,
                            }}>
                            {item?.name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </>
              ) : null}

              <SizeBox size={10} />
              <CommonInput
                placeholder="Business Address (Optional) "
                value={businessAddress}
                onChangeText={(e: string) => setBusinessAddress(e)}
              />
              <SizeBox size={10} />
              <CommonInput
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(e: string) => setPhoneNumber(e?.trim())}
              />
              <SizeBox size={10} />
              <CommonInput
                placeholder="Website (Optional)"
                value={websiteOptional}
                onChangeText={(e: string) => setWebsiteOptional(e?.trim())}
              />
              <SizeBox size={40} />
            </>
          )}
          {activeIndex == 2 && (
            <>
              <ProgressHeader onPress={onBack} value={3} />
              <SizeBox size={15} />
              <Text style={{...commonStyles.font18W700Center}}>
                Sign up as professional
              </Text>
              <SizeBox size={20} />
              <Text style={styles.basictxt}>
                Additionnal information ({activeIndex + 1}/4)
              </Text>
              <SizeBox size={10} />
              <CommonInput
                placeholder="Add social media links (optional)"
                value={socialMedia}
                onChangeText={(e: string) => setSocialMedia(e)}
              />
              <SizeBox size={10} />
              <CommonInput
                placeholder="Description of your Services"
                value={servicesDescription}
                multiline={true}
                onChangeText={(e: string) => setServicesDescription(e)}
              />
              <SizeBox size={40} />
            </>
          )}
          <CommonBtn onPress={onContinue} title={'Continue'} />
          <DatePicker
            modal
            open={open}
            date={new Date()}
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfessionalInfo;
