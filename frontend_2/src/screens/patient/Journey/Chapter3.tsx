import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

export default function Chapter3() {
    return (
        <LinearGradient
            colors={['#483D8B', '#6A5ACD', '#7B68EE']} // Adjust colors to match your design
            style={styles.backgroundGradient}
        >
            <ImageBackground source={require('../../../../assets/common/chapter3.jpg')} style={styles.backgroundImage}>
                {/* Navigation Paths */}
                <View style={styles.pathContainer}>
                    {/* Example path item */}
                    <TouchableOpacity style={styles.pathItem} >
                        <Text style={styles.pathText}>The Shadows Within</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pathItem2}>
                        <Text style={styles.pathText2}>The Hidden Light</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pathItem3}>
                        <Text style={styles.pathText3}>Mastering Oneself</Text>
                    </TouchableOpacity>
                    {/* You can add more path items here */}
                </View>
            </ImageBackground>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundGradient: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    pathContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Additional styles if needed for positioning
    },
    pathItem: {
        backgroundColor: 'rgba(206,147,216, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 40,
        top: 600,
        // Add shadow or other styles as needed
    },
    pathItem2: {
        backgroundColor: 'rgba(106,27,154, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 138,
        top: 520,
        // Add shadow or other styles as needed
    },
    pathItem3: {
        backgroundColor: 'rgba(106,27,154, 0.8)', // Semi-transparent red background
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 50,
        marginVertical: 10,
        position: 'absolute',
        left: 132,
        top: 450,
        // Add shadow or other styles as needed
    },

    pathText: {
        color: '#fff',
        fontSize: 16,
        // Additional text styling if needed
    },
    pathText2: {
        color: '#fff',
        fontSize: 12,
        // Additional text styling if needed
    },
    pathText3: {
        color: '#fff',
        fontSize: 8,
        // Additional text styling if needed
    },
})