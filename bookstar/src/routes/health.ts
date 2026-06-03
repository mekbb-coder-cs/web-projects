import { Router } from 'express';
import { healthCheck, getInfo } from '../controllers/healthController';

const router = Router();

router.get('/health', healthCheck);
router.get('/info', getInfo);

export default router;
