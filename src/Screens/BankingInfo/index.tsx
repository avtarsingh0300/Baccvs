import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from '../../Utilities/Styles/responsiveSize';
import commonStyles from '../../Utilities/Styles/commonStyles';
import {SizeBox} from '../../Utilities/Component/Helpers';
import Modal from 'react-native-modal';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {styles} from './styles';

const BankingInfo = ({navigation}: any) => {
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [CVC, setCVC] = useState('');

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{padding: 5}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={ImagePath.Arrow_Left_2} />
            </TouchableOpacity>
            <Text
              style={{
                ...commonStyles.font20White,
                marginLeft: moderateScale(20),
              }}>
              Banking information
            </Text>
            <View style={{width: '10%'}} />
          </View>
          <Text style={styles.title}>Payment methods</Text>
          <SizeBox size={15} />
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.label}>Josh Rua 08/26</Text>
              <Text style={styles.label}>**** 2388</Text>
            </View>
            <Text style={styles.label}>08/26</Text>
          </View>
          <SizeBox size={15} />
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.label}>Arthur Gem</Text>
              <Text style={styles.label}>**** 2388</Text>
            </View>
            <Text style={styles.label}>11/28</Text>
          </View>
          <SizeBox size={25} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={() => setShowOptionModal(true)}>
            <Text style={styles.btnText}>Add payment method</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setShowOptionModal(false)}
        avoidKeyboard={true}
        style={{flex: 1, margin: 0, justifyContent: 'flex-end'}}
        // isVisible={true}
        isVisible={showOptionModal}
        backdropOpacity={0.5}>
        <LinearGradient
          colors={[Colors.backgroundNew, Colors.backgroundNew]}
          start={{x: 0, y: 0}}
          end={{x: 1.3, y: 0.9}}
          style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <Text style={{...commonStyles.font24W400}}>Pay with</Text>
          <SizeBox size={10} />
          <TouchableOpacity activeOpacity={0.8} style={styles.option}>
            <View style={{width: '7%'}} />
            <VectorIcon
              groupName="Entypo"
              name="paypal"
              color={Colors.white}
              size={20}
            />
            <Text
              style={{
                ...commonStyles.font14Bold,
                color: Colors.white,
                marginLeft: 10,
              }}>
              Paypal
            </Text>
          </TouchableOpacity>
          <SizeBox size={2} />
          <View style={styles.borderView} />
          <SizeBox size={2} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.option}
            onPress={() => {
              setShowOptionModal(false);
              setTimeout(() => {
                setShowAddCardModal(true);
              }, 400);
            }}>
            <View style={{width: '7%'}} />
            <VectorIcon
              groupName="AntDesign"
              name="creditcard"
              color={Colors.white}
              size={20}
            />
            <Text
              style={{
                ...commonStyles.font14Bold,
                color: Colors.white,
                marginLeft: 10,
              }}>
              Credit or debit card
            </Text>
          </TouchableOpacity>
          <SizeBox size={5} />
        </LinearGradient>
      </Modal>
      <Modal
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setShowAddCardModal(false)}
        avoidKeyboard={true}
        style={{flex: 1, justifyContent: 'center', margin: 0}}
        // isVisible={true}
        isVisible={showAddCardModal}
        backdropOpacity={0.5}>
        <LinearGradient
          colors={[Colors.backgroundNew, Colors.backgroundNew]}
          start={{x: 0, y: 0}}
          end={{x: 1.3, y: 0.9}}
          style={styles.backGroundLiner}>
          <Text style={{...commonStyles.font24W400, marginLeft: 10}}>
            Add card
          </Text>
          <SizeBox size={10} />
          <TextInput
            value={userName}
            onChangeText={(e: string) => {
              setUserName(e);
            }}
            placeholder="Name"
            placeholderTextColor={'#637394'}
            style={styles.textInputStyle}
          />
          <SizeBox size={10} />
          <TextInput
            value={cardNumber}
            onChangeText={(e: string) => {
              setCardNumber(e);
            }}
            placeholder="Card number"
            placeholderTextColor={'#637394'}
            style={styles.textInputStyle}
          />
          <SizeBox size={10} />
          <View style={styles.row}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                value={month}
                onChangeText={(e: string) => {
                  setMonth(e);
                }}
                placeholder="MM"
                placeholderTextColor={'#637394'}
                style={styles.textInputStyle2}
              />
              <TextInput
                value={year}
                onChangeText={(e: string) => {
                  setYear(e);
                }}
                placeholder="YY"
                placeholderTextColor={'#637394'}
                style={[styles.textInputStyle2, {marginLeft: 10}]}
              />
            </View>
            <TextInput
              value={CVC}
              onChangeText={(e: string) => {
                setCVC(e);
              }}
              placeholder="CVC"
              placeholderTextColor={'#637394'}
              style={[styles.textInputStyle2, {marginRight: 10}]}
            />
          </View>
          <SizeBox size={10} />
          <TouchableOpacity activeOpacity={0.8} style={styles.modalInBtn}>
            <LinearGradient
              colors={['#FF8036', '#FC6D19']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.linerStyle}>
              <Text style={{...commonStyles.font18W700Center}}>Add card</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
};

export default BankingInfo;
