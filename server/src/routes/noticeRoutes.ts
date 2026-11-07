import { Router } from 'express';
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice
} from '../controllers/noticeController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getNotices);
router.post('/', requireAuth, createNotice);
router.put('/:id', requireAuth, updateNotice);
router.delete('/:id', requireAuth, deleteNotice);

export default router;
