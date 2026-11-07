import { Schema, model, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  course: string;
  review: string;
  rating: number;
  roleOrJob?: string;
  avatarUrl?: string;
  approved: boolean;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    roleOrJob: { type: String, trim: true },
    avatarUrl: { type: String, trim: true },
    approved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Testimonial = model<ITestimonial>('Testimonial', testimonialSchema);
