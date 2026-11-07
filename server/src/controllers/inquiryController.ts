import { Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry.js';

function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `MGI-${year}-${randomPart}`;
}

export async function createInquiry(req: Request, res: Response): Promise<void> {
  try {
    const { fullName, phone, email, category, courseInterest, highestQualification, city, message, source } = req.body;

    if (!fullName || !phone || !courseInterest) {
      res.status(400).json({
        success: false,
        message: 'Name, phone number, and course interest are required.'
      });
      return;
    }

    let referenceNumber = generateReferenceNumber();
    let exists = await Inquiry.findOne({ referenceNumber });
    while (exists) {
      referenceNumber = generateReferenceNumber();
      exists = await Inquiry.findOne({ referenceNumber });
    }

    const inquiry = await Inquiry.create({
      referenceNumber,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : undefined,
      category: category || 'general',
      courseInterest: courseInterest.trim(),
      highestQualification: highestQualification ? highestQualification.trim() : undefined,
      city: city ? city.trim() : 'Delhi NCR',
      message: message ? message.trim() : '',
      source: source || 'website'
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully! An academic counselor will contact you shortly.',
      referenceNumber: inquiry.referenceNumber,
      inquiry
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry. Please try again or WhatsApp us directly.' });
  }
}

export async function getInquiries(req: Request, res: Response): Promise<void> {
  try {
    const { status, category, search, page = '1', limit = '20' } = req.query;
    const filter: Record<string, any> = {};

    if (status && status !== 'ALL') {
      filter.status = status;
    }
    if (category && category !== 'ALL') {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { fullName: { $regex: search as string, $options: 'i' } },
        { phone: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
        { referenceNumber: { $regex: search as string, $options: 'i' } },
        { courseInterest: { $regex: search as string, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [total, inquiries] = await Promise.all([
      Inquiry.countDocuments(filter),
      Inquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum)
    ]);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      inquiries
    });
  } catch (error) {
    console.error('Error retrieving inquiries:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve inquiries.' });
  }
}

export async function updateInquiryStatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status, counselorNotes } = req.body;

    const updated = await Inquiry.findByIdAndUpdate(
      id,
      {
        ...(status && { status }),
        ...(counselorNotes !== undefined && { counselorNotes })
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: 'Inquiry not found.' });
      return;
    }

    res.json({ success: true, message: 'Inquiry updated successfully', inquiry: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update inquiry.' });
  }
}

export async function exportInquiriesCSV(req: Request, res: Response): Promise<void> {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    const header = ['Ref No', 'Full Name', 'Phone', 'Email', 'Category', 'Course', 'Qualification', 'City', 'Status', 'Notes', 'Created Date'];
    const rows = inquiries.map((inq) => [
      `"${inq.referenceNumber}"`,
      `"${inq.fullName.replace(/"/g, '""')}"`,
      `"${inq.phone}"`,
      `"${inq.email || ''}"`,
      `"${inq.category}"`,
      `"${inq.courseInterest.replace(/"/g, '""')}"`,
      `"${inq.highestQualification || ''}"`,
      `"${inq.city || ''}"`,
      `"${inq.status}"`,
      `"${(inq.counselorNotes || '').replace(/"/g, '""')}"`,
      `"${new Date(inq.createdAt).toISOString()}"`
    ]);

    const csvContent = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="mgi_education_leads.csv"');
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to export CSV.' });
  }
}

export async function deleteInquiry(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    await Inquiry.findByIdAndDelete(id);
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete inquiry.' });
  }
}
