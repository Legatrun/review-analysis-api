
import { Router } from 'express';
import { analyzeReviewController } from '../controllers/analysis.controller';

const router = Router();

router.post('/analyze-review', analyzeReviewController);

export default router;
