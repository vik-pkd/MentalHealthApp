import React from 'react';
import { useLogin } from '../context/LoginProvider';
import { PatientStack } from './PatientStack';
import { DoctorStack } from './DoctorStack';

const ParentStack = () => {
    const { userCategory } = useLogin();

    return (
        <>
            {userCategory === 'doctor' && <DoctorStack />}
            {userCategory === 'patient' && <PatientStack />}
            {/* You can add more conditional stacks here */}
        </>
    );
};

export default ParentStack;