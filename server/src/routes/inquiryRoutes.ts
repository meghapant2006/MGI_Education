import { Router } from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  exportInquiriesCSV,
  deleteInquiry
} from '../controllers/inquiryController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public submission
router.post('/', createInquiry);

// Admin endpoints
router.get('/', requireAuth, getInquiries);
router.get('/export/csv', requireAuth, exportInquiriesCSV);
router.patch('/:id/status', requireAuth, updateInquiryStatus);
router.delete('/:id', requireAuth, deleteInquiry);

export default router;
