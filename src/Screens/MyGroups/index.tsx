import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import styles from './styles';
import ImagePath from '../../Utilities/Constants/ImagePath';
import Modal from 'react-native-modal';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {getMyGroups} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
const MyGroups = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const onList = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getGroups();
  }, []);
  const getGroups = () => {
    setLoader(true);
    getMyGroups()
      .then(res => {
        setLoader(false);
        setGroupData(res?.data);
        console.log(JSON.stringify(res));
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };

  const renderItem = ({item}: any) => (
    <View>
      <FlatList horizontal data={item?.members} renderItem={renderItemm} />

      <SizeBox size={10} />
      <View style={styles.flexvw}>
        <TouchableOpacity style={styles.infobtn}>
          <Text style={{color: Colors.white}}>i</Text>
        </TouchableOpacity>
        <Text style={{...commonStyles.font20W400, color: Colors.white}}>
          {item?.name}
        </Text>
        <VectorIcon groupName="Feather" name="edit" size={24} />
      </View>
      <SizeBox size={15} />
      <View style={styles.border} />
      <SizeBox size={10} />
    </View>
  );
  const renderItemm = ({index, item}: any) => (
    <View>
      {index == 0 ? (
        <Text
          style={{
            ...commonStyles.font12Bold,
            alignSelf: 'center',
          }}>
          Me
        </Text>
      ) : (
        <Text></Text>
      )}
      {item?.picture ? (
        <ImageBackground
          borderRadius={10}
          source={{uri: IMAGE_URL + item?.picture}}
          style={styles.img}>
          {index !== 0 ? (
            <Text style={styles.username}>{item?.fullName}</Text>
          ) : null}
        </ImageBackground>
      ) : (
        <ImageBackground
          borderRadius={10}
          source={ImagePath.ProfileImg}
          style={styles.img}>
          {index !== 0 ? (
            <Text style={styles.username}>{item?.fullName}</Text>
          ) : null}
        </ImageBackground>
      )}
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.Linear, Colors.LinearBlack, Colors.LinearBlack]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <SizeBox size={10} />
        <View style={styles.header}>
          <View style={{width: '15%'}} />
          <Text style={{...commonStyles.Heading20font}}>My groups</Text>
          <VectorIcon
            groupName="Entypo"
            name="menu"
            size={32}
            color={Colors.white}
            onPress={onList}
          />
        </View>

        <SizeBox size={15} />
        <FlatList data={groupData} renderItem={renderItem} />
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
          <View style={[styles.optionContainer, {width: '45%'}]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.option}
              onPress={() => {
                navigation.navigate(NavigationStrings.CreateGroup);
                setShowModal(false);
              }}>
              <Text style={styles.optionText}>New group</Text>
              <VectorIcon
                groupName="FontAwesome"
                name="question-circle-o"
                size={18}
                color={Colors.Pink}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(NavigationStrings.MyGroups);
                setShowModal(false);
              }}
              activeOpacity={0.8}
              style={[styles.option, {borderBottomWidth: 0}]}>
              <Text style={styles.optionText}>Select group</Text>
              <VectorIcon
                groupName="FontAwesome"
                name="question-circle-o"
                size={18}
                color={Colors.Pink}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MyGroups;
