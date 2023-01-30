import { Router } from 'express';

// IMPORT ROUTERS HERE
import PingController from '../../app/http/controllers/api/PingController';

const router = Router();

router.get('/', PingController);

// ADD ROUTERS HERE

export default router;
