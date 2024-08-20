import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import client from '../../api/client';
import PatientSearchEntry from '../../components/PatientSearchEntry';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PatientSerachStackParamList } from '../../routes/DoctorStack';
import { useLogin } from '../../context/LoginProvider';
import LinearGradient from 'react-native-linear-gradient';

type PatientSearchScreenProps = NativeStackScreenProps<PatientSerachStackParamList, 'PatientSearch'>;

const PatientSearch: React.FC<PatientSearchScreenProps> = ({ navigation }) => {
    const { setIsLoggedIn, profile, userCategory } = useLogin();
    const [searchText, setSearchText] = useState('');
    const [patientList, setPatientList] = useState<{ '_id': string }[]>([]);
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                'Authorization': `Bearer ${authToken}`
            };
            const response = await client.get(`/patients/get-patients?searchText=${searchText}`, { headers });
            console.log('response.data', response.data);
            setPatientList(response.data);
        };
        fetchData();
    }, [searchText]);

    const renderPatientSearchEntry = ({ item }: any) => (
        <PatientSearchEntry
            name={item.name}
            _id={item._id}
            email={item.email}
            onPress={(_id: string) => navigation.navigate('PatientProfile', { _id: _id })}
        />
    );

    return (
        <LinearGradient
            colors={['#C485F7', '#C485F7', '#9459C6', '#9459C6', '#38006b']} // Adjust colors to match your design
            style={styles.backgroundGradient}
        >
            {profile && (
                <View style={styles.userContainer}>
                    <Text style={styles.header}>Search Your Patients</Text>
                    {/* <Text style={styles.userDetails}></Text> */}
                </View>
            )}
            <View style={styles.formContainer}>
                <TextInput
                    value={searchText}
                    style={styles.input}
                    onChangeText={(text) => { setSearchText(text); }}
                    placeholder='Search by email address'
                    placeholderTextColor={'white'}
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

        </LinearGradient>
    )
}

export default PatientSearch;

const styles = StyleSheet.create({
    backgroundGradient: {
        flex: 1,
    },
    header: {
        color: '#f4f1f4',
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    userContainer: {
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#6A1B9A', // Or any other color matching your theme
    },
    userDetails: {
        fontSize: 14,
        color: '#FFFFFF',
        marginBottom: 8
    },
    continer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#6A1B9A', // Or any other color matching your theme
        // marginBottom: 8
    },
    formContainer: {
        // width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 6,
        marginHorizontal: 8,
        marginVertical: 8,
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
    cancelButtonIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'black',
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