import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import VectorIcon from '../../Utilities/Component/vectorIcons'
import commonStyles from '../../Utilities/Styles/commonStyles'
import { SizeBox } from '../../Utilities/Component/Helpers'
import ImagePath from '../../Utilities/Constants/ImagePath'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavigationStrings from '../../Utilities/Constants/NavigationStrings'

const data= [{id:1},{id:2},{id:3},{id:4}];
const Data1 = Array(6).fill({ label: '#Techno' });
const Data2 = Array(5).fill({ label: 'Private' });
const Data3 = Array(3).fill({ label: 'English' });
const Data4= [{id:1},{id:2},{id:3},{id:4}];
const reviewData= [{id:1},{id:2},{id:3},];

const Profile = ({navigation}:any) => {
  const onContinue = () => {
    navigation.navigate(NavigationStrings.NightclubEdit);
  };
    const renderEvents = ({item,index}: any) => {
        var isLastItem = index === data.length - 1; 
            return(
        <View style={[styles.ftcontainer,{marginRight: isLastItem ? 20 :5,marginLeft:index==0? 20:0 }]}>
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
    const renderEvents2 = ({item,index}: any) => {
        var isLastItem = index === data.length - 1; 
            return(
        <View style={[styles.ftcontainer,{marginRight: isLastItem ? 20 :5,marginLeft:index==0? 20:0 }]}>
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
    const renderMusic = ({ item }) => (
        <View style={{alignSelf:"center"}}>
        <TouchableOpacity style={[styles.button,{backgroundColor:Colors.lightPink}]}>
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
        </View>
      );
    const renderEvent = ({ item }) => (
        <View style={{alignSelf:"center"}}>
        <TouchableOpacity style={[styles.button,{backgroundColor:Colors.lightPink}]}>
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
        </View>
      );
    const renderLanguage = ({ item }) => (
        <View style={{alignSelf:"center"}}>
        <TouchableOpacity style={[styles.button,{backgroundColor:Colors.lightPink}]}>
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
        </View>
      );
      const renderImage =({item,index})=>{
        var isLastItem = index === data.length - 1; 
            return(
                <View>
        <View style={[styles.imagecon,{marginRight: isLastItem ? 20 :5,marginLeft:index==0? 5:0}]}>
         <Image source={ImagePath.ImageBackground} style={styles.collabs}/>
        </View>
        <Text style={styles.avicitxt}>Avicii</Text>
        </View>
      );
    };
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
        <View style={styles.headercontainer}>
            <Text style={{...commonStyles.font16Regular}}>⭐4.8</Text>
            <Text style={{...commonStyles.font20White}}>The Phantom</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onContinue}>
            <VectorIcon groupName='Entypo' name='dots-three-horizontal' size={20}/>
            </TouchableOpacity>
        </View>
        <SizeBox size={10}/>
        <View style={styles.imgview}>
        <Image source={ImagePath.ImageBackground} style={styles.imgcontainer}/>
        </View>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16Regular,paddingHorizontal:20}}>Upcoming events (18)</Text>
        <SizeBox size={10}/>
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
        <Text style={{...commonStyles.font16Regular,paddingHorizontal:20}}>Past events (18)</Text>
        <SizeBox size={10}/>
        <FlatList 
        data={data}
        renderItem={renderEvents2}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        />
        <SizeBox size={10}/>
        <TouchableOpacity style={styles.seeallbtn}>
            <Text style={{...commonStyles.font16White}}>See all</Text>
        </TouchableOpacity>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16Regular,paddingHorizontal:20}}>Who are we?</Text>
        <Text style={{...commonStyles.font14Regular,width:"92%",paddingLeft:20}}>DJ Hmida is the “Go TO” party DJ. She plays an eclectic mix of music and enjoys working with her clients to create the perfect atmosphere ...</Text>
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16WhiteBold,paddingLeft:20}}>
        Music Type
            </Text>
        <SizeBox size={10}/>
        <FlatList
            data={Data1}
            renderItem={renderMusic}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={{paddingLeft:15}}
          />
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16WhiteBold,paddingLeft:20}}>
        Event Type
            </Text>
        <SizeBox size={10}/>
        <FlatList
            data={Data2}
            renderItem={renderEvent}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={{paddingLeft:15}}
          />
        <SizeBox size={10}/>
        <Text style={{...commonStyles.font16WhiteBold,paddingLeft:20}}>
        Language
            </Text>
        <SizeBox size={10}/>
        <FlatList
            data={Data3}
            renderItem={renderLanguage}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={{paddingLeft:15}}
          />
        <SizeBox size={20}/>
        <Text style={{...commonStyles.font16WhiteBold,paddingLeft:20}}>
        Artists collabs
            </Text>
            <SizeBox size={10}/>
        <FlatList
            data={Data4}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            style={{paddingLeft:15}}
          />
        <SizeBox size={10}/>
        <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:20}}>
         <View style={{flexDirection:"row"}}>
            <Text style={{...commonStyles.font16White}}>Reviews (18)</Text>
            <Text style={{...commonStyles.font16White}}>{`  `}⭐4,7</Text>
         </View>
                <VectorIcon groupName='FontAwesome6' name='square-plus' size={25} color={Colors.greyTxt}/>
         </View>
        <SizeBox size={10}/>
        <FlatList
            data={reviewData}
            renderItem={renderReview}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            style={{paddingLeft:15}}
          />

        </KeyboardAwareScrollView>
        </SafeAreaView>
        </LinearGradient>
  )
}

export default Profile