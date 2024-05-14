const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Caregiver = require('../models/caregiver');

exports.isDoctorAuth = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await Doctor.findById(decode.userId);
            if (!user) {
                return res.json({ success: false, message: 'unauthorized access!' });
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.json({ success: false, message: 'unauthorized access!' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.json({
                    success: false,
                    message: 'sesson expired try sign in!',
                });
            }

            res.res.json({ success: false, message: 'Internal server error!' });
        }
    } else {
        res.json({ success: false, message: 'unauthorized access!' });
    }
};

exports.isPatientAuth = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await Patient.findById(decode.userId);
            if (!user) {
                return res.json({ success: false, message: 'unauthorized access!' });
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.json({ success: false, message: 'unauthorized access!' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.json({
                    success: false,
                    message: 'sesson expired try sign in!',
                });
            }

            res.res.json({ success: false, message: 'Internal server error!' });
        }
    } else {
        res.json({ success: false, message: 'unauthorized access!' });
    }
};

exports.isDoctorOrPatientAuth = async (req, res, next) => {
    console.log(req.headers);
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            let user = null;
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            if (decode.role === 'doctor') {
                user = await Doctor.findById(decode.userId);
            } else {
                user = await Patient.findById(decode.userId);
            }
            if (!user) {
                return res.json({ success: false, message: 'unauthorized access!' });
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.json({ success: false, message: 'unauthorized access!' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.json({
                    success: false,
                    message: 'sesson expired try sign in!',
                });
            }

            res.res.json({ success: false, message: 'Internal server error!' });
        }
    } else {
        res.json({ success: false, message: 'unauthorized access!' });
    }
};

// Middleware to authenticate doctor, patient, or caregiver
exports.isDoctorOrPatientAuthOrCaregiverAuth = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            let user = null;

            console.log(decoded);
            // Determine the user type from the token and find the user
            switch (decoded.role) {
                case 'doctor':
                    user = await Doctor.findById(decoded.userId);
                    break;
                case 'patient':
                    user = await Patient.findById(decoded.userId);
                    break;
                case 'caregiver':
                    user = await Caregiver.findById(decoded.userId);
                    break;
                default:
                    return res.json({ success: false, message: 'Unauthorized access!' });
            }

            if (!user) {
                return res.json({ success: false, message: 'User not found!' });
            }

            req.user = user;
            next();
        } catch (error) {
            // Differentiating the error types
            if (error.name === 'JsonWebTokenError') {
                return res.json({ success: false, message: 'Unauthorized access!' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.json({
                    success: false,
                    message: 'Session expired, please sign in again!',
                });
            }
            return res.json({ success: false, message: 'Internal server error!' });
        }
    } else {
        return res.json({ success: false, message: 'Authorization token is missing!' });
    }
};