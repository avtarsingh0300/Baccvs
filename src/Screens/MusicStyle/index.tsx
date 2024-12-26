import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {SizeBox} from '../../Utilities/Component/Helpers';
import moment from 'moment';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import fontFamily from '../../Utilities/Styles/fontFamily';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  height,
  moderateScale,
  width,
} from '../../Utilities/Styles/responsiveSize';

const MusicStyle = ({navigation}: any) => {
  const [selectedButton, setSelectedButton] = useState('All');
  const [eventData, SetEventData] = useState([]);
  const [value, setValue] = useState(new Date());
  const [modalVisible, SetModalVisible] = useState(false);

  const buttons = ['All', 'Today', 'Upcoming', 'Past'];

  const toggleModal = () => {
    SetModalVisible(!modalVisible);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity activeOpacity={0.8}>
      <View>
        <View style={styles.listContainer}>
          <View style={styles.backContainer}>
            <Text
              style={{
                ...commonStyles.font16Regular,
                color: Colors.white,
                marginLeft: moderateScale(80),
              }}>
              Babylon x Pisica fêtent J.O
            </Text>
            <View style={styles.flex}>
              <Text
                style={{
                  ...commonStyles.font12Regular,
                  color: Colors.white,
                }}>
                2km{` `}
              </Text>
              <VectorIcon groupName="Feather" name="map-pin" size={15} />
            </View>
          </View>
          <ImageBackground source={ImagePath.ProfileImg} style={styles.backimg}>
            <View style={styles.flexinner}>
              <Image
                source={ImagePath.ImageBackground}
                style={styles.shortimg}
              />
              <Image
                source={ImagePath.ProfileImg}
                style={[
                  styles.extraimg,
                  {
                    marginLeft: 5,
                  },
                ]}
              />
              <Image
                source={ImagePath.ImageBackground}
                style={[
                  styles.extraimg,
                  {
                    right: 10,
                  },
                ]}
              />
              <Text
                style={{
                  ...commonStyles.font16Regular,
                  alignSelf: 'flex-end',
                  color: Colors.white,
                }}
              />
            </View>
            <TouchableOpacity style={styles.liktxtcon}>
              <Text style={styles.likestxt}> Likes </Text>
              <Image source={ImagePath.likes} style={styles.likeimg} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <SizeBox size={14} />
        {moment(new Date()).format('YYYY-MM-DD') ? (
          <View style={{paddingHorizontal: 15}}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={ImagePath.priceTag}
                  resizeMode="contain"
                  style={styles.tag}
                />
                <Text
                  style={{
                    ...commonStyles.font14,
                    fontFamily: fontFamily.time_bold,
                  }}>
                  {` `}
                  10€
                </Text>
              </View>
              <Text style={styles.ontxt}>
                Ongoing{` `}
                <Text
                  style={{
                    color: Colors.white,
                  }}>
                  - 05h00
                </Text>
              </Text>
            </View>
            <View style={styles.backContainer}>
              <View style={styles.flex}>
                <VectorIcon groupName="Feather" name="users" size={15} />
                <Text
                  style={{
                    ...commonStyles.font12Regular,
                    color: Colors.lightorange,
                  }}>
                  {` `}3 spots
                </Text>
              </View>
              <Text
                style={{
                  ...commonStyles.font14Center,
                  color: Colors.white,
                }}>
                Party - Afterparty
              </Text>
            </View>
          </View>
        ) : null}
        <FlatList
          data={[{id: 1}]}
          horizontal
          style={{paddingHorizontal: 15}}
          renderItem={() => (
            <View style={styles.music}>
              <Text style={styles.musictxt}>House</Text>
            </View>
          )}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.conatiner}>
      <SafeAreaView>
        <Text style={styles.searchtxt}>Search</Text>
        <SizeBox size={5} />
        <ImageBackground
          source={require('../../Assets/images/uprofile.png')}
          style={styles.imgbck}
          borderRadius={5}>
          <Text style={{...commonStyles.font10Regular, color: Colors.white}}>
            House
          </Text>
        </ImageBackground>
        <View style={styles.Buttonscon}>
          {buttons.map(button => (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                selectedButton === button && styles.selectedButton,
              ]}
              onPress={() => setSelectedButton(button)}>
              <Text
                style={[
                  styles.text,
                  selectedButton === button && styles.selectedText,
                ]}>
                {button}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.datevw}>
          <Text style={styles.date}>
            {moment(value).format('DD MMMM YYYY')} ({eventData?.length})
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            width: width,
            alignSelf: 'center',
            marginBottom:
              Platform.OS === 'android' ? height / 3.5 : height / 3.6,
          }}
          data={[{id: 1}]}
          renderItem={renderItem}
          ListFooterComponent={() => <SizeBox size={10} />}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MusicStyle;
