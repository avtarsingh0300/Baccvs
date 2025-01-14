import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {ImageComponent, SizeBox} from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {getMapData} from '../../Utilities/Constants/auth';
import ImagePath from '../../Utilities/Constants/ImagePath';
import NavigationStrings from '../../Utilities/Constants/NavigationStrings';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {Colors} from '../../Utilities/Styles/colors';
import {
  height,
  moderateScaleVertical,
} from '../../Utilities/Styles/responsiveSize';
import styles from './style';
import {groupUsersByProximity} from '../../Utilities/Helpers';

const UserJson = [
  {
    id: '66a8d782925228f4396361f9',
    image_url: 'storage/userdata/1732168588124-Rectangle 160.png',
    latitude: 30.733315,
    longitude: 76.779419,
    name: 'CCCCCC',
  },
  {
    id: '66a8d782925228f4396361f9',
    image_url: 'storage/userdata/1732173480221-Rectangle 10.png',
    latitude: 30.732315,
    longitude: 76.759419,
    name: 'BBBBBBB',
  },
  {
    id: '66a8d782925228f4396361f9',
    image_url: 'storage/userdata/1732168588124-Rectangle 160.png',
    latitude: 30.731315,
    longitude: 76.769419,
    name: 'AAAAAAA',
  },
  {
    id: '6690b855a519251381cf922f',
    image_url: 'storage/userdata/1732173480221-Rectangle 10.png',
    latitude: 28.70506,
    longitude: 77.102453,
    name: 'Harish Sharma',
  },
  {
    id: '668f979b44866a3ac43c09de',
    image_url: 'storage/userdata/1732168588124-Rectangle 160.png',
    latitude: 28.70706,
    longitude: 77.102593,
    name: 'Jane Doe',
  },
  {
    id: '66a3a6b451ef46d148693c5d',
    image_url: 'storage/userdata/1732168588124-Rectangle 160.png',
    latitude: 28.70306,
    longitude: 77.102393,
    name: 'Sudheerqer',
  },
  {
    id: '668bc3785bd3a00506a1de62',
    image_url: 'storage/userdata/1732173480221-Rectangle 10.png',
    latitude: 28.70406,
    longitude: 77.102493,
    name: 'Harish',
  },
  // Additional places within 100 km
  {
    id: '66d1234567890abcd1234567',
    image_url: 'storage/userdata/1732168588124-Rectangle 160.png',
    latitude: 30.754549,
    longitude: 76.792401,
    name: 'Rohit Verma',
  },
  {
    id: '66e234567890abcd12345678',
    image_url: 'storage/userdata/1732173480221-Rectangle 10.png',
    latitude: 30.715789,
    longitude: 76.801203,
    name: 'Pooja Singh',
  },
  {
    id: '66f34567890abcd123456789',
    image_url: 'storage/userdata/1732168588124-Rectangle 160.png',
    latitude: 30.747832,
    longitude: 76.795104,
    name: 'Vikram Sharma',
  },
  {
    id: '6604567890abcd123456789a',
    image_url: 'storage/userdata/1732168588124-Rectangle 160.png',
    latitude: 28.670345,
    longitude: 77.094567,
    name: 'Anjali Kapoor',
  },
  {
    id: '661567890abcd123456789b',
    image_url: 'sstorage/userdata/1732173480221-Rectangle 10.png',
    latitude: 28.714567,
    longitude: 77.145678,
    name: 'Ramesh Kumar',
  },
  {
    id: '66267890abcd123456789c',
    image_url: 'storage/userdata/1732173480221-Rectangle 10.png',
    latitude: 28.691234,
    longitude: 77.102893,
    name: 'Neha Gupta',
  },
  {
    id: '6637890abcd123456789d',
    image_url: 'storage/userdata/1732168588124-Rectangle 160.png',
    latitude: 28.675123,
    longitude: 77.135678,
    name: 'Amit Singh',
  },
];

export type UserData = {
  id: string;
  image_url: string;
  latitude: number;
  longitude: number;
  name: string;
};

