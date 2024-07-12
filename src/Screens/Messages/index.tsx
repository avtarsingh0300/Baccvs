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
import React, {Fragment, useState} from 'react';
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
const initialMessages = [
  {id: '1', text: 'Hello!', sender: 'other'},
  {id: '2', text: 'Hi! How are you?', sender: 'me'},
  {id: '3', text: 'I am good, thank you!', sender: 'other'},
  {id: '4', text: 'What about you?', sender: 'other'},
  {id: '5', text: 'I am doing well too.', sender: 'me'},
];

const Messages = ({navigation}: any) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleSend = () => {
    if (newMessage.trim().length > 0) {
      const newMessageObject = {
        id: (messages.length + 1).toString(),
        text: newMessage,
        sender: 'me',
      };
      setMessages([...messages, newMessageObject]);
      setNewMessage('');
    }
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}: any) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );
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
              <Text style={{...commonStyles.font16White, alignSelf: 'center'}}>
                Mark Zakrbarg
              </Text>
              <SizeBox size={2} />
              <Text
                style={{...commonStyles.font12Regular, color: Colors.greyTxt}}>
                Last seen at 07:08 AM
              </Text>
            </View>
            <TouchableOpacity onPress={onProfile}>
              <Image
                source={ImagePath.ProfileImg}
                style={{
                  width: moderateScale(40),
                  height: moderateScaleVertical(40),
                  borderRadius: 15,
                }}
              />
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
              onChangeText={setNewMessage}
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
