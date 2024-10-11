import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import styles from './style';
import {SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {FlatList} from 'react-native';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';

const Chat = ({navigation}: any) => {
  const [button, setButton] = useState('R');

  const onRec = () => {
    setButton('R');
  };
  const onSent = () => {
    setButton('S');
  };
  const onChat = () => {
    navigation.navigate(NavigationStrings.Messages);
  };
  const renderItem = () => (
    <TouchableOpacity style={styles.flex} onPress={onChat}>
      <Image source={ImagePath.ProfileImg} style={styles.userimg} />
      <View>
        <Text numberOfLines={1} style={styles.heading}>
          Hamaza butt
        </Text>
        <SizeBox size={2} />
        <Text
          numberOfLines={1}
          style={[styles.heading, {color: Colors.lightGrey}]}>
          Sure, no problem Hamza!
        </Text>
      </View>
      <View>
        <Text style={[styles.heading, {color: Colors.lightGrey}]}>2d ago</Text>
      </View>
    </TouchableOpacity>
  );
  const renderItemm = () => (
    <TouchableOpacity onPress={onChat}>
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
              />
              <VectorIcon
                groupName="Ionicons"
                name="search"
                size={22}
                color={Colors.white}
              />
            </View>
            <SizeBox size={15} />
            <FlatList data={[{id: 1}, {id: 1}]} renderItem={renderItem} />
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

