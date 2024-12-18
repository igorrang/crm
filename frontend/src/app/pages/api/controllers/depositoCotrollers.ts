import { error } from "console";
import { postDeposito } from "../models/depositoModels";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    if (req.method === 'GET'){
        const data = req.query
        const table = await (postDeposito)
        return res.status(200).json(table)
    }else(error:string) => {
        return res.status(400).json({error})
    }
}
