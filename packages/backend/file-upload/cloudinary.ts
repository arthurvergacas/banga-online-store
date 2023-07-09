import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '../constants/cloudinaryConstants';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: Express.Multer.File): Promise<UploadApiResponse> {
  const res = await cloudinary.uploader.upload(getFileDataURI(file), {
    resource_type: 'auto',
  });

  return res;
}

function getFileDataURI(file: Express.Multer.File): string {
  const b64 = Buffer.from(file.buffer).toString('base64');
  return `data:${file.mimetype};base64,${b64}`;
}
