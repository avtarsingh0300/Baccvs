import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ImageComponent,
  Loadingcomponent,
  SizeBox,
  showError,
} from '../../Utilities/Component/Helpers';
import {getNotification} from '../../Utilities/Constants/auth';
import ImagePath from '../../Utilities/Constants/ImagePath';
import {IMAGE_URL} from '../../Utilities/Constants/Urls';
import {Colors} from '../../Utilities/Styles/colors';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {textScale, width} from '../../Utilities/Styles/responsiveSize';
import styles from './style';

const Notification = ({navigation}: any) => {
  const [loading, setLoader] = useState(false);
  const [sectionedData, setSectionedData] = useState<any>([]);

const categorizeNotifications = (notifications: any[]) => {
  const now = moment();
  const today: any[] = [];
  const last7Days: any[] = [];
  const last30Days: any[] = [];
  const older: any[] = [];

  notifications.forEach(notification => {
    const notificationDate = moment(notification.createdAt);

    if (now.isSame(notificationDate, 'day')) {
      today.push(notification);
    } else if (now.diff(notificationDate, 'days') <= 7) {
      last7Days.push(notification);
    } else if (now.diff(notificationDate, 'days') <= 30) {
      last30Days.push(notification);
    } else {
      older.push(notification);
    }
  });

  const addLastItemFlag = (section: any[]) =>
    section.map((item, index) => ({
      ...item,
      isLastInSection: index === section.length - 1,
    }));

  // Sort each section by `createdAt` in descending order (most recent first)
  const sections = [];
  if (today.length > 0) {
    sections.push({
      title: 'Today',
      data: addLastItemFlag(
        today.sort((a, b) => moment(b.createdAt).diff(a.createdAt)),
      ),
    });
  }
  if (last7Days.length > 0) {
    sections.push({
      title: 'Last 7 Days',
      data: addLastItemFlag(
        last7Days.sort((a, b) => moment(b.createdAt).diff(a.createdAt)),
      ),
    });
  }
  if (last30Days.length > 0) {
    sections.push({
      title: 'Last 30 Days',
      data: addLastItemFlag(
        last30Days.sort((a, b) => moment(b.createdAt).diff(a.createdAt)),
      ),
    });
  }
  if (older.length > 0) {
    sections.push({
      title: 'Older',
      data: addLastItemFlag(
        older.sort((a, b) => moment(b.createdAt).diff(a.createdAt)),
      ),
    });
  }

  return sections;
};
  const getNoti = () => {
    setLoader(true);
    getNotification()
      .then((res: any) => {
        setLoader(false);
        const categorizedData = categorizeNotifications(res?.data || []);
        setSectionedData(categorizedData);
      })
      .catch(err => {
        setLoader(false);
        showError(err.message);
        console.log(err);
      });
  };

  const renderSectionHeader = ({section}: any) => (
    <View style={{padding: 10, backgroundColor: Colors.backgroundNew}}>
      <Text
        style={{
          ...commonStyles.font18White,
          color: Colors.white,
          fontFamily: fontFamily.time_bold,
          fontWeight: 'bold',
        }}>
        {section.title}
      </Text>
    </View>
  );

  const renderItem = ({item, index}: any) => (
    <>
      <View style={styles.flatcon}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {item?.image ? (
            <ImageComponent
              source={{uri: IMAGE_URL + item.imageUrl}}
              style={styles.userImg}
            />
          ) : (
            <ImageComponent
              source={ImagePath.ProfileImg}
              style={styles.userImg}
            />
          )}
          <View>
            <Text
              style={{
                ...commonStyles.font10Bold,
                color: Colors.white,
                paddingLeft: 15,
                width: width / 1.5,
              }}>
              {item?.subject}
              <Text
                style={{
                  fontSize: textScale(9),

                  fontFamily: fontFamily.time_regular,
                }}>
                {` `}
                {item?.message}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {item.isLastInSection && (
        <View
          style={{
            borderWidth: 0.5,
            borderColor: Colors.greyTxt,
            width: '100%',
            marginVertical: 20,
          }}
        />
      )}
    </>
  );

  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: Colors.lightPink,
        marginHorizontal: 10,
      }}
    />
  );

  console.log(JSON.stringify(sectionedData));


  useEffect(() => {
    getNoti();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView style={{width: '100%', alignItems: 'center', flex: 1}}>
        {loading ? (
          <Loadingcomponent isVisible={loading} />
        ) : (
          <>
            <View
              style={{
                position: 'relative',
                paddingHorizontal: 20,
                width: '100%',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  position: 'absolute',
                  top: 5,
                  zIndex: 10000,
                  left: 10,
                  paddingHorizontal: 10,
                }}
                onPress={() => navigation.goBack()}>
                <Image source={ImagePath.Arrow_Left_2} />
              </TouchableOpacity>
              <Text style={{...commonStyles.Heading20font}}>Notifications</Text>
            </View>
            <SizeBox size={10} />
            <SectionList
              style={{width: '100%'}}
              sections={sectionedData}
              keyExtractor={(item, index) => item._id || index.toString()}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
            />
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Notification;
