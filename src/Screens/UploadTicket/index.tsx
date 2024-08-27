import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {SizeBox} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';

const UploadTicket = ({navigation}:any) => {
  const [upload, setUpload] = useState(false);
  const [price,setPrice] = useState(false);
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={10} />
        <Text style={styles.uploadticket}>Pricing tickets</Text>
        <SizeBox size={20} />
        <Text style={styles.pricetxt}>Original price</Text>
        <SizeBox size={15} />
        <View style={styles.originalcon}>
        <View style={{flexDirection:"row"}}>
        <Image source={ImagePath.Ticket} style={styles.ticketimg}/>
        <Text style={styles.earlytxt}>Early ticket</Text>
       </View>
       <View style={styles.pricecontainer}>
        <Text style={styles.pricetext}>11,99€</Text>
        </View> 
       <View></View>
       </View>
       <SizeBox size={20}/>
       <Text style={styles.pricetxt}>Selliing price</Text>
       <SizeBox size={15}/>
       <View style={styles.originalcon}>
        <View style={{flexDirection:"row"}}>
        <Image source={ImagePath.Ticket} style={styles.ticketimg}/>
        <Text style={styles.earlytxt}>Early ticket</Text>
       </View>
       <View style={styles.pricecontainer}>
        <TextInput 
         placeholder="€"
         value={price}
         keyboardType="numeric"
         onChangeText={(input) => setPrice(input)}
         style={{fontSize:10}}
        />
        </View> 
<View/>
       </View>
        
        <SizeBox size={30}/>
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationStrings.Tickets)
          }
          style={styles.sytbtn}>
          <Text style={styles.sell}>Put to sell</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UploadTicket;
