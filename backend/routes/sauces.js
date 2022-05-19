const express = require('express');
const router = express.Router();

const sauceController = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, sauceController.getAllSauces);
router.post('/', auth, multer, sauceController.createSauce);
router.get('/:id', auth, sauceController.getOneSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.post('/:id/like', auth, multer, sauceController.likeSauce);
router.delete('/:id', auth, sauceController.deleteSauce);

module.exports = router; 