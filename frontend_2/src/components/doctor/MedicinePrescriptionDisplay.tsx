import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import client from "../../api/client";
import { useSelector } from "react-redux";
import globalStyles from "../../constants/styles";
import MedPresCard from "./MedicinePresCard";

const MedicinePrescriptionDisplay: React.FC<{ patientId: string }> = ({ patientId }) => {
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const [prescriptions, setPrescriptions] = useState<any[]>([]);

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        const fetchPrescriptions = async () => {
            const resp = await client.get(`/patients/prescriptions/patient/${patientId}`, { headers });
            if (resp.data.status === 'success') {
                setPrescriptions(resp.data.prescriptions);
            }
            console.log('medicine prescription display', resp.data);
        };
        fetchPrescriptions();
    }, [patientId]);


    return (
        <ScrollView style={styles.scrollViewStyle}>
            <Text style={{ color: '#38006b', alignSelf: 'center', marginTop: 8 }}>Medicine Prescriptions</Text>
            {prescriptions && prescriptions.map((item, index) => (
                <MedPresCard key={index} prescription={item} />
            ))}
        </ScrollView>
    );
}

export default MedicinePrescriptionDisplay;

const styles = StyleSheet.create({
    scrollViewStyle: {
        // height: '5%', // Or a fixed value like 300
        alignSelf: 'center', // This will center the ScrollView
        width: '100%'
    },
});