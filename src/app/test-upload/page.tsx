'use client';

import { useState } from 'react';

export default function TestUpload() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testUpload = async () => {
    setLoading(true);
    try {
      // Test avec une petite image base64
      const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      
      const response = await fetch('/api/upload-cloudinary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: testImage,
          type: 'image/png'
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Erreur inconnue' });
    }
    setLoading(false);
  };

  const testWithFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-cloudinary', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Erreur inconnue' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-8">Test Upload Cloudinary</h1>
      
      <div className="space-y-4 max-w-2xl">
        <button
          onClick={testUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Test en cours...' : 'Test avec image base64'}
        </button>

        <div>
          <label className="block mb-2">Test avec fichier :</label>
          <input
            type="file"
            onChange={testWithFile}
            accept="image/*,video/*"
            disabled={loading}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700"
          />
        </div>

        {result && (
          <div className="mt-8 p-4 bg-gray-800 rounded">
            <h2 className="text-lg font-bold mb-2">Résultat :</h2>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}