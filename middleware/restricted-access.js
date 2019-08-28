module.exports = (req, res, next) => {
  req.session && req.session.loggedIn === true
    ? next()
    : res.status(400).json({
        success: false,
        message: 'Access Restricted. Invalid authorizations.',
      });
};
