import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {CommonInput, SizeBox} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import DropDownComponent from '../../Utilities/Component/DropDownComponent';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

const FeedBack = ({navigation}: any) => {
  const [problem, setProblem] = useState('');
  const [problemBio, setProblemBio] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [suggestionsBio, setSuggestionsBio] = useState('');
  const [share, setShare] = useState('');
  const [shareBio, setSHareBio] = useState('');
  const [other, setOther] = useState('');
  const [otherBio, setOtherBio] = useState('');
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [imagePathArray, setImagePathArray] = useState([]);

  const problemData = [
    {
      label: 'Technical issue (Bugs, slow loading times...)',
      value: 'Technical issue (Bugs, slow loading times...)',
    },
    {
      label: 'Acount issue (Login problems, access denied...)',
      value: 'Acount issue (Login problems, access denied...)',
    },
    {
      label: 'Event issue (Incorrect infos, canceled events...)',
      value: 'Event issue (Incorrect infos, canceled events...)',
    },
    {
      label: 'Behavior issue (inappropriate content, report profile...)',
      value: 'Behavior issue (inappropriate content, report profile...)',
    },
    {
      label: 'Other (Describe your problem or idea)',
      value: 'Other (Describe your problem or idea)',
    },
  ];

  const suggestionsData = [
    {
      label: 'Desired Features (New options...)',
      value: 'Desired Features (New options...)',
    },
    {
      label: 'Improvements to existing features (design, tools...)',
      value: 'Improvements to existing features (design, tools...)',
    },
    {
      label: 'User Experience (Simplify user journeys....)',
      value: 'User Experience (Simplify user journeys....)',
    },
    {
      label: 'Other (Describe your problem or idea)',
      value: 'Other (Describe your problem or idea)',
    },
  ];

  const shareData = [
    {
      label: 'Desired Features (New options...)',
      value: 'Desired Features (New options...)',
    },
    {
      label: 'Positive feedback',
      value: 'Positive feedback',
    },
  ];

  const otherData = [
    {
      label: 'Problem',
      value: 'Problem',
    },
    {
      label: 'Idea',
      value: 'Idea',
    },
    {
      label: 'Other (Describe your problem or idea)',
      value: 'Other (Describe your problem or idea)',
    },
  ];

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      mediaType: 'any',
    })
      .then((image: any) => {
        // setImage(image?.path);
        var imageData: any = [];
        image?.map((res: any) => {
          imageData.push(res?.path);
        });
        // console.log(image, 'image');
        // console.log(imageData, 'imageData');
        setImagePathArray(imageData);
        setShowOptionModal(false);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          setShowOptionModal(false);
          console.log('User canceled image picker');
        } else {
          setShowOptionModal(false);
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      });
  };

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <SizeBox size={5} /> */}
          <View style={styles.header}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{padding: 5}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image source={ImagePath.Arrow_Left_2} />
              </TouchableOpacity>
              <Text
                style={{
                  ...commonStyles.font20White,
                  marginLeft: moderateScale(20),
                }}>
                Give a feedback
              </Text>
            </View>
            <VectorIcon
              groupName="Feather"
              name="search"
              size={20}
              color={Colors.white}
            />
          </View>
          <SizeBox size={5} />
          <Text style={styles.title}>Report a problem</Text>
          <SizeBox size={10} />
          <DropDownComponent
            data={problemData}
            onChange={sel => {
              setProblem(sel?.value);
            }}
            value={problem}
            name={'label'}
            placeHolderValue={'Select problem'}
            selectedHolderStyle={styles.formDropdown}
          />
          <SizeBox size={10} />
          <CommonInput
            placeholder="Write your issue here..."
            value={problemBio}
            onChangeText={(e: string) => {
              setProblemBio(e);
            }}
            styless={styles.multiinput}
            multiline={true}
          />
          <SizeBox size={7} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveIndex(0);
              // setShowOptionModal(true);
              pickImageFromGallery();
            }}
            // onPress={pickImageFromGallery}
            style={{flexDirection: 'row', marginLeft: 10}}>
            <VectorIcon
              groupName="Fontisto"
              name="paperclip"
              color={Colors.white}
              size={20}
            />
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.white,
                marginLeft: 10,
              }}>
              Join document (screenshots, videos, pictures...)
            </Text>
          </TouchableOpacity>
          <SizeBox size={15} />
          <Text style={styles.title}>Improvement Suggestions</Text>
          <SizeBox size={10} />
          <DropDownComponent
            data={suggestionsData}
            onChange={sel => {
              setSuggestions(sel?.value);
            }}
            value={suggestions}
            name={'label'}
            placeHolderValue={'Select problem'}
            selectedHolderStyle={styles.formDropdown}
          />
          <SizeBox size={10} />
          <CommonInput
            placeholder="Write your issue here..."
            value={suggestionsBio}
            onChangeText={(e: string) => {
              setSuggestionsBio(e);
            }}
            styless={styles.multiinput}
            multiline={true}
          />
          <SizeBox size={7} />
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={pickImageFromGallery}
            onPress={() => {
              setActiveIndex(1);
              // setShowOptionModal(true);
              pickImageFromGallery();
            }}
            style={{flexDirection: 'row', marginLeft: 10}}>
            <VectorIcon
              groupName="Fontisto"
              name="paperclip"
              color={Colors.white}
              size={20}
            />
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.white,
                marginLeft: 10,
              }}>
              Join document (screenshots, videos, pictures...)
            </Text>
          </TouchableOpacity>
          <SizeBox size={15} />
          <Text style={styles.title}>Share an Experience</Text>
          <SizeBox size={10} />
          <DropDownComponent
            data={shareData}
            onChange={sel => {
              setShare(sel?.value);
            }}
            value={share}
            name={'label'}
            placeHolderValue={'Select problem'}
            selectedHolderStyle={styles.formDropdown}
          />
          <SizeBox size={10} />
          <CommonInput
            placeholder="Write your issue here..."
            value={shareBio}
            onChangeText={(e: string) => {
              setSHareBio(e);
            }}
            styless={styles.multiinput}
            multiline={true}
          />
          <SizeBox size={7} />
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={pickImageFromGallery}
            onPress={() => {
              setActiveIndex(2);
              // setShowOptionModal(true);
              pickImageFromGallery();
            }}
            style={{flexDirection: 'row', marginLeft: 10}}>
            <VectorIcon
              groupName="Fontisto"
              name="paperclip"
              color={Colors.white}
              size={20}
            />
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.white,
                marginLeft: 10,
              }}>
              Join document (screenshots, videos, pictures...)
            </Text>
          </TouchableOpacity>
          <SizeBox size={15} />
          <Text style={styles.title}>Other</Text>
          <SizeBox size={10} />
          <DropDownComponent
            data={otherData}
            onChange={sel => {
              setOther(sel?.value);
            }}
            value={other}
            name={'label'}
            placeHolderValue={'Select problem'}
            selectedHolderStyle={styles.formDropdown}
          />
          <SizeBox size={10} />
          <CommonInput
            placeholder="Write your issue here..."
            value={otherBio}
            onChangeText={(e: string) => {
              setOtherBio(e);
            }}
            styless={styles.multiinput}
            multiline={true}
          />
          <SizeBox size={7} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setActiveIndex(3);
              // setShowOptionModal(true);
              pickImageFromGallery();
            }}
            // onPress={pickImageFromGallery}
            style={{flexDirection: 'row', marginLeft: 10}}>
            <VectorIcon
              groupName="Fontisto"
              name="paperclip"
              color={Colors.white}
              size={20}
            />
            <Text
              style={{
                ...commonStyles.font12Regular,
                color: Colors.white,
                marginLeft: 10,
              }}>
              Join document (screenshots, videos, pictures...)
            </Text>
          </TouchableOpacity>
          <SizeBox size={15} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignSelf: 'flex-end',
              marginRight: moderateScale(30),
            }}>
            <Text
              style={{
                ...commonStyles.font16WhiteBold,
              }}>
              Send
            </Text>
          </TouchableOpacity>
          <SizeBox size={30} />
        </ScrollView>
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() => setShowOptionModal(false)}
          avoidKeyboard={true}
          style={{flex: 1, margin: 0, justifyContent: 'flex-end'}}
          isVisible={showOptionModal}
          backdropOpacity={0.8}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: moderateScaleVertical(20),
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.option2]}
              // onPress={captureImageWithCamera}
            >
              <Text style={styles.optionText2}>{`  `}Video</Text>
            </TouchableOpacity>
            <SizeBox size={5} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.option2]}
              onPress={pickImageFromGallery}>
              <Text style={styles.optionText2}>{`  `}Photo</Text>
            </TouchableOpacity>
            <SizeBox size={10} />
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  LinearConatiner: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    height: moderateScaleVertical(100),
    width: '100%',
    paddingHorizontal: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...commonStyles.font16WhiteBold,
    marginLeft: moderateScale(20),
  },
  formDropdown: {
    // marginBottom: moderateScaleVertical(18),
    width: '90%',
    height: moderateScale(40),
    borderRadius: 8,
    backgroundColor: Colors.black,
    // alignSelf: 'center',
  },
  multiinput: {
    backgroundColor: Colors.black,
    borderWidth: 0,
    borderRadius: 10,
    ...commonStyles.font10Bold,
  },
  optionContainer: {
    width: '45%',
    paddingVertical: moderateScaleVertical(5),
    borderRadius: 10,
    backgroundColor: Colors.Linear,
    marginTop: moderateScaleVertical(Platform.OS == 'ios' ? 100 : 45),
    alignSelf: 'flex-end',
    marginRight: moderateScale(25),
    opacity: 0.9,
  },
  option: {
    width: '100%',
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  option2: {
    width: '100%',
    paddingVertical: moderateScaleVertical(15),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.appColor,
    justifyContent: 'center',
    borderRadius: 30,
  },
  optionText: {
    ...commonStyles.font10Regular,
    fontWeight: '600',
    color: Colors.white,
  },
  optionText2: {
    ...commonStyles.font14,
    fontWeight: '600',
    color: Colors.white,
  },
});
