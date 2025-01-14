import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {sellTicket} from '../../Utilities/Constants/auth';

const UploadTicket = ({navigation, route}: any) => {
  const [price, setPrice] = useState('');
  const [loader, setLoader] = useState(false);
  const onSell = () => {
    if (!price) {
      showError('Please add selling price !');
      return;
    }
    setLoader(true);
    const data = {
      tickets: [{ticketNumber: route?.params?.ticketdata, price: price.trim()}],
    };
    console.log(data);
    sellTicket(data)
      .then(res => {
        setLoader(false);
        navigation.navigate(NavigationStrings.Tickets);
      })
      .catch(err => {
        setLoader(false);
        showError(err?.message);
        console.log(err);
      });
  };
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Loadingcomponent isVisible={loader} />
        <SizeBox size={10} />
        <Text style={styles.uploadticket}>Pricing tickets</Text>
        <SizeBox size={20} />
        <Text style={styles.pricetxt}>Original price</Text>
        <SizeBox size={15} />
        <View style={styles.originalcon}>
          <View style={{flexDirection: 'row'}}>
            <Image source={ImagePath.Ticket} style={styles.ticketimg} />
            <Text style={styles.earlytxt}>Early ticket</Text>
          </View>
          <View style={styles.pricecontainer}>
            <Text style={styles.pricetext}>{route?.params.price}€</Text>
          </View>
          <View></View>
        </View>
        <SizeBox size={20} />
        <Text style={styles.pricetxt}>Selliing price</Text>
        <SizeBox size={15} />
        <View style={styles.originalcon}>
          <View style={{flexDirection: 'row'}}>
            <Image source={ImagePath.Ticket} style={styles.ticketimg} />
            <Text style={styles.earlytxt}>Early ticket</Text>
          </View>
          <View style={styles.pricecontainer}>
            <TextInput
              placeholder="€"
              value={price}
              placeholderTextColor={Colors.white}
              keyboardType="numeric"
              onChangeText={txt => setPrice(txt)}
              style={styles.input}
            />
          </View>
          <View />
        </View>

        <SizeBox size={30} />
        <TouchableOpacity
          // onPress={() => }
          onPress={onSell}
          style={styles.sytbtn}>
          <Text style={styles.sell}>Put to sell</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UploadTicket;
