import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { styles } from './styles';
import { Colors } from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../Utilities/Component/Helpers';
import VectorIcon from '../../Utilities/Component/vectorIcons';
import ImagePath from '../../Utilities/Constants/ImagePath';
import { height, moderateScale, moderateScaleVertical, textScale } from '../../Utilities/Styles/responsiveSize';
import RBSheet from 'react-native-raw-bottom-sheet';

const EventDetails = (props: any) => {
    const refRBSheet = useRef();
    const [showSheetFlag, setShowSheetFlag] = useState(false);

    const onPressBack = () => {
        props.navigation.goBack();
    };

    const likeData = [
        {
            id: 0,
            name: "Julie C."
        },
        {
            id: 1,
            name: "Anonymous"
        },
        {
            id: 2,
            name: "Julius O."
        },
        {
            id: 3,
            name: "Esteban I."
        },
        {
            id: 4,
            name: "Lucia E."
        },
    ];

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={ImagePath.followProfile} />
                <Text style={[styles.distanceText, { marginLeft: 10 }]}>{item?.name}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient
                    colors={["#000000", "#5F09AF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.3, y: 0.9 }}
                    style={{ padding: 10, paddingHorizontal: 20, borderRadius: 10 }}>
                    <Text style={styles.timeText}>Follow</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );

    return (
        <LinearGradient
            colors={[Colors.LinearBlack, Colors.Linear]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.3, y: 0.9 }}
            style={styles.LinearConatiner}>
            <SafeAreaView>
                <View style={styles.headerRow}>
                    <VectorIcon
                        groupName={'Ionicons'}
                        name={'chevron-back'}
                        size={25}
                        onPress={onPressBack}
                    />
                    <Text style={styles.headerTxt}>One life</Text>
                    <View style={{ flexDirection: "row" }}>
                        <VectorIcon
                            groupName={'MaterialCommunityIcons'}
                            name={'share-outline'}
                            size={25}
                            color={Colors.white}
                        />
                        <TouchableOpacity style={{ marginLeft: 10 }}
                            activeOpacity={0.8}>
                            <Image source={ImagePath.Security_Rules} />
                        </TouchableOpacity>
                    </View>
                </View>
                <LinearGradient
                    colors={["#4725AB", "#35116F"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.3, y: 0.9 }}
                    style={styles.secondHeader}>
                    <Text style={styles.timeText}>23h00 - 05h00</Text>
                    <TouchableOpacity activeOpacity={0.8} style={styles.ticketContainer}>
                        <Image source={ImagePath.Ticket} />
                        <Text style={styles.ticketPrice}> €120</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.distanceText}>1 km </Text>
                        <Image source={ImagePath.Pin_alt} />
                    </View>
                </LinearGradient>
                <ImageBackground source={ImagePath.ImageBackground} style={{ height: "100%", width: "100%" }}>
                    <LinearGradient
                        colors={["#000000", "#35116F"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1.3, y: 0.9 }}
                        style={[styles.bottomBar]}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { refRBSheet.current.open(); }}
                            style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image source={ImagePath.likes} resizeMode='contain' style={{ width: 24, height: 24 }} />
                            <Text style={styles.bottomBarText}>Likes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { refRBSheet.current.open(); }}
                            style={{ justifyContent: "center", alignItems: "center" }}>
                            <VectorIcon
                                groupName='Ionicons'
                                name='chatbubble-ellipses-outline'
                                size={24}
                                color={Colors.white}
                            />
                            <Text style={styles.bottomBarText}>Comments</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", zIndex: 100 }}>
                            <Image source={ImagePath.ProfileImg} style={{ width: moderateScale(56), height: moderateScaleVertical(70), bottom: moderateScaleVertical(10), zIndex: 200, }} />
                            <Text style={styles.bottomBarText}>Kingson</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { refRBSheet.current.open(); }}
                            style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image source={ImagePath.userprofile} resizeMode='contain' style={{ width: 24, height: 24 }} />
                            <Text style={styles.bottomBarText}>People</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image source={ImagePath.infoIcon} resizeMode='contain' style={{ width: 24, height: 24 }} />
                            <Text style={styles.bottomBarText}>Info</Text>
                        </TouchableOpacity>
                        <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={true}
                            height={height / 1.7}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: 'transparent',
                                    width: '90%',
                                    bottom: moderateScaleVertical(76),
                                    alignSelf: 'center',
                                },
                                container: {
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    // opacity: 0.8
                                },
                                draggableIcon: {
                                    backgroundColor: "#000"
                                }
                            }}
                        >
                            <LinearGradient
                                colors={["#000000", "#35116F"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1.3, y: 0.9 }}
                                style={styles.sheetContent}>
                                <Text style={[styles.timeText, { fontSize: textScale(16), textAlign: "center", marginTop: 10 }]}>Likes</Text>
                                <FlatList
                                    data={likeData}
                                    keyExtractor={(item) => item?.id?.toString()}
                                    renderItem={renderItem}
                                />
                            </LinearGradient>
                        </RBSheet>
                    </LinearGradient>
                </ImageBackground>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default EventDetails;