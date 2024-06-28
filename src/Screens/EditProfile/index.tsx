import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../Utilities/Styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './style';

const EditProfile = () => {
    return (
        <LinearGradient
            colors={[Colors.LinearBlack, Colors.Linear]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.3, y: 0.9 }}
            style={{ flex: 1 }}>
            <SafeAreaView>
                <KeyboardAwareScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
};

export default EditProfile;