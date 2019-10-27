const ensureLoggedIn = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    res.status(401);
    next(new Error('Un-Authorized'));
  }
};

function allowAccess(req, res, next){
  if (req.session.user_id == req.params.id) {
    next();
  } else {
    res.status(401);
    next(new Error('Un-Authorized'));
  }
}
module.exports = {ensureLoggedIn, allowAccess};
