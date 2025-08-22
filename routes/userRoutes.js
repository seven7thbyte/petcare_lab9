const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerUser, getUsers, updateUser, deleteUser } = require('../controllers/userController.js');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/register', upload.single('profile_picture'), registerUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.put('/:id', upload.single('profile_picture'), updateUser);


module.exports = router;