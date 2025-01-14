import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showError, SizeBox } from '../../Utilities/Component/Helpers'
import ImagePath from '../../Utilities/Constants/ImagePath'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import commonStyles from '../../Utilities/Styles/commonStyles'
import { getEventTypes, getUserData, getUserProfile } from '../../Utilities/Constants/auth'
import { moderateScale, moderateScaleVertical } from '../../Utilities/Styles/responsiveSize'

const Data3 = Array(3).fill({ label: 'English' });

const NightclubEdit = ({navigation}:any) => {
    const [musicStyle, setMusicStyle] = useState([]);
  const [selMusic, setSelMusic] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [selEventType, setsSelEventType] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    setLoading(true);
    getUserData();
    getEventsTypes();
  }, []);

  const getEventsTypes = () => {
    getEventTypes()
      .then(res => {
        setMusicStyle(res?.musictype);
        setEventType(res?.eventtype);
      })
      .catch(err => {
        showError(err?.message), console.log(err);
      });
  };

  const toggleSelection = (item: any) => {
    setSelMusic((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item?._id)) {
        return prevSelectedItems.filter((id: any) => id !== item?._id);
      } else {
        return [...prevSelectedItems, item?._id];
      }
    });
  };

  const toggleSelection2 = (item: any) => {
    setsSelEventType((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(item?._id)) {
        return prevSelectedItems.filter((name: any) => name !== item?._id);
      } else {
        return [...prevSelectedItems, item?._id];
      }
    });
  };
  const renderLanguage = ({ item }) => (
    <View style={{alignSelf:"center"}}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
    </View>
  );
  const renderPastEvent = ({ item }) => (
    <View style={{marginVertical:10}}>
        <View style={{flexDirection:"row"}}>
     <Image source={ImagePath.ProfileImg} style={styles.eventimg}/>
            <View style={{paddingHorizontal:10}}>
<View style={{flexDirection:"row",width:"60%",justifyContent:"space-between"}}>
     <Text style={{...commonStyles.font18White}}>List item</Text>
        <Text style={{...commonStyles.font16White,textDecorationLine:"underline"}}>Manage</Text>
     </View>
        <Text style={{...commonStyles.font14Regular}}>Category • $$ • 1.2 miles away  </Text>
        <Text style={{...commonStyles.font14Regular,width:"65%"}} numberOfLines={1}>Supporting line text lorem ipsum dolor sit amet, consectetur.</Text>
        </View>
        </View>
        <SizeBox size={5}/>
        <View style={styles.bottomline}></View>
        </View>
  );
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.edittxt}>Nightclub Edit</Text>
            <SizeBox size={10}/>
         <Text style={styles.bannertxt}>Main Bightclub Banner</Text>
         <SizeBox size={10}/>
         <View style={styles.imgview}>
        <ImageBackground source={ImagePath.ProfileImg} style={styles.imgcontainer}/>
            <View style={{position:"absolute",top:10,right:10}}>
        <TouchableOpacity activeOpacity={0.7}>
        <VectorIcon groupName='Feather' name='edit' size={20}/>
        </TouchableOpacity>
        </View>
        </View>
        <SizeBox size={15}/>
        <Text style={{...commonStyles.font16Regular,paddingHorizontal:20}}>Manage past events</Text>
        <SizeBox size={10} />
        <FlatList
         data={[{id:1},{id:2}]}
         renderItem={renderPastEvent}
         keyExtractor={(item, index) => index.toString()}
         style={{paddingHorizontal:15}}
        />
        <SizeBox size={10} />
        <TouchableOpacity style={styles.allevents}>
            <Text style={{...commonStyles.font12Regular,color:Colors.black}}>See all events</Text>
        </TouchableOpacity>
        <SizeBox size={15} />
          <Text style={styles.label}>Music Type</Text>
          <SizeBox size={2} />
          <Text style={styles.selecttxt}>Select music type</Text>
          <SizeBox size={5} />

          <View style={{width: '100%'}}>
            <FlatList
              data={musicStyle}
              renderItem={({item}) => (
                <View style={styles.langcon}>
                  <TouchableOpacity
                    onPress={() => toggleSelection(item)}
                    style={[
                      styles.itHolder,
                      {
                        backgroundColor: selMusic.includes(item?._id)
                          ? Colors.lightPink
                          : Colors.backgroundNew,
                      },
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {selMusic.includes(item?._id) ? (
                        <VectorIcon
                          groupName="AntDesign"
                          name="check"
                          color={Colors.white}
                          size={15}
                          style={{alignSlef: 'centre'}}
                        />
                      ) : null}

                      <Text style={[styles.inpt]}>
                        {` `}
                        {item?.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              numColumns={2}
            />

            <SizeBox size={10} />
          </View>

          <Text style={styles.label}>Event Type</Text>
          <SizeBox size={2} />
          <Text style={styles.selecttxt}>Select event type</Text>
          <SizeBox size={5} />

          <View style={{width: '100%'}}>
            <FlatList
              data={eventType}
              renderItem={({item}) => (
                <View style={styles.langcon}>
                  <TouchableOpacity
                    onPress={() => toggleSelection2(item)}
                    style={[
                      styles.itHolder,
                      {
                        backgroundColor: selEventType.includes(item?._id)
                          ? Colors.lightPink
                          : Colors.backgroundNew,
                      },
                    ]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {selEventType.includes(item?._id) ? (
                        <VectorIcon
                          groupName="AntDesign"
                          name="check"
                          color={Colors.white}
                          size={15}
                          style={{alignSlef: 'centre'}}
                        />
                      ) : null}

                      <Text style={[styles.inpt]}>
                        {` `}
                        {item?.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              numColumns={2}
            />
          </View>
          <SizeBox size={10} />
          <Text style={styles.label}>Language</Text>
          <SizeBox size={10}/>
        <FlatList
            data={Data3}
            renderItem={renderLanguage}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={{paddingLeft:15}}
          />
            </KeyboardAwareScrollView>
        </SafeAreaView>
        </LinearGradient>
  )
}

export default NightclubEdit