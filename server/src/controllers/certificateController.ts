import { Request, Response } from 'express';
import { Certificate } from '../models/Certificate.js';

export async function verifyCertificate(req: Request, res: Response): Promise<void> {
  try {
    const { query } = req.params;
    if (!query) {
      res.status(400).json({ success: false, message: 'Please provide a roll number or certificate number.' });
      return;
    }

    const cleaned = query.trim().toUpperCase();
    const certificate = await Certificate.findOne({
      $or: [{ rollNumber: cleaned }, { certificateNumber: cleaned }]
    });

    if (!certificate) {
      res.status(404).json({
        success: false,
        message: 'No record found matching this Roll Number or Certificate Number. Please verify and try again.'
      });
      return;
    }

    res.json({
      success: true,
      verified: certificate.status === 'VALID',
      certificate: {
        studentName: certificate.studentName,
        rollNumber: certificate.rollNumber,
        certificateNumber: certificate.certificateNumber,
        courseName: certificate.courseName,
        courseCategory: certificate.courseCategory,
        grade: certificate.grade,
        issueDate: certificate.issueDate,
        completionYear: certificate.completionYear,
        center: certificate.center,
        status: certificate.status
      }
    });
  } catch (error) {
    console.error('Certificate verification error:', error);
    res.status(500).json({ success: false, message: 'Verification service error.' });
  }
}

export async function getCertificates(req: Request, res: Response): Promise<void> {
  try {
    const { search } = req.query;
    const filter: Record<string, any> = {};
    if (search) {
      filter.$or = [
        { studentName: { $regex: search as string, $options: 'i' } },
        { rollNumber: { $regex: search as string, $options: 'i' } },
        { certificateNumber: { $regex: search as string, $options: 'i' } },
        { courseName: { $regex: search as string, $options: 'i' } }
      ];
    }
    const certificates = await Certificate.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: certificates.length, certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve certificates.' });
  }
}

export async function createCertificate(req: Request, res: Response): Promise<void> {
  try {
    const { studentName, fatherName, rollNumber, certificateNumber, courseName, courseCategory, grade, completionYear, center } = req.body;

    const existing = await Certificate.findOne({
      $or: [
        { rollNumber: rollNumber.trim().toUpperCase() },
        { certificateNumber: certificateNumber.trim().toUpperCase() }
      ]
    });

    if (existing) {
      res.status(400).json({ success: false, message: 'Roll number or Certificate number already exists.' });
      return;
    }

    const certificate = await Certificate.create({
      studentName: studentName.trim(),
      fatherName: fatherName ? fatherName.trim() : undefined,
      rollNumber: rollNumber.trim().toUpperCase(),
      certificateNumber: certificateNumber.trim().toUpperCase(),
      courseName: courseName.trim(),
      courseCategory: courseCategory || 'computer',
      grade: grade.trim(),
      completionYear: completionYear.trim(),
      center: center || 'MGI Education, Mayur Vihar-3, Delhi',
      status: 'VALID'
    });

    res.status(201).json({ success: true, message: 'Certificate issued successfully', certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create certificate.' });
  }
}

export async function deleteCertificate(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    await Certificate.findByIdAndDelete(id);
    res.json({ success: true, message: 'Certificate removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete certificate.' });
  }
}
