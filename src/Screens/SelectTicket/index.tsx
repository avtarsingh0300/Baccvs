import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {ImageComponent, SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';

const SelectTicket = ({navigation}: any) => {
  const [selectedId, setSelectedId] = useState(null);

  const handlePress = ({id}: any) => {
    setSelectedId(selectedId === id ? null : id);
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
  ];

  const renderItems = ({item}: any) => (
    <View style={styles.item}>
      <TouchableOpacity>
        <ImageComponent source={item.imageUrl} style={styles.profileimgs} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 7,
          alignItems: 'center',
        }}>
        <View style={{width: '72%'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>Wed 20 Dec 2023</Text>
        </View>
        <View style={styles.Radiobtn}>
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <VectorIcon
              groupName="Ionicons"
              name={
                selectedId === item.id ? 'radio-button-on' : 'radio-button-off'
              }
              size={25}
              color={selectedId === item.id ? Colors.white : Colors.grey}
            />
          </TouchableOpacity>
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
        <View>
          <SizeBox size={10} />
          <Text style={styles.myticketstext}>Select event</Text>
          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="Select my tickets"
              placeholderTextColor={Colors.black}
            />
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationStrings.UploadTicket)}
          style={styles.sytbtn}>
          <Text style={styles.sell}>Upload more tickets</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SelectTicket;
