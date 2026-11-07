import { Schema, model, Document } from 'mongoose';

export interface ICertificate extends Document {
  studentName: string;
  fatherName?: string;
  rollNumber: string;
  certificateNumber: string;
  courseName: string;
  courseCategory: 'university' | 'nios' | 'computer';
  grade: string;
  issueDate: Date;
  completionYear: string;
  center: string;
  status: 'VALID' | 'REVOKED';
}

const certificateSchema = new Schema<ICertificate>(
  {
    studentName: { type: String, required: true, trim: true },
    fatherName: { type: String, trim: true },
    rollNumber: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    certificateNumber: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    courseName: { type: String, required: true, trim: true },
    courseCategory: { type: String, enum: ['university', 'nios', 'computer'], default: 'computer' },
    grade: { type: String, required: true, trim: true },
    issueDate: { type: Date, default: Date.now },
    completionYear: { type: String, required: true, trim: true },
    center: { type: String, default: 'MGI Education, Mayur Vihar-3, Delhi' },
    status: { type: String, enum: ['VALID', 'REVOKED'], default: 'VALID' }
  },
  { timestamps: true }
);

export const Certificate = model<ICertificate>('Certificate', certificateSchema);
