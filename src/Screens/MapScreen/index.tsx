import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  height,
  moderateScale,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import {ImageComponent, SizeBox} from '../../Utilities/Component/Helpers';
import styles from './style';
import MapView, {Marker} from 'react-native-maps';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {Colors} from '../../Utilities/Styles/colors';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';
import {getMapData} from '../../Utilities/Constants/auth';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
const MapScreen = ({navigation}: any) => {
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
        console.log(position, 'hghg');
        if (position.coords) {
          getLocationData();
        }
      },
      error => {
        SetLoading(false);
        console.log(error.code, error.message, 'jiwhd');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  const initialRegion = userLocation
    ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

  const getLocationData = () => {
    getMapData()
      .then(res => {
        console.log(res, 'res in getMapData');
        setEventData(res);
      })
      .catch(err => {
        console.log(err, 'err in getMapData');
      });
  };

  const onFilter = () => {
    navigation.navigate(NavigationStrings.EventFilter);
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
              onPress={onPressBack}
            />
          </View>
          <SizeBox size={30} />
          <View style={[styles.btnContainer, {right: 10}]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => setActiveBtn(0)}>
              <Text
                style={[
                  styles.btnText,
                  {color: activeBtn == 0 ? Colors.Pink : Colors.white},
                ]}>
                Events
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => setActiveBtn(1)}>
              <Text
                style={[
                  styles.btnText,
                  {color: activeBtn == 1 ? Colors.Pink : Colors.white},
                ]}>
                People
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '10%'}} />
        </View>
        <MapView
          style={styles.map}
          region={userLocation ? initialRegion : undefined}>
          {activeBtn == 0 ? (
            <>
              {eventData?.events?.map(
                (item, index) => (
                  console.log(item, 'iii'),
                  (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: item?.latitude,
                        longitude: item?.longitude,
                      }}
                      title={'My Marker'}
                      description={'Some description'}
                      // icon={{uri: item?.image_url[0], width: 30, height: 32}}
                      // style={{ width: 30, height: 32, borderRadius: 20, borderWidth: 1, borderColor: "red" }}
                    >
                      {item?.image_url ? (
                        <Image
                          source={{uri: IMAGE_URL + item?.image_url}}
                          style={{
                            width: 30,
                            height: 32,
                            borderWidth: 1,
                            borderColor: Colors.Pink,
                            borderRadius: 5,
                          }}
                        />
                      ) : null}
                    </Marker>
                  )
                ),
              )}
            </>
          ) : (
            <>
              {eventData?.users?.map(
                (item, index) => (
                  console.log(item, 'iii'),
                  (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: item?.latitude,
                        longitude: item?.longitude,
                      }}
                      title={'My Marker'}
                      description={'Some description'}
                      // icon={{uri: item?.image_url, width: 30, height: 32}}
                      // style={{ width: 30, height: 32, borderRadius: 20, borderWidth: 1, borderColor: "red" }}
                    >
                      {item?.image_url ? (
                        <ImageComponent
                          source={{uri: IMAGE_URL + item?.image_url}}
                          style={{
                            width: 30,
                            height: 32,
                            borderWidth: 1,
                            borderColor: Colors.Pink,
                            borderRadius: 5,
                          }}
                        />
                      ) : null}
                    </Marker>
                  )
                ),
              )}
            </>
          )}
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title={'My Marker'}
              description={'Some description'}
            />
          )}
        </MapView>

        {activeBtn == 0 ? (
          <View
            style={[
              styles.bottomContainer,
              {
                height:
                  eventData?.events?.length > 0
                    ? moderateScaleVertical(250)
                    : moderateScaleVertical(90),
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
              }}>
              <View style={styles.nearbtn}>
                <Text style={[styles.btnText, {color: Colors.white}]}>
                  Nearby
                </Text>
              </View>
              <TouchableOpacity onPress={onFilter}>
                <Image
                  source={ImagePath.filterIcon}
                  style={{width: 30, height: 30, tintColor: Colors.Linear}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <SizeBox size={5} />

            <FlatList
              data={eventData?.events}
              keyExtractor={(item, index) => index?.toString()}
              renderItem={({item, index}) => (
                <View>
                  {item?.image_url ? (
                    <ImageComponent
                      source={{
                        uri: IMAGE_URL + item?.image_url,
                      }}
                      style={styles.img}
                    />
                  ) : (
                    <ImageComponent
                      source={ImagePath.ProfileImg}
                      style={styles.img}
                    />
                  )}
                </View>
              )}
              horizontal={true}
              contentContainerStyle={{flexGrow: 1, zIndex: 300}}
            />
          </View>
        ) : (
          <View
            style={[
              styles.bottomContainer,
              {
                height:
                  eventData?.users?.length > 0
                    ? moderateScaleVertical(250)
                    : moderateScaleVertical(90),
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
              }}>
              <View style={styles.nearbtn}>
                <Text style={[styles.btnText, {color: Colors.white}]}>
                  Nearby
                </Text>
              </View>
              <TouchableOpacity onPress={onFilter}>
                <Image
                  source={ImagePath.filterIcon}
                  style={{width: 30, height: 30, tintColor: Colors.Linear}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <SizeBox size={5} />
            <FlatList
              data={eventData?.users}
              keyExtractor={(item, index) => index?.toString()}
              renderItem={({item, index}) => (
                <View>
                  {item?.image_url ? (
                    <ImageComponent
                      source={{
                        uri: IMAGE_URL + item?.image_url,
                      }}
                      style={styles.img}
                    />
                  ) : (
                    <ImageComponent
                      source={ImagePath.ProfileImg}
                      style={styles.img}
                    />
                  )}
                </View>
              )}
              horizontal={true}
              contentContainerStyle={{flexGrow: 1, zIndex: 300}}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default MapScreen;
