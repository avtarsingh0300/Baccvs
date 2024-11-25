import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import styles from './style';
import {Loadingcomponent, SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {
  getUserLastChats,
  readMessageHandler,
  sendUserStatus,
} from '../../Utilities/Constants/auth';
import moment from 'moment';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {useSelector} from 'react-redux';

const Chat = ({navigation}: any) => {
  const [button, setButton] = useState('R');
  const [search, setSearch] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatSearchHistory, setSearchChatHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  const user = useSelector((data: any) => data?.auth?.userData);

  const onRec = () => {
    setButton('R');
  };

  const onSent = () => {
    setButton('S');
  };

  const onChat = (item: any) => {
    navigation.navigate(NavigationStrings.Messages, {
      userdata: {
        _id: item?.otherUser?.id,
        username: item?.otherUser?.name,
        pictures: [item?.otherUser?.image],
      },
    });
  };

  // useEffect(() => {
  //   const socket = io('http://13.48.250.217:3003/', {
  //     withCredentials: true,
  //     transports: ['websocket'],
  //   });
  //   socket.on('message', newMessage => {
  //     console.log(newMessage, 'newMessage');
  //     // setMessages(prevMessages => [...prevMessages, newMessage]);
  //     getChatHistory();
  //   });

  //   socket.on('connect_error', error => {
  //     console.error('Connection error:', error);
  //   });

  //   socket.on('disconnect', reason => {
  //     console.log('Disconnected:', reason);
  //   });

  //   // Clean up on component unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const _unsubscribe = navigation.addListener('focus', () => {
      if (search?.length == 0) {
        setLoader(true);
        getChatHistory();
        showStatusHandler();
      }
    });
    return () => {
      _unsubscribe();
    };
  }, [search]);

  const showStatusHandler = () => {
    const data = {
      status: true,
      lastseen: '',
    };
    sendUserStatus(data)
      .then(res => {
        // console.log(res, 'res in sendUserStatus');
      })
      .catch(err => {
        console.log(err, 'err in sendUserStatus');
      });
  };

  useEffect(() => {
    if (search?.length > 0) {
      getSearchData();
    }
  }, [search]);

  const getChatHistory = () => {
    getUserLastChats('')
      .then((res: any) => {
        // console.log(res, 'res in getUserLastChats');
        setChatHistory(res?.chats);
        setLoader(false);
      })
      .catch((err: any) => {
        console.log(err, 'err in getUserLastChats');
        setLoader(false);
      });
  };

  const getSearchData = () => {
    setTimeout(() => {
      setLoader(true);
      getUserLastChats(`?username=${search}`)
        .then((res: any) => {
          // console.log(res, 'res in getSearchData');
          setSearchChatHistory(res?.chats);
          setLoader(false);
        })
        .catch((err: any) => {
          console.log(err, 'err in getSearchData');
          setLoader(false);
        });
    }, 1500);
  };

  const updateReadMessageHandler = (item: any) => {
    readMessageHandler(item?._id)
      .then(res => {
        onChat(item);
        console.log(res, 'res in readMessage');
      })
      .catch(err => {
        console.log(err, 'err in readMessage');
      });
  };

  const renderItem = ({item}: any) => {
    // console.log(item, 'item');
    return (
      <TouchableOpacity
        style={styles.flex}
        onPress={() => {
          if (!item?.read_status) {
            updateReadMessageHandler(item);
          } else {
            onChat(item);
          }
        }}>
        <Image
          source={
            item?.otherUser?.image?.length > 0
              ? {uri: IMAGE_URL + item?.otherUser?.image}
              : ImagePath.ProfileImg
          }
          style={styles.userimg}
        />
        <View>
          <Text numberOfLines={1} style={styles.heading}>
            {item?.otherUser?.name}
          </Text>
          <SizeBox size={2} />
          <Text
            numberOfLines={1}
            style={[styles.heading, {color: Colors.lightGrey}]}>
            {item?.message}
          </Text>
        </View>
        <View>
          <Text
            style={[styles.heading, {color: Colors.lightGrey, paddingLeft: 0}]}>
            {moment(item?.createdate).startOf('day').fromNow()}
          </Text>
          {!item?.read_status && user?.user?.id != item?.sender && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: Colors.white,
                marginTop: 10,
                marginLeft: 25,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemm = ({item}: any) => (
    <TouchableOpacity
      onPress={() => {
        // onChat(item);
      }}>
      <Image
        source={ImagePath.ProfileImg}
        style={[styles.userimg, {marginLeft: 10}]}
      />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.conatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <SizeBox size={10} />
        {/* <View style={styles.buttongroup}>
          <View>
            <Text
              onPress={onRec}
              style={[
                {...commonStyles.font16WhiteBold},
                {color: button === 'R' ? Colors.Pink : Colors.white},
              ]}>
              Messages
            </Text>
            <View style={styles.reddot}>
              <Text style={styles.dottxt}>99+</Text>
            </View>
          </View> */}
        {/* <Text
            onPress={onSent}
            style={[
              {...commonStyles.font16WhiteBold},
              {color: button === 'S' ? Colors.Pink : Colors.white},
            ]}>
            Matchs
          </Text> */}
        {/* </View> */}
        <View style={{alignSelf: 'center'}}>
          <Text
            style={[{...commonStyles.font18W700Center}, {color: Colors.white}]}>
            Messages
          </Text>
          {/* <View style={styles.reddot}>
            <Text style={styles.dottxt}>99+</Text>
          </View> */}
        </View>
        <SizeBox size={10} />
        {button === 'R' ? (
          <>
            <View style={styles.inputcontainer}>
              <TextInput
                placeholder="Search"
                placeholderTextColor={Colors.white}
                style={styles.input}
                value={search}
                onChangeText={(e: string) => {
                  setSearch(e);
                }}
              />
              <VectorIcon
                groupName="Ionicons"
                name="search"
                size={22}
                color={Colors.white}
              />
            </View>
            <SizeBox size={15} />
            <FlatList
              data={search?.length > 0 ? chatSearchHistory : chatHistory}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <>
            <SizeBox size={20} />
            <Text style={{...commonStyles.Heading20font, textAlign: 'left'}}>
              Groups matchs (23)
            </Text>
            <SizeBox size={10} />
            <FlatList
              horizontal
              data={[{id: 1}, {id: 1}]}
              renderItem={renderItemm}
            />
            <SizeBox size={15} />
            <Text style={{...commonStyles.Heading20font, textAlign: 'left'}}>
              New matchs (76)
            </Text>
            <SizeBox size={5} />
            <FlatList
              horizontal
              data={[{id: 1}, {id: 1}]}
              renderItem={renderItemm}
            />
            <SizeBox size={15} />
            <Text style={{...commonStyles.Heading20font, textAlign: 'left'}}>
              Matchs messages (128)
            </Text>
            <FlatList data={[{id: 1}, {id: 1}]} renderItem={renderItem} />
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Chat;
