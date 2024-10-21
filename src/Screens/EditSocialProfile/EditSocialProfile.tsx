import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  CommonInput,
  showError,
  SizeBox,
} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getEventTypes} from '../../Utilities/Constants/auth';
import languages from '../../Utilities/Constants';
import {styles} from './styles';

const EditSocialProfile = () => {
  const [userBio, setUserBio] = useState('');
  const [userSign, setUserSign] = useState('');
  const [userJob, setUserJob] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [musicStyle, setMusicStyle] = useState([]);
  const [interestType, setInterestType] = useState([]);
  const data = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];

  useEffect(() => {
    getEventsTypes();
  }, []);

  const getEventsTypes = () => {
    getEventTypes()
      .then((res: any) => {
        setMusicStyle(res?.musictype);
        setInterestType(res?.interesttype);
        // console.log(res, 'ressss');
      })
      .catch(err => {
        showError(err?.message), console.log(err);
      });
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
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
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <SizeBox size={10} />
          <View style={styles.header}>
            <View />
            <Text style={commonStyles.font20White}>Profile Edit</Text>
            <VectorIcon
              groupName="FontAwesome"
              name="sliders"
              size={20}
              color={Colors.white}
              onPress={() => {
                //   navigation.navigate(NavigationStrings.MeetPeopleFilter);
              }}
            />
          </View>
          <SizeBox size={15} />
          <Text style={styles.label}>Profile picture</Text>
          <SizeBox size={7} />
          <ImageBackground
            style={styles.profileImg}
            borderRadius={5}
            source={ImagePath.ProfileImg}>
            <VectorIcon
              groupName="Feather"
              name="edit"
              size={20}
              color={Colors.white}
              style={styles.editBtn}
            />
          </ImageBackground>
          <SizeBox size={7} />
          <Text style={styles.label}>Pictures & Videos (6 max.)</Text>
          <SizeBox size={7} />
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({item, index}) => (
              <>
                {data?.length - 1 != index ? (
                  <ImageBackground
                    style={styles.userMoreImages}
                    borderRadius={5}
                    source={ImagePath.ProfileImg}>
                    <VectorIcon
                      groupName="AntDesign"
                      name="closecircleo"
                      size={20}
                      color={Colors.white}
                      style={styles.editBtn}
                    />
                  </ImageBackground>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.userMoreImages,
                      {
                        borderWidth: 1,
                        borderColor: Colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                    <VectorIcon
                      groupName="Feather"
                      name="edit-2"
                      color={Colors.white}
                      size={24}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          />
          <SizeBox size={15} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <VectorIcon
              groupName="FontAwesome"
              name="user-circle-o"
              color={Colors.white}
              size={18}
            />
            <Text style={[styles.label, {color: Colors.white, marginLeft: 10}]}>
              Ben’s Bio
            </Text>
          </View>
          <SizeBox size={5} />
          <CommonInput
            placeholder={'Introduce yourself'}
            multiline={true}
            value={userBio}
            onChangeText={(e: string) => setUserBio(e)}
            styless={{}}
          />
          <SizeBox size={15} />
          <Text style={[styles.label, {color: Colors.white, marginLeft: 10}]}>
            Music Type
          </Text>
          <SizeBox size={7} />
          <FlatList
            data={musicStyle}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({item, index}: any) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={[
                  styles.selectContainer,
                  {
                    backgroundColor:
                      index == 0 ? Colors.lightPink : Colors.backgroundNew,
                    marginBottom: 10,
                  },
                ]}>
                <Text style={styles.selectText}>{item?.name}</Text>
              </TouchableOpacity>
            )}
          />
          <SizeBox size={15} />
          <Text style={[styles.label, {color: Colors.white, marginLeft: 10}]}>
            Interests
          </Text>
          <SizeBox size={7} />
          <FlatList
            data={interestType}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={({item, index}: any) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={[
                  styles.selectContainer,
                  {
                    backgroundColor:
                      index == 0 ? Colors.lightPink : Colors.backgroundNew,
                    marginBottom: 10,
                  },
                ]}>
                <Text style={styles.selectText}>{item?.name}</Text>
              </TouchableOpacity>
            )}
          />
          <SizeBox size={15} />
          <Text style={[styles.label, {color: Colors.white, marginLeft: 10}]}>
            Languages
          </Text>
          <SizeBox size={7} />
          <FlatList
            data={languages.slice(0, 10)}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={[
                  styles.selectContainer,
                  {
                    backgroundColor:
                      index == 0 ? Colors.lightPink : Colors.backgroundNew,
                    marginBottom: 10,
                  },
                ]}>
                <Text style={styles.selectText}>{item?.name}</Text>
              </TouchableOpacity>
            )}
          />
          <SizeBox size={7} />
          <Text style={[styles.label, {color: Colors.white, marginLeft: 10}]}>
            Zodiac Sign
          </Text>
          <SizeBox size={7} />
          <CommonInput
            placeholder="Leo"
            value={userSign}
            onChangeText={(e: string) => setUserSign(e)}
            styless={{}}
          />
          <SizeBox size={7} />
          <Text style={[styles.label, {color: Colors.white, marginLeft: 10}]}>
            Job title
          </Text>
          <SizeBox size={7} />
          <CommonInput
            placeholder="DJ"
            value={userJob}
            onChangeText={(e: string) => setUserJob(e)}
            styless={{}}
          />
          <SizeBox size={7} />
          <Text style={[styles.label, {color: Colors.white, marginLeft: 10}]}>
            Location
          </Text>
          <SizeBox size={7} />
          <CommonInput
            placeholder="Add your area"
            value={userLocation}
            onChangeText={(e: string) => setUserLocation(e)}
            styless={{}}
          />
          <SizeBox size={7} />
          <Text style={styles.label}>Drinking</Text>
          <SizeBox size={7} />
          <View
            style={[
              styles.row,
              {
                justifyContent: 'flex-start',
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer, {borderColor: Colors.white}]}>
              <Text style={styles.selectText}>Prefer not to say</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.selectContainer,
                {backgroundColor: Colors.lightPink},
              ]}>
              <Text style={styles.selectText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer, {borderColor: Colors.white}]}>
              <Text style={styles.selectText}>No</Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={7} />
          <Text style={styles.label}>Smoking</Text>
          <SizeBox size={7} />
          <View
            style={[
              styles.row,
              {
                justifyContent: 'flex-start',
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer, {borderColor: Colors.white}]}>
              <Text style={styles.selectText}>Prefer not to say</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.selectContainer,
                {backgroundColor: Colors.lightPink},
              ]}>
              <Text style={styles.selectText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.selectContainer, {borderColor: Colors.white}]}>
              <Text style={styles.selectText}>No</Text>
            </TouchableOpacity>
          </View>
          <SizeBox size={15} />
          <Text style={{...commonStyles.font20W400, color: Colors.white}}>
            Past events (3/11)
          </Text>
          <SizeBox size={7} />
          <FlatList
            data={[{id: 0}]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          <SizeBox size={10} />
          <Text style={{...commonStyles.font20W400, color: Colors.white}}>
            HOUSE WILD
          </Text>
          <SizeBox size={5} />
          <Text style={{...commonStyles.font16White}}>Description</Text>
          <SizeBox size={15} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EditSocialProfile;
