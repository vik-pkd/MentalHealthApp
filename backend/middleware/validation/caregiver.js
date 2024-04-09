const { check, validationResult } = require('express-validator');

exports.validateCaregiverSignUp = [
    check('name').trim().not().isEmpty().withMessage('Non-empty name is required!').isString().withMessage('Must be a valid name!').isLength({ min: 3, max: 30 }).withMessage('Name must be within 3 to 30 characters!'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
    check('password').trim().not().isEmpty().withMessage('Password is empty!').isLength({ min: 3, max: 20 }).withMessage('Password must be 3 to 20 characters long!'),
    check('confirmPassword').trim().not().isEmpty().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Both password must be same!')
        }
        return true;
    })
]

exports.caregiverValidation = (req, res, next) => {
    // console.log(req.data);
    const result = validationResult(req).array();
    if (!result.length) return next();

    const error = result[0].msg;
    res.send({ status: 'failure', message: error });
}

exports.validateCaregiverSignIn = [
    check('email').trim().isEmail().withMessage('email / password is required!'),
    check('password').trim().not().isEmpty().withMessage('email / password is required!')
]