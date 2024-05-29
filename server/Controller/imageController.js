const multer = require("multer");
const path = require("path");
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../client/src/assets');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// // uplodaing image
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = req.body?.type;
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const type = req.body?.type;
        const ext = file.mimetype.split('/')[1];
        cb(null, `recipe-${type}-${Date.now()}.${ext}`);
    }
})
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! please upload only image', 400), false)
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})
exports.uploadPhoto = upload.single('photo')