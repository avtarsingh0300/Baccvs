import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import { SafeAreaView } from 'react-native'
import commonStyles from '../../Utilities/Styles/commonStyles'
import { SizeBox } from '../../Utilities/Component/Helpers'
import fontFamily from '../../Utilities/Styles/fontFamily'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { width } from '../../Utilities/Styles/responsiveSize'

const buttonData = Array(4).fill({ label: 'weekend' });
const Data = Array(6).fill({ label: 'Student' });
const Data1 = Array(10).fill({ label: 'EDM / Dance Music' });
const PromoteScreen = () => {
  const [text ,setText] = useState('');
  const [selectedValues2, setSelectedValues2] = useState([1, 4]);
 
  const onValuesChangeFinish2 = values => {
    setSelectedValues2(values);
  };

  const renderData=({item})=>(
    <View style={[styles.customtxt,{marginTop:10}]}>
      <Text style={{...commonStyles.font12Bold}}>Min. Ratio events attended</Text>
          <TouchableOpacity style={styles.parisbtn}>
            <Text style={{...commonStyles.font12Bold,color:Colors.white}}>80%</Text>
          </TouchableOpacity>
    </View>
  );
  const renderButton = ({ item }) => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
  );
  const renderSubscription = ({ item }) => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
  );
  const renderMI = ({ item }) => (
    <TouchableOpacity style={styles.button1}>
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
  );
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.9 }}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.promotetxt}>Promote</Text>
        <SizeBox size={20}/>
        <Text style={{...commonStyles.font16WhiteBold}}>Custom notification</Text>
        <SizeBox size={5}/>
        <View style={styles.customtxt}>
          <Text style={{...commonStyles.font14Bold}}>Create notification</Text>
          <Text style={styles.letterstxt}>(80 letters max)</Text>
          <View/>
          </View>
          <SizeBox size={5}/>
          <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={5}
        value={text}
        onChangeText={setText}
      />
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16WhiteBold}}>Scheduling</Text>
        <SizeBox size={10}/>
        <TouchableOpacity style={styles.choosedatebtn}>
          <Text style={{...commonStyles.font10Regular,color:Colors.greyTxt}}>
          Choose Date & time
          </Text>
        </TouchableOpacity>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16WhiteBold}}>Audience segmentation</Text>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font14Regular,paddingLeft:20}}>Demographics</Text>
        <SizeBox size={5}/>
                  <Text style={{...commonStyles.font14Regular,alignSelf:"flex-end",paddingRight:40}}>20 - 26</Text>
        <View style={styles.customtxt}>
                  <Text style={{...commonStyles.font14Regular,paddingLeft:2}}>Age</Text>
                <View style={{paddingLeft:40}}>
                  <MultiSlider
                    markerStyle={styles.marker}
                    values={selectedValues2}
                    min={0}
                    max={5}
                    allowOverlap
                    sliderLength={width / 1.9}
                    selectedStyle={styles.select}
                    unselectedStyle={styles.unsel}
                    onValuesChangeFinish={onValuesChangeFinish2}
                  />
                </View>
              </View>
        <View style={styles.customtxt}>
          <Text style={{...commonStyles.font14Regular}}>Gender</Text>
          <Text style={{...commonStyles.font14Regular,fontFamily:fontFamily.time_regular}}>M - F</Text>
          <View/>
        </View>
        <SizeBox size={8}/>
        <View style={styles.customtxt}>
          <Text style={{...commonStyles.font14Regular}}>Location</Text>
          <TouchableOpacity style={styles.choosedatebtn}>
            <Text style={{...commonStyles.font10Regular,color:Colors.greyTxt}}>Select Locations</Text>
          </TouchableOpacity>
          <View/>
          </View>
        <SizeBox size={10}/>
          <View style={{flexDirection:"row",paddingLeft:10}}>
            <TouchableOpacity style={styles.parisbtn}>
              <Text style={{...commonStyles.font13,fontFamily:fontFamily.time_regular}}>Paris</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parisbtn2}>
              <Text style={{...commonStyles.font13,fontFamily:fontFamily.time_regular}}>Ile-de-France</Text>
            </TouchableOpacity>
            <View/>
          </View>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16WhiteBold}}>Behavioral Data</Text>
        <SizeBox size={5}/>
        <Text style={styles.letterstxt}>User Segmentation Based on Event Attendance</Text>
        <SizeBox size={5}/>
        <FlatList
        data={[{id:1},{id:1},{id:1},{id:1},{id:1},]}
        renderItem={renderData}
        style={styles.flatlistdata}
        />
        <SizeBox size={20}/>
        <Text style={{...commonStyles.font16WhiteBold}}>Preferred Event Time</Text>
        <SizeBox size={8} />
          <FlatList
            data={buttonData}
            renderItem={renderButton}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            style={{paddingLeft:15,alignSelf:"center"}}
          />
          <SizeBox size={15}/>
        <Text style={{...commonStyles.font16WhiteBold}}>Subscription</Text>
          <SizeBox size={5}/>
          <FlatList
            data={Data}
            renderItem={renderSubscription}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={{alignSelf:"center"}}
          />
          <SizeBox size={15}/>
        <Text style={{...commonStyles.font16WhiteBold}}>Music interests</Text>
          <SizeBox size={5}/>
          <FlatList
            data={Data1}
            renderItem={renderMI}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            style={{alignSelf:"center"}}
          />
          <SizeBox size={15}/>
        <Text style={{...commonStyles.font16WhiteBold}}>Music interests</Text>
        <SizeBox size={5}/>
        <TouchableOpacity style={styles.addtagsbtn}>
          <Text style={{...commonStyles.font12,fontFamily:fontFamily.time_regular,color:Colors.greyTxt}}>Select or Add tags</Text>
        </TouchableOpacity>
       </KeyboardAwareScrollView>
        </SafeAreaView>
        </LinearGradient>
  )
}

export default PromoteScreen;