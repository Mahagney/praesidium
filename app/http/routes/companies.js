// #region 'NPM DEP'
const express = require('express');

const router = express.Router();
// #endregion

// #region 'LOCAL DEP'
const companiesController = require('../controllers/companiesController');
const authenticateToken = require('../middleware/authenticateToken');
// #endregion

// !!!! keep in mind the order of the endpoints

router.get('/', authenticateToken, companiesController.getAll);

router.get('/:companyId', authenticateToken, companiesController.getCompany);

router.post('/', authenticateToken, companiesController.addCompany);

router.delete('/:companyId', authenticateToken, companiesController.deleteCompany);

router.put('/:companyId', authenticateToken, companiesController.updateCompany);

module.exports = router;
