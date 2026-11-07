import { Router } from 'express';
import { getDashboardStats } from '../controllers/statsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', requireAuth, getDashboardStats);

export default router;
