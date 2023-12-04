// PatientListScreen.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const patientsData = [
  { id: 1, name: 'Ajay Sharma' },
  // Add more patient data as needed
];

const PatientListScreen = () => {

  const renderPatientCard = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.card}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={patientsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPatientCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 26,
    marginVertical: 8,
  },
});

export default PatientListScreen;
