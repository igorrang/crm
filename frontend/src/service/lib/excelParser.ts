import * as xlsx from 'xlsx';

export function parseExcel(filePath: string) {
  return new Promise((resolve, reject) => {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet);
      resolve(jsonData);
    } catch (error) {
      reject(error);
    }
  });
}