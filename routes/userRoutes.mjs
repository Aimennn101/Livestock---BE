import express from 'express';
import { registerUser, loginUser, getUsersList, updateUser, updatePassword, getAllUsers, deleteUser, getAllUsersCountByRoles } from '../controllers/userController.mjs';
const router = express.Router();
router.get('/count', getAllUsersCountByRoles)
router.get('/:role', getAllUsers);
router.get('/:email/:role', getUsersList);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/update', updateUser);
router.patch('/forget-password', updatePassword);
router.delete("/:id", deleteUser);
router.get('/profile', (req, res) => {
    res.json(req.user);
});

export default router;
