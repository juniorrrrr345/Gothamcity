import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ducewyjc2',
  api_key: process.env.CLOUDINARY_API_KEY || '771491869487686',
  api_secret: process.env.CLOUDINARY_API_SECRET || '3qs-_gQrN0sCMKNXkTo49IsfjWU',
  secure: true,
};

console.log('🔧 Configuration Cloudinary chargée:', {
  cloud_name: config.cloud_name,
  api_key: config.api_key ? `${config.api_key.substring(0, 6)}...` : 'MANQUANT',
  api_secret: config.api_secret ? 'OK' : 'MANQUANT'
});

cloudinary.config(config);

export default cloudinary;