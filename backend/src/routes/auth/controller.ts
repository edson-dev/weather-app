import express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');
import env  from '../../config';
import * as service from './service';
import authenticateJWT from './middleware';

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
  let user = await service.default.getUser(username, password);
  if (user && user.length > 0) {
  const token = generateAccessToken({username});
    res.json({token: token, history: user[0].history});
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: create a new user
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
  *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: test@test.com
 *             required:
 *               - username
 *               - password
 *               - email
 *     responses:
 *       201:
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
 *       400:
 *         description: Invalid input data
  *     tags:
 *       - Authentication
 */
router.post('/user', async (req, res) => {
  const { username, password, email } = req.body;
  let error = await service.default.createUser(username, password,email);
  if (error == null || error == "") {
    res.status(201).json({ message: 'User created successfully' });
  } else {
    res.status(400).json({ error: error });
  }
})

router.post('/user/:name', authenticateJWT, async (req, res) => {
  const  username  = req.params.name;
  const body = req.body;
  //console.log(body);
  let error = await service.default.saveUserHistory(username, JSON.stringify(body));
  if (error == null || error == "") {
    res.status(200).json({ message: 'User history saved successfully' });
  }else{
    res.status(400).json({ error: error });
  }
})

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: delete user
 *     params:
 *       - name: user
 *         in: path
 *         required: true
 *     responses:
 *       201:
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
 *       400:
 *         description: Invalid input data
  *     tags:
 *       - Authentication
 */
router.delete('/user/:user', async (req, res) => {
  const  username  = req.params.user;
  let error = await service.default.deleteUser(username);
  if (error == null || error == "") {
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(400).json({ error: error });
  }
})
export default router;