import {FlatList, SafeAreaView, View} from 'react-native';
import React from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import {
  CommonBtn,
  Header,
  SizeBox,
  dummydata,
} from '../../Utilities/Component/Helpers';

import VectorIcon from '../../Utilities/Component/vectorIcons';

const SocialPart = ({navigation}: any) => {
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Header title="Edit profile pictures" onPress={onBack} />
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={dummydata}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <View style={styles.innerCon}>
                <LinearGradient
                  colors={[Colors.Linear, Colors.lightPink]}
                  start={{x: 0.4, y: 1.1}}
                  end={{x: 1.3, y: 0.2}}
                  style={styles.btnLinear}>
                  <VectorIcon groupName="AntDesign" name="plus" size={20} />
                </LinearGradient>
              </View>
            </View>
          )}
          numColumns={3}
          keyExtractor={item => item.id.toString()}
        />
        <SizeBox size={10} />
        <CommonBtn onPress={onBack} title={'Edit profile'} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SocialPart;
