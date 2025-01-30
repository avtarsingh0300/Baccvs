import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePath from '../../Utilities/Constants/ImagePath'
import commonStyles from '../../Utilities/Styles/commonStyles'
import { showError, SizeBox } from '../../Utilities/Component/Helpers'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import { getEventTypes, getUserData } from '../../Utilities/Constants/auth'
import NavigationStrings from '../../Utilities/Constants/NavigationStrings'

const data= [{id:1},{id:2},{id:3},{id:4}];
const Data3 = Array(3).fill({ label: 'English' });
const reviewData= [{id:1},{id:2},{id:3},];
const Data4 = Array(2).fill({ label: 'Techno' });

const DjPromoters = ({navigation}:any) => {
const onContinue = ()=>{
  navigation.navigate(NavigationStrings.EditDjProfile)
}

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
  const renderEvents = ({item,index}: any) => {
    var isLastItem = index === data.length - 1; 
        return(
    <View style={styles.ftcontainer}>
      <Image source={ImagePath.ProfileImg} style={styles.backimg}/>
      <SizeBox size={3}/>
      <View style={{flexDirection:"row"}}>
        <View style={{flexDirection:"row",alignItems:"center",paddingLeft:5}}>
            <VectorIcon groupName='MaterialCommunityIcons' name='calendar-range-outline' size={20} color={Colors.black}/>
            <Text style={styles.datetxt}> Fri 20 Sep  </Text>
        </View>
        <View style={{flexDirection:"row",alignItems:"center"}}>
            <VectorIcon groupName='Ionicons' name='location-outline' size={20} color={Colors.black}/>
            <Text style={styles.datetxt}>75016, Paris</Text>
        </View>
      </View>
      <View style={{paddingLeft:7}}>
      <Text style={{...commonStyles.font16Regular,color:Colors.black}}>Phantom</Text>
      <Text style={{...commonStyles.font14Regular,color:Colors.black}}>Eric Prydz</Text>
      </View>
    </View>
  );
};
const renderLanguage = ({ item }) => (
  <View style={{alignSelf:"center"}}>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>{item.label}</Text>
  </TouchableOpacity>
  </View>
);
const renderPastEvents = ({ item }) => (
  <View style={{alignSelf:"center"}}>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>{item.label}</Text>
  </TouchableOpacity>
  </View>
);
const renderReview =({item,index})=>{
  var isLastItem = index === data.length - 1; 
  return(
         <View style={styles.outerVw}>
           <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
            <View style={styles.imageview}>
            <Image source={ImagePath.ProfileImg} style={styles.image}/>
            </View>
            <Text style={{...commonStyles.font12Regular}}>{`  `}Benoit</Text>
            </View>
            <Text style={styles.date}>23/02/2024</Text>
           </View>
            <SizeBox size={6}/>
            <Text style={styles.review}>We couldn’t go to ibiza, so ibiza vibes came to us thanks to the amazing performance of Sasha !</Text>
         </View>
);
};
  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.imgouterview} onPress={onContinue}>
    <ImageBackground source={ImagePath.ProfileImg} style={styles.backimage}>
      <Text style={{...commonStyles.font20White,padding:20}}>Dj Profile </Text>
    </ImageBackground>
    </TouchableOpacity> 
    <SizeBox size={10}/>
    <View style={styles.container}>
       <Text style={styles.sashatxt}>Sasha, 24</Text>
       <Text style={styles.friendstxt}>Paris, France</Text>
       <SizeBox size={3}/>
       <Text style={styles.friendstxt}>3602 friends • 11 events</Text>
       <SizeBox size={10}/>
       <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.messagebtn}>
          <VectorIcon groupName='Feather' name='message-square' size={20} color={Colors.black}/>
          <Text style={{...commonStyles.font13,color:Colors.black,marginLeft:5}}>Send a message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messagebtn1}>
          <VectorIcon groupName='FontAwesome' name='user-circle-o' size={20} color={Colors.black}/>
          <Text style={{...commonStyles.font13,color:Colors.black,marginLeft:5}}>Add as a friend</Text>
        </TouchableOpacity>
       </View>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16Regular}}>Sasha’s Bio</Text>
        <SizeBox size={3}/>
        <Text style={{...commonStyles.font14Regular}}>DJ Hmida is the “Go TO” party DJ. She plays an eclectic mix of music and enjoys working with her clients to create the perfect atmosphere ...</Text>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16Regular}}>Upcoming events (18)</Text>
        <SizeBox size={5}/>
        <FlatList 
        data={data}
        renderItem={renderEvents}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        />
        <SizeBox size={10}/>
        <TouchableOpacity style={styles.seeallbtn}>
            <Text style={{...commonStyles.font16White}}>See all</Text>
        </TouchableOpacity>
        <SizeBox size={10}/>
          <LinearGradient
           colors={["#CD3AFF", "#CB7AE7"]}
           start={{x: 0.5, y: 0.1}}
           end={{x: 0.6, y: 0.7}}
           style={{borderRadius:5}}
          >
        <TouchableOpacity style={styles.basicbtn}>
         <Text style={{...commonStyles.font20White}}>Basic</Text>
         <View style={styles.viview}>
         <VectorIcon groupName='MaterialIcons' name='keyboard-arrow-down' size={25}/>
         </View>
        </TouchableOpacity>
          </LinearGradient>
          <SizeBox size={5}/>
          <LinearGradient
           colors={["#1D0F45", "#4725AB"]}
           start={{x: 0.5, y: 0.1}}
           end={{x: 0.6, y: 0.7}}
           style={{borderRadius:5}}
          >
        <TouchableOpacity style={styles.basicbtn}>
         <Text style={{...commonStyles.font20White}}>Standard</Text>
         <View style={styles.viview1}>
         <VectorIcon groupName='MaterialIcons' name='keyboard-arrow-down' size={25}/>
         </View>
        </TouchableOpacity>
          </LinearGradient>
          <SizeBox size={5}/>
          <LinearGradient
           colors={["#FF813A", "#FFB49C"]}
           start={{x: 0.5, y: 0.1}}
           end={{x: 0.6, y: 0.7}}
           style={{borderRadius:5}}
          >
        <TouchableOpacity style={styles.basicbtn}>
         <Text style={{...commonStyles.font20White}}>Premium</Text>
         <View style={styles.viview2}>
         <VectorIcon groupName='MaterialIcons' name='keyboard-arrow-down' size={25}/>
         </View>
        </TouchableOpacity>
          </LinearGradient>
          <SizeBox size={10}/>
          <TouchableOpacity style={styles.talkbtn}>
            <Text style={{...commonStyles.font12Regular,color:Colors.black}}>Let’s talk</Text>
          </TouchableOpacity>
          <SizeBox size={10}/>
          <Text style={styles.label}>Music Type</Text>
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
          />
          <SizeBox size={10}/>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
         <Text style={{...commonStyles.font16WhiteBold}}>Past Events </Text>
         <Text style={{...commonStyles.font16White,textDecorationLine:"underline"}}>See all</Text>
          </View>
          <SizeBox size={10}/>
          <View style={styles.djset}>
          <Image source={ImagePath.ProfileImg} style={styles.pasteventimg}/>
          <View style={styles.outerview}>
            <Text style={{...commonStyles.font12Regular,textAlign:"center"}}>Neymar</Text>
            <SizeBox size={2}/>
            <View style={styles.innervw}>
              <Image source={ImagePath.ProfileImg} style={styles.innerimg}/>
            </View>
          </View>
          </View>
          <SizeBox size={8}/>
          <FlatList
            data={Data4}
            renderItem={renderPastEvents}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
          <SizeBox size={13}/>
          <TouchableOpacity style={styles.talkbtn}>
            <Text style={{...commonStyles.font12Regular,color:Colors.black}}>Book DJ Set</Text>
          </TouchableOpacity>
          <SizeBox size={10}/>
          <View style={{flexDirection:"row"}}>
            <Text style={{...commonStyles.font16White}}>Reviews (18)</Text>
            <Text style={{...commonStyles.font16White}}>{`  `}⭐4,7</Text>
         </View>
         <SizeBox size={10}/>
        <FlatList
            data={reviewData}
            renderItem={renderReview}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
          <SizeBox size={10}/>
    </View>
            </KeyboardAwareScrollView>
            </SafeAreaView> 
            </LinearGradient>
  )
}

export default DjPromoters