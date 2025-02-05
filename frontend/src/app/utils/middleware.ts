import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const isBase64 = (str: string): boolean => {
  const base64Prefixes = [
    'data:image/png;base64',
    'data:image/jpeg;base64',
    'data:image/jpg;base64',
    'data:application/pdf;base64',
  ];

  return base64Prefixes.some((prefix) => str.startsWith(prefix));
};

export const uploadToCloudinary = async (
  base64Data: string,
  contentType: string
): Promise<string> => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(`data:${contentType};base64,${base64Data}`, {
      folder: 'uploads',
      public_id: uuidv4(),
    });
    return uploadResponse.secure_url; // URL do arquivo no Cloudinary
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Error uploading to Cloudinary');
  }
};

const replaceBase64 = async (obj: any): Promise<any> => {
  if (typeof obj === 'string') {
    if (isBase64(obj)) {
      const [prefix, base64Data] = obj.split(','); // Remove o prefixo e obtem o base64
      const contentType = prefix.split(':')[1].split(';')[0]; // Extrai o tipo de conteúdo
      const cloudinaryUrl = await uploadToCloudinary(base64Data, contentType);
      return cloudinaryUrl;
    }
    return obj;
  } else if (Array.isArray(obj)) {
    const results = await Promise.all(obj.map(replaceBase64));
    return results;
  } else if (typeof obj === 'object' && obj !== null) {
    const result: any = {};
    for (const key in obj) {
      result[key] = await replaceBase64(obj[key]);
    }
    return result;
  }
  return obj;
};

export const processRequestBody = async (req: NextRequest): Promise<any> => {
  // Obtém o corpo da requisição como JSON
  const body = await req.json();
  // Aplica a substituição de base64
  return replaceBase64(body);
};
