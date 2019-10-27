const ensureLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401);
    next(new Error('Un-Authorized'));
  }
};

function allowAccess(req, res, next){
  if (req.session.userId == req.params.id) {
    next();
  } else {
    res.status(401);
    next(new Error('Un-Authorized'));
  }
}
module.exports = {ensureLoggedIn, allowAccess};
