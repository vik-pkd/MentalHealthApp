import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
const Sudoku = () => {
    return <WebView source={{ uri: 'https://sudoku.js.org/' }} style={styles.video} />;
}

export default Sudoku;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    video: {
        marginTop: 20,
        maxHeight: 200,
        width: 320,
        flex: 1
    }
});