import { Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { Course } from '../models/Course.js';
import { Certificate } from '../models/Certificate.js';
import { Notice } from '../models/Notice.js';

export async function getDashboardStats(req: Request, res: Response): Promise<void> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalInquiries,
      newInquiriesToday,
      statusCounts,
      categoryCounts,
      totalCourses,
      totalCertificates,
      totalNotices,
      recentInquiries
    ] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ createdAt: { $gte: today } }),
      Inquiry.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Inquiry.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Course.countDocuments({ active: true }),
      Certificate.countDocuments({ status: 'VALID' }),
      Notice.countDocuments({ active: true }),
      Inquiry.find().sort({ createdAt: -1 }).limit(6)
    ]);

    const statusMap = statusCounts.reduce<Record<string, number>>((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    const categoryMap = categoryCounts.reduce<Record<string, number>>((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json({
      success: true,
      stats: {
        totalInquiries,
        newInquiriesToday,
        statusMap,
        categoryMap,
        totalCourses,
        totalCertificates,
        totalNotices
      },
      recentInquiries
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve stats.' });
  }
}
