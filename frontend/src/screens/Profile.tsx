import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

const Stack = createStackNavigator();

function PatientProfile() {

	const [isModalVisible, setModalVisible] = useState(false);
	const [medicineName, setMedicineName] = useState('');
	const [date, setDate] = useState('');
	const [slot, setSlot] = useState('');
	const [beforeOrAfter, setBeforeOrAfter] = useState('');

	const handlePrescription = () => {
		setModalVisible(true);
	};

	const handleSavePrescription = () => {
		// Add logic to save prescription data
		setModalVisible(false);
	};

	// Dummy patient data (replace with actual data)
	const patientData = {
		name: 'John Doe',
		email: 'john.doe@example.com',
		points: 100,
	};

	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<View style={styles.profilePhotoContainer}>
					<View style={styles.profilePhoto} >
					</View>
					{/* <Image
						source={{ uri: '../assets/user.png' }}
						style={styles.profilePhoto}
						alt='User Image'
					/> */}
					<Text>User photo</Text>
				</View>
				<Text style={styles.title}>User Profile</Text>
				<Text style={styles.label}>Name:</Text>
				<Text style={styles.value}>{patientData.name}</Text>

				<Text style={styles.label}>Email:</Text>
				<Text style={styles.value}>{patientData.email}</Text>

				<Text style={styles.label}>Points:</Text>
				<Text style={styles.value}>{patientData.points}</Text>

				<TouchableOpacity style={styles.button} onPress={handlePrescription}>
					<Text style={styles.buttonText}>Write Prescription</Text>
				</TouchableOpacity>
			</View>

			{/* Medication Modal */}
			<Modal
				visible={isModalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Write Medication</Text>

						{/* Medication Inputs */}
						<TextInput
							style={styles.input}
							placeholder="Medicine Name"
							value={medicineName}
							onChangeText={text => setMedicineName(text)}
						/>
						{/* <DateTimePicker
							value={date}
							mode="date"
							onChange={(event, newDate) => {
								if (event.type === 'set') {
									setDate(newDate || date);
								}
								setModalVisible(false);
							}}
						/> */}
						<TextInput
							
							style={styles.input}
							placeholder="Date"
							value={date}
							onChangeText={text => setDate(text)}
						/>
						<TextInput
							style={styles.input}
							placeholder="Slot"
							value={slot}
							onChangeText={text => setSlot(text)}
						/>

						<TextInput
							style={styles.input}
							placeholder="Before/After"
							value={beforeOrAfter}
							onChangeText={text => setBeforeOrAfter(text)}
						/>

						{/* Save Button */}
						<TouchableOpacity style={styles.saveButton} onPress={handleSavePrescription}>
							<Text style={styles.buttonText}>Save Prescription</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	profileContainer: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 16,
		elevation: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	profilePhoto: {
		width: '100%',
		backgroundColor: 'red',
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 8,
	},
	value: {
		fontSize: 16,
		marginBottom: 16,
	},
	modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
});

export default PatientProfile;