import {View, Text, SafeAreaView, FlatList, TextInput} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import {
  ImageComponent,
  SizeBox,
  dummydata,
} from '../../Utilities/Component/Helpers';
import commonStyles from '../../Utilities/Styles/commonStyles';
import ImagePath from '../../Utilities/Constants/ImagePath';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {ImageBackground} from 'react-native';
import fontFamily from '../../Utilities/Styles/fontFamily';

const EditGroup = ({navigation}: any) => {
  const onBack = () => {
    navigation.goBack();
  };

  const renderItem = () => (
    <View style={styles.flatcon}>
      <Text
        style={{
          ...commonStyles.font12Regular,
          color: Colors.white,
          paddingBottom: 5,
        }}>
        mark
      </Text>
      <ImageComponent source={ImagePath.ProfileImg} style={styles.userImg} />
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={10} />
        <View style={styles.headinngVw}>
          <VectorIcon
            groupName={'Ionicons'}
            name={'chevron-back'}
            size={25}
            onPress={onBack}
          />
          <Text style={{...commonStyles.Heading20font}}>Edit</Text>
          <Text
            style={{
              ...commonStyles.font12Regular,
              color: Colors.tranparent,
            }}>
            {`  `}don
          </Text>
        </View>
        <SizeBox size={10} />
        <View style={styles.imgvw}>
          <ImageBackground
            source={ImagePath.ProfileImg}
            style={styles.mainuserimg}>
            <VectorIcon groupName="Feather" name="edit" size={25} />
          </ImageBackground>
        </View>
        <SizeBox size={10} />
        <View style={styles.inputcontainer}>
          <Text style={{...commonStyles.font16Regular, color: Colors.black}}>
            Group X
          </Text>
        </View>
        <SizeBox size={15} />
        <Text
          style={{
            ...commonStyles.Heading20font,
            textAlign: 'left',
            paddingLeft: 14,
          }}>
          Members
        </Text>
        <SizeBox size={10} />
        <FlatList horizontal data={dummydata} renderItem={renderItem} />
        <SizeBox size={15} />
        <Text
          style={{
            ...commonStyles.Heading20font,
            textAlign: 'left',
            paddingLeft: 14,
          }}>
          Group Description
        </Text>
        <SizeBox size={10} />
        <View style={styles.inputvw}>
          <TextInput
            multiline
            placeholder="Write your group description here..."
            placeholderTextColor={Colors.white}
            style={{
              color: Colors.white,
              fontFamily: fontFamily.time_regular,
              fontSize: 16,
            }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EditGroup;
