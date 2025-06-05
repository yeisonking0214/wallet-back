import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const walletSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true, unique: true},
    value: { type: Number, required: true},
    validationToken: {
        type: {
            sessionId: { type: String },
            amount: { type: Number},
            token: { type: String },
        },
        default: null
    }
    }, { timestamps:  {updatedAt: true} });

export const Wallet = mongoose.model('wallets', walletSchema);