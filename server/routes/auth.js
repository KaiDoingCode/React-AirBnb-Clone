import express from 'express';
import { showMessage, register, login } from '../controllers/auth';

const router = express.Router();

router.get('/', (req, res, next) => {
    return res.status(200)
});

// router.get('/:message', showMessage);
router.post('/register', register);
router.post('/login', login);

// export default router;
module.exports = router;