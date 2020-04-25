import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  directory: tempFolder,

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const filehash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${filehash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
