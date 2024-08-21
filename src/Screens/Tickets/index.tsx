import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {ImageComponent, SizeBox} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';
import VectorIcon from '../../Utilities/Component/vectorIcons';

const Tickets = () => {
  const [colors, setColors] = useState(0);

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
      title: 'Babylone - Solum - Esposito B2B Gianni romano/ Cha...',
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

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity>
        <ImageComponent source={item.imageUrl} style={styles.profileimg} />
      </TouchableOpacity>
      <View style={{width: '80%'}}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.date}>Wed 20 Dec 2023</Text>
          <Text style={styles.date1}>Upcoming</Text>
        </View>
      </View>
    </View>
  );
  const renderItemm = ({item}) => (
    <View style={styles.item}>
      <TouchableOpacity>
        <ImageComponent source={item.imageUrl} style={styles.profileimgs} />
      </TouchableOpacity>
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
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <ImageComponent
              source={ImagePath.ProfileImg}
              style={styles.profileimg}
            />
          </TouchableOpacity>
          <Text style={styles.myticketstext}>My Tickets</Text>
          <View></View>
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
            onPress={() => setColors(2)}
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
        ) : null}
        {colors == 1 ? (
          <FlatList data={data1} renderItem={renderItemm} />
        ) : null}

        {colors == 2 ? (
          <>
            <SizeBox size={20} />
            <TouchableOpacity style={styles.sytbtn}>
              <Text style={styles.sell}>Sell your ticket</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Tickets;
