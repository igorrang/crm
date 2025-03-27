mport { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import * as XLSX from 'xlsx'; // Importando a biblioteca xlsx

export function ExcelUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]); // Para armazenar os dados da planilha

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Lendo o arquivo Excel
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData); // Armazenando os dados lidos
        console.log(jsonData); // Exibindo os dados no console
      };
      reader.readAsBinaryString(selectedFile);
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
@@ -61,23 +62,3 @@
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
      {/* Exibindo os dados importados */}
      {data.length > 0 && (
        <div className="mt-4">
          <h3 className="text-white">Dados Importados:</h3>
          <pre className="text-white">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
