import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {ImageComponent} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {getTickets} from '../../Utilities/Constants/auth';

const Tickets = ({navigation}: any) => {
  const [colors, setColors] = useState(0);
  const [sellBtn, setSellBtn] = useState(false);

  useEffect(() => {
    getMyTickets();
  }, []);

  const getMyTickets = () => {
    getTickets()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  const data = [
    {
      id: '1',
      title: 'Babylone - Solum - Esposito B2B Gianni romano / Cha...',
      imageUrl: ImagePath.ProfileImg,
    },
    {
      id: '2',
      title: 'Babylone - Solum - Esposito B2B Gianni romano / Cha...',
      imageUrl: ImagePath.ProfileImg,
    },
    {
      id: '3',
      title: 'Babylone - Solum - Esposito B2B Gianni romano / Cha...',
      imageUrl: ImagePath.ProfileImg,
    },
    {
      id: '4',
      title: 'Babylone - Solum - Esposito B2B Gianni romano / Cha...',
      imageUrl: ImagePath.ProfileImg,
    },
  ];

  const data1 = [
    {
      id: '1',
      title: 'Babylone - Solum - Esposito B2B Giann...',
      imageUrl: ImagePath.ProfileImg,
    },
    {
      id: '1',
      title: 'Babylone - Solum - Esposito B2B Giann...',
      imageUrl: ImagePath.ProfileImg,
    },
    {
      id: '1',
      title: 'Babylone - Solum - Esposito B2B Giann...',
      imageUrl: ImagePath.ProfileImg,
    },
    {
      id: '1',
      title: 'Babylone - Solum - Esposito B2B Giann...',
      imageUrl: ImagePath.ProfileImg,
    },
  ];

  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={()=>navigation.navigate(NavigationStrings.QrCode)}>
    <View style={styles.item}>
      <ImageComponent source={item.imageUrl} style={styles.profileimg} />

      <View style={{width: '80%'}}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.date}>Wed 20 Dec 2023</Text>
          <Text style={styles.date1}>Upcoming</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
  const renderItemm = ({item}: any) => (
    <View style={styles.item}>
      <ImageComponent source={item.imageUrl} style={styles.profileimgs} />

      <View style={{flexDirection: 'row', paddingHorizontal: 7}}>
        <View style={{width: '60%'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>Wed 20 Dec 2023</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 11,
          }}>
          <Text style={styles.date}>Early ticket</Text>
          <Text style={styles.price}>15€99</Text>
        </View>
      </View>
    </View>
  );
  const renderItems = ({item}: any) => (
    <View style={styles.item}>
      <ImageComponent source={item.imageUrl} style={styles.profileimgs} />

      <View style={{flexDirection: 'row', paddingHorizontal: 7}}>
        <View style={{width: '60%'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>Wed 20 Dec 2023</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 11,
          }}>
          <TouchableOpacity>
            <LinearGradient
              colors={[Colors.LinearBlack, Colors.lightPink]}
              style={styles.linear}>
              <Text style={styles.cancelbtn}>Cancel</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.price}>15€99</Text>
        </View>
      </View>
    </View>
  );
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <ImageComponent
            source={ImagePath.ProfileImg}
            style={styles.profileimg}
          />
          <Text style={styles.myticketstext}>My Tickets</Text>
          <View style={{width: 20}}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginVertical: 20,
          }}>
          <Text
            onPress={() => setColors(0)}
            style={[
              styles.tickets,
              {
                color: colors == 0 ? Colors.green : Colors.white,
              },
            ]}>
            My Tickets
          </Text>

          <Text
            onPress={() => setColors(1)}
            style={[
              styles.text,
              {
                color: colors == 1 ? Colors.green : Colors.white,
              },
            ]}>
            BUY
          </Text>

          <Text
            onPress={() => {
              setColors(2), setSellBtn(false);
            }}
            style={[
              styles.text,
              {
                color: colors == 2 ? Colors.green : Colors.white,
              },
            ]}>
            SELL
          </Text>
        </View>
        {colors == 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{marginBottom: 50}}
          />
        ) : null}

        {colors == 1 ? (
          <>
            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder="Nightclub, party, dj, promoter"
                placeholderTextColor="#000"
                underlineColorAndroid="transparent"
              />
              <VectorIcon
                groupName="Fontisto"
                name="search"
                size={20}
                color="black"
                style={styles.searchIcon}
              />
            </View>
            <FlatList data={data1} renderItem={renderItemm} />
          </>
        ) : null}

        {colors == 2 ? (
          <>
            {!sellBtn && (
              <TouchableOpacity
                onPress={() => setSellBtn(!sellBtn)}
                style={styles.sytbtn}>
                <Text style={styles.sell}>Sell your ticket</Text>
              </TouchableOpacity>
            )}
            {sellBtn ? (
              <>
                <FlatList data={data1} renderItem={renderItems} />

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(NavigationStrings.SelectTicket)
                  }
                  style={styles.sytbtn}>
                  <Text style={styles.sell}>Sell more ticket</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </>
        ) : null}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Tickets;
