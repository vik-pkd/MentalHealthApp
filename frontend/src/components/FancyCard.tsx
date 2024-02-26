import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { useLogin } from '../context/LoginProvider'; // Adjust the import path as necessary

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

// Function to generate labels for the last 7 days
const getLast7DaysLabels = () => {
    const labels = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        labels.push(`${d.getMonth() + 1}/${d.getDate()}`); // Format: MM/DD
    }
    return labels;
};


// const data = {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [
//         {
//             data: [20, 45, 28, 80, 99, 43],
//             color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//             strokeWidth: 2 // optional
//         }
//     ],
//     legend: ["Mental Score"] // optional
// };

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default function FancyCard() {
    const { userPoints } = useLogin(); // Fetch userPoints from context

    // Function to generate random points
    const getRandomPoints = () => Math.floor(Math.random() * 6); // Random points between 0 and 5
    const [data, setData] = useState({
        labels: getLast7DaysLabels(),
        datasets: [
            {
                data: [
                    getRandomPoints(), 0, getRandomPoints(),
                    0, getRandomPoints(), getRandomPoints(),
                    userPoints // Current day points
                ],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2
            }
        ],
        legend: ["Mental Score"]
    });

    useEffect(() => {
        // Update the last entry with the current day's points
        setData(prevData => {
            const newData = { ...prevData };
            newData.datasets[0].data[6] = userPoints; // Assuming userPoints is a number
            return newData;
        });
    }, [userPoints]);


    return (

        <View style={[styles.card, styles.cardElevated]}>
            <LineChart
                data={data}
                width={styles.card.width}
                height={styles.card.height - 130}
                chartConfig={chartConfig}
                fromZero={true}
            />
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>Score Record</Text>
                <Text style={styles.cardDescription}>This is the track of your congnitive assessment from past few days, you can get a more detailed analysis by training more.</Text>
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