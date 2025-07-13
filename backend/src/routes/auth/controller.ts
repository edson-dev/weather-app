import express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');
import env  from '../../config';
import * as userService from '../user/repository';

function generateAccessToken(user) {
  return jwt.sign(user, env.SECRET, { expiresIn: 10 * 60 * 60});
}

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: create a token for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's full name.
 *                 example: test
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 format: password
 *                 example: test
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created user.
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Invalid input data
  *     tags:
 *       - Authentication
 */
router.post('/auth', async(req, res) => {
  const { username, password } = req.body;
  let user = await userService.default.getUser(username, password);
  if (user && user.length > 0) {
  const token = generateAccessToken({username});
    res.json({token: token, history: user[0].history});
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

export default router;