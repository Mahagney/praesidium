// #region 'LOCAL DEP'
const { Company } = require('../../database/models');
// #endregion

const getCompany = (companyId) => Company.findByPk(companyId);

const getAll = () =>
  Company.findAll({
    where: {
      deletedAt: null,
    },
  });

const addCompany = async (company) => {
  return Company.create(company).catch((error) => {
    const err = new Error(error);
    err.statusCode = 400;
    err.customMessage = 'Invalid company data';
    throw err;
  });
};

const deleteCompany = async (companyId) => {
  // TODO: find out what happens on else (what to return)
  // eslint-disable-next-line consistent-return
  return Company.findByPk(companyId).then((currentCompany) => {
    // Check if record exists in db
    if (currentCompany) {
      const newCompany = { ...currentCompany };
      newCompany.deletedAt = new Date();
      return currentCompany.update(newCompany);
    }
  });
};

const updateCompany = async (companyId, company) => {
  // TODO: find out what happens on else (what to return)
  // eslint-disable-next-line consistent-return
  return Company.findByPk(companyId).then((currentCompany) => {
    // Check if record exists in db
    if (currentCompany) {
      return currentCompany.update(company);
    }
  });
};

module.exports = {
  getCompany,
  getAll,
  addCompany,
  deleteCompany,
  updateCompany,
};
