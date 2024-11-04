import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import styles from './style';
import {Loadingcomponent, SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {FlatList} from 'react-native';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {getUserLastChats} from '../../Utilities/Constants/auth';
import moment from 'moment';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';

const Chat = ({navigation}: any) => {
  const [button, setButton] = useState('R');
  const [search, setSearch] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatSearchHistory, setSearchChatHistory] = useState([]);
  const [loader, setLoader] = useState(false);

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

  useEffect(() => {
    if (search?.length > 0) {
      getSearchData();
    } else {
      setLoader(true);
      getChatHistory();
    }
  }, [search]);

  const getChatHistory = () => {
    getUserLastChats('')
      .then((res: any) => {
        console.log(res, 'res in getUserLastChats');
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
          console.log(res, 'res in getSearchData');
          setSearchChatHistory(res?.chats);
          setLoader(false);
        })
        .catch((err: any) => {
          console.log(err, 'err in getSearchData');
          setLoader(false);
        });
    }, 1500);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.flex}
      onPress={() => {
        onChat(item);
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
        <Text style={[styles.heading, {color: Colors.lightGrey}]}>
          {moment(item?.timestamp).startOf('day').fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
        <View style={styles.buttongroup}>
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
          </View>
          <Text
            onPress={onSent}
            style={[
              {...commonStyles.font16WhiteBold},
              {color: button === 'S' ? Colors.Pink : Colors.white},
            ]}>
            Matchs
          </Text>
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
