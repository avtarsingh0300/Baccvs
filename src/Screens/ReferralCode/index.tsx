import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {SizeBox} from '../../Utilities/Component/Helpers';
// import Clipboard from '@react-native-clipboard/clipboard'
import {Snackbar} from 'react-native-paper';
import fontFamily from '../../Utilities/Styles/fontFamily';

const ReferralCode = ({navigation}: any) => {
  const [visible, setVisible] = useState(false);

  const copyToClipboard = ({text}: any) => {
    // Clipboard.setString(text);
    setVisible(true);
  };

  const onDismissSnackBar = () => setVisible(false);

  const renderItem1 = () => (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <Text style={styles.WjhU87Hj}>WjhU87Hj</Text>
      <TouchableOpacity onPress={() => copyToClipboard('WjhU87Hj')}>
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
        <SizeBox size={10} />
        <View style={styles.referalcontainer}>
          <VectorIcon
            groupName="SimpleLineIcons"
            name="arrow-left"
            size={22}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.referraltxt}>ReferralCode</Text>
          <VectorIcon
            groupName="Entypo"
            name="dots-three-horizontal"
            size={22}
          />
        </View>
        <SizeBox size={20} />
        <TouchableOpacity>
          <LinearGradient
            start={{x: 1, y: -0.6}}
            end={{x: 1, y: 0.9}}
            colors={[Colors.LinearBlack, Colors.lightPink]}
            style={styles.linear}>
            <Text style={styles.cancelbtn}>Generate Referral Code</Text>
          </LinearGradient>
        </TouchableOpacity>
        <SizeBox size={20} />
        <Text style={styles.historytxt}>Referral code history</Text>
        <SizeBox size={10} />
        <FlatList
          data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
          renderItem={renderItem1}
          style={{alignSelf: 'center'}}
        />
        <SizeBox size={30} />
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={Snackbar.DURATION_SHORT}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.copiedtxt}>✔ Copied to clipboard</Text>
        </Snackbar>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ReferralCode;
