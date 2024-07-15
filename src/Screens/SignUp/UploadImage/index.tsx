import { FlatList, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../Utilities/Styles/colors';
import commonStyles from '../../../Utilities/Styles/commonStyles';
import {
  CommonBtn,
  ProgressHeader,
  SizeBox,
  dummydata,
} from '../../../Utilities/Component/Helpers';

import VectorIcon from '../../../Utilities/Component/vectorIcons';
import NavigationStrings from '../../../Utilities/Constants/NavigationStrings';

const UploadImage = (props: any) => {
  const [selectedImages, setSelectedImages] = useState([{ id: 0 }]);

  const onBack = () => {
    props.navigation.goBack();
  };
  const onComplete = () => {
    props.navigation.navigate(NavigationStrings.WelcomScreen);
  };



  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.9 }}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ProgressHeader onPress={onBack} value={5} />
        <SizeBox size={15} />
        <Text style={{ ...commonStyles.font18W700Center }}>Add photos</Text>
        <SizeBox size={10} />
        <Text style={styles.imgTxt}>
          Add atleast 3 pictures or videos to complete your profile. Any profile
          that doesn’t represent the user can be banned.
        </Text>
        <SizeBox size={10} />
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={selectedImages}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <View style={styles.innerCon}>
                <LinearGradient
                  colors={[Colors.Linear, Colors.lightPink]}
                  start={{ x: 0.4, y: 1.1 }}
                  end={{ x: 1.3, y: 0.2 }}
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
        <CommonBtn onPress={onComplete} title={'Complete'} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UploadImage;
