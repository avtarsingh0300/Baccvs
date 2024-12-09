import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../Utilities/Styles/colors';
import styles from './style'; 
import commonStyles from '../../Utilities/Styles/commonStyles';
import { SizeBox } from '../../Utilities/Component/Helpers'; 
import moment from 'moment';

const MusicStyle = ({ navigation }: any) => {
  const [selectedButton, setSelectedButton] = useState('All'); 
  const [eventData, SetEventData] = useState([]);
  const [value, setValue] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('all');
  const [modalVisible, SetModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);



  const buttons = ['All', 'Today', 'Upcoming', 'Past'];

  const toggleModal = () => {
    SetModalVisible(!isModalVisible);
  };

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.9 }}
      style={styles.conatiner} 
    >
      <SafeAreaView>
        <Text style={styles.searchtxt}>Search</Text>
        <SizeBox size={5} />
        <ImageBackground 
          source={require("../../Assets/images/uprofile.png")}
          style={styles.imgbck}
          borderRadius={5}
        >
          <Text style={{ ...commonStyles.font10Regular, color: Colors.white }}>
            House
          </Text>
        </ImageBackground>
        <View style={styles.Buttonscon}>
          {buttons.map((button) => (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                selectedButton === button && styles.selectedButton, 
              ]}
              onPress={() => setSelectedButton(button)} 
            >
              <Text
                style={[
                  styles.text,
                  selectedButton === button && styles.selectedText,
                ]}
              >
                {button}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.datevw}>
          <Text style={styles.date}>
            {moment(value).format('DD MMMM YYYY')} ({eventData?.length})
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default MusicStyle;
