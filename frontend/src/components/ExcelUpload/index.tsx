import { useState } from 'react';
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
      setData([]); // Limpa os dados após o upload
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
