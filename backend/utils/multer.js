const multer = require('multer');

const fileFilter = (req, file, cb) => {
    // console.log('reached in multer', file.mimetype);
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else if (file.mimetype.startsWith('application/zip')) {
        console.log('zip will be uploaded');
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
