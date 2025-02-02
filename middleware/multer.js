const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const {DB_URL } = require('../configurations/config');

const storage = new GridFsStorage({
    url: DB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads' 
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

module.exports = upload
