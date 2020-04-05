//#region 'LOCAL DEP'
const courseService = require('./../../services/companyService');
//#endregion

//#region 'INTERFACE'

//TEMPORARY LOGIC

const getCompany = (req, res, next) => courseService.getCompany(req.params.companyId).then(results =>
    res.status(200).json(results)
);

const getAll = (req, res, next) => courseService.getAll().then(results =>
    res.status(200).json(results)
);;

module.exports = {
    getCompany,
    getAll
}