import { StyleSheet } from "react-native";

const COLORS = {
    deepPurple: '#38006b',
    darkerPurple: '#6a1b9a',
    mediumPurple: '#9c4dcc',
    lightPurple: '#ce93d8',
    veryLightPurple: '#f4f1f4',
};

const globalStyles = StyleSheet.create({
    blackText: {
        color: '#000000',
    },
    lightText: {
        color: COLORS.veryLightPurple, // Updated with color constant
    },
    themeBackGroundColor: {
        backgroundColor: COLORS.deepPurple, // Note: Changed 'color' to 'backgroundColor'
    },
    themeColor: {
        color: COLORS.darkerPurple, // Updated with a more specific theme color
    },
    formLabel: {
        fontSize: 16,
        color: COLORS.mediumPurple, // Uncommented and updated color
        marginBottom: 10,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    }
});

export default globalStyles;