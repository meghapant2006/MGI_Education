import { Schema, model, Document } from 'mongoose';

export interface ISyllabusModule {
  title: string;
  topics: string[];
}

export interface ICourse extends Document {
  title: string;
  shortName: string;
  slug: string;
  category: 'university' | 'nios' | 'computer';
  level: 'UG' | 'PG' | '10th' | '12th' | 'diploma' | 'certificate' | 'vocational';
  duration: string;
  eligibility: string;
  description: string;
  highlights: string[];
  syllabus: ISyllabusModule[];
  feeRange: string;
  mode: string;
  featured: boolean;
  active: boolean;
  order: number;
}

const syllabusModuleSchema = new Schema<ISyllabusModule>(
  {
    title: { type: String, required: true },
    topics: [{ type: String, required: true }]
  },
  { _id: false }
);

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      enum: ['university', 'nios', 'computer'],
      required: true,
      index: true
    },
    level: {
      type: String,
      enum: ['UG', 'PG', '10th', '12th', 'diploma', 'certificate', 'vocational'],
      required: true
    },
    duration: { type: String, required: true },
    eligibility: { type: String, required: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    syllabus: [syllabusModuleSchema],
    feeRange: { type: String, default: 'Consult for Fee & Scholarship' },
    mode: { type: String, default: 'Distance / Online' },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

courseSchema.index({ title: 'text', description: 'text', shortName: 'text' });

export const Course = model<ICourse>('Course', courseSchema);
