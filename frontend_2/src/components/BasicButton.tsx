import React, { useState } from 'react';
import { Button, Pressable, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native';
import globalStyles from '../constants/styles';

const BasicButton = ({ title, textStyle, buttonStyle, onPress }: { title: String, textStyle?: StyleProp<TextStyle>, buttonStyle?: StyleProp<TextStyle>, onPress: () => void }) => {
    return (
        <Pressable
            onPress={onPress}
        >
            <View style={[styles.button, buttonStyle]}>
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            </View>
        </Pressable>
    );
};

export default BasicButton;

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
    },
    button: {
        backgroundColor: globalStyles.themeBackGroundColor.color,
        borderRadius: 5,
        paddingHorizontal: 9,
    }
});