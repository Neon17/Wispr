const multer = require("multer");
const path = require("path");
const upload = multer({
    limits: 800000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "upload/profileImages/")
        },
        filename: (req, file, cb) => {
            let ext = path.extname(file.originalname);
            let fileName = `${req.user.firstName}Profile${req.user._id}${ext}`;
            req.fileName = fileName;
            cb(null, fileName)
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedFileType = ["jpg", "jpeg", "png","webp"];
        if (allowedFileType.includes(file.mimetype.split("/")[1])) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

module.exports = upload;