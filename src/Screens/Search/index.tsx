import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import styles from './style';
import {ImageComponent, SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import fontFamily from '../../Utilities/Styles/fontFamily';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {ScrollView} from 'react-native-gesture-handler';

const Search = ({navigation}: any) => {
  const renderItem = () => (
    <View>
      <ImageBackground source={ImagePath.ProfileImg} style={styles.imgbck}>
        <Text style={{...commonStyles.font14, fontFamily: fontFamily.regular}}>
          House
        </Text>
      </ImageBackground>
    </View>
  );
  const renderData = () => (
    <ImageBackground source={ImagePath.ProfileImg} style={styles.imgback}>
      <SizeBox size={3} />
      <Text style={styles.phantom}>Le Phantom</Text>
      <View style={styles.vectoricons}>
        <VectorIcon
          groupName="Fontisto"
          name="heart-alt"
          color={Colors.green}
          size={25}
        />
        <View style={styles.vectortext}>
          <VectorIcon
            groupName="AntDesign"
            name="star"
            color={Colors.yellow}
            size={15}
          />
          <Text style={styles.textnumber}>{`  `}4,7</Text>
        </View>
      </View>
    </ImageBackground>
  );
  const renderDataBars = () => (
    <ImageBackground source={ImagePath.ProfileImg} style={styles.imgback}>
      <SizeBox size={3} />
      <Text style={styles.larc}>L'ARC</Text>
      <View style={styles.vectoricons}>
        <VectorIcon
          groupName="Fontisto"
          name="heart-alt"
          color={Colors.green}
          size={25}
        />
        <View style={styles.vectortext}>
          <VectorIcon
            groupName="AntDesign"
            name="star"
            color={Colors.yellow}
            size={15}
          />
          <Text style={styles.textnumber}>{`  `}4,7</Text>
        </View>
      </View>
    </ImageBackground>
  );
  const renderDataDj = () => (
    <View>
      <ImageBackground source={ImagePath.ProfileImg} style={styles.imgbcks}>
        <SizeBox size={3} />
        <View style={styles.vectortext}>
          <VectorIcon
            groupName="AntDesign"
            name="star"
            color={Colors.yellow}
            size={15}
          />
          <Text style={styles.textnumber}>{`  `}4,7</Text>
        </View>
        <Text style={styles.textsasha}>Sasha, 24</Text>
      </ImageBackground>
      <View style={styles.container}>
        <Text style={{color: Colors.white}}>Disco / Funk / Soul ...</Text>
        <View style={styles.textparis}>
          <VectorIcon
            groupName="Octicons"
            name="location"
            color={Colors.white}
            size={15}
          />
          <Text style={{color: Colors.white}}>{` `}Paris, France</Text>
        </View>
        <Text style={{color: Colors.white}}> 300€ (1h30 Dj Set)</Text>
      </View>
    </View>
  );
  const renderPrivate = () => (
    <ImageBackground source={ImagePath.ProfileImg} style={styles.imgback}>
      <SizeBox size={3} />
      <View style={styles.vectoricons}>
        <VectorIcon
          groupName="Fontisto"
          name="heart-alt"
          color={Colors.green}
          size={25}
        />
        <View style={styles.vectortext}>
          <VectorIcon
            groupName="AntDesign"
            name="star"
            color={Colors.yellow}
            size={15}
          />
          <Text style={styles.textnumber}>{`  `}4,7</Text>
        </View>
      </View>
    </ImageBackground>
  );
  const renderOrganiser = () => (
    <ImageBackground source={ImagePath.ProfileImg} style={styles.imgback}>
      <SizeBox size={3} />
      <View style={styles.vectoricons}>
        <VectorIcon
          groupName="Fontisto"
          name="heart-alt"
          color={Colors.green}
          size={25}
        />
        <View style={styles.vectortext}>
          <VectorIcon
            groupName="AntDesign"
            name="star"
            color={Colors.yellow}
            size={15}
          />
          <Text style={styles.textnumber}>{`  `}4,7</Text>
        </View>
      </View>
    </ImageBackground>
  );
  return (
    <LinearGradient
      colors={[Colors.LinearBlack, Colors.Linear]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.conatiner}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.searchbar}>
            <View></View>
            <Text style={{...commonStyles.font20White, alignSelf: 'center'}}>
              Search
            </Text>
            <TouchableOpacity>
              <ImageComponent
                source={ImagePath.filterIcon}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <SizeBox size={10} />
          <View style={styles.inputcontainer}>
            <TextInput
              placeholder="Search User or party name , group"
              placeholderTextColor={Colors.greyTxt}
              style={styles.input}
            />
            <VectorIcon
              groupName="Ionicons"
              name="search"
              size={28}
              color={Colors.black}
            />
          </View>
          <SizeBox size={10} />
          <View style={styles.flexview}>
            <Text style={styles.headingtext}>Music style</Text>
            <TouchableOpacity style={styles.showmore}>
              <Text style={styles.showtext}>Show more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
            renderItem={renderItem}
            horizontal
            style={{alignSelf: 'center'}}
          />
          <SizeBox size={7} />
          <View style={styles.nightclubs}>
            <View style={styles.flexview}>
              <Text style={styles.headingtext}>Nightclubs</Text>
              <TouchableOpacity style={styles.showmore}>
                <Text style={styles.showtext}>Show more</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
              renderItem={renderData}
              horizontal
              style={{alignSelf: 'center'}}
            />
          </View>
          <SizeBox size={15} />
          <View style={styles.flexview}>
            <Text style={styles.headingtext}>Book a dj</Text>
            <TouchableOpacity style={styles.showmore}>
              <Text style={styles.showtext}>Show more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
            renderItem={renderDataDj}
            horizontal
            style={{alignSelf: 'center'}}
          />
          <SizeBox size={7} />
          <View style={styles.nightclubs}>
            <View style={styles.flexview}>
              <Text style={styles.headingtext}>Private parties</Text>
              <TouchableOpacity style={styles.showmore}>
                <Text style={styles.showtext}>Show more</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
              renderItem={renderPrivate}
              horizontal
              style={{alignSelf: 'center'}}
            />
          </View>
          <SizeBox size={15} />
          <View style={styles.flexview}>
            <Text style={styles.headingtext}>Bars</Text>
            <TouchableOpacity style={styles.showmore}>
              <Text style={styles.showtext}>Show more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
            renderItem={renderDataBars}
            horizontal
            style={{alignSelf: 'center'}}
          />
          <SizeBox size={7} />
          <View style={styles.nightclubs}>
            <View style={styles.flexview}>
              <Text style={styles.headingtext}>Event Organisers</Text>
              <TouchableOpacity style={styles.showmore}>
                <Text style={styles.showtext}>Show more</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={[{id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}, {id: 1}]}
              renderItem={renderOrganiser}
              horizontal
              style={{alignSelf: 'center'}}
            />
          </View>
          <SizeBox size={15} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Search;
