import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import styles from './style';
import {
  Loadingcomponent,
  showError,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import {Keyboard} from 'react-native';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import Modal from 'react-native-modal';
import io from 'socket.io-client';
import {useSelector} from 'react-redux';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {chatHistory} from '../../Utilities/Constants/auth';
import ImagePicker from 'react-native-image-crop-picker';

const Messages = ({navigation, route}: any) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loader, setLoader] = useState(false);
  const user = useSelector((data: any) => data?.auth?.userData);
  const [image, setImage] = useState('');

  const myId = user?.user?.id;
  const selectedUser = route?.params?.userdata?._id;

  const roomid =
    selectedUser > myId ? myId + '-' + selectedUser : selectedUser + '-' + myId;
  const socket = io('http://13.48.250.217:3003/', {
    withCredentials: true,
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('joinRoom', {
        sender: user?.user?.id,
        roomId: roomid,
      });
      getChatHistory();
    });

    const getChatHistory = () => {
      setLoader(true);
      chatHistory(roomid)
        .then((res: any) => {
          setLoader(false);
          setMessages(res?.data?.messages?.reverse());
        })
        .catch(err => {
          setLoader(false);
          showError(err?.message);
          console.log(err, 'error');
        });
    };
    socket.on('connect_error', err => {
      console.log('Socket connection error: ', err);
    });

    socket.on('message', newMessage => {
      setMessages((prevMessages): any => [...prevMessages, newMessage]);
    });

    socket.on('typing', ({userId}) => {
      if (userId !== myId) {
        setIsTyping(true);
      }
    });

    socket.on('stopTyping', ({userId}) => {
      if (userId !== myId) {
        setIsTyping(false);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [roomid]);

  const handleTyping = (text: string) => {
    setNewMessage(text);

    if (text.length > 0) {
      socket.emit('typing', {roomId: roomid, userId: myId});
    }

    if (text.length === 0) {
      socket.emit('stopTyping', {roomId: roomid, userId: myId});
    }
  };

  const handleSend = () => {
    if (newMessage.trim().length > 0 || image.length > 0) {
      // console.log('handleSend');
      console.log(image, 'handleSend');
      socket.emit('message', {
        sender: user?.user?.id,
        roomId: roomid,
        message: newMessage,
        attachment: null,
        // attachment: image.length > 0 ? image : null,
        isGroup: false,
      });
    }
    socket.emit('stopTyping', {roomId: roomid, userId: myId});
    setNewMessage('');
    setImage('');
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  const onProfile = () => {
    setShowModal(true);
  };
  const onAdd = () => {
    setShowModal(false);
    navigation.navigate(NavigationStrings.AddPeople);
  };
  const onEdit = () => {
    setShowModal(false);
    navigation.navigate(NavigationStrings.EditGroup);
  };

  const renderItem = ({item}: any) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === user?.user?.id ? styles.myMessage : styles.otherMessage,
      ]}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
    })
      .then((image: any) => {
        setImage(image?.path);
        console.log(image, 'image');
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

  const captureImageWithCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image: any) => {
        setImage(image?.path);
        console.log(image, 'image');
        setShowOptionModal(false);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          setShowOptionModal(false);
          console.log('User canceled camera');
        } else {
          setShowOptionModal(false);
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: Colors.Linear}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      //   keyboardVerticalOffset={50}
    >
      <Loadingcomponent isVisible={loader} />
      <LinearGradient
        colors={[Colors.Linear, Colors.LinearBlack, Colors.Linear]}
        start={{x: 0, y: 0}}
        end={{x: 1.3, y: 0.9}}
        style={styles.conatiner}>
        <SafeAreaView style={{flex: 1}}>
          <SizeBox size={10} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <VectorIcon
              groupName={'Ionicons'}
              name={'chevron-back'}
              size={25}
              onPress={onGoBack}
            />
            <View>
              <Text
                style={{
                  ...commonStyles.font16White,
                  alignSelf: 'center',
                  color: Colors.white,
                }}>
                {route?.params?.userdata?.username}
              </Text>
              <SizeBox size={2} />
              {/* <Text
                style={{...commonStyles.font12Regular, color: Colors.greyTxt}}>
                Last seen at 07:08 AM
              </Text> */}
            </View>
            <TouchableOpacity

            // onPress={onProfile}
            >
              {route?.params?.userdata?.pictures?.length ? (
                <Image
                  source={{
                    uri: IMAGE_URL + route?.params?.userdata?.pictures[0],
                  }}
                  style={{
                    width: moderateScale(40),
                    height: moderateScaleVertical(40),
                    borderRadius: 15,
                  }}
                />
              ) : (
                <Image
                  source={ImagePath.ProfileImg}
                  style={{
                    width: moderateScale(40),
                    height: moderateScaleVertical(40),
                    borderRadius: 15,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Fragment>
              <SizeBox size={10} />
              {messages?.length > 0 ? (
                <FlatList
                  data={messages}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.messagesContainer}
                />
              ) : (
                <Text style={{...commonStyles.font14Center}}>
                  Let start conversation !!
                </Text>
              )}
            </Fragment>
          </TouchableWithoutFeedback>
          {isTyping && <Text style={{color: Colors.white}}>typing...</Text>}
          <SizeBox size={10} />
        </SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: moderateScaleVertical(30),
          }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={handleTyping}
              placeholderTextColor={Colors.greyTxt}
              placeholder="Type a message..."
              multiline
            />
            <TouchableOpacity activeOpacity={0.8} onPress={handleSend}>
              <VectorIcon
                groupName="Ionicons"
                name="send-outline"
                size={28}
                color={Colors.lightPink}
              />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={styles.sendButton}>
            <VectorIcon
              groupName="Feather"
              name="mic"
              size={22}
              color={Colors.lightPink}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.sendButton}
            activeOpacity={0.8}
            onPress={() => setShowOptionModal(true)}>
            <VectorIcon
              groupName="Feather"
              name="paperclip"
              size={22}
              color={Colors.lightPink}
            />
          </TouchableOpacity>
        </View>
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() => setShowModal(false)}
          avoidKeyboard={true}
          style={{flex: 1, margin: 0, justifyContent: 'flex-start'}}
          isVisible={showModal}
          backdropOpacity={0.2}>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              onPress={onEdit}
              activeOpacity={0.8}
              style={styles.option}>
              <VectorIcon groupName="Feather" name="edit" size={15} />
              <Text style={styles.optionText}>{` `}Edit </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAdd}
              activeOpacity={0.8}
              style={styles.option}>
              <VectorIcon groupName="AntDesign" name="adduser" size={15} />
              <Text style={styles.optionText}>{` `}Add </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.option}>
              <VectorIcon groupName="EvilIcons" name="bell" size={15} />
              <Text style={styles.optionText}>{` `}Mute / Unmute</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.option}>
              <VectorIcon groupName="MaterialIcons" name="logout" size={15} />
              <Text style={styles.optionText}>{` `}Leave</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
              onPress={captureImageWithCamera}>
              <VectorIcon groupName="Entypo" name="camera" size={20} />
              <Text style={styles.optionText2}>{`  `}Camera</Text>
            </TouchableOpacity>
            <SizeBox size={5} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.option2]}
              onPress={pickImageFromGallery}>
              <VectorIcon groupName="FontAwesome" name="photo" size={20} />
              <Text style={styles.optionText2}>{`  `}Gallery</Text>
            </TouchableOpacity>
            <SizeBox size={10} />
          </View>
        </Modal>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Messages;
