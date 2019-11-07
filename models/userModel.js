const makeUserModel = ({ ormInstance }) => {
  return {
    getUserByEmail: (email) =>
      ormInstance('USERS')
        .where('EMAIL', email)
        .first(),
    create: (user) =>
      ormInstance('USERS')
        .insert(user, 'ID')
        .then((ids) => {
          return ids[0];
        }),
  };
};
module.exports = makeUserModel;
