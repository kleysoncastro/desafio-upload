import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const pathFileAbolute = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  directory: pathFileAbolute,
  storage: multer.diskStorage({
    destination: pathFileAbolute,
    filename(request, file, callabck) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const name = `${fileHash}-${file.originalname}`;
      return callabck(null, name);
    },
  }),
};
