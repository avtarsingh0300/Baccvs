import { Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { height, moderateScale } from '../../Utilities/Styles/responsiveSize';
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
        // enableHighAccuracy: true,
        timeout: 15000,
        // maximumAge: 10000
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
      setEventData(res?.events);
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
        <MapView style={styles.map} region={userLocation ? initialRegion : undefined}>
          {eventData?.map((item, index) => (
            console.log(item, "iii"),
            <Marker
              key={index}
              coordinate={{ latitude: item?.latitude, longitude: item?.longitude }}
              title={'My Marker'}
              description={'Some description'}
              icon={{ uri: item?.image_url[0], width: 30, height: 32, }}
              style={{ width: 30, height: 32, borderRadius: 20 }}
            />
          ))}
          {userLocation && <Marker
            coordinate={userLocation}
            title={'My Marker'}
            description={'Some description'}
          />}
        </MapView>
      </View>
    </View>
  );
};

export default MapScreen;
