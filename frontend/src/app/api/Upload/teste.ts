import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs/promises';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const formData = new FormData();
    const file = req.body.file;
    if (!file) {
        return res.status(400).json({ error: "No files received." });
    }
    formData.append('file', file, file.name);

    try {
        const response = await axios.post('http://localhost:5050/uploadFile', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        console.log(response.data);
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error('Error no upload do arquivo', error);
        res.status(500).json({ error: "Error no upload do arquivo" });
    }
}
