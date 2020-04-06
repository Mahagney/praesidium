//#region 'LOCAL DEP'
const companyService = require('./../../services/companyService');
//#endregion

//#region 'INTERFACE'

//TEMPORARY LOGIC

const getCompany = (req, res, next) => companyService.getCompany(req.params.companyId).then(results =>
    res.status(200).json(results)
);

const getAll = (req, res, next) => companyService.getAll().then(results =>
    res.status(200).json(results)
);

const addCompany = (req, res, next) => {
    const data = req.body;
    companyService.addCompany({ NAME: data.name, CUI: data.cui, EMAIL: data.email, PHONE_NUMBER: data.phoneNumber, DOMAIN: data.domain })
        .then(company => res.status(200).json(company)
        ).catch(err => next(err));
}

module.exports = {
    getCompany,
    getAll,
    addCompany
}