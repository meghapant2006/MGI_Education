import { Request, Response } from 'express';
import { Notice } from '../models/Notice.js';

export async function getNotices(req: Request, res: Response): Promise<void> {
  try {
    const { activeOnly = 'true' } = req.query;
    const filter = activeOnly === 'true' ? { active: true } : {};
    const notices = await Notice.find(filter).sort({ urgent: -1, publishDate: -1 });
    res.json({ success: true, count: notices.length, notices });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notices.' });
  }
}

export async function createNotice(req: Request, res: Response): Promise<void> {
  try {
    const { title, category, content, urgent, active, link } = req.body;
    const notice = await Notice.create({
      title: title.trim(),
      category: category || 'admission',
      content: content.trim(),
      urgent: Boolean(urgent),
      active: active !== undefined ? Boolean(active) : true,
      link: link ? link.trim() : undefined,
      publishDate: new Date()
    });
    res.status(201).json({ success: true, message: 'Notice posted successfully', notice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create notice.' });
  }
}

export async function updateNotice(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updated = await Notice.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Notice not found.' });
      return;
    }
    res.json({ success: true, message: 'Notice updated', notice: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notice.' });
  }
}

export async function deleteNotice(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    await Notice.findByIdAndDelete(id);
    res.json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete notice.' });
  }
}
