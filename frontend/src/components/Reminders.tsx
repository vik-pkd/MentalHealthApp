import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import ReminderCard from './ReminderCard';

function Reminders(): React.JSX.Element {
    const [reminders, setReminders] = useState([]);

    // ################ IP address 
    const reminderURL = `http://10.32.2.207:5000/prescription/65258f35bdf06bf2d2632580`;
    console.log(reminderURL);
    // const url = 'http://localhost:5000/prescription/65258f35bdf06bf2d2632580';
    useEffect(() => {
        fetch(reminderURL)
            .then(data => data.json())
            .then(reminders => {
                console.log(reminders); setReminders(reminders);
            })
            .catch(err => console.log(err));
    }, []);
    
    return (
        <View>
            <FlatList
                data={reminders}
                renderItem={ ({item}) => (
                    <ReminderCard {...item}></ReminderCard>
                )}
                keyExtractor={(item) => new Date(item.date).getTime() + Math.floor(1000 * (Math.random()))}
            />
        </View>
    )
}

export default Reminders;