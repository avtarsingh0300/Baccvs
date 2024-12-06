import { ImageBackground, SafeAreaView, Text, View ,Image, TouchableOpacity, TextInput, FlatList, FlatListComponent} from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import { showError, SizeBox } from '../../Utilities/Component/Helpers'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import ImagePath from '../../Utilities/Constants/ImagePath'
import QRCode from 'react-native-qrcode-svg';
import commonStyles from '../../Utilities/Styles/commonStyles'
import { moderateScale, width } from '../../Utilities/Styles/responsiveSize'
import NavigationStrings from '../../Utilities/Constants/NavigationStrings'

const data = [
  { id:1 },
  { id:2 },
  { id:3 },]
const QrCode = ({ navigation,route }:any) => {
  const [colors, setColors] = useState(0);

  const eventItem = route?.params?.data
  // const handleGenerateQr = () => {
  //   onGenerate(inputValue);
  // };
  console.log(route?.params?.data)

  const renderItems = ({item}: any) => (
    <View>
       <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Progressive</Text>
    </TouchableOpacity>
    </View>
  )
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
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
          <Text style={styles.referraltxt}>My Tickets</Text>
          <View/>
        </View>
        {/* <SizeBox size={30} />
        <Image source={ImagePath.party} style={styles.partyimg} />
        <ImageBackground
          source={ImagePath.qrbackground}
          style={styles.qrbckimg}>
          <View style={styles.textscanner}>
            <Text style={styles.agoratxt}>{eventItem?.eventId?.event_name}</Text>
            <SizeBox size={3} />
            <Text style={styles.ticketprice}>Early ticket -{eventItem?.eventId?.early_price}€</Text>
            <SizeBox size={15} />
            <Image source={ImagePath.Qrcode} style={styles.qrcodeimg} />
             */}
             <SizeBox size={10}/>
             <View style={{alignSelf:"center", padding:10, backgroundColor:Colors.white,borderRadius:16}}>

          <QRCode
          value={eventItem?.eventId?._id}
          size={210}
          backgroundColor={Colors.white}
           
          />
          </View>
          <SizeBox size={10}/>
        <Text style={{...commonStyles.font12Regular,color:"#637394",textAlign:"center"}}>Show this code to the gatekeeper at the entrance.</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <VectorIcon
              groupName="MaterialIcons"
              name="calendar-month"
              size={15}
              color={Colors.green}
            />
            <Text style={styles.datetxt}>{eventItem?.eventId?.date}</Text>
          </View>
          <SizeBox size={4} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <VectorIcon
              groupName="AntDesign"
              name="clockcircleo"
              size={13}
              color={Colors.green}
            />
            <Text style={styles.timetxt}>{eventItem?.eventId?.start_time}- {eventItem?.eventId?.end_time}</Text> */}
          </View>
        {/* </ImageBackground> */}
        <SizeBox size={10} />
        {/* <Text style={styles.dotext}>
          Do not share your QR code. It can be used only once.
        </Text> */}
        <Image source={ImagePath.dotline} style={{height:40,width:width/1.1,alignItems:"center",tintColor:"#1A2232"}}/>
        <SizeBox size={10} />
        <Text style={styles.solumtxt}>Babylone - Solum - Esposito B2B Gianni romano </Text>
        <SizeBox size={10} />
        <FlatList data={data} renderItem={renderItems} keyExtractor={(item) => item.id.toString()}
      numColumns={3}/>
        <SizeBox size={10} />
        <View style={{flexDirection:"row"}}>
          <Text style={{...commonStyles.font12Regular,color:"#637394",width:"20%"}}>Location</Text>
          <View>
            <Text style={{...commonStyles.font12Regular,color:"#ffffff"}}>Phantom Paris</Text>
            <SizeBox size={1} />
            <Text style={{...commonStyles.font12Regular,color:"#637394"}}>8 Bd de Bercy, 75012 Paris</Text>
          </View>
        </View>
        <SizeBox size={3} />
        <View style={{flexDirection:"row"}}>
          <Text style={{...commonStyles.font12Regular,color:"#637394",width:"20%"}}>Date</Text>
          <Text style={{...commonStyles.font12Regular,color:"#ffffff"}}>6 April 2022, 23h00 - 05h00</Text>
        </View>
        <SizeBox size={3} />
        <View style={{flexDirection:"row"}}>
          <Text style={{...commonStyles.font12Regular,color:"#637394",width:"20%"}}>Cost</Text>
          <Text style={{...commonStyles.font12Regular,color:"#ffffff"}}>40€ (paid)</Text>
        </View>
        <SizeBox size={30} />

        <View style={styles.txticonbtn}>
          <TouchableOpacity>
            <View style={styles.iconcontainer}>
              <VectorIcon groupName="Ionicons" name="eye-outline" size={20} />
            </View>
            <Text style={styles.eventtxt}>Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => { 
              navigation.navigate(NavigationStrings.Tickets,{sell:2});
          }}
          >
            <View style={styles.iconcontainer}>
              <VectorIcon
                groupName="MaterialCommunityIcons"
                name="cash-multiple"
                size={20}
              />
            </View>
            <Text style={styles.eventtxt}>Sell</Text>
          </TouchableOpacity>

          <TouchableOpacity> 
            <View style={styles.iconcontainer}>
              <VectorIcon groupName="Feather" name="download" size={20} />
            </View>
            <Text style={styles.eventtxt}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            navigation.navigate(NavigationStrings.TransferTicket)
          }}>
            <View style={styles.iconcontainer}>
              <VectorIcon
                groupName="MaterialCommunityIcons"
                name="transit-transfer"
                size={20}
              />
            </View>
            <Text style={styles.eventtxt}>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.iconcontainer}>
              <VectorIcon
                groupName="MaterialCommunityIcons"
                name="dots-horizontal"
                size={20}
              />
            </View>
            <Text style={styles.eventtxt}>More</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default QrCode;
