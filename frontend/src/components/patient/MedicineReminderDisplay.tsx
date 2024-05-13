import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import client from "../../api/client";
import { useSelector } from "react-redux";
import globalStyles from "../../constants/styles";
import MedicineReminderCard from "./MedicineReminderCard";
import PushNotification from 'react-native-push-notification';

// Function that schedules a notification
function scheduleReminder(reminder: any) {
    const now = new Date().getTime();
    const reminderTime = new Date(reminder.date).getTime();

    PushNotification.createChannel(
        {
            channelId: "specialid", // (required)
            channelName: "Special messasge", // (required)
            channelDescription: "Notification for special message", // (optional) default: undefined.
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    console.log(now);
    console.log(reminderTime);

    // Check if the reminder time is in the future
    if (reminderTime > now) {
        const timeDifference = reminderTime - now;

        PushNotification.localNotificationSchedule({
            channelId: "specialid", // (required)
            message: `Time to take your medicine: ${reminder.medicine}`, // customize your message
            date: new Date(now + timeDifference), // Schedule for the reminder time
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            repeatTime: 2
        });
    } else {
        console.log('Already past intake time.')
    }
}

const MedicineReminderDisplay: React.FC<{ patientId: string }> = ({ patientId }) => {
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const [reminders, setReminders] = useState<any[]>([]);

    const removeReminder = async (id: any) => {
        // Remove the reminder with the given id
        console.log(`ID to be removed : ${id}`);
        // reminders.forEach((reminder) => {
        //     console.log(reminder.prescriptionId)
        // })

        const filteredReminders = reminders.filter((reminder) => reminder._id !== id)

        // filteredReminders.forEach((reminder) => {
        //     console.log(reminder.prescriptionId)
        // })

        setReminders(filteredReminders);
    };

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        const fetchPrescriptions = async () => {
            const resp = await client.get(`/patients/reminders`, { headers });
            if (resp.data.status === 'success') {
                const fetchedReminders = resp.data.reminders;
                console.log(fetchedReminders);
                setReminders(fetchedReminders);
                fetchedReminders.forEach(scheduleReminder); // Use fetchedReminders directly
            }
        };
        fetchPrescriptions();
    }, [patientId]);


    return (
        <ScrollView style={styles.scrollViewStyle}>
            {reminders && reminders.map((item, index) => (
                <MedicineReminderCard key={item._id} reminder={item} onRemoveReminder={removeReminder} />
            ))}
        </ScrollView>
    );
}

export default MedicineReminderDisplay;

const styles = StyleSheet.create({
    scrollViewStyle: {
        height: '45%', // Or a fixed value like 300
        alignSelf: 'center', // This will center the ScrollView
        width: '100%'
    },
});