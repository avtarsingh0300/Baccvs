import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import {Colors} from '../Styles/colors';

type VectorIconProps = {
  groupName: keyof typeof VectorIcons;
  name: string;
  size: number;
  style?: any;
  color?: string;
  onPress?: () => void;
};

const colordef = Colors.white;

export const VectorIcons = {
  AntDesign,
  MaterialIcons,
  EvilIcons,
  Entypo,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
  Octicons,
  SimpleLineIcons,
  Fontisto,
  FontAwesome5,
  Feather,
  FontAwesome6,
};

const VectorIcon: React.FC<VectorIconProps> = ({
  groupName,
  name,
  size,
  style,
  color,
  onPress,
}) => {
  const IconComponent = VectorIcons[groupName];
  return (
    <IconComponent
      name={name}
      size={size}
      style={style}
      color={color != null ? color : colordef}
      onPress={onPress}
    />
  );
};

export default VectorIcon;
