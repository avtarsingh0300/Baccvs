import {
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
import {SizeBox} from '../../Utilities/Component/Helpers';
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

const Messages = ({navigation, route}: any) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const user = useSelector((data: object) => data?.auth?.userData);

  const myId = user?.user?.id;
  const selectedUser = route?.params?.userdata?._id;
  console.log(myId, 'my id');
  const roomid =
    selectedUser > myId ? myId + '-' + selectedUser : selectedUser + '-' + myId;
  const socket = io('http://13.48.250.217:3003/', {
    withCredentials: true,
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');

      socket.emit('joinRoom', {
        sender: user?.user?.id,
        roomId: roomid,
      });
    });

    socket.on('connect_error', err => {
      console.log('Socket connection error: ', err);
    });

    socket.on('message', newMessage => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
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
    console.log(newMessage);
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

  const renderItem = ({item}: any) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === user?.user?.id ? styles.myMessage : styles.otherMessage,
      ]}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: Colors.Linear}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      //   keyboardVerticalOffset={50}
    >
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
              {route?.params?.userdata?.pictures[0] ? (
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
              <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messagesContainer}
              />
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
            marginBottom: 50,
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
            <TouchableOpacity onPress={handleSend}>
              <VectorIcon
                groupName="Ionicons"
                name="send-outline"
                size={28}
                color={Colors.lightPink}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <VectorIcon
              groupName="Feather"
              name="mic"
              size={22}
              color={Colors.lightPink}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
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
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Messages;
