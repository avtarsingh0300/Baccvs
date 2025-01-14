import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserData} from '../../Screens/MapScreen';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

// Haversine formula for calculating distance between two coordinates
const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Group users by proximity
export const groupUsersByProximity = (users: UserData[], threshold: number) => {
  const groups: any[][] = [];
  const visited = new Set();

  users.forEach((user: {latitude: any; longitude: any}, index: unknown) => {
    if (!visited.has(index)) {
      const group = [user];
      visited.add(index);

      users.forEach(
        (otherUser: {latitude: any; longitude: any}, otherIndex: unknown) => {
          if (!visited.has(otherIndex)) {
            const distance = haversineDistance(
              user.latitude,
              user.longitude,
              otherUser.latitude,
              otherUser.longitude,
            );

            if (distance <= threshold) {
              group.push(otherUser);
              visited.add(otherIndex);
            }
          }
        },
      );

      groups.push(group);
    }
  });

  return groups;
};

export const formatTimeRange = (startTime: string, endTime: string) => {
  if (startTime && endTime) {
    // Helper function to format a time string to HHhMM
    const formatTime = (time: string) => {
      const match = time?.match(/(\d+):(\d+):\d+\s([APM]+)/i); // Match time components
      if (!match) {
        throw new Error(`Invalid time format: ${time}`); // Handle invalid format
      }

      const [_, hour, minute, meridian] = match;
      const hour24 =
        meridian === 'PM' && hour !== '12'
          ? parseInt(hour, 10) + 12
          : hour === '12' && meridian === 'AM'
          ? '00'
          : hour;
      return `${hour24}h${minute}`;
    };

    // Format both start and end times
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    return `${formattedStartTime} - ${formattedEndTime}`;
  }
};

export const getFCMToken = async () => {
  try {
    // Check if the token is already stored locally
    const localToken = await AsyncStorage.getItem('fcmToken');
    if (localToken) {
      console.log('FCM Token retrieved from storage:', localToken);
      return localToken;
    } else {
      // Request a new FCM token from Firebase
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('New FCM Token generated:', fcmToken);
        // Save the new token to AsyncStorage
        await AsyncStorage.setItem('fcmToken', fcmToken);
        return fcmToken;
      } else {
        console.error('Failed to generate FCM token.');
        return null;
      }
    }
  } catch (error) {
    console.error('Error while retrieving FCM token:', error);
    return null;
  }
};

export const displayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Notification',
    body: remoteMessage.notification?.body || 'You have a new message.',
    android: {
      channelId,
      smallIcon: 'ic_launcher', // Use your app's icon here
      pressAction: {id: 'default'},
    },
  });
};
