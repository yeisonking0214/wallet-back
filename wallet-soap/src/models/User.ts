import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const userSchema = new mongoose.Schema({
    identification: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    }, { timestamps: true });

    userSchema.virtual('wallet', {
        ref: 'wallets',
        localField: '_id',
        foreignField: 'userId',
        justOne: true
    });
        
    userSchema.set('toObject', { virtuals: true });

export const User = mongoose.model('users', userSchema);