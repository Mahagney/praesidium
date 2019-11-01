const makeUserModel = ({ ormInstance }) => {
  return {
    getUserByEmail: (email) =>
      ormInstance('users')
        .where('email', email)
        .first(),
    create: (user) =>
      ormInstance('users')
        .insert(user, 'id')
        .then((ids) => {
          return ids[0];
        }),
  };
};
module.exports = makeUserModel;
