import { ImageBackground, SafeAreaView, Text, View ,Image, TouchableOpacity, TextInput} from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import { SizeBox } from '../../Utilities/Component/Helpers'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import ImagePath from '../../Utilities/Constants/ImagePath'
import QRCode from 'react-native-qrcode-svg';

const QrCode = ({ navigation,route }:any) => {

  const eventItem = route?.params?.data
  // const handleGenerateQr = () => {
  //   onGenerate(inputValue);
  // };
  console.log(route.params.data)
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
          <Text style={styles.referraltxt}>My Tickets</Text>
          <View></View>
        </View>
        <SizeBox size={30} />
        <Image source={ImagePath.party} style={styles.partyimg} />
        <ImageBackground
          source={ImagePath.qrbackground}
          style={styles.qrbckimg}>
          <View style={styles.textscanner}>
            <Text style={styles.agoratxt}>{eventItem?.eventId?.event_name}</Text>
            <SizeBox size={3} />
            <Text style={styles.ticketprice}>Early ticket -{eventItem?.eventId?.early_price}€</Text>
            <SizeBox size={15} />
            {/* <Image source={ImagePath.Qrcode} style={styles.qrcodeimg} /> */}
            
          <QRCode
          value={eventItem?.eventId?._id}
          size={150}
          style={styles.qrCode}
        />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <VectorIcon
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
            <Text style={styles.timetxt}>{eventItem?.eventId?.start_time}- {eventItem?.eventId?.end_time}</Text>
          </View>
        </ImageBackground>
        <SizeBox size={7} />
        <Text style={styles.dotext}>
          Do not share your QR code. It can be used only once.
        </Text>
        <SizeBox size={20} />
        <View style={styles.txticonbtn}>
          <TouchableOpacity>
            <View style={styles.iconcontainer}>
              <VectorIcon groupName="Ionicons" name="eye-outline" size={20} />
            </View>
            <Text style={styles.eventtxt}>Event</Text>
          </TouchableOpacity>

          <TouchableOpacity>
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

          <TouchableOpacity>
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
