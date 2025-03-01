
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';

export function ExcelUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('Planilha importada com sucesso!');
      setFile(null);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao importar planilha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <label htmlFor="excel-upload" className="text-white">
        Selecione a planilha Excel
      </label>
      <input
        id="excel-upload"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="text-white"
        aria-label="Upload de arquivo Excel"
      />
      <Button 
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? 'Importando...' : 'Importar Planilha'}
      </Button>
    </div>
  );
} 