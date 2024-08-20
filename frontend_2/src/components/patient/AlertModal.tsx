import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AlertDetails {
    medicine: string;
    quantity: string;
    caregiver: string;
    time: string; // This should be a date string
}

interface CustomAlertModalProps {
    isVisible: boolean;
    onClose: () => void;
    alert: AlertDetails | null;
    onRemindLater: () => void;
    onTaken: () => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return formattedTime;
};

const AlertModal: React.FC<CustomAlertModalProps> = ({
    isVisible,
    onClose,
    alert,
    onRemindLater,
    onTaken
}) => {
    if (!alert) return null; // Render nothing if there is no alert

    const formattedTime = formatDate(alert.time);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>
                        It's time to take your medicine!
                    </Text>
                    <Text style={styles.modalText}>Medicine: {alert.medicine}</Text>
                    <Text style={styles.modalText}>Dose: {alert.quantity}</Text>
                    <Text style={styles.modalText}>Caregiver: {alert.caregiver}</Text>
                    <Text style={styles.modalText}>Time: {formattedTime}</Text>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.button} onPress={onRemindLater}>
                            <Text style={styles.textStyle}>Remind Me Later</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onTaken}>
                            <Text style={styles.textStyle}>Taken</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#f4f1f4",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 22,
        color: '#38006b'
    },
    modalMessage: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        color: '#38006b',
        fontWeight: 'bold',
    },
    modalText: {
        textAlign: "center",
        fontSize: 16,
        color: '#666'
    },
    button: {
        backgroundColor: "#6A1B9A",
        borderRadius: 20,
        padding: 12,
        elevation: 2,
        marginTop: 16,
        // width: '80%',
        marginHorizontal: 8,
        alignItems: 'center'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    footer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});

export default AlertModal;
