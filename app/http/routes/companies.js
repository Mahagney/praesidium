//#region 'NPM DEP'
const express = require('express');
const router = express.Router();
//#endregion

//#region 'LOCAL DEP'
const companiesController = require('../controllers/companiesController');

//#endregion
router.get('/', companiesController.getAll);

router.get('/:companyId', companiesController.getCompany);

module.exports = router;