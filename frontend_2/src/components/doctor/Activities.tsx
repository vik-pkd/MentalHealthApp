import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import CustomDatePicker from '../CustomDatePicker';
import client from '../../api/client';
import { useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PatientSerachStackParamList } from '../../routes/DoctorStack';
import Snackbar from 'react-native-snackbar';

// Define a type for the game objects stored in the state
type Game = {
    _id: string;
    name: string;
    category: string;
    __v: number;
};

type AddActivitiesScreenProps = NativeStackScreenProps<PatientSerachStackParamList, 'Activities'>;


const Activities = ({ route, navigation }: AddActivitiesScreenProps) => {
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const params = route.params;
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState('');
    const [points, setPoints] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [error, setError] = useState<string>('');

    const fetchGames = async () => {
        try {
            // Assuming 'client' is your configured Axios instance with baseURL set to your server
            const response = await client.get('/doctors/get-games');
            console.log(response.data);
            setGames(response.data);
        } catch (err) {
            // Handle the error as needed
            console.error(err);
        }
    };



    useEffect(() => {
        // Here you would fetch the actual list of games from the backend
        fetchGames();
    }, []);

    // Add the logic to handle form submission
    const handleSubmit = async () => {

        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json', // This is important for your server to understand the incoming data
        };

        console.log({
            selectedGame,
            points,
            startDate,
            endDate,
        });

        const activtiyData = {
            patientId: params._id,
            gameId: selectedGame,
            points: points,
            start_date: startDate,
            end_date: endDate
        };

        const response = await client.post(`/doctors/add-activity`, activtiyData, { headers });
        console.log(response.data)
        if (response.data.status === 'success') {
            // Show success message
            Snackbar.show({
                text: 'Activity Added Successfully',
                duration: Snackbar.LENGTH_SHORT
            });
            navigation.navigate('PatientProfile', { _id: params!._id });
        } else {
            // Handle the failure scenario
            setError(response.data.message);
        }

    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header}>Set Up Game Activity</Text>

            <Text style={styles.label}>Choose a Game:</Text>


            <Picker
                selectedValue={selectedGame}
                onValueChange={(itemValue, itemIndex) => setSelectedGame(itemValue)}
                style={styles.picker}
            >
                {games.map((game) => (
                    <Picker.Item key={game._id} label={game.name} value={game._id} />
                ))}
            </Picker>

            <Text style={styles.label}>Set Points:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPoints}
                value={points}
                placeholder="Enter points for the game"
                keyboardType="numeric"
                placeholderTextColor="#000"
            />

            {/* <Text style={styles.label}>Start Date:</Text>
            <DatePicker
                date={startDate}
                onDateChange={setStartDate}
                mode="date"
            // style={styles.datePicker}
            /> */}

            <View style={styles.datePicker}>
                <CustomDatePicker
                    mode='date'
                    label="Start Date"
                    date={startDate}
                    onDateChange={setStartDate}
                />
            </View>

            <View style={styles.datePicker}>
                <CustomDatePicker
                    mode='date'
                    label="End Date"
                    date={endDate}
                    onDateChange={setEndDate}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} color="rgba(134, 65, 244, 1)" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingBottom: 30,  // Adjust this value based on your needs
    },
    header: {
        fontSize: 24,
        color: 'rgba(134, 65, 244, 1)',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: 'rgba(134, 65, 244, 1)',
        marginBottom: 10,
    },
    picker: {
        marginBottom: 20,
        backgroundColor: '#f8f8f8',
        borderColor: '#6200EE',
        color: 'black',
        borderWidth: 1,
        borderRadius: 1
    },
    input: {
        height: 40,
        marginBottom: 20,
        // borderWidth: 1,
        color: 'black',
        padding: 10,
        backgroundColor: '#f8f8f8',
        // borderColor: '#6200EE',

    },
    buttonContainer: {
        // marginTop: 20,
    },
    datePicker: {
        // backgroundColor: 'black'
        marginBottom: 16,
        // backgroundColor: '#6200EE',
        // borderColor: '#6200EE',
        // Add additional styling for your date picker if needed
    },
});

export default Activities;
