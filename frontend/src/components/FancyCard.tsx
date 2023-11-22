import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React from 'react'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Mental Score"] // optional
};

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default function FancyCard() {
    return (

        <View style={[styles.card, styles.cardElevated]}>
            <LineChart
                data={data}
                width={styles.card.width}
                height={styles.card.height - 130}
                chartConfig={chartConfig}
            />
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>Score Record</Text>
                {/* <Text style={styles.cardLabel}>Pink City, Jaipur</Text> */}
                <Text style={styles.cardDescription}>This is the track of your congnitive assessment from past few months, you can get a more detailed analysis by training more.</Text>
                {/* <Text style={styles.cardFooter}>12 mins away</Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    card: {
        width: screenWidth - 16,
        height: 310,
        borderRadius: 6,
        // marginVertical: 12,
        marginHorizontal: 8,
        // margin: 8
    },
    cardElevated: {
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    cardImage: {
        height: 180,
        marginBottom: 8,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    cardBody: {
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: 12
    },
    cardTitle: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 2,
        marginTop: 4
    },
    cardLabel: {
        color: '#000000',
        fontSize: 14,
        marginBottom: 4
    },
    cardDescription: {
        color: '#57606f',
        fontSize: 13,
        marginBottom: 14,
        marginTop: 6
    },
    cardFooter: {
        color: '#34495e'
    }
})