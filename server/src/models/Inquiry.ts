import { Schema, model, Document } from 'mongoose';

export interface IInquiry extends Document {
  referenceNumber: string;
  fullName: string;
  phone: string;
  email?: string;
  category: 'university' | 'nios' | 'computer' | 'general';
  courseInterest: string;
  highestQualification?: string;
  city?: string;
  message?: string;
  status: 'NEW' | 'CONTACTED' | 'COUNSELING' | 'ENROLLED' | 'REJECTED';
  counselorNotes?: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    referenceNumber: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    email: { type: String, lowercase: true, trim: true },
    category: {
      type: String,
      enum: ['university', 'nios', 'computer', 'general'],
      default: 'general'
    },
    courseInterest: { type: String, required: true, trim: true },
    highestQualification: { type: String, trim: true },
    city: { type: String, trim: true, default: 'Delhi NCR' },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'COUNSELING', 'ENROLLED', 'REJECTED'],
      default: 'NEW',
      index: true
    },
    counselorNotes: { type: String, default: '' },
    source: { type: String, default: 'website' }
  },
  { timestamps: true }
);

export const Inquiry = model<IInquiry>('Inquiry', inquirySchema);
