const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/new');
}

function createRoute(req, res) {
  console.log(req.body);
  User
    .findOne({email: req.body.email })
    .then( (user)=> {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).render('sessions/new', {message: 'Unrecognised Credentials'});
      }
      req.session.userId = user.id; // adding to the session a key "user id" (creating a cookie)
      return res.redirect('networks/new');
    });
}

function deleteRoute(req, res){
  return req.session.regenerate(()=> res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
