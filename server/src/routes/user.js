import express from 'express';
const router = express.Router();
import { getAllUsers, registerNewUser, updateUser, updateRole, updatePermissions } from '../controller/user.js';



router.get('/users', getAllUsers)
router.post('/register', registerNewUser)
router.put('/users/:id', updateUser)
router.put('/users/:id/role', updateRole)
router.put('/users/:id/permissions', updatePermissions)


export default router;