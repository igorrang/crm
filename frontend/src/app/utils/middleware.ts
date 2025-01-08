import { NextRequest } from "next/server";
import {v4 as uuidv4} from 'uuid'

const isBase64 = (str:string): boolean => {
    const base64Prefixes = [
        'data:image/png;base64',
        'data:image/jpeg;base64',
        'data:image/jpg;base64',
        'data:application/pdf;base64',

    ]

    return base64Prefixes.some((prefix) => str.startsWith(prefix))
}



//s3 const aqui



const replaceBases64 = async (obj: any): Promise<any> => {
    if (typeof obj === 'string') {
        if (isBase64(obj)) {
            const [prefix,base64Data] = obj.split(',')
            const contentType = prefix.split(':')[1].split(';')[0]
        }
    }
}