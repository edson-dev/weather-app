import express from 'express';
const router = express.Router();

router.get('/',
    async (_req, res, _next) =>
        res.status(200).json({ status: 'ok' }
        ))

export default router;