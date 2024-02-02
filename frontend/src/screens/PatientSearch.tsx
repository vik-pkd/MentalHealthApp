import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import PatientSearchEntry from '../components/PatientSearchEntry';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PatientSerachStackParamList } from '../routes/AppStack';

type PatientSearchScreenProps = NativeStackScreenProps<PatientSerachStackParamList, 'PatientSearch'>;

const PatientSearch: React.FC<PatientSearchScreenProps> = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [patientList, setPatientList] = useState<{ '_id': string }[]>([]);
    const authToken = useSelector((state: Record<string, {token : string | null}>) => state.authToken.token);

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                'Authorization': `Bearer ${authToken}`
            };
            const response = await client.get(`/patients/get-patients?searchText=${searchText}`, { headers });
            setPatientList(response.data);
        };
        fetchData();
    }, [searchText]);

    const renderPatientSearchEntry = ({ item }: any) => (
        <PatientSearchEntry
            name={item.name}
            _id={item._id}
            email={item.email}
            onPress={(_id: string)=>  navigation.navigate('PatientProfile', {_id: _id}) }
        />
    );

    return (
        <View style={styles.continer}>
            <View style={styles.formContainer}>
                <TextInput
                    value={searchText}
                    style={styles.input}
                    onChangeText={(text) => { setSearchText(text); }}
                    placeholder='Search by email address'
                    placeholderTextColor={'grey'}
                />
                <TouchableOpacity onPress={() => setSearchText('')}>
                    <View style={styles.cancelButton}>
                        <View style={styles.cancelButtonIcon}>
                            <Ionicons name="close" size={20} color="white" />
                        </View>
                    </View>
                </TouchableOpacity>
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

export default PatientSearch;

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    formContainer: {
        // width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 6,
        marginHorizontal: 7,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        marginBottom: 8
    },
    input: {
        flex: 1,
        color: 'black'
    },
    cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 3
    },
    cancelButtonIcon:{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    patientList: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
});