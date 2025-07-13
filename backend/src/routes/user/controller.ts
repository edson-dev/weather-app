import express from 'express';
const router = express.Router();
import * as service from './repository';
import authenticateJWT from '../auth/middleware';

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
 *       - User
 */
router.post('/', async (req, res) => {
  const { username, password, email } = req.body;
  let error = await service.default.createUser(username, password,email);
  if (error == null || error == "") {
    res.status(201).json({ message: 'User created successfully' });
  } else {
    res.status(400).json({ error: error });
  }
})

/**
 * @swagger
 * /user/{name}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: update user history
 *     parameters:
 *       - in: path
 *         name: name of the user
 *         schema:
 *           type: string
 *         required: true
 *         description: name of the user
 *     responses:
 *       200:
 *         description: data saved successfully
 *       400:
 *         description: Invalid input data
  *     tags:
 *       - User
 */
router.put('/:username',authenticateJWT, async (req, res) => {
  const  username  = req.params.username;
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
 * /user/{name}:
 *   delete:
 *     security:
 *       - bearerAuth: []
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
 *       - User
 */
router.delete('/:username',authenticateJWT, async (req, res) => {
  const  username  = req.params.username;
  let error = await service.default.deleteUser(username);
  if (error == null || error == "") {
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(400).json({ error: error });
  }
})
export default router;