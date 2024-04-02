import { StyleSheet, Text, View } from "react-native";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
}

const MedicineReminderCard = ({reminder}: {reminder: any}) => {
    return (
        <View>
            <View style={[styles.card, styles.cardElevated]}>
                <View style={styles.cardBody}>
                    <Text style={styles.cardDescription}>Time: {formatDate(reminder.time)}</Text>
                    <Text style={styles.cardDescription}>Name: {reminder.medicine}</Text>
                    <Text style={styles.cardDescription}>Quantity: {reminder.quantity}</Text>
                </View>
            </View>
        </View>
    );
};

export default MedicineReminderCard;

const styles = StyleSheet.create({
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    card: {
        width: screenWidth - 16,
        borderRadius: 6,
        marginVertical: 8,
        marginHorizontal: 8
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
        marginTop: 6
    },
    cardFooter: {
        color: 'rgba(134, 65, 244, 1)'
    }
});