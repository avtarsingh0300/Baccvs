import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {CommonBtn, SizeBox} from '../../Utilities/Component/Helpers';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import fontFamily from '../../Utilities/Styles/fontFamily';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const Report = ({navigation}: any) => {
  const [pdfUri, setPdfUri] = useState(' ');

  const selectPdf = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      const fileUri = res[0].uri;
      const fileName = res[0].name;
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(fileUri, destPath);
      setPdfUri(destPath);
      console.log(fileName, destPath);
    } catch (err) {
      console.log(err);
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        throw err;
      }
    }
  };

  const onBack = () => {
    navigation.goBack();
  };
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <SizeBox size={5} />
        <View style={styles.headervw}>
          <Image
            style={{
              width: moderateScale(16),
              height: moderateScaleVertical(18),
              resizeMode: 'contain',
            }}
            source={ImagePath.Security_Rules}
          />
          <Text style={styles.headerTxt}>Report</Text>
        </View>
        <SizeBox size={10} />
        <Text style={styles.innertxt}>
          Your report is private. Add as an attachment the messages, images or
          videos that support your report. This will allow us to process the
          request in the best conditions and as fast as possible.
        </Text>
        <SizeBox size={15} />
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 8,
            minHeight: moderateScaleVertical(150),
          }}>
          <TextInput
            multiline
            placeholder="Write your issue here..."
            placeholderTextColor={Colors.greyTxt}
            style={{color: Colors.white, fontFamily: fontFamily.regular}}
          />
        </View>
        <SizeBox size={8} />
        <TouchableOpacity style={styles.headervw} onPress={selectPdf}>
          <Image
            style={{
              width: moderateScale(11),
              height: moderateScaleVertical(16),
              resizeMode: 'contain',
            }}
            source={ImagePath.links}
          />
          <Text style={[styles.innertxt, {width: '30%'}]}>Join document</Text>
        </TouchableOpacity>
        <SizeBox size={10} />
        <Text style={styles.innertxt}>
          If you use this “Report section” for personnal reasons, you might be
          the one banned. This section is only to prevent other members from
          people with bad behavior.
        </Text>
        <SizeBox size={10} />
        <CommonBtn title="Report" onPress={onBack} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Report;
