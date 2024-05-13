import { Pressable, StyleSheet, Text, View } from "react-native";
import { Animated, Dimensions } from "react-native";
import { useRef, useState } from "react";
import client from "../../api/client";
import { useSelector } from "react-redux";


const screenWidth = Dimensions.get("window").width;

const timeWindow = 120;

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
};

const checkWithinWindow = (date: Date) => {
    // both dates are of today, will be only comparing times (2 hours)
    const currDate = new Date();

    // making sure doseTime is of today
    const dateObj = new Date(date);
    dateObj.setDate(currDate.getDate());
    dateObj.setMonth(currDate.getMonth());
    dateObj.setFullYear(currDate.getFullYear());

    // Get the difference in milliseconds
    const differenceMs = Math.abs(currDate.getTime() - dateObj.getTime());

    return differenceMs <= 2 * 1000 * 60 * 60;
};

const MedicineReminderCard = ({ reminder, onRemoveReminder }: { reminder: any, onRemoveReminder: any }) => {
    const [activityButtonsVisible, setActivityButtonsVisible] = useState(false);
    const authToken = useSelector((state: Record<string, { token: string }>) => state.authToken.token);
    const position = useRef(new Animated.Value(0)).current;
    const isWithinWindow = checkWithinWindow(reminder.date);
    // Get the current time as a Date object
    const currentTime = new Date();
    // Convert the reminder time from the reminder object to a Date object
    const reminderTime = new Date(reminder.date);

    // Compare the current time with the reminder time to determine the color
    const timeColor = currentTime < reminderTime ? 'green' : 'red';

    const handleMarkTaken = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        };
        const payload = {
            _id: reminder._id,
        };
        const resp = await client.put('patients/taken-medicine', payload, { headers });
        console.log(resp.data)

        // Start the animation
        Animated.timing(position, {
            toValue: screenWidth,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            onRemoveReminder(reminder.prescriptionId);
        })
    };

    return (
        <Animated.View style={[styles.card, { transform: [{ translateX: position }] }]}>
            <View style={[styles.card, styles.cardElevated, !isWithinWindow ? styles.greyBackGround : {}]}>
                <View style={styles.cardBody}>
                    <View style={styles.details}>

                        <Text style={styles.cardDescription}>
                            Time: <Text style={[styles.timeValue, { color: timeColor }]}>{formatDate(reminder.date)}</Text>
                        </Text>
                        <Text style={styles.cardDescription}>Name: {reminder.medicine}</Text>
                        <Text style={styles.cardDescription}>Quantity: {reminder.quantity}</Text>
                    </View>
                    {
                        isWithinWindow &&
                        <View style={styles.actions}>
                            <Pressable
                                style={styles.markTakenButton}
                                onPress={() => setActivityButtonsVisible(!activityButtonsVisible)}
                            >
                                <Text style={styles.markTakenButtonText}>Mark Taken</Text>
                            </Pressable>
                            {activityButtonsVisible && (
                                <View style={styles.confirmationButtons}>
                                    <Pressable style={styles.yesButton} onPress={handleMarkTaken}>
                                        <Text style={styles.confirmationButtonText}>Yes</Text>
                                    </Pressable>
                                    <Pressable style={styles.noButton} onPress={() => setActivityButtonsVisible(false)}>
                                        <Text style={styles.confirmationButtonText}>No</Text>
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    }
                </View>
            </View>
        </Animated.View>
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
        width: '100%', // Use screenWidth and subtract the total margin you wish to have
        borderRadius: 12,
        marginVertical: 8,
        alignSelf: 'center', // This will help center your card in the modal.
        backgroundColor: '#FFFFFF', // This is your card background color.
        shadowColor: 'rgba(0, 0, 0, 0.1)', // Subtle shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 5,
    },
    greyBackGround: {
        backgroundColor: 'grey'
    },
    cardElevated: {
        backgroundColor: '#FFFFFF',
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    details: {
        justifyContent: 'space-around', // This will distribute your details evenly
    },
    cardBody: {
        paddingHorizontal: 16, // Adjust padding as needed
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between', // This will separate your details and action button
        alignItems: 'center', // Vertically center align items
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
        color: '#4B0082', // Dark purple color for text
        fontSize: 15, // Slightly larger for readability
        fontWeight: '500',
        marginBottom: 4, // Spacing between lines
    },
    timeValue: {
        // Style for the time value
        fontSize: 13,
        fontWeight: 'bold', // optional: makes the time stand out
        // The color will be set dynamically in the component based on the condition
    },
    cardFooter: {
        color: 'rgba(134, 65, 244, 1)'
    },
    actionButton: {
        backgroundColor: '#6A1B9A', // Purple color that matches your theme
        padding: 10,
        borderRadius: 20, // Rounded corners for the button
        elevation: 2, // Slight elevation for the button
    },
    actionButtonText: {
        color: '#FFFFFF', // White color for button text
        fontSize: 13,
        fontWeight: 'bold',
    },
    actions: {
        justifyContent: 'flex-end',
    },
    markTakenButton: {
        backgroundColor: '#6A1B9A', // Primary color
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    markTakenButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    confirmationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    yesButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
    },
    noButton: {
        backgroundColor: '#F44336',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
    },
    confirmationButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },

});