import { Router } from 'express';
import {
  verifyCertificate,
  getCertificates,
  createCertificate,
  deleteCertificate
} from '../controllers/certificateController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public verification
router.get('/verify/:query', verifyCertificate);

// Admin endpoints
router.get('/', requireAuth, getCertificates);
router.post('/', requireAuth, createCertificate);
router.delete('/:id', requireAuth, deleteCertificate);

export default router;
