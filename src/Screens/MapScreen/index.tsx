import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { height, moderateScale, moderateScaleVertical } from '../../Utilities/Styles/responsiveSize';
import { SizeBox } from '../../Utilities/Component/Helpers';
import styles from './style';
import MapView, { Marker } from 'react-native-maps';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import { Colors } from '../../Utilities/Styles/colors';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import { getMapData } from '../../Utilities/Constants/auth';
const MapScreen = ({ navigation }: any) => {
  const [userLocation, setUserLocation] = useState(null);
  const [activeBtn, setActiveBtn] = useState(0);
  const [location, setLocation] = useState({});
  const [loading, SetLoading] = useState(false);
  const [eventData, setEventData] = useState([]);
  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        SetLoading(true);
        setUserLocation(position?.coords);
        console.log(position, "hghg");
        if (position.coords) {
          getLocationData();
        }
      },
      error => {
        SetLoading(false);
        console.log(error.code, error.message, "jiwhd");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      },
    );
  };
  const initialRegion = userLocation ? {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : {
    latitude: 37.78825, // Default latitude
    longitude: -122.4324, // Default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const getLocationData = () => {
    getMapData().then(res => {
      // console.log(res, "res in getMapData");
      setEventData(res);
    }).catch(err => {
      console.log(err, "err in getMapData");
    });
  };

  return (
    <View style={styles.conatiner}>
      <View
        style={{
          height: height,
        }}>
        <View style={styles.header}>
          <View style={styles.backBtnContainer}>
            <VectorIcon
              groupName={'AntDesign'}
              name={'leftcircle'}
              size={25}
              color={Colors.white}
              style={{}}
              onPress={onPressBack}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => setActiveBtn(0)}>
              <Text style={[styles.btnText, { color: activeBtn == 0 ? Colors.Pink : Colors.white }]}>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => setActiveBtn(1)}>
              <Text style={[styles.btnText, { color: activeBtn == 1 ? Colors.Pink : Colors.white }]}>People</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "10%" }} />
        </View>
        <MapView style={styles.map} region={userLocation ? initialRegion : undefined}>
          {eventData?.events?.map((item, index) => (
            console.log(item, "iii"),
            <Marker
              key={index}
              coordinate={{ latitude: item?.latitude, longitude: item?.longitude }}
              title={'My Marker'}
              description={'Some description'}
              icon={{ uri: item?.image_url[0], width: 30, height: 32, }}
            // style={{ width: 30, height: 32, borderRadius: 20, borderWidth: 1, borderColor: "red" }}
            />
          ))}
          {userLocation && <Marker
            coordinate={userLocation}
            title={'My Marker'}
            description={'Some description'}
          />}
        </MapView>
        <View style={styles.bottomContainer}>
          <FlatList
            data={activeBtn == 0 ? eventData?.events : eventData?.users?.users}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={({ item, index }) => (
              console.log(item, "item"),
              <Image source={{ uri: activeBtn == 0 ? item?.image_url[0] : item?.image_url }} style={styles.img} />
            )}
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1, zIndex: 300 }}
          />
        </View>
      </View>
    </View>
  );
};

export default MapScreen;
