import {View} from 'react-native';
import React from 'react';
import {height} from '../../Utilities/Styles/responsiveSize';
import {SizeBox} from '../../Utilities/Component/Helpers';
import styles from './style';
import MapView, {Marker} from 'react-native-maps';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import {Colors} from '../../Utilities/Styles/colors';
const MapScreen = ({navigation}: any) => {
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.conatiner}>
      <View
        style={{
          height: height,
        }}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            title={'My Marker'}
            description={'Some description'}
          />

          <SizeBox size={30} />
          <VectorIcon
            groupName={'AntDesign'}
            name={'leftcircle'}
            size={25}
            color={Colors.white}
            style={{marginLeft: 15}}
            onPress={onPressBack}
          />
        </MapView>
      </View>
    </View>
  );
};

export default MapScreen;
