import { Request, Response } from 'express';
import { Course } from '../models/Course.js';

export async function getCourses(req: Request, res: Response): Promise<void> {
  try {
    const { category, level, featured, search, activeOnly = 'true' } = req.query;
    const filter: Record<string, any> = {};

    if (activeOnly === 'true') {
      filter.active = true;
    }
    if (category) {
      filter.category = category;
    }
    if (level) {
      filter.level = level;
    }
    if (featured === 'true') {
      filter.featured = true;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search as string, $options: 'i' } },
        { shortName: { $regex: search as string, $options: 'i' } },
        { description: { $regex: search as string, $options: 'i' } }
      ];
    }

    const courses = await Course.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve courses.' });
  }
}

export async function getCourseBySlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const course = await Course.findOne({ slug: slug.toLowerCase() });
    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found.' });
      return;
    }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve course.' });
  }
}

export async function createCourse(req: Request, res: Response): Promise<void> {
  try {
    const { title, shortName, slug, category, level, duration, eligibility, description, highlights, syllabus, feeRange, mode, featured, active, order } = req.body;

    const existingSlug = await Course.findOne({ slug: slug.toLowerCase() });
    if (existingSlug) {
      res.status(400).json({ success: false, message: 'Course with this slug already exists.' });
      return;
    }

    const newCourse = await Course.create({
      title,
      shortName,
      slug: slug.toLowerCase(),
      category,
      level,
      duration,
      eligibility,
      description,
      highlights: highlights || [],
      syllabus: syllabus || [],
      feeRange: feeRange || 'Consult for Fee & Scholarship',
      mode: mode || 'Distance / Online',
      featured: Boolean(featured),
      active: active !== undefined ? Boolean(active) : true,
      order: order ? Number(order) : 0
    });

    res.status(201).json({ success: true, message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ success: false, message: 'Failed to create course.' });
  }
}

export async function updateCourse(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updated = await Course.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Course not found.' });
      return;
    }
    res.json({ success: true, message: 'Course updated successfully', course: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update course.' });
  }
}

export async function deleteCourse(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Course not found.' });
      return;
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete course.' });
  }
}
