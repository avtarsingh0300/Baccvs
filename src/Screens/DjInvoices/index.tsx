import { View, Text, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../../Utilities/Styles/colors'
import styles from './style'
import commonStyles from '../../Utilities/Styles/commonStyles'
import fontFamily from '../../Utilities/Styles/fontFamily'
import { SizeBox } from '../../Utilities/Component/Helpers'
import ImagePath from '../../Utilities/Constants/ImagePath'

const DjInvoices = () => {
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
        Invoices
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
        </View>
        {button === 'upcoming' ? (
          <>
            <SizeBox size={20} />
            <FlatList
              data={[{id: 1}, {id: 2}, {id: 3}]}
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
                          300€ / 2 hours Set
                        </Text>
                        <Text
                          style={{
                            ...commonStyles.font10Regular,
                            color: Colors.white,
                            marginVertical: 2,
                          }}>
                          State : <Text style={{...commonStyles.font10Regular,color:"#FFC542"}}>Funded</Text>
                        </Text>
                      </View>
                    </View>
                        <Text
                          style={{
                            ...commonStyles.font10Regular,
                            color: Colors.green,
                          }}>
                          in 10 Days
                        </Text>
                  </View>
                </View>
              )}
            />
          </>
        ) : null}
        {button === 'past' ? (
          <>
            <SizeBox size={20} />
            <FlatList
              data={[{id: 1}, {id: 2}, {id: 3}]}
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
                          300€ / 2 hours Set
                        </Text>
                        <Text
                          style={{
                            ...commonStyles.font10Regular,
                            color: Colors.white,
                            marginVertical: 2,
                          }}>
                          State : <Text style={{...commonStyles.font10Regular,color:Colors.green}}>Received</Text>
                        </Text>
                      </View>
                    </View>
                        <Text
                          style={{
                            ...commonStyles.font10Regular,
                            color: Colors.lightPink,
                          }}>
                          Last week
                        </Text>
                  </View>
                </View>
              )}
            />
          </>
        ) : null}
        </SafeAreaView>
        </LinearGradient>
  )
}

export default DjInvoices