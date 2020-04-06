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

const deleteCompany = (companyId) => {
    return Company.destroy({
        where: {
            ID: companyId
        }
    });
}

const updateCompany = (companyId, company) => {
    return Company.findByPk(companyId)
        .then(currentCompany => {
            // Check if record exists in db
            if (currentCompany) {
                return currentCompany.update(company)
            }
        })
}

module.exports = {
    getCompany,
    getAll,
    addCompany,
    deleteCompany,
    updateCompany
}