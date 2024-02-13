const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/');
    },
    filename: (req, file, callBack) => {
        callBack(null, new Date().toISOString().replace(/[:]/g, '-') + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

module.exports = upload;
