import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import client from '../../api/client';
import { useLogin } from '../../context/LoginProvider';
import Snackbar from 'react-native-snackbar'

const FaceLogin = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const [cameraPermission, setCameraPermission] = useState(null);
    const device = useCameraDevice('back'); // Set the initial camera device
    const camera = useRef<Camera>(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const { setIsLoggedIn, setProfile } = useLogin();

    const checkCameraPermission = async () => {
        const status = await Camera.getCameraPermissionStatus();
        console.log('status', status);

        // if (status === 'granted') {
        //     setCameraPermission(true);
        // } else if (status === 'notDetermined') {
        //     const permission = await Camera.requestCameraPermission();
        //     setCameraPermission(permission === 'authorized');
        // } else {
        //     setCameraPermission(false);
        // }

        if (status === 'granted') {
            setCameraPermission(true);
        } else {
            const permission = await Camera.requestCameraPermission();
            setCameraPermission(permission === 'authorized');
        }
    };

    useEffect(() => {
        checkCameraPermission();
    }, []);

    if (cameraPermission === null) {
        return <Text>Checking camera permission...</Text>;
    } else if (!cameraPermission) {
        return <Text>Camera permission not granted</Text>;
    }

    if (!device) {
        return <Text>No camera device available</Text>;
    }

    const takePhoto = async () => {
        try {
            if (!camera.current) {
                console.error('Camera reference not available.', camera);
                return;
            }

            const options = { 'orientation': "landscape-right" }
            const photo = await camera.current.takePhoto(options);
            console.log(photo);

            if (photo) {
                setCapturedPhoto(`file://${photo.path}`);
                setShowPreview(true);
            } else {
                console.error('Photo captured is undefined or empty.');
            }
        } catch (error) {
            console.error('Error capturing photo:', error);
        }
    };

    const uploadPhoto = async (photoUri) => {
        try {
            const formData = new FormData();
            formData.append('profile', {
                uri: photoUri,
                type: 'image/jpeg', // or the correct type of your photo
                name: 'photo.jpg',
            });

            const response = await client.post('/doctors/verify-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error uploading photo:', error);
            throw error;
        }
    };

    const confirmPhoto = async () => {
        // User confirmed, further actions with the captured photo
        // For example, save the photo to storage, etc.
        console.log('Photo confirmed:', capturedPhoto);
        const response = await uploadPhoto(capturedPhoto);
        console.log(response);
        if (response.status === 'success') {
            Snackbar.show({
                text: 'Login Successful!',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#63BAAA'
            })
            setProfile(response.message);
            setIsLoggedIn(true);

        } else {
            Snackbar.show({
                text: 'Please Try Again!',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#FF3E85'
            })
            setShowPreview(false);
        }

    };

    const retakePhoto = () => {
        // User wants to retake the photo
        setCapturedPhoto(null); // Clear the captured photo
        setShowPreview(false); // Hide the preview
    };

    const onCameraReady = (ref) => {
        // Camera component is ready, set the camera reference
        camera.current = ref;// Reference to the Camera component (e.g., obtained from ref prop)
    };

    return (
        <View style={styles.container}>
            <Camera
                style={{ flex: 1 }}
                device={device}
                isActive={true}
                ref={(ref) => onCameraReady(ref)}
                photo={true}
                video={true}
            />

            {showPreview && capturedPhoto ? (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Pressable
                            onPress={confirmPhoto}
                            style={[styles.btn, { marginTop: 20 }]}>
                            <Text style={styles.btnText}>Confirm Photo</Text>
                        </Pressable>
                        <Pressable
                            onPress={retakePhoto}
                            style={[styles.btn, { marginTop: 20 }]}>
                            <Text style={styles.btnText}>Retake Photo</Text>
                        </Pressable>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: capturedPhoto }} // Assuming the photo is a valid URI
                            style={{ width: 150, height: 150, margin: 20 }}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <Pressable
                        onPress={takePhoto}
                        style={[styles.btn, { marginTop: 20 }]}>
                        <Text style={styles.btnText}>Verify Face</Text>
                    </Pressable>
                </View>
            )}

        </View>
    );
};


const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 60
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    formContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
    },
    appName: {
        color: 'rgba(134, 65, 244, 1)',
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fef8fa',
        padding: 10,
        height: 40,
        alignSelf: 'center',
        borderRadius: 5,

        width: '80%',
        color: '#000000',

        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 1,
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        marginTop: 10,
    },
    btn: {
        backgroundColor: '#ffffff',
        padding: 10,
        height: 45,

        alignSelf: 'center',
        borderRadius: 5,
        width: '80%',
        marginTop: 20,

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
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    signUpContainer: {
        marginTop: 80,
    },
    noAccountLabel: {
        color: '#484848',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    signUpLabel: {
        color: '#1d9bf0',
    },
});


export default FaceLogin;