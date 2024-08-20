import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RadioButton } from 'react-native-paper';

import { AddPrescriptionStackParamList } from '.';
import BasicButton from '../BasicButton';
import { usePrescription } from './PrescriptionProvider';
import LabelTextInput from '../LabelTextInput';
import ImagePickerBox from '../ImagePickerBox';

type NameScreenProps = NativeStackScreenProps<AddPrescriptionStackParamList, 'MedInfo'>;

const MedicineInfo = ({navigation}: NameScreenProps) => {

    const {name, setName, quantity, setQuantity, image, setImage, numberOfDoses, setNumberOfDoses, foodTiming, setFoodTiming } = usePrescription();

    const handlePressNext = () => {
        navigation.navigate('DateInfo');
    };

    return (
        <View style={styles.container}>
            <LabelTextInput
                label="Medicine Name"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder='Enter medicine name'
            />
            <LabelTextInput
                label='Quantity'
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
                placeholder='Enter quantity'
            />
            <ImagePickerBox
                image={image}
                setImage={(imageObj) => setImage(imageObj)}
            />
            <LabelTextInput
                label='Dose per day'
                value={numberOfDoses.toString()}
                onChangeText={(text) => setNumberOfDoses(parseInt(text))}
                placeholder='Enter number of Doses per day'
            />
            <RadioButton.Group
                onValueChange={(foodTime) => setFoodTiming(foodTime)}
                value={foodTiming}
            >
                <RadioButton.Item label='Before food' value='BeforeFood'/>
                <RadioButton.Item label='After food' value='AfterFood'/>
                <RadioButton.Item label='Anything is fine' value='AnythingFine'/>
            </RadioButton.Group>
            <BasicButton
                title="Next"
                onPress={handlePressNext}
            />
        </View>
    );
};

export default MedicineInfo;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    blackText: {
        color: 'black'
    }
});