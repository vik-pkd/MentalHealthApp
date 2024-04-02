import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import client from "../../api/client";
import { useSelector } from "react-redux";
import globalStyles from "../../constants/styles";
import MedicineReminderCard from "./MedicineReminderCard";

const MedicineReminderDisplay: React.FC<{ patientId: string }> = ({ patientId }) => {
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const [reminders, setReminders] = useState<any[]>([]);

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        const fetchPrescriptions = async () => {
            const resp = await client.get(`/patients/reminders`, { headers });
            if (resp.data.status === 'success') {
                setReminders(resp.data.reminders);
            }
        };
        fetchPrescriptions();
    }, [patientId]);


    return (
        <View>
            <Text style={{ color: 'black' }}>Medicine Prescriptions</Text>
            {/* <FlatList
                data={prescriptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (<MedPresCard key={index} prescription={item}></MedPresCard>) }
            /> */}
            {reminders && reminders.map((item, index) => (
                <MedicineReminderCard key={index} reminder={item} />
            ))}
        </View>
    );
}

export default MedicineReminderDisplay;

const styles = StyleSheet.create({

});