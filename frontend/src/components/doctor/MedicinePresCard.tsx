import { StyleSheet, Text, View } from "react-native";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const prettyDate = (date: Date | string) => {
    date = new Date(date);
    return date.getDate().toString() + '-' + date.getMonth().toString() + '-' + date.getFullYear().toString();
}

const MedPresCard = ({ prescription }: { prescription: any }) => {
    console.log('card', prescription);
    return (
        <View>
            <View style={[styles.card, styles.cardElevated]}>
                <View style={styles.cardBody}>
                    <Text style={styles.cardDescription}>Name: {prescription.medicine}</Text>
                    <Text style={styles.cardDescription}>Quantity: {prescription.quantity}</Text>
                    <Text style={styles.cardDescription}>Duration: {prettyDate(prescription.start_date)} to {prettyDate(prescription.end_date)}</Text>
                </View>
            </View>

        </View>
    );
};

export default MedPresCard;

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    card: {
        // width: 300,
        borderRadius: 6,
        marginVertical: 8,
        marginHorizontal: 8,
        padding: 10
    },
    cardElevated: {
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1
        }
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
        marginBottom: 4,
        marginTop: 2
    },
    cardLabel: {
        color: '#000000',
        fontSize: 14,
        marginBottom: 4
    },
    cardDescription: {
        color: '#57606f',
        fontSize: 13,
        // marginTop: 6
    },
    cardFooter: {
        color: 'rgba(134, 65, 244, 1)'
    }
});