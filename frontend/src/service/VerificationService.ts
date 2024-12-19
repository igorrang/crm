import {createHash} from 'crypto';

import {sendEmail} from './lib/email'
import {addHours} from 'date-fns'
import VerificationCode, {VerificationCodeStatuses,VerificationCodeTypes,} from '@/models/VerificationCode';
import {connectMongoDB} from '@/service/lib/mongodb';
import UserService from './UserService'

const sendVerificationCode = async (email:string) => {
    const verificationCode = createHash('sha256').update(email).digest('hex');
    VerificationCode.replaOne(
        {email:email},
        {code: verificationCode,
            email: email,
        },
        {
            upsert: true
        }
    );

    sendEmail(email, verificationCode)
} 