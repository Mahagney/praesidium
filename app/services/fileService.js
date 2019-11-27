//#region 'NPM DEP'
const csv = require('fast-csv');
const fs = require('fs');
//#endregion

const readFilePromise = (filePath) => {
  const users = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        csv.parse({ headers: true }).transform((data) => ({
          FIRST_NAME: data.FirstName,
          LAST_NAME: data.LastName,
          CNP: data.Cnp
          //EMAIL: data.Email
        }))
      )
      .on('data', (row) => {
        const user = JSON.stringify(row);
        users.push(user);
      })
      .on('end', (rowCount) => resolve(users))
      .on('error', (error) => reject(error));
  });
};

module.exports = { readFilePromise };
