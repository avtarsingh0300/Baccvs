import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import styles from './style';
import {
  Header,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import {FlatList} from 'react-native';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {getInvitesList} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';

const Invites = ({navigation}: any) => {
  const [button, setButton] = useState('R');
  const [recdata, setRecdata] = useState([]);
  const [sendata, setSenddata] = useState([]);
  const [loader, setLoader] = useState(false);
  const onGoback = () => {
    navigation.goBack();
  };
  const onRec = () => {
    setButton('R');
  };
  const onSent = () => {
    setButton('S');
  };
  useEffect(() => {
    getInvites();
  }, []);

  const getInvites = () => {
    setLoader(true);
    getInvitesList()
      .then(res => {
        setLoader(false);
        setRecdata(res?.pagination?.received?.data);
        setSenddata(res?.pagination?.sent?.data);
        console.log(res?.pagination?.received?.data);
      })
      .catch(err => {
        setLoader(false);
        showError(err.message);
        console.log(err);
      });
  };
  const onSeeEvent = (id: string) => {
    navigation.navigate(NavigationStrings.EventDetails, {eventId: id});
  };
  const onAccept = () => {
    console.log('accept');
  };
  const onRefuse = () => {
    console.log('refuse');
  };
  const renderItem = ({item}: any) => (
    <View style={styles.flex}>
      {item?.image ? (
        <Image source={ImagePath.ProfileImg} style={styles.userimg} />
      ) : (
        <Image source={{uri: IMAGE_URL + item?.image}} style={styles.userimg} />
      )}
      <View>
        <Text style={styles.heading}>{item?.message}</Text>
        <SizeBox size={8} />
        <TouchableOpacity
          style={styles.seebtn}
          onPress={() => onSeeEvent(item?.event_id)}>
          <Text style={styles.btntxt}>See Event</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={onAccept}>
          <LinearGradient
            colors={[Colors.Linear, Colors.Pink]}
            style={styles.acbtn}>
            <Text style={styles.btntxt}>Accept</Text>
          </LinearGradient>
        </TouchableOpacity>
        <SizeBox size={2} />
        <TouchableOpacity onPress={onRefuse}>
          <LinearGradient
            colors={[Colors.LinearBlack, Colors.Linear]}
            style={styles.acbtn}>
            <Text style={styles.btntxt}>Refuse</Text>
          </LinearGradient>
        </TouchableOpacity>
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
        <Loadingcomponent isVisible={loader} />
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
          <>
            {recdata?.length > 0 ? (
              <FlatList data={recdata} renderItem={renderItem} />
            ) : (
              <Text
                style={[{...commonStyles.font14Center}, {color: Colors.white}]}>
                No data found ..
              </Text>
            )}
          </>
        ) : (
          <>
            {sendata?.length > 0 ? (
              <FlatList data={sendata} renderItem={renderItemm} />
            ) : (
              <Text
                style={[{...commonStyles.font14Center}, {color: Colors.white}]}>
                No data found ..
              </Text>
            )}
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Invites;
