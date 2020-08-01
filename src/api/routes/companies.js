const { Router } = require('express');

const authenticateToken = require('../middlewares/authenticateToken');
const { getAll, addCompany, getCompany, deleteCompany, updateCompany } = require('../controllers/companiesController');

const router = () => {
  const companiesRouter = Router();

  // ! Keep in mind the order of the endpoints
  companiesRouter.get('/', authenticateToken, getAll);
  companiesRouter.get('/:companyId', authenticateToken, getCompany);
  companiesRouter.post('/', authenticateToken, addCompany);
  companiesRouter.delete('/:companyId', authenticateToken, deleteCompany);
  companiesRouter.put('/:companyId', authenticateToken, updateCompany);

  return companiesRouter;
};

module.exports = router;
