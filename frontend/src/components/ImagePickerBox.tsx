import { Pressable, StyleSheet, View, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import globalStyles from "../constants/styles";

const ImagePickerBox = ({
    image,
    setImage
}: {
    image: { uri: string; type: string; name: string;};
    setImage: ({uri, type, name}: {uri: string; type: string; name: string;}) => void;
}) => {
    
    const uploadImageHandler = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.didCancel) {
            console.log('User canceled image picking');
        } else if (result.errorCode) {
            console.log(result.errorMessage);
        } else if (result.assets){
            const imageData = result.assets[0];
            if (imageData.uri && imageData.type && imageData.fileName){
                setImage({uri: imageData.uri, type: imageData.type, name: imageData.fileName});
            }
        }
    };

    return (
        <View>
        <Pressable
            onPress={uploadImageHandler}
        >
            <View style={styles.btnPickImg}>
                <View style={styles.btnPickImgCommand}>
                    <Text style={styles.buttonText}>Upload image</Text>
                </View>
                <View style={styles.btnPickImgState}>
                    <Text style={globalStyles.blackText}>{image.uri ? image.name : 'Select an image'}</Text>
                </View>
            </View>
        </Pressable>
    </View>
    );
};

export default ImagePickerBox;

const styles = StyleSheet.create({
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
    buttonText: {
        color: 'white'
    },
    btnPickImgState: {

    },
});