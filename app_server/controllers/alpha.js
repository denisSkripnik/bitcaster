var path = require('path');

function alphapage(req, res, next) {
  console.log(path.join(__dirname, '/../../public/old', 'index.html'));
  res.sendFile(path.join(__dirname, '/../../public/old', 'index.html'));
  }

module.exports.alphapage=alphapage;