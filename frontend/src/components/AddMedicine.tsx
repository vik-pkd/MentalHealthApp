import { useState } from "react";
import { StyleSheet, Modal, View, TextInput, Text, Pressable } from "react-native";
import ImagePickerBox from "./ImagePickerBox";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
import client from "../api/client";
import Snackbar from "react-native-snackbar";
import globalStyles from "../constants/styles";
import { color } from "@rneui/base";

const AddMedicine = ({ isVisible, onRequestClose }: { isVisible: boolean, onRequestClose: () => void }) => {
    const [medicineName, setMedicineName] = useState('');
    const [image, setImage] = useState({ uri: '', type: '', name: '' });
    const [foodTiming, setFoodTiming] = useState('AfterFood');
    const authToken = useSelector((state: Record<string, { token: string }>) => state.authToken.token);
    const [error, setError] = useState<string>('');

    const handleAddMedicine = async () => {
        const prescriptionData = new FormData();

        prescriptionData.append('details', JSON.stringify({
            name: medicineName,
            foodTiming: foodTiming,
        }));
        prescriptionData.append('image', image);
        console.log(prescriptionData);
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`
        };
        const response = await client.post(`/doctors/add-medicine`, prescriptionData, { headers });
        console.log(response.data);
        if (response.data.status === 'success') {
            // Handle the success scenario, maybe close the modal and clear the fields
            onRequestClose();
            setMedicineName('');
            setImage({ uri: '', type: '', name: '' });
            // Show success message
            Snackbar.show({
                text: 'Patient added successfully',
                duration: Snackbar.LENGTH_SHORT
            });
        } else {
            // Handle the failure scenario
            setError(response.data.message);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={[globalStyles.lightText, styles.modalTitle]}>Write Medicine Details</Text>
                    <TextInput
                        style={[globalStyles.lightText, styles.input]}
                        placeholder="Name"
                        value={medicineName}
                        onChangeText={text => setMedicineName(text)}
                    />
                    <ImagePickerBox
                        image={image}
                        setImage={(imageObj) => setImage(imageObj)}
                    />
                    <RadioButton.Group
                        onValueChange={(foodTime) => setFoodTiming(foodTime)}
                        value={foodTiming}
                    >
                        <RadioButton.Item label='Before food' value='BeforeFood' color="#9c4dcc" labelStyle={globalStyles.lightText} />
                        <RadioButton.Item label='After food' value='AfterFood' color="#9c4dcc" labelStyle={globalStyles.lightText} />
                        <RadioButton.Item label='Anything is fine' value='AnythingFine' color="#9c4dcc" labelStyle={globalStyles.lightText} />
                    </RadioButton.Group>

                    <Pressable
                        onPress={handleAddMedicine}
                        style={[styles.btn, { marginTop: 20 }]}>
                        <Text style={styles.btnText}>Submit</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default AddMedicine;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    modalContent: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 10,
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: '#f4f1f4',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center'
    },
    btn: {
        backgroundColor: '#9c4dcc',
        padding: 10,
        height: 45,
        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,
    },
    btnText: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    lightText: {
        // backgroundColor: 'white',.
        textShadowColor: 'white'
    }
});