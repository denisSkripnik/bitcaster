function leading(req, res, next) {
  res.render('index', { title: 'Express' });
}

module.exports.leading=leading;
