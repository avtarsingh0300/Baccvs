import { FlatList, SafeAreaView, Text, View } from 'react-native';
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
  SizeBox,
} from '../../../Utilities/Component/Helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useScroll from '../../../Utilities/Component/hooks/useScroll';
import fontFamily from '../../../Utilities/Styles/fontFamily';
import VectorIcon from '../../../Utilities/Component/vectorIcons';
import Modal from 'react-native-modal';
import { height } from '../../../Utilities/Styles/responsiveSize';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';

const RegisterScreen = (props: any) => {
  const scrollConfig = useScroll();
  const [h, setH] = useState(0);
  const { focusAction, scrollRef } = scrollConfig;
  const [selectedGender, setSelectedGender] = useState('Male');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const genders = ['Male', 'Female', 'Other'];

  const onBack = () => {
    props.navigation.goBack();
  };
  const onContinue = () => {
    props.navigation.navigate(NavigationStrings.UploadImage);
  };

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
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
          <Text style={{ ...commonStyles.font18W700Center }}>Sign up</Text>
          <SizeBox size={10} />
          <Text
            style={{
              ...commonStyles.font14Center,
              color: Colors.greyTxt,
              textAlign: 'center',
              width: '70%',
            }}>
            Please fill out the form carefully to complete your registration.
          </Text>
          <SizeBox size={10} />
          <CommonInput placeholder="Fullname" />
          <SizeBox size={10} />

          <CommonInput
            placeholder="Email Address"
            keyboardType="email-address"
          />
          <SizeBox size={10} />
          <CommonInputBtn
            title="Date of Birth"
            onPress={() => console.log('ok')}
          />
          <SizeBox size={10} />

          <CommonInputBtn
            title="Choose your username"
            onPress={() => console.log('ok')}
          />
          <SizeBox size={10} />
          <Text
            style={{
              color: Colors.lightGrey,
              fontFamily: fontFamily.time_regular,
            }}>
            Please use an instagram account that is most representative of your
            online identity as it will be used for verification purposes.
          </Text>
          <SizeBox size={15} />
          <View>
            <CommonInputBtn
              title="Select your gender"
              onPress={() => setModalVisible(true)}
            />
            <Modal
              isVisible={modalVisible}
              style={{
                justifyContent: 'flex-end',
                margin: 0,
              }}
              onBackdropPress={() => setModalVisible(false)}
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
                    data={genders}
                    renderItem={({ item, index }) => (
                      <View
                        style={[
                          {
                            borderBottomWidth: index === 2 ? 0 : 1,
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
                          {item}
                        </Text>
                        <VectorIcon
                          groupName="MaterialCommunityIcons"
                          name="radiobox-blank"
                          size={18}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <SizeBox size={10} />
          <Text style={styles.biotxt}>Bio</Text>

          <SizeBox size={10} />
          <CommonInput
            multiline={true}
            placeholder="Write a little bio to make people know you better."
          />
          <SizeBox size={10} />

          <CommonInput placeholder="Languages" />
          <SizeBox size={10} />
          <CommonInput placeholder="Password" />
          <SizeBox size={10} />
          <CommonInput placeholder="Confirm password" />
          <SizeBox size={20} />
          <CommonBtn onPress={onContinue} title={'Continue'} />
        </KeyboardAwareScrollView>
        <SizeBox size={20} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterScreen;
