
import mongoose,{Schema} from 'mongoose'
import User from './User'

export enum VerificationCodeTypes {
    EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    PHONE_VERIFICATION = 'PHONE_VERIFICATION'
}
export enum VerificationCodeStatuses {
    USABLE = "USABLE",
    EXPIRED = "EXPIRED",
    VERIFIED = "VERIFIED"
  }

const  verificationCodeSchema = new Schema (
    {
        code: {
            type: String,
            required: true,
            index: {unique: true }
        },
        email:{type:String, required:false},
        type: {
            type: String,
            required: true,
            enum: Object.values(VerificationCodeTypes),
        },
        userRef: {
            type: Schema.Types.ObjectId,
            ref: User
        },
        status:{type:String, required:true, enum:Object.values(VerificationCodeStatuses)},
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const VerificationCode = mongoose?.models?.VerificationCode || mongoose.model('VerificationCode', verificationCodeSchema)

export default VerificationCode