import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Utilities/Styles/colors';
import styles from './style';
import commonStyles from '../../Utilities/Styles/commonStyles';
import fontFamily from '../../Utilities/Styles/fontFamily';
import {SizeBox} from '../../Utilities/Component/Helpers';
import ImagePath from '../../Utilities/Constants/ImagePath';

const DjBooking = () => {
  const [button, setButton] = useState('upcoming');

  return (
    <LinearGradient
      colors={[Colors.backgroundNew, Colors.backgroundNew]}
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0.9}}
      style={styles.LinearConatiner}>
      <SafeAreaView>
        <Text
          style={{
            ...commonStyles.Heading20font,
            fontFamily: fontFamily.regular,
          }}>
          Bookings
        </Text>
        <SizeBox size={10} />
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            onPress={() => setButton('upcoming')}
            style={{
              borderBottomWidth: button === 'upcoming' ? 2 : 0,
              borderColor: Colors.Pink,
            }}>
            <Text
              style={{
                ...commonStyles.font12Regular,
              }}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setButton('past')}
            style={{
              borderBottomWidth: button === 'past' ? 2 : 0,
              borderColor: Colors.Pink,
            }}>
            <Text
              style={{
                ...commonStyles.font12Regular,
              }}>
              Past
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setButton('Requests')}
            style={{
              borderBottomWidth: button === 'Requests' ? 2 : 0,
              borderColor: Colors.Pink,
            }}>
            <Text
              style={{
                ...commonStyles.font12Regular,
              }}>
              Requests
            </Text>
          </TouchableOpacity>
        </View>
        {button === 'upcoming' ? (
          <View>
            <SizeBox size={50} />
            <Text
              style={{
                ...commonStyles.font16Regular,
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              You have no bookings yet.
            </Text>
            <SizeBox size={10} />
            <Text
              style={{
                ...commonStyles.font12Regular,
                width: '55%',
                alignSelf: 'center',
                textAlign: 'center',
                color: Colors.greyTxt,
              }}>
              Promote yourself to aware event organisers of your interests.
            </Text>
            <SizeBox size={20} />
            <TouchableOpacity style={styles.pbtn}>
              <Text style={{...commonStyles.font20W400, color: Colors.white}}>
                Promote yourself
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {button === 'past' ? (
          <>
            <SizeBox size={20} />
            <FlatList
              data={[{id: 1}, {id: 2}]}
              renderItem={({item}) => (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={ImagePath.ProfileImg}
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: Colors.Pink,
                        }}
                      />

                      <View style={{paddingLeft: 10}}>
                        <Text
                          style={{
                            ...commonStyles.font10Bold,
                            color: Colors.white,
                          }}>
                          DJ Gig at L’Arc Paris.
                        </Text>
                        <Text
                          style={{
                            ...commonStyles.font10Regular,
                            color: Colors.white,
                            paddingVertical: 5,
                          }}>
                          2 hours Set
                        </Text>
                        <Text
                          style={{
                            ...commonStyles.font10Regular,
                            color: Colors.green,
                          }}>
                          in 10 Days
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.eventbtn}>
                      <Text
                        style={{
                          ...commonStyles.font10Regular,
                          color: Colors.white,
                        }}>
                        See Event
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        ) : null}
        {button === 'Requests' ? (
          <>
            <SizeBox size={20} />
            <FlatList
              data={[{id: 1}, {id: 2}]}
              renderItem={({item}) => (
                <View
                  style={{
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={ImagePath.ProfileImg}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: Colors.Pink,
                      }}
                    />
                    <View style={{paddingLeft: 10}}>
                      <Text
                        style={{
                          ...commonStyles.font10Bold,
                          color: Colors.white,
                        }}>
                        L’Arc Paris wants to book you for “Agora party” .
                      </Text>
                      <Text
                        style={{
                          ...commonStyles.font10Regular,
                          paddingVertical: 7,
                          color: Colors.white,
                        }}>
                        2 hours Set : 300€
                      </Text>
                      <Text
                        style={{
                          ...commonStyles.font10Regular,
                          color: Colors.green,
                        }}>
                        in 10 Days
                      </Text>
                    </View>
                  </View>
                  <SizeBox size={10} />
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.eventbtn}>
                      <Text
                        style={{
                          ...commonStyles.font10Regular,
                          color: Colors.white,
                        }}>
                        See Event
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.eventbtn, {marginHorizontal: 10}]}>
                      <Text
                        style={{
                          ...commonStyles.font10Regular,
                          color: Colors.white,
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eventbtn}>
                      <Text
                        style={{
                          ...commonStyles.font10Regular,
                          color: Colors.white,
                        }}>
                        Refuse
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        ) : null}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DjBooking;
