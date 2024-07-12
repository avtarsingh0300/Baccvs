import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import styles from './style';
import {Header, SizeBox} from '../../Utilities/Component/Helpers';
import {FlatList} from 'react-native';
import ImagePath from '../../Utilities/Constants/ImagePath';

const Invites = ({navigation}: any) => {
  const [button, setButton] = useState('R');
  const onGoback = () => {
    navigation.goBack();
  };
  const onRec = () => {
    setButton('R');
  };
  const onSent = () => {
    setButton('S');
  };
  const renderItem = () => (
    <View style={styles.flex}>
      <Image source={ImagePath.ProfileImg} style={styles.userimg} />
      <View>
        <Text style={styles.heading}>X invited you to his party.</Text>
        <SizeBox size={8} />
        <TouchableOpacity style={styles.seebtn}>
          <Text style={styles.btntxt}>See Event</Text>
        </TouchableOpacity>
      </View>
      <View>
        <LinearGradient
          colors={[Colors.Linear, Colors.Pink]}
          style={styles.acbtn}>
          <Text style={styles.btntxt}>Accept</Text>
        </LinearGradient>
        <SizeBox size={2} />
        <LinearGradient
          colors={[Colors.LinearBlack, Colors.Linear]}
          style={styles.acbtn}>
          <Text style={styles.btntxt}>Refuse</Text>
        </LinearGradient>
      </View>
    </View>
  );
  const renderItemm = () => (
    <View style={[styles.flex, {alignItems: 'flex-start'}]}>
      <Image source={ImagePath.ProfileImg} style={styles.userimg} />
      <View>
        <Text style={[styles.heading, {textAlign: 'left'}]}>
          You sent an invite to “Samy D.” to your party.
        </Text>
        <SizeBox size={8} />
      </View>
      <View>
        <LinearGradient
          colors={[Colors.Linear, Colors.Pink]}
          style={styles.acbtn}>
          <Text style={styles.btntxt}>Cancel</Text>
        </LinearGradient>
        <SizeBox size={2} />
      </View>
    </View>
  );
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.conatiner}>
      <SafeAreaView>
        <Header onPress={onGoback} title="Invites" />
        <SizeBox size={10} />
        <View style={styles.buttongroup}>
          <Text
            onPress={onRec}
            style={[
              {...commonStyles.font16WhiteBold},
              {color: button === 'R' ? Colors.Pink : Colors.white},
            ]}>
            Received
          </Text>
          <Text
            onPress={onSent}
            style={[
              {...commonStyles.font16WhiteBold},
              {color: button === 'S' ? Colors.Pink : Colors.white},
            ]}>
            Sent
          </Text>
        </View>
        <SizeBox size={15} />

        {button === 'R' ? (
          <FlatList data={[{id: 1}, {id: 1}]} renderItem={renderItem} />
        ) : (
          <FlatList data={[{id: 1}, {id: 1}]} renderItem={renderItemm} />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Invites;
