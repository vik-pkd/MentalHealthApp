const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

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
        console.log('token', token);
        try {
            let user = null;
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log('decode', decode, token);
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