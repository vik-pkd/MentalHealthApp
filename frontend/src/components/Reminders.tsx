import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native';
import ReminderCard from './ReminderCard';

function Reminders() {
    const [reminders, setReminders] = useState([]);
    
    useEffect(() => {
        const reminders = [
            {
                medicine: 'Paracetamol',
                date: '2023-12-04',
                slot: 'Evening',
                isBeforeFood: false
            },
            {
                medicine: 'Paracetamol',
                date: '2023-12-05',
                slot: 'Evening',
                isBeforeFood: false
            },
            {
                medicine: 'Paracetamol',
                date: '2023-12-06',
                slot: 'Evening',
                isBeforeFood: false
            },
        ];
        setReminders(reminders);
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