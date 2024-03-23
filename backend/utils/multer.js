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
        const newFileName = (new Date().toISOString() + '-' + file.originalname).replace(/[:.]/g, '-');
        callBack(null, newFileName);
    }
});
const upload = multer({ storage, fileFilter });

module.exports = upload;
