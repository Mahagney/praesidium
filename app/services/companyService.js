//#region 'LOCAL DEP'
const {
    Company
} = require('../../database/models');
//#endregion

const getCompany = (companyId) => Company.findByPk(companyId);

const getAll = () => Company.findAll();

const addCompany = (company) => {
    return Company.create(company).catch((error) => {
        let err = new Error(error);
        err.statusCode = 400;
        err.customMessage = 'Invalid company data';
        throw err;
    });
}

module.exports = {
    getCompany,
    getAll,
    addCompany
}