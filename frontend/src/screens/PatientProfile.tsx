import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PatientSerachStackParamList } from '../routes/AppStack';
import client from '../api/client';
import { useSelector } from 'react-redux';
import AddMedicineModal from '../components/AddMedicineModal';

type PatientProfileScreenRouteProp = RouteProp<
    PatientSerachStackParamList,
    'PatientProfile'
>;

type PatientProfileProps = {
    route: PatientProfileScreenRouteProp;
};


const PatientProfile = (props: any) => {
    const route = useRoute<RouteProp<PatientSerachStackParamList>>();
    const params = route.params;
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [isMedicineModalVisible, setIsMedicineModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                'Authorization': `Bearer ${authToken}`
            };
            const response = await client.get(`/patients/patient/${params!._id}`, { headers });
            // console.log(response.data);
            const data = response.data.data;
            if (data) {
                setName(data.name);
                setEmail(data.email);
                setAge(data.age);
            }
        };
        fetchData();
    }, []);



    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <View style={styles.userInfoItem}>
                    <View>
                        <Text style={styles.blackText}>Name</Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.blackText}>{name}</Text>
                    </View>
                </View>

                <View style={styles.userInfoItem}>
                    <View>
                        <Text style={styles.blackText}>Email</Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.blackText}>{email}</Text>
                    </View>
                </View>
                <View style={styles.userInfoItem}>
                    <View>
                        <Text style={styles.blackText}>Age</Text>
                    </View>
                    <View>
                        <Text style={styles.blackText}>{age}</Text>
                    </View>
                </View>
            </View>
            <Pressable
                onPress={() => setIsMedicineModalVisible(true)}
            >
                <View style={styles.addModalButton}>
                    <Text style={styles.buttonText}>Add medicine</Text>
                </View>
            </Pressable>
            <AddMedicineModal
                isVisible={isMedicineModalVisible}
                closeModal={() => setIsMedicineModalVisible(false)}
                PatientId={params!._id}
            />
        </View>
    );
};

export default PatientProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    blackText: {
        color: 'black'
    },
    userInfo: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 6,
        width: '60%'
    },
    userInfoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 3,
        margin: 1
    },
    userInfoKey: {
        flex: 1
    },
    addModalButton: {
        backgroundColor: '#2196F3',
        margin: 3,
        padding: 5,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    }
});