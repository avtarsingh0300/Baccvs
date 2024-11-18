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
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
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
import {AWS_S3_FILE_URL, IMAGE_URL} from '../../Utilities/Constants/Urls';
import {
  chatHistory,
  generateSignedUrlToUploadOn,
} from '../../Utilities/Constants/auth';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import axios from 'axios';
import {Buffer} from 'buffer';
import FastImage from 'react-native-fast-image';
import Video, {VideoRef} from 'react-native-video';
import moment from 'moment';

const Messages = ({navigation, route}: any) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [imageSelected, setImageSelected] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loader, setLoader] = useState(false);
  const user = useSelector((data: any) => data?.auth?.userData);
  const videoRef = useRef<VideoRef>(null);

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
    if (newMessage.trim().length > 0) {
      socket.emit('message', {
        sender: user?.user?.id,
        roomId: roomid,
        message: newMessage,
        attachment: null,
        isGroup: false,
      });
    }
    socket.emit('stopTyping', {roomId: roomid, userId: myId});
    setNewMessage('');
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

  const getFileInfo = useCallback(
    (path: string) => {
      // Extract the file name from the path
      const fileName = path.split('/').pop() || ''; // Extracts "image_1730809870413.jpg"
      const isImage = fileName.match(/\.(jpg|jpeg|png|gif)$/i) ? true : false;
      const isVideo = fileName.match(/\.(mp4|mov|avi|mkv)$/i) ? true : false;

      // Determine the file type
      let fileType = '';
      if (isImage) {
        fileType = 'image';
      } else if (isVideo) {
        fileType = 'video';
      } else {
        fileType = 'unknown';
      }

      return {fileName, fileType};
    },
    [imageSelected],
  );

  const getMessageTimeStatus = (timestamp: string) => {
    const messageDate = moment(timestamp);
    const today = moment().startOf('day');

    if (messageDate.isSame(today, 'day')) {
      return 'Today';
    } else if (messageDate.isSame(today.clone().subtract(1, 'day'), 'day')) {
      return 'Yesterday';
    } else {
      return messageDate.format('MMM D');
    }
  };

  const renderItem = ({item, index}: any) => {
    // console.log(item, 'ietmmmm', index);
    const prevItem = index >= 0 ? messages[index - 1] : null;
    const showDateSeparator =
      index == 0 ||
      !moment(item?.timestamp).isSame(moment(prevItem?.timestamp), 'day');
    return (
      <>
        {showDateSeparator && (
          <View style={styles.dateSeparator}>
            <Text style={styles.dateSeparatorText}>
              {getMessageTimeStatus(item?.timestamp)}
            </Text>
          </View>
        )}
        {item?.message?.trim()?.length > 0 || item?.attachment != null ? (
          <>
            {item?.attachment == null ? (
              <View
                style={[
                  styles.messageContainer,
                  item.sender === user?.user?.id
                    ? styles.myMessage
                    : styles.otherMessage,
                  {padding: item?.attachment == null ? 12 : 5},
                ]}>
                <Text style={styles.messageText}>{item?.message}</Text>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setImageSelected(item?.attachment);
                  setShowPreviewModal(true);
                }}
                style={[
                  styles.messageContainer,
                  item.sender === user?.user?.id
                    ? styles.myMessage
                    : styles.otherMessage,
                  {padding: item?.attachment == null ? 12 : 5},
                ]}>
                <FastImage
                  source={{uri: AWS_S3_FILE_URL + item?.attachment}}
                  style={{
                    width: moderateScale(100),
                    height: moderateScaleVertical(100),
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            )}
          </>
        ) : null}
      </>
    );
  };
  // item?.attachment == null

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
      mediaType: 'video',
    })
      .then((images: any) => {
        generateSignedUrlToUploadOn(roomid, images)
          .then(async res => {
            const filePath = Platform.OS === 'ios' ? images.url : images.path;
            await uploadToS3(res, filePath, {
              url2:
                images?.mime === 'video/mp4'
                  ? `attachment/${roomid}/video_${images?.modificationDate}.mp4`
                  : `attachment/${roomid}/image_${images?.modificationDate}.jpg`,
              ...images,
            });
            console.log(res, 'res in generateSignedUrlToUploadOn');
            setShowOptionModal(false);
          })
          .catch(err => {
            setShowOptionModal(false);
            console.log(err, 'errf in generateSignedUrlToUploadOn');
          });
        // console.log(image, 'image');
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
      mediaType: 'video',
    })
      .then((images: any) => {
        generateSignedUrlToUploadOn(roomid, images)
          .then(async res => {
            console.log(res, 'res in generateSignedUrlToUploadOn');
            const filePath = Platform.OS === 'ios' ? images.url : images.path;
            await uploadToS3(res, filePath, {
              url2:
                images?.mime === 'video/mp4'
                  ? `attachment/${roomid}/video_${images?.modificationDate}.mp4`
                  : `attachment/${roomid}/image_${images?.modificationDate}.jpg`,
              ...images,
            });
          })
          .catch(err => {
            console.log(err, 'errf in generateSignedUrlToUploadOn');
          });
        // console.log(image, 'image');
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

  const uploadToS3 = async (signedUrl: any, filePath: any, image: any) => {
    try {
      if (image) {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const sendImage = await axios.put(signedUrl, buffer, {
          headers: {
            'Content-Type': image?.mime, // Set this to match your file type
          },
        });
        if (sendImage) {
          // if (image.length > 0) {
          socket.emit('message', {
            sender: user?.user?.id,
            roomId: roomid,
            message: '',
            attachment: image?.url2,
            isGroup: false,
          });
          // }
          socket.emit('stopTyping', {roomId: roomid, userId: myId});
        }
      }
    } catch (error) {
      console.log('Upload error:', error);
    }
  };

  var {fileName, fileType} = getFileInfo(imageSelected);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: Colors.Linear}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
              activeOpacity={1}
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
                  showsVerticalScrollIndicator={false}
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSend()}
              // onPress={uploadImageHandler}
            >
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
        <Modal
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() => setShowPreviewModal(false)}
          avoidKeyboard={true}
          style={{flex: 1, margin: 0}}
          isVisible={showPreviewModal}
          backdropOpacity={0.8}>
          <SafeAreaView style={{flex: 1}}>
            {fileType == 'video' ? (
              <Video
                // Can be a URL or a local file.
                source={{uri: AWS_S3_FILE_URL + imageSelected}}
                // Store reference
                ref={videoRef}
                style={{flex: 1}}>
                <VectorIcon
                  groupName="Entypo"
                  name="chevron-thin-left"
                  color={Colors.Pink}
                  onPress={() => {
                    setShowPreviewModal(false);
                    setImageSelected('');
                  }}
                  size={24}
                  style={{
                    marginTop: moderateScaleVertical(30),
                    marginLeft: moderateScale(15),
                  }}
                />
              </Video>
            ) : (
              <FastImage
                style={{flex: 1}}
                source={{uri: AWS_S3_FILE_URL + imageSelected}}>
                <VectorIcon
                  groupName="Entypo"
                  name="chevron-thin-left"
                  color={Colors.Pink}
                  onPress={() => {
                    setShowPreviewModal(false);
                    setImageSelected('');
                  }}
                  size={24}
                  style={{
                    marginTop: moderateScaleVertical(30),
                    marginLeft: moderateScale(15),
                  }}
                />
              </FastImage>
            )}
          </SafeAreaView>
        </Modal>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Messages;
