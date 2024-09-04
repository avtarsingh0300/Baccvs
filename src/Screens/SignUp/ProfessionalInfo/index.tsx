import { View, Text } from 'react-native'
import React, { useState } from 'react'
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../Utilities/Styles/colors';
import styles from './style';
import { SafeAreaView } from 'react-native';
import { CommonBtn, CommonInput, ProgressHeader, SizeBox } from '../../../Utilities/Component/Helpers';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ProfessionalInfo = (props:any) => {
    const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeIndex,setActiveIndex] = useState('');
  const [businessName,setBusinessName] = useState(0);
  const [profession,setProfession] = useState('');
  const [businessAddress,setBusinessAddress] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [websiteOptional,setWebsiteOptional] = useState('');
  const [servicesDescription,setServicesDescription] = useState('');
  const [socialMedia,setSocialMedia] = useState('');
    const onBack = () => {
        if(activeIndex==0){
            props.navigation.goBack();
        }else if(activeIndex==1){
            setActiveIndex(0);
        }else{
            setActiveIndex(1)
        }
      };
      const onContinue = () => {
          if(activeIndex==0){
              setActiveIndex(1);
            }else if(activeIndex==1){
                setActiveIndex(2);
            }else{
                props.navigation.navigate(NavigationStrings.UploadImage,{data:[]});
                // setActiveIndex(3);
        }
      };
      
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        {activeIndex==0&&<>
        <ProgressHeader onPress={onBack} value={1} />
        <SizeBox size={15} />
        <Text style={{...commonStyles.font18W700Center}}>
        Sign up as professional
        </Text>
        <SizeBox size={10} />
        <Text style={styles.basictxt}>
        Basic information ({activeIndex+1}/4)
        </Text>
        <SizeBox size={20} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          
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
          <CommonInput
            placeholder="Date of Birth"
            keyboardType="nummber"
            value={birthDate}
            onChangeText={(e: string) => setBirthDate(e?.trim())}
            />
          <SizeBox size={10} />
          <CommonInput
            placeholder="Email Password"
            value={password}
            onChangeText={(e: string) => setPassword(e?.trim())}
            />
          <SizeBox size={10} />
          <CommonInput
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(e: string) => setConfirmPassword(e?.trim())}
            />
        <SizeBox size={40} />
        </KeyboardAwareScrollView>
        </>}
        {activeIndex==1&&<>
            <ProgressHeader onPress={onBack} value={2} />
        <SizeBox size={15} />
        <Text style={{...commonStyles.font18W700Center}}>
        Sign up as professional
        </Text>
        <SizeBox size={10} />
        <Text style={styles.basictxt}>
        Professional details ({activeIndex+1}/4)
        </Text>
        <SizeBox size={20} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          
          <SizeBox size={10} />
         <CommonInput
         placeholder="Business Name"
         value={businessName}
         onChangeText={(e: string) => setBusinessName(e)}
         />
       <SizeBox size={10} />
       <CommonInput
         placeholder="I am a..."
         value={profession}
         onChangeText={(e: string) => setProfession(e?.trim())}
         />
       <SizeBox size={10} />
       <CommonInput
         placeholder="Business Address (Optional) "
         value={businessAddress}
         onChangeText={(e: string) => setBusinessAddress(e?.trim())}
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
          </KeyboardAwareScrollView>
        </>}
        {activeIndex==2&&<>
            <ProgressHeader onPress={onBack} value={3} />
        <SizeBox size={15} />
        <Text style={{...commonStyles.font18W700Center}}>
        Sign up as professional
        </Text>
        <SizeBox size={10} />
        <Text style={styles.basictxt}>
        Additionnal information ({activeIndex+1}/4)
        </Text>
        <SizeBox size={20} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          
          <SizeBox size={10} />
         <CommonInput
         placeholder="Add social media links"
         value={socialMedia}
         onChangeText={(e: string) => setSocialMedia(e)}
         />
       <SizeBox size={10} />
       <CommonInput
         placeholder="Description of your Services"
         value={servicesDescription}
         multiline={true}
         onChangeText={(e: string) => setServicesDescription(e?.trim())}
         />
     <SizeBox size={40} />
          </KeyboardAwareScrollView>        
        </>}
        <CommonBtn onPress={onContinue} title={'Continue'} />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default ProfessionalInfo