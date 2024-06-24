import React, {useContext} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, View} from 'react-native';
import * as screens from './index';
import {
  moderateScale,
  moderateScaleVertical,
} from '../Utilities/Styles/responsiveSize';
import {Colors} from '../Utilities/Styles/colors';
import NavigationStrings from '../Utilities/Constants/NavigationStrings';
import VectorIcon from '../Utilities/Component/vectorIcons';
import LinearGradient from 'react-native-linear-gradient';
import ImagePath from '../Utilities/Constants/ImagePath';
import {ImageComponent} from '../Utilities/Component/Helpers';

const BottomTab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <BottomTab.Navigator
      tabBar={tabsProps => (
        <>
          <View style={{backgroundColor: Colors.Linear}}>
            <LinearGradient
              colors={[Colors.Linear, Colors.LinearBlack]}
              start={{x: 0.4, y: 0}}
              end={{x: 0.4, y: 1.2}}
              style={{
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                opacity: 0.5,
              }}>
              <BottomTabBar style={styles.bottomStyle} {...tabsProps} />
            </LinearGradient>
          </View>
        </>
      )}
      initialRouteName={NavigationStrings.HomeScreen}
      screenOptions={{
        tabBarActiveTintColor: Colors.tranparent,
        tabBarInactiveTintColor: Colors.tranparent,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.customBottomtabsStyle,
        },
        headerShown: false,
      }}>
      <BottomTab.Screen
        name={NavigationStrings.HomeScreen}
        component={screens.HomeScreen}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                groupName="MaterialCommunityIcons"
                name="home-minus-outline"
                size={28}
                color={focused ? Colors.Pink : Colors.white}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={NavigationStrings.Search}
        component={screens.Search}
        options={{
          tabBarShowLabel: true,

          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                groupName="Ionicons"
                name="search"
                size={28}
                color={focused ? Colors.Pink : Colors.white}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={NavigationStrings.AddScreen}
        component={screens.AddScreen}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => {
            return (
              <ImageComponent
                source={ImagePath.PlusIcon}
                style={{
                  height: moderateScaleVertical(50),
                  width: moderateScale(50),
                }}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={NavigationStrings.Chat}
        component={screens.Chat}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                groupName="Ionicons"
                name="chatbubble-ellipses-outline"
                size={28}
                color={focused ? Colors.Pink : Colors.white}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={NavigationStrings.UserProfile}
        component={screens.UserProfile}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => {
            return (
              <VectorIcon
                groupName="Feather"
                name="users"
                size={28}
                color={focused ? Colors.Pink : Colors.white}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  customBottomtabsStyle: {
    paddingTop: moderateScaleVertical(15),
    backgroundColor: Colors.LinearBlack,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowColor: Colors.tranparent,
  },

  bottomStyle: {
    height: moderateScaleVertical(Platform.OS == 'android' ? 70 : 80),
  },
});

export default TabRoutes;
