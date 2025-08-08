import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Créer un FormData pour Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', 'ml_default');
    cloudinaryFormData.append('folder', 'gotham');
    cloudinaryFormData.append('cloud_name', 'ducewyjc2');

    // Upload direct vers Cloudinary (unsigned)
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/ducewyjc2/${file.type.startsWith('video/') ? 'video' : 'image'}/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Erreur Cloudinary:', error);
      return NextResponse.json({ 
        error: 'Erreur upload Cloudinary', 
        details: error 
      }, { status: response.status });
    }

    const result = await response.json();
    
    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes
    });

  } catch (error) {
    console.error('Erreur upload unsigned:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'upload',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}