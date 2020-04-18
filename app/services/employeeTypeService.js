//#region 'NPM DEP'
const passGenerator = require('generate-password');
const sequelize = require('../../database/config/sequelizeConfig');
//#endregion

//#region 'LOCAL DEP'
const {
    EmployeeType,
} = require('../../database/models');
//#endregion

const getEmployeeTypes = () => EmployeeType.findAll({ where: { deletedAt: null } });

const deleteEmployeeTypes = (id) => {
    return EmployeeType.findByPk(id)
        .then(currentEmployeeType => {
            // Check if record exists in db
            if (currentEmployeeType) {
                let newEmployeeType = { ...currentEmployeeType };
                newEmployeeType.deletedAt = new Date();
                return currentEmployeeType.update(newEmployeeType)
            }
        })
}

const addEmployeeType = (newEmployeeType) => EmployeeType.create(newEmployeeType);

module.exports = {
    getEmployeeTypes,
    deleteEmployeeTypes,
    addEmployeeType
}