const MapScreen = ({navigation}: any) => {
  const [userLocation, setUserLocation] = useState<any>(null);
  const [activeBtn, setActiveBtn] = useState(0);
  const [eventData, setEventData] = useState<any>([]);
  const [userData, setUserData] = useState<UserData[]>([]);

  const [userGroups, setUserGroups] = useState<any[]>([]); // New state for grouped users
  const [eventGroups, setEventGroups] = useState<any[]>([]); // New state for grouped users

  const proximityThreshold = 2; // km proximity threshold

  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        setUserLocation(position?.coords);
        console.log(position, 'hghg');
        if (position.coords) {
          getLocationData();
        }
      },
      error => {
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
        latitude: 30.704649,
        longitude: 76.717873,
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
      .then((res: any) => {
        setEventData(res.events);
        setUserData(res.users);

        // Group users by proximity
        const groupedUsers = groupUsersByProximity(
          UserJson,
          proximityThreshold,
        );
        const groupedEvents = groupUsersByProximity(
          UserJson,
          proximityThreshold,
        );
        setUserGroups(groupedUsers);
        setEventGroups(groupedEvents);
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
          <View style={{width: '18%'}} />
        </View>
        <MapView
          style={styles.map}
          region={userLocation ? initialRegion : undefined}>
          {activeBtn === 0
            ? eventGroups.map((group, index) => {
                // Calculate the center of the group
                const avgLatitude =
                  group.reduce(
                    (sum: any, user: {latitude: any}) => sum + user.latitude,
                    0,
                  ) / group.length;
                const avgLongitude =
                  group.reduce(
                    (sum: any, user: {longitude: any}) => sum + user.longitude,
                    0,
                  ) / group.length;

                // Extract images or names for display (limit to 3 for better visibility)
                const images = group
                  .slice(0, 3)
                  .map((user: UserData) => user.image_url);
                const names = group
                  .slice(0, 3)
                  .map((user: UserData) => user.name);

                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: avgLatitude,
                      longitude: avgLongitude,
                    }}
                    title={`Group of ${group.length}`}
                    description={names.join(', ')} // Show names in the marker's description
                  >
                    <View
                      style={{
                        maxWidth: 100,
                        height: 50,
                        backgroundColor: Colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 10,
                        borderColor: Colors.darkPink,
                        borderWidth: 1.4,
                        borderRadius: 5,
                        shadowColor: 'rgba(0, 0, 0, 1)',
                        shadowOpacity: 1,
                        shadowRadius: 20,
                        shadowOffset: {
                          height: 5,
                          width: 5,
                        },
                      }}>
                      {/* Render user images inside marker */}
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          overflow: 'hidden',
                        }}>
                        <FlatList
                          horizontal
                          data={images}
                          renderItem={({item, index}) => {
                            return (
                              <Image
                                key={index}
                                source={{uri: IMAGE_URL + item}}
                                style={{
                                  width: 33.3,
                                  height: 50,
                                  margin: 1,
                                }}
                              />
                            );
                          }}
                        />
                      </View>
                    </View>
                  </Marker>
                );
              })
            : userGroups.map((group, index) => {
                // Calculate the center of the group
                const avgLatitude =
                  group.reduce(
                    (sum: any, user: {latitude: any}) => sum + user.latitude,
                    0,
                  ) / group.length;
                const avgLongitude =
                  group.reduce(
                    (sum: any, user: {longitude: any}) => sum + user.longitude,
                    0,
                  ) / group.length;

                // Extract images or names for display (limit to 3 for better visibility)
                const images = group
                  .slice(0, 3)
                  .map((user: UserData) => user.image_url);
                const names = group
                  .slice(0, 3)
                  .map((user: UserData) => user.name);

                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: avgLatitude,
                      longitude: avgLongitude,
                    }}
                    title={`Group of ${group.length}`}
                    description={names.join(', ')} // Show names in the marker's description
                  >
                    <View
                      style={{
                        maxWidth: 100,
                        height: 50,
                        backgroundColor: Colors.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 10,
                        borderColor: Colors.darkPink,
                        borderWidth: 1.4,
                        borderRadius: 5,
                        shadowColor: 'rgba(0, 0, 0, 1)',
                        shadowOpacity: 1,
                        shadowRadius: 20,
                        shadowOffset: {
                          height: 5,
                          width: 5,
                        },
                      }}>
                      {/* Render user images inside marker */}
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          overflow: 'hidden',
                        }}>
                        <FlatList
                          horizontal
                          data={images}
                          renderItem={({item, index}) => {
                            return (
                              <Image
                                key={index}
                                source={{uri: IMAGE_URL + item}}
                                style={{
                                  width: 33.3,
                                  height: 50,
                                  margin: 1,
                                }}
                              />
                            );
                          }}
                        />
                      </View>
                    </View>
                  </Marker>
                );
              })}
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title={'My Location'}
              description={'This is your current location'}
            />
          )}
        </MapView>

        {activeBtn == 0 ? (
          <View
            style={[
              styles.bottomContainer,
              {
                height:
                  eventData?.length > 0
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
              data={eventData}
              keyExtractor={(item, index) => index?.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate(NavigationStrings.EventDetails, {
                      eventId: item?.id,
                    });
                  }}>
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
                </TouchableOpacity>
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
                  userData?.length > 0
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
              data={userData}
              keyExtractor={(item, index) => index?.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate(NavigationStrings.OtherProfiles, {
                      id: item?.id,
                    });
                  }}>
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
                </TouchableOpacity>
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
