import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../Utilities/Styles/responsiveSize';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Loadingcomponent,
  showError,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {getEventTypes} from '../../Utilities/Constants/auth';
import languages from '../../Utilities/Constants';

const DatingUserProfile = ({navigation}: any) => {
  const [musicStyle, setMusicStyle] = useState([]);
  const [interestType, setInterestType] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedInterestType, setselectedInterestType] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getEventsTypes();
  }, []);

  const getEventsTypes = () => {
    getEventTypes()
      .then(res => {
        console.log(res, 'res');
        setMusicStyle(res?.musictype);
        setInterestType(res?.interesttype);
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{alignSelf: 'center'}}
      onPress={() => {}}>
      <ImageBackground
        source={ImagePath.ProfileImg}
        borderRadius={4}
        style={styles.bottomListImg}>
        <VectorIcon
          groupName="Feather"
          name="play-circle"
          size={80}
          color={Colors.white}
        />
        <Image
          source={ImagePath.ProfileImg}
          style={styles.bottomListMediumImg}
        />
        <Image
          source={ImagePath.ProfileImg}
          style={styles.bottomListSmallImg}
        />
        <Text style={styles.countText}>+8</Text>
      </ImageBackground>
      <SizeBox size={7} />
      <View
        style={{
          width: '75%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <VectorIcon
            groupName="Entypo"
            name="calendar"
            color={Colors.white}
            size={14}
          />
          <Text style={styles.dateText}>28/11/1995</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <VectorIcon
            groupName="EvilIcons"
            name="location"
            color={Colors.white}
            size={18}
          />
          <Text style={styles.dateText}>Paris, 75016</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundNew,
        // paddingHorizontal: moderateScale(22),
      }}>
      <SafeAreaView>
        <ScrollView>
          <Loadingcomponent isVisible={false} />
          <SizeBox size={10} />
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.8}>
              <Image source={ImagePath.Arrow_Left_2} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Team name</Text>
            <SizeBox size={5} />
          </View>
          <SizeBox size={10} />
          <Text style={[styles.label, {}]}>Pictures & Videos</Text>
          <SizeBox size={10} />
          <Image source={ImagePath.ProfileImg} style={styles.midImage} />
          <SizeBox size={15} />
          <Text style={styles.label}>About Kingson</Text>
          <SizeBox size={6} />
          <Text style={styles.description}>
            DJ Hmida is the “Go TO” party DJ. She plays an eclectic mix of music
            and enjoys working with her clients to create the perfect atmosphere
            ...
          </Text>
          <SizeBox size={5} />
          <View style={styles.loactionContainer}>
            <VectorIcon
              groupName="Ionicons"
              name="location-outline"
              size={18}
              color={Colors.white}
            />
            <Text style={{...commonStyles.font14Bold, marginLeft: 10}}>
              2 km away
            </Text>
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Music Type</Text>
          <SizeBox size={10} />
          <FlatList
            data={musicStyle}
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(20),
            }}
            renderItem={({item}) => {
              if (!item || !item._id) {
                return null;
              }
              return (
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: Colors.white,
                    padding: 5,
                    backgroundColor: Colors.lightPink,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item?.name}
                  </Text>
                </View>
              );
            }}
            numColumns={3}
            keyExtractor={item => item._id.toString()}
          />
          <SizeBox size={10} />
          <Text style={styles.label}>Interests</Text>
          <SizeBox size={10} />
          <FlatList
            data={musicStyle}
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(20),
            }}
            renderItem={({item}) => {
              if (!item || !item._id) {
                return null;
              }
              return (
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: Colors.white,
                    padding: 5,
                    backgroundColor: Colors.lightPink,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item?.name}
                  </Text>
                </View>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <SizeBox size={10} />
          <Text style={styles.label}>Languages</Text>
          <SizeBox size={10} />
          <FlatList
            data={languages.slice(0, 4)}
            contentContainerStyle={{
              justifyContent: 'center',
              width: '100%',
              paddingHorizontal: moderateScale(20),
            }}
            renderItem={({item}) => {
              if (!item) {
                return null;
              }
              return (
                <View
                  style={{
                    borderWidth: 0,
                    borderColor: Colors.white,
                    padding: 5,
                    backgroundColor: Colors.lightPink,
                    borderRadius: 2,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      ...commonStyles.font12Regular,
                      color: Colors.white,
                    }}>
                    {item?.name}
                  </Text>
                </View>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <SizeBox size={10} />
          <View
            style={[
              styles.invw,
              {
                justifyContent: 'space-between',
                paddingHorizontal: moderateScale(20),
              },
            ]}>
            <Text style={[styles.label, {marginLeft: 0}]}>Past Events </Text>
            <Text style={[styles.label, {textDecorationLine: 'underline'}]}>
              See all
            </Text>
          </View>
          <SizeBox size={10} />
          <FlatList
            data={[{id: 0}]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          <SizeBox size={10} />
          <View style={[styles.invw, {alignSelf: 'center'}]}>
            <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
              <Image source={ImagePath.sent} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
              <VectorIcon
                groupName="Entypo"
                name="cross"
                color={Colors.red}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
              <Image source={ImagePath.FireLike} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.bottomBtn}>
              <VectorIcon
                groupName="Feather"
                name="heart"
                color={Colors.green}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}
              style={[styles.bottomBtn, {backgroundColor: '#FF813A'}]}>
              <Image
                source={ImagePath.link_backward}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          </View>
          <SizeBox size={15} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DatingUserProfile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(22),
  },
  headerInnerBox: {
    width: '50%',
    paddingVertical: moderateScaleVertical(6),
    borderWidth: 1,
    borderColor: Colors.lightPink,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    ...commonStyles.font16White,
  },
  label: {
    ...commonStyles.font16White,
    marginLeft: moderateScale(20),
  },
  description: {
    ...commonStyles.font14Regular,
    marginHorizontal: moderateScale(20),
  },
  topImages: {
    width: moderateScale(70),
    height: moderateScaleVertical(90),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    marginRight: moderateScale(15),
  },
  nameTopImg: {
    ...commonStyles.font12Bold,
  },
  midImage: {
    width: width,
    height: height / 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Pink,
  },
  loactionContainer: {
    paddingLeft: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBtn: {
    height: moderateScaleVertical(40),
    width: moderateScale(40),
    borderRadius: 40,
    backgroundColor: '#252131',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  invw: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomListImg: {
    width: width / 1.1,
    height: moderateScaleVertical(203),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomListMediumImg: {
    width: moderateScale(50),
    height: moderateScaleVertical(67),
    borderWidth: 1,
    borderColor: Colors.Pink,
    borderRadius: 5,
    position: 'absolute',
    left: 12,
    bottom: 9,
  },
  bottomListSmallImg: {
    width: moderateScale(30),
    height: moderateScaleVertical(35),
    borderWidth: 1,
    borderColor: Colors.Pink,
    borderRadius: 5,
    position: 'absolute',
    left: moderateScale(70),
    bottom: 9,
  },
  countText: {
    ...commonStyles.font14Bold,
    position: 'absolute',
    bottom: moderateScaleVertical(15),
    left: moderateScale(110),
  },
  dateText: {
    ...commonStyles.font14,
    marginLeft: moderateScale(7),
  },
});
