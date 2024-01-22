import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import PatientSearchEntry from '../components/PatientSearchEntry';

export default function PatientSearch() {
    const [searchText, setSearchText] = useState('');
    const [patientList, setPatientList] = useState<{'_id': string}[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const authToken = await AsyncStorage.getItem('authorizationToken');
            const headers = {
                'Authorization': `Bearer ${authToken}`
            };
            const response = await client.get(`/patients/get-patients?searchText=${searchText}`, { headers });
            setPatientList(response.data);
        };
        fetchData();
    }, [searchText]);

    const renderPatientSearchEntry = ({ item }: any) => (
        <PatientSearchEntry name={item.name} _id={item._id} />
    );

    return (
        <View style={styles.continer}>
            <View style={styles.formContainer}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        value={searchText}
                        onChangeText={(text) => { setSearchText(text); }}
                        style={{ backgroundColor: 'blue' }}
                        placeholder='Search by email address'
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title='Clear'
                        onPress={() => setSearchText('')}
                    />
                </View>
            </View>

            <View style={styles.patientList}>
                <FlatList
                    data={patientList}
                    renderItem={renderPatientSearchEntry}
                    keyExtractor={(item) => item._id.toString()}

                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    formContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    patientList: {
        width: '100%',
        backgroundColor: 'green',
        // position: 'absolute'
    },
    smallText: {
        color: '#000000'
    },
    searchBtn: {

    }
});