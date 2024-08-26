import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {
  Loadingcomponent,
  SizeBox,
  showError,
  showSuccess,
} from '../../Utilities/Component/Helpers';
import Clipboard from '@react-native-clipboard/clipboard';
import {createRefCode, getRefCode} from '../../Utilities/Constants/auth';

const ReferralCode = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const [codes, setCodes] = useState([]);
  const copyToClipboard = (text: string) => {
    console.log(text);
    Clipboard.setString(text);
    showSuccess('Copied' + ' ' + text);
  };

  useEffect(() => {
    getCode();
  }, []);

  const createCode = () => {
    setLoader(true);
    createRefCode()
      .then(res => {
        setLoader(false);
        getCode();
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };
  const getCode = () => {
    getRefCode()
      .then(res => {
        setCodes(res);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
      });
  };
  const renderItem = ({item}: any) => (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <Text style={styles.WjhU87Hj}>{item?.code}</Text>
      <TouchableOpacity onPress={() => copyToClipboard(item?.code)}>
        <VectorIcon groupName="Ionicons" name="copy-outline" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <SizeBox size={10} />
        <View style={styles.referalcontainer}>
          <VectorIcon
            groupName="SimpleLineIcons"
            name="arrow-left"
            size={22}
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.referraltxt}>Referral Codes</Text>
          <VectorIcon
            groupName="Entypo"
            name="dots-three-horizontal"
            size={22}
          />
        </View>
        <SizeBox size={20} />
        <Text style={[styles.historytxt, {fontWeight: '400'}]}>
          To keep our community safe and secure, we have limited the external
          invites to<Text style={{color: Colors.Pink}}> 10 maximum.</Text>{' '}
        </Text>
        <SizeBox size={2} />
        <Text style={[styles.historytxt, {fontWeight: '400'}]}>
          Choose your friends wisely, if they make any trouble in our community
          events, both of you will be banned.
        </Text>
        <SizeBox size={20} />
        <TouchableOpacity onPress={createCode}>
          <LinearGradient
            start={{x: 1, y: -0.6}}
            end={{x: 1, y: 0.9}}
            colors={[Colors.LinearBlack, Colors.Pink]}
            style={styles.linear}>
            <Text style={styles.cancelbtn}>Generate Referral Code</Text>
          </LinearGradient>
        </TouchableOpacity>
        <SizeBox size={20} />
        <Text style={styles.historytxt}>Referral code history</Text>
        <SizeBox size={10} />
        <FlatList
          data={codes}
          renderItem={renderItem}
          style={{alignSelf: 'center'}}
        />
        <SizeBox size={30} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ReferralCode;
