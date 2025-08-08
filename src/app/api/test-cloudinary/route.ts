import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    // Test de la configuration
    const config = {
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key,
      api_secret: cloudinary.config().api_secret ? '✅ Configuré' : '❌ Manquant',
      env_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      env_api_key: process.env.CLOUDINARY_API_KEY,
      env_api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ Configuré' : '❌ Manquant',
    };

    // Test d'upload simple
    let testUpload = null;
    try {
      testUpload = await cloudinary.uploader.upload(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        {
          folder: 'gotham/test',
          public_id: 'test_pixel',
          overwrite: true
        }
      );
    } catch (error: any) {
      testUpload = {
        error: error.message || 'Erreur inconnue',
        http_code: error.http_code
      };
    }

    return NextResponse.json({
      status: 'Configuration Cloudinary',
      config,
      testUpload,
      message: testUpload && !testUpload.error ? '✅ Cloudinary fonctionne!' : '❌ Problème avec Cloudinary'
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Erreur test Cloudinary',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}