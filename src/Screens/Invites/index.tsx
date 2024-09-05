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
  showSuccess,
} from '../../Utilities/Component/Helpers';
import {FlatList} from 'react-native';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {
  cancelInvites,
  getInvitesList,
  inviteAccpet,
  inviteRefuse,
} from '../../Utilities/Constants/auth';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {useSelector} from 'react-redux';

const Invites = ({navigation}: any) => {
  const user = useSelector((data: object) => data?.auth?.userData);
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
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };
  const onSeeEvent = (id: string) => {
    navigation.navigate(NavigationStrings.EventDetails, {eventId: id});
  };
  const onAccept = (item: any) => {
    const data = {
      InviteId: item?._id,
      userid: user?.user?.id,
    };
    inviteAccpet(data)
      .then(res => {
        showSuccess('Invite accepted!!');
        getInvites();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };
  const onRefuse = (item: any) => {
    const data = {
      invite_id: item?._id,
    };
    inviteRefuse(data)
      .then(res => {
        showSuccess('Invite refused!!');
        getInvites();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };
  const onCancel = (item: any) => {
    const data = {
      invite_id: item?._id,
    };
    cancelInvites(data)
      .then(res => {
        showSuccess('Invitation cancel!');
        getInvites();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
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
        <TouchableOpacity onPress={() => onAccept(item)}>
          <LinearGradient
            colors={[Colors.btnLinear2, Colors.btnLinear2]}
            style={styles.acbtn}>
            <Text style={styles.btntxt}>Accept</Text>
          </LinearGradient>
        </TouchableOpacity>
        <SizeBox size={2} />
        <TouchableOpacity onPress={() => onRefuse(item)}>
          <LinearGradient
            colors={[Colors.backgroundNew, Colors.backgroundNew]}
            style={[
              styles.acbtn,
              {borderWidth: 1, borderColor: Colors.lightPink},
            ]}>
            <Text style={styles.btntxt}>Refuse</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderItemm = ({item}: any) => (
    <View style={[styles.flex, {alignItems: 'flex-start'}]}>
      {item?.image ? (
        <Image source={ImagePath.ProfileImg} style={styles.userimg} />
      ) : (
        <Image source={{uri: IMAGE_URL + item?.image}} style={styles.userimg} />
      )}
      <View>
        <Text style={[styles.heading, {textAlign: 'left'}]}>
          {item?.message}
        </Text>
        <SizeBox size={8} />
      </View>
      <View>
        <TouchableOpacity onPress={() => onCancel(item)}>
          <LinearGradient
            colors={[Colors.btnLinear2, Colors.btnLinear2]}
            style={styles.acbtn}>
            <Text style={styles.btntxt}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
        <SizeBox size={2} />
      </View>
    </View>
  );
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.conatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <SizeBox size={10} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <VectorIcon
            groupName={'Ionicons'}
            name={'chevron-back'}
            size={25}
            onPress={onGoback}
          />
          <Text style={styles.liketxt}>Invites</Text>
        </View>
        <SizeBox size={20} />
        <View style={styles.buttongroup}>
          <Text
            onPress={onRec}
            style={[
              {...commonStyles.font16WhiteBold},
              {color: button === 'R' ? Colors.lightPink : Colors.white},
            ]}>
            Received
          </Text>
          <Text
            onPress={onSent}
            style={[
              {...commonStyles.font16WhiteBold},
              {
                color: button === 'S' ? Colors.lightPink : Colors.white,
                paddingLeft: 30,
              },
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
