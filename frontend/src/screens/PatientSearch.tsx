import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import PatientSearchEntry from '../components/PatientSearchEntry';

export default function PatientSearch() {
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
    //   console.log(searchText);
    }, [searchText])
    

    const handleSearch = async () => {
        console.log(searchText);
        const token = await AsyncStorage.getItem('authorizationToken');
        // const response = client.get('/');
        console.log('token =', token);
    }

    const patientList = [
        {
            name: "Patient0",
            _id: 0,
        },
        {
            name: "Patient1",
            _id: 1,
        },
        {
            name: "Patient2",
            _id: 2,
        },
        {
            name: "Patient3",
            _id: 3
        },
    ];

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
                        title='Search'
                        onPress={handleSearch}
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