//#region 'LOCAL DEP'
const {
    Company
} = require('../../database/models');
//#endregion

const getCompany = (companyId) => Company.findByPk(companyId);

const getAll = () => Company.findAll();

module.exports = {
    getCompany,
    getAll
}