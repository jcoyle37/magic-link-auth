module.exports = (req, res) => {
  console.log('Clearing cookie for user email ' + req.email);
  res.clearCookie('Authorization');
  res.redirect('/');
};