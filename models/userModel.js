const makeUserModel = ({ ormInstance }) => {
  return {
    getUserByEmail: (email) =>
      ormInstance('USER')
        .where('EMAIL', email)
        .first(),
    create: (user) => {
      ormInstance('USER')
        .insert(user, 'ID')
        .then((ids) => {
          console.log(ids[0]);
          return ids[0];
        });
    },
  };
};
module.exports = makeUserModel;
