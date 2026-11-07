import { Schema, model, Document } from 'mongoose';

export interface INotice extends Document {
  title: string;
  category: 'admission' | 'exam' | 'result' | 'general';
  content: string;
  urgent: boolean;
  active: boolean;
  link?: string;
  publishDate: Date;
}

const noticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['admission', 'exam', 'result', 'general'],
      default: 'admission'
    },
    content: { type: String, required: true },
    urgent: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    link: { type: String, trim: true },
    publishDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Notice = model<INotice>('Notice', noticeSchema);
