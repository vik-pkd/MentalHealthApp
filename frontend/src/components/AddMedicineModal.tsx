import React, { useState } from 'react';
import { Button, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import client from '../api/client';
import { useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AddMedicineModal(props: any) {
    const [medicineName, setMedicineName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [slot, setSlot] = useState('');
    const [isBeforeFood, setIsBeforeFood] = useState(false);
    const authToken = useSelector((state: Record<string, { token: string | null }>) => state.authToken.token);
    const [image, setImage] = useState({uri: '', type: '', name: ''});

    const handleSubmit = async () => {

        const prescriptionData = new FormData();
        prescriptionData.append('details',JSON.stringify({
            name: medicineName,
            startDate: startDate,
            endDate: endDate,
            slot: slot
        }));
        prescriptionData.append('image', {...image});
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`
        };
        const response = await client.post(`/doctors/add-prescription/patient/${props.PatientId}`, prescriptionData, { headers });
        console.log(response.data);
        props.closeModal();
    };

    const clearForm = () => {
        setMedicineName('');
        setStartDate(new Date());
        setEndDate(new Date());
        setSlot('');
        setIsBeforeFood(false);
        setImage({uri: '', type: '', name: ''});
    };

    const handleCloseModal = () => {
        props.closeModal();
        clearForm();
    };

    const uploadImageHandler = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.didCancel) {
            console.log('User canceled image picking');
        } else if (result.errorCode) {
            console.log(result.errorMessage);
        } else if (result.assets){
            console.log(result.assets);
            const imageData = result.assets[0];
            if (imageData.uri && imageData.type && imageData.fileName){
                setImage({uri: imageData.uri, type: imageData.type, name: imageData.fileName});
            }
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.closeModal}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.labelAndInput]}>
                        <Text style={[styles.blackText]}>Medicine Name</Text>
                        <TextInput
                            style={[styles.blackText]}
                            onChangeText={(text) => { setMedicineName(text); }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.blackText]}>Quantity</Text>
                        <TextInput
                            style={[styles.blackText]}
                            keyboardType='default'
                            onChangeText={(text) => { setSlot(text); }}
                        />
                    </View>
                    <View>
                        <Pressable
                            onPress={uploadImageHandler}
                        >
                            <View style={styles.btnPickImg}>
                                <View style={styles.btnPickImgCommand}>
                                    <Text style={styles.buttonText}>Upload image</Text>
                                </View>
                                <View style={styles.btnPickImgState}>
                                    <Text style={styles.blackText}>{image.uri ? image.name : 'Select an image'}</Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    <View>
                        <Text style={[styles.blackText]}>Start Date</Text>
                        <DatePicker
                            style={[styles.datePicker]}
                            date={startDate}
                            mode='date'
                            confirmText='Confirm'
                            cancelText='Cancel'
                            onDateChange={(date) => setStartDate(date)}
                            minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                        />
                    </View>
                    <View>
                        <Text style={[styles.blackText]}>Last Date</Text>
                        <DatePicker
                            style={[styles.datePicker]}
                            date={endDate}
                            mode='date'
                            confirmText='Confirm'
                            cancelText='Cancel'
                            onDateChange={(date) => setEndDate(date)}
                        />
                    </View>
                    <View>
                        <Text style={[styles.blackText]}>Slot</Text>
                        <TextInput
                            style={[styles.blackText]}
                            keyboardType='default'
                            onChangeText={(text) => { setSlot(text); }}
                        />
                    </View>
                    <View style={styles.buttonSection}>
                        <Pressable onPress={handleSubmit}>
                            <View style={[styles.button]}>
                                <Text style={[styles.buttonText]}>Submit</Text>
                            </View>
                        </Pressable>

                        <Pressable onPress={handleCloseModal}>
                            <View style={[styles.button]}>
                                <Text style={[styles.buttonText]}>Close</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    labelAndInput: {
        marginVertical: 3
    },
    blackText: {
        color: 'black'
    },
    datePicker: {
        backgroundColor: 'grey',

    },
    buttonSection: {
        flexDirection: 'row'
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#2196F3',
        borderRadius: 6,
        padding: 6,
        marginHorizontal: 6
    },
    buttonText: {
        color: 'white'
    },
    btnPickImg: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10
    },
    btnPickImgCommand: {
        backgroundColor: '#2196F3',
        padding: 3,
        borderRadius: 10,
        marginRight: 5
    },
    btnPickImgState: {

    },
    imageInfoText: {
        width: 200,
        height: 100
    }
});