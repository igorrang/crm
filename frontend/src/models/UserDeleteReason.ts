import mongoose, {Schema} from 'mongoose'
import {IUser} from './User'

interface IUserDeleteReason extends Document {
    userId: IUser | string
    reason: string

}

const userDeleteReasonSchema = new Schema<IUserDeleteReason> ({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: {type:String, required:true}
} , {
    timestamps: true
}
)

const UserDeleteReason = mongoose.models.UserDeleteReason || mongoose.model<IUserDeleteReason>
('UserDeleteReason', userDeleteReasonSchema)

export default UserDeleteReason 