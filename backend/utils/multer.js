const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/');
    },
    filename: (req, file, callBack) => {
        callBack(null, new Date().toISOString().replace(/[:]/g, '-') + '-' + file.originalname);
    }
});
const upload = multer({ storage, fileFilter });

module.exports = upload;
