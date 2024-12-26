import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {getMyGroups, selectTeam} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {moderateScale} from '../../Utilities/Styles/responsiveSize';
import moment from 'moment';
const MyGroups = ({navigation, route}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const onList = () => {
    // setShowModal(!showModal);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = () => {
    setLoader(true);
    getMyGroups()
      .then((res: any) => {
        let filteData = res?.data?.filter((i: any) => i?.status == 1);
        if (filteData?.length == 0) {
          selectTeamHandler2(res?.data[0]?._id, false);
        } else {
          setLoader(false);
          setGroupData(res?.data);
        }
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };

  const selectTeamHandler2 = (id: string, flag: boolean) => {
    const formData = {
      id: id,
      status: flag ? 0 : 1,
    };
    selectTeam(formData)
      .then(res => {
        getGroups2();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };

  const getGroups2 = () => {
    getMyGroups()
      .then((res: any) => {
        setGroupData(res?.data);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };

  const selectTeamHandler = (id: string, flag: boolean) => {
    const formData = {
      id: id,
      status: flag ? 0 : 1,
    };
    selectTeam(formData)
      .then(res => {
        getGroups();
        console.log(res, 'res inselectTeam');
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };

  const renderItem = useCallback(
    ({item, index}: any) => {
      const filterData = item?.status == 1;
      return (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: filterData ? '#7464A3' : Colors.transparent,
            }}
            onPress={() => {
              setLoader(true);
              selectTeamHandler(item?._id, filterData);
            }}>
            <SizeBox size={7} />
            <FlatList
              horizontal
              data={item?.members}
              renderItem={renderItemm}
            />
            <SizeBox size={10} />
            <View style={styles.flexvw}>
              <View>
                <Text style={{...commonStyles.font20W400, color: Colors.white}}>
                  {item?.name}
                </Text>
                <Text
                  style={{
                    ...commonStyles.font10Regular,
                    color: '#8A8A8F',
                    marginTop: 5,
                  }}>
                  {moment(item?.createdAt).format('MMMM Do YYYY')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: route?.params?.name == 'Select team' ? '15%' : '25%',
                  justifyContent: 'space-between',
                }}>
                {route?.params?.name !== 'Select team' && (
                  <VectorIcon groupName="AntDesign" name="delete" size={24} />
                )}
                <VectorIcon groupName="Feather" name="edit" size={24} />
                <VectorIcon groupName="AntDesign" name="eyeo" size={24} />
              </View>
            </View>
            <SizeBox size={7} />
            {groupData.length - 1 !== index && <View style={styles.border} />}
          </TouchableOpacity>
          <SizeBox size={1} />
        </>
      );
    },
    [activeIndex, route?.params?.name],
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
      colors={[
        Colors.backgroundNew,
        Colors.backgroundNew,
        Colors.backgroundNew,
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <SizeBox size={10} />
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <Image source={ImagePath.Arrow_Left_2} />
            </TouchableOpacity>
            <Text
              style={{
                ...commonStyles.Heading20font,
                marginLeft: moderateScale(20),
              }}>
              {route?.params?.name == 'Select team'
                ? 'Select team'
                : 'My teams'}
            </Text>
          </View>
          <VectorIcon
            groupName="Entypo"
            name="menu"
            size={32}
            color={Colors.white}
            onPress={onList}
          />
        </View>
        <SizeBox size={5} />
        <Text
          style={{
            ...commonStyles.font12Regular,
            color: '#979797',
            marginHorizontal: moderateScale(43),
          }}>
          {route?.params?.name == 'Select team'
            ? 'In this section, you select the group that will appear to the other users if you send them a like.'
            : 'In this section, you can edit, delete or have a preview of your profile'}
        </Text>
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
