'use client';

import { useState } from 'react';

export default function TestImage() {
  const [imageUrl, setImageUrl] = useState('');
  const [testUrl] = useState('https://res.cloudinary.com/ducewyjc2/image/upload/v1754679650/gotham/test/test_pixel.png');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Test Affichage Images Cloudinary</h1>
      
      <div className="space-y-8 max-w-4xl">
        {/* Test avec une image connue */}
        <div>
          <h2 className="text-lg font-semibold mb-2">1. Image de test Cloudinary :</h2>
          <div className="bg-gray-800 p-4 rounded">
            <p className="text-sm text-gray-400 mb-2">URL : {testUrl}</p>
            <img 
              src={testUrl} 
              alt="Test" 
              className="w-32 h-32 object-cover border border-white/20"
              onError={(e) => console.error('Erreur chargement image test:', e)}
              onLoad={() => console.log('✅ Image test chargée')}
            />
          </div>
        </div>

        {/* Test avec URL personnalisée */}
        <div>
          <h2 className="text-lg font-semibold mb-2">2. Tester une URL personnalisée :</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Collez l'URL de votre image Cloudinary ici..."
              className="w-full bg-gray-800 border border-white/20 text-white rounded px-4 py-2"
            />
            {imageUrl && (
              <div className="bg-gray-800 p-4 rounded">
                <p className="text-sm text-gray-400 mb-2">Aperçu :</p>
                <img 
                  src={imageUrl} 
                  alt="Custom" 
                  className="max-w-md h-auto border border-white/20"
                  onError={(e) => console.error('Erreur chargement image custom:', e)}
                  onLoad={() => console.log('✅ Image custom chargée')}
                />
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded p-4">
          <h3 className="font-semibold mb-2">🔍 Instructions de debug :</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Ouvrez la console (F12)</li>
            <li>Uploadez une image dans le panel admin</li>
            <li>Copiez l'URL depuis la console</li>
            <li>Collez-la dans le champ ci-dessus</li>
            <li>Vérifiez si l'image s'affiche</li>
          </ol>
        </div>
      </div>
    </div>
  );
}