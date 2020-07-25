// #region 'LOCAL DEP'
const companyService = require('../../services/companyService');
// #endregion

// #region 'INTERFACE'

// TEMPORARY LOGIC
const getCompany = (req, res, _next) =>
  companyService.getCompany(req.params.companyId).then((results) => res.status(200).json(results));

const getAll = (_req, res, _next) => companyService.getAll().then((results) => res.status(200).json(results));

const addCompany = (req, res, next) => {
  const data = req.body;
  companyService
    .addCompany({
      NAME: data.name,
      CUI: data.cui,
      EMAIL: data.email,
      PHONE_NUMBER: data.phoneNumber,
      DOMAIN: data.domain,
    })
    .then((company) => res.status(200).json(company))
    .catch((err) => next(err));
};

const deleteCompany = (req, res, next) => {
  companyService
    .deleteCompany(req.params.companyId)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => next(error));
};

const updateCompany = (req, res, next) => {
  companyService
    .updateCompany(req.params.companyId, req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
};

module.exports = {
  getCompany,
  getAll,
  addCompany,
  deleteCompany,
  updateCompany,
};
